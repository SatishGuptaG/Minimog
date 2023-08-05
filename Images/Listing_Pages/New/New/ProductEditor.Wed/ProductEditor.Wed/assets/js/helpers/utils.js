function base64ArrayBuffer(arrayBuffer) {
    var base64 = '';
    var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

    var bytes = new Uint8Array(arrayBuffer);
    var byteLength = bytes.byteLength;
    var byteRemainder = byteLength % 3;
    var mainLength = byteLength - byteRemainder;

    var a, b, c, d;
    var chunk;

    // Main loop deals with bytes in chunks of 3
    for (var i = 0; i < mainLength; i = i + 3) {
        // Combine the three bytes into a single integer
        chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];

        // Use bitmasks to extract 6-bit segments from the triplet
        a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
        b = (chunk & 258048) >> 12; // 258048   = (2^6 - 1) << 12
        c = (chunk & 4032) >> 6; // 4032     = (2^6 - 1) << 6
        d = chunk & 63;              // 63       = 2^6 - 1

        // Convert the raw binary segments to the appropriate ASCII encoding
        base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
    }

    // Deal with the remaining bytes and padding
    if (byteRemainder === 1) {
        chunk = bytes[mainLength];

        a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2

        // Set the 4 least significant bits to zero
        b = (chunk & 3) << 4 // 3   = 2^2 - 1

        base64 += encodings[a] + encodings[b] + '==';
    } else if (byteRemainder === 2) {
        chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]

        a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
        b = (chunk & 1008) >> 4; // 1008  = (2^6 - 1) << 4

        // Set the 2 least significant bits to zero
        c = (chunk & 15) << 2; // 15    = 2^4 - 1

        base64 += encodings[a] + encodings[b] + encodings[c] + '=';
    }

    return base64;
}

function fileType(className, type) {
    if (className == 'type') {
        switch (type) {
            case "text/plain": return "txt";
            case "text/html": return "html";
            case "application/pdf": return "pdf";
            case "application/vnd.ms-excel": return "xls";
            case "application/vnd.ms-excel": return "xlsx";
            case "application/msword": return "doc";
            case "application/msword": return "docx";
            case "image/jpeg": return "jpeg";
            case "image/jpg": return "jpg";
            case "image/png": return "png";
            case "image/gif": return "gif";
            case "text/xml": return "xml";
            case "application/vnd.openxmlformats-officedocument.presentationml.presentation": return "pptx"; 
            case "application/vnd.ms-powerpoint": return "ppt"; 

        }
    }
    else {
        switch (type) {
            case "txt": return "far fa-file fa-1x";
            case "html": return "far fa-file fa-1x";
            case "pptx": return "far fa-file fa-1x";
            case "ppt": return "far fa-file fa-1x";
            case "pdf": return "far fa-file-pdf fa-1x";
            case "xls": return "far fa-file-excel fa-1x";
            case "xlsx": return "far fa-file-excel fa-1x";
            case "doc": return "far fa-file-word fa-1x";
            case "docx": return "far fa-file-word fa-1x";
            case "jpeg": return "far fa-file-image fa-1x";
            case "jpg": return "far fa-file-image fa-1x";
            case "png": return "far fa-file-image fa-1x";
            case "xml": return "far fa-file fa-1x";
            case "gif": return "far fa-file-image fa-1x";

        }
    }
}


