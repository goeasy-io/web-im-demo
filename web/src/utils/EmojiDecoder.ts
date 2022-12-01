class EmojiDecoder {
    emojiMap = {} as any;
    url = "";
    patterns = [] as any;
    metaChars = /[[\]{}()*+?.\\|^$\-,&#\s]/g;

    constructor(url:string,emojiMap:any) {
        this.url = url || '';
        this.emojiMap = emojiMap || {};
        for (const i in this.emojiMap) {
            if (Object.prototype.hasOwnProperty.call(this.emojiMap, i)){
                this.patterns.push('('+i.replace(this.metaChars, "\\$&")+')');
            }
        }
    }

    decode (text:string) {
        return text.replace(new RegExp(this.patterns.join('|'),'g'),  (match) => {
            return typeof this.emojiMap[match] != 'undefined' ? '<img height="25px" width="25px" src="'+this.url+this.emojiMap[match]+'" />' : match;
        });
    }
}

export default EmojiDecoder
