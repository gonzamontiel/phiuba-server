module.exports.sanitize = function sanitize(str) {
    str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
    str = str.replace(/á/gim,'a');
    str = str.replace(/é/gim,'e');
    str = str.replace(/í/gim,'i');
    str = str.replace(/ó/gim,'o');
    str = str.replace(/ú/gim,'u');
    str = str.replace(/ü/gim,'u');
    return str.trim();
};
