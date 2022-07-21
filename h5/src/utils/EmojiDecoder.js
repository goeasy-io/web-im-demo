class EmojiDecoder {
    emojiMap = null;
    url = "";
    patterns = [];
    metaChars = /[[\]{}()*+?.\\|^$\-,&#\s]/g;

    constructor(url,emojiMap) {
        this.url = url || '';
        this.emojiMap = emojiMap || {};
        for (let i in this.emojiMap) {
            if (this.emojiMap.hasOwnProperty(i)){
                this.patterns.push('('+i.replace(this.metaChars, "\\$&")+')');
            }
        }
    }

    decode (text) {
        return text.replace(new RegExp(this.patterns.join('|'),'g'),  (match) => {
            return typeof this.emojiMap[match] != 'undefined' ? '<img height="25px" width="25px" src="'+this.url+this.emojiMap[match]+'" />' : match;
        });
    }
}

export default EmojiDecoder
