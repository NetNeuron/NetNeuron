Wive2D.Button = function(_X, _Y, _sizeX, _sizeY, _text, _add = 0)
{
    this.Node = document.createElement("BUTTON");
    this.Node.style.width = _sizeX + 'px';
    this.Node.style.height = _sizeY + 'px';
    this.Node.style.fontSize = '13px';
    this.Node.style.color = '#FFF';
    this.Node.style.outlineColor = '#135';
    this.Node.style.backgroundColor = '#135';
    this.Node.style.borderRadius = "4px";
    this.Node.style.borderColor = "#135";
    this.Node.style.borderWidth = "2px";
    this.Node.innerHTML = _text;
    
    if(_add)
    {
        this.Node.style.position = 'absolute';
        this.Node.style.left = (_X-(_sizeX/2)) + 'px';
        this.Node.style.top = (_Y-(_sizeY/2)) + 'px';
        document.body.appendChild(this.Node);
    }
}

Wive2D.Button.prototype =
{
    constructor: Wive2D.Button,
    
    onClick: function(_function)
    {
        this.Node.onclick = function(){_function()};
    },
    Visible: function(_e)
    {
        if(!_e)
            this.Node.style.visibility = "hidden";
        else
            this.Node.style.visibility = "visible";
    },
    SetPosition: function(_X, _Y)
    {
        this.Node.style.position = 'absolute';
        this.Node.style.left = (_X-(parseInt(this.Node.style.width)/2)) + 'px';
        this.Node.style.top = (_Y-(parseInt(this.Node.style.height)/2)) + 'px';
    }
    
}

Wive2D.Table = function(_X, _Y, _size)
{
    this.Node = document.createElement("TABLE");
    this.Node.style.position = 'absolute';
    this.Node.style.left = _X + 'px';
    this.Node.style.top = _Y+ 'px';
    this.Node.style.width = _size + 'px';
    this.Node.style.borderCollapse = 'collapse'; /*убираем пустые промежутки между ячейками*/
    this.Node.style.border = '2px solid #5BF'; /*устанавливаем для таблицы внешнюю границу серого цвета толщиной 1px*/
    this.Node.style.backgroundColor = '#135';
    
    document.body.appendChild(this.Node);
    this.Rows = [];
    
    this.AddRow();
}

Wive2D.Table.prototype =
{
    constructor: Wive2D.Table,
    
    Visible: function(_e)
    {
        if(!_e)
            this.Node.style.visibility = "hidden";
        else
            this.Node.style.visibility = "visible";
    },
    
    AddRow: function()
    {
        this.Rows.push(document.createElement("TR"));
        this.Node.appendChild(this.Rows[this.Rows.length-1]);
    },
    
    AddCell: function(_text, _align = 'center', _pad = 0, _span = '0')
    {
         var Cell = document.createElement("TH");
        Cell.innerHTML = _text;
        Cell.style.border = '1px dotted #5BF';
        Cell.style.color = '#FFF';
        Cell.style.font = "normal normal 13px arial,serif";
        Cell.style.textAlign = _align; /* Выравнивание по ширине */
        Cell.style.paddingLeft = _pad + 'px';
        Cell.style.paddingRight = _pad + 'px';
        Cell.colSpan = _span;
        //if(this.Rows[0].childElementCount<this.Rows[this.Rows.length-1].childElementCount+1) this.Rows[0].childNodes[0].rowSpan = _span;
        this.Rows[this.Rows.length-1].appendChild(Cell);
    },
    
    AddElement: function(_i, _j, _element)
    {
        this.Rows[_i].childNodes[_j].appendChild(_element.Node);
    },
    
    onOver: function(_function)
    {
        this.Node.onmouseover = function(){ _function(); }
    },
    
    onOut: function(_function)
    {
        this.Node.onmouseout = function(){ _function(); }
    },
    
    onFocusIn: function(_function)
    {
        this.Node.onfocusin = function(){ _function(); }
    },
    
    onFocusOut: function(_function)
    {
        this.Node.onfocusout = function(){ _function(); }
    }
    
}

Wive2D.Select = function(_sizeX, _sizeY)
{
    this.Size = 0;
    this.Node = document.createElement("SELECT");
    this.Node.style.width = _sizeX + 'px';
    this.Node.style.height = _sizeY + 'px';
    this.Node.style.outlineColor = '#135';
    this.Node.style.backgroundColor = '#135';
    this.Node.style.borderRadius = "4px";
    this.Node.style.borderColor = "#135";
    this.Node.style.color = '#FFF';
    document.body.appendChild(this.Node);
}

Wive2D.Select.prototype =
{
    constructor: Wive2D.Select,
    
    Set: function(_id)
    {
        this.Node.selectedIndex = _id;
    }, 
    
    Add: function(_text)
    {
        var Option = document.createElement("OPTION");
        Option.name = _text;
        Option.innerHTML = _text;
        this.Node.appendChild(Option);
    },
    
    Clear: function()
    {
        for(var i = this.Node.length; 0 <= i; --i)
            this.Node.remove(i);         
    },
    
    GetIDSelected: function()
    {
        return this.Node.selectedIndex;
    },
    
    GetNameSelected: function()
    {
        return this.Node.childNodes[this.Node.selectedIndex].name;
    }, 
    
    onChange: function(_function)
    {
        this.Node.onchange = function(){_function(); Wive2D.MouseDown[Wive2D.MouseKey['LEFT']] = false;};
    },
    
    onOver: function(_function)
    {
        this.Node.onmouseover = function(){ _function(); }
    },
    
    onOut: function(_function)
    {
        this.Node.onmouseout = function(){ _function(); Wive2D.MouseDown[Wive2D.MouseKey['LEFT']] = false;}
    }
}

Wive2D.InputText = function(_sizeX, _sizeY, _text)
{
    this.Node = document.createElement("INPUT");
    this.Node.type = 'Text';
    this.Node.style.width = _sizeX + 'px';
    this.Node.style.height = _sizeY + 'px';
    this.Node.style.outlineColor = '#135';
    this.Node.style.backgroundColor = '#135';
    this.Node.style.borderRadius = "4px";
    this.Node.style.borderColor = "#135";
    this.Node.style.border = "none";
    this.Node.style.color = '#FFF';
    this.Node.value = _text;
    document.body.appendChild(this.Node);
}

Wive2D.InputText.prototype =
{
    constructor: Wive2D.InputText,
    
    Set: function(_text)
    {
        this.Node.value = _text;
    },
    
    Get: function()
    {
        return this.Node.value;
    },
        
    onChange: function(_function)
    {
        this.Node.onchange = function(){_function()};
    }
}
