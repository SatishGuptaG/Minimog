CKEDITOR.editorConfig = function (config) {
    config.toolbarGroups = [
        //{ name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
        { name: 'document', groups: ['mode'] },
        { name: 'styles', groups: ['styles'] },
        //{ name: 'clipboard', groups: ['clipboard', 'undo'] },
        //{ name: 'forms', groups: ['forms'] },
        { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
        { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
        { name: 'links', groups: ['links'] },
        { name: 'insert', groups: ['insert'] },
        //{ name: 'colors', groups: ['colors'] },
        { name: 'tools', groups: ['tools'] }
        //{ name: 'others', groups: ['others'] },
        //{ name: 'about', groups: ['about'] }
    ];
    config.allowedContent = true;
    //config.fullPage = true;
    config.removeButtons = 'Save,NewPage,Preview,Print,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Subscript,Superscript,RemoveFormat,CopyFormatting,Outdent,Indent,CreateDiv,BidiLtr,BidiRtl,Language,Anchor,Flash,HorizontalRule,Smiley,SpecialChar,Iframe,Font,FontSize,TextColor,ShowBlocks,About,Styles,Maximize,BGColor';
    config.extraPlugins = 'docprops';
};