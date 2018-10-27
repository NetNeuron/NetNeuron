Wive2D.N2D = function(_layer)
{
    this.Layer = _layer;

    this.Name = new Wive2D.Text(_layer);
    this.Name.text = 'default';
    this.Name.color = '#FFF';
    this.Name.align = "center";

    this.Node = new Wive2D.Circle();
    this.Node.Set("#4cf","#999");
    this.Node.Position.Set(0, 0);
    this.Node.Size.Set(40,3);
    this.Node.Box.Size.Set(80,80);

    if(_layer)
    _layer.Add(this.Node);
}
Wive2D.N2D.prototype =
{
    constructor: Wive2D.N2D,
    Set: function(_obj)
    {
        this.Name.text = _obj.Name.text;
        this.SetPosition(_obj.Node.Position.x, _obj.Node.Position.y);
        this.Node.Set(_obj.Node.Color, _obj.Node.SColor);
    },
    object: function()
    {
        return {
                    Name:{
                            text: this.Name.text
                        },

                    Node:{
                            Position: this.Node.Position,
                            Color: this.Node.Color,
                            SColor: this.Node.SColor
                        }
               }
    },
    SetLayer: function(_layer)
    {
        this.Remove(0);
        this.Layer = _layer;
        this.Name.SetLayer(_layer);
        _layer.Add(this.Node);
    },
    Remove: function(_flag = 1)
    {
        for(var i = 0; i < this.Layer.Length(); i++)
            if(this.Layer.Get(i).id == this.Node.id)
            { this.Layer.Remove(i); break; }

        if(_flag)
            delete this.Name;
    },
    SetPosition: function(_x, _y)
    {
        this.Node.Position.Set(_x, _y);
        this.Name.SetPosition(_x, _y-60);
    },
    GetPosition: function()
    {
        return this.Node.Position;
    },
    OnObject: function()
    {
        return this.Node.onObject(this.Layer.Camera.Position);
    }
}

Wive2D.S2D = function(_layer)
{
    this.Layer = _layer;

    this.Name = new Wive2D.Text(_layer);
    this.Name.text = 'default';
    this.Name.color = '#FFF';
    this.Name.align = "center";

    this.Node = new Wive2D.Circle();
    this.Node.Set("#0f0","#999");
    this.Node.Position.Set(0, 0);
    this.Node.Size.Set(10,3);
    this.Node.Box.Size.Set(20,20);

    this.sLine = new Wive2D.exLine();
    this.sLine.id = this.Node.id;
    this.sLine.Position = this.Node.Position;
    this.sLine.Visible = false;

    this.jLine = new Wive2D.exLine();
    this.jLine.id = this.Node.id;
    this.jLine.Color = "#f00";
    this.jLine.StokeSize = 2;
    this.jLine.Position = this.Node.Position;
    this.jLine.Visible = false;

    if(_layer)
    {
        _layer.Add(this.jLine);
        _layer.Add(this.sLine);
        _layer.Add(this.Node);
    }
}
Wive2D.S2D.prototype =
{
    constructor: Wive2D.S2D,
    Set: function(_obj)
    {
        this.Name.text = _obj.Name.text;
        this.SetPosition(_obj.Node.Position.x, _obj.Node.Position.y);
        this.Node.Set(_obj.Node.Color, _obj.Node.SColor);
    },
    object: function()
    {
        return {
                    Name:{
                            text:this.Name.text,
                            Position: this.Name.Position
                        },

                    Node:{
                            Position:this.Node.Position,
                            Color: this.Node.Color,
                            SColor: this.Node.SColor
                        }
               }
    },
    SetLayer: function(_layer)
    {
        this.Remove(0);
        this.Layer = _layer;
        this.Name.SetLayer(_layer);
        _layer.Add(this.jLine);
        _layer.Add(this.sLine);
        _layer.Add(this.Node);
    },
    Remove: function(_flag = 1)
    {
        for(var i = 0; i < this.Layer.Length(); i++)
            if(this.Layer.Get(i).id == this.jLine.id)
            { this.Layer.Remove(i, 3); break; }

        if(_flag)
            delete this.Name;
    },
    SetPosition: function(_x, _y)
    {
        this.Node.Position.Set(_x, _y);
        this.Name.SetPosition(_x, _y-20);
        this.Calc();
    },
    JoinNeuron: function(_position)
    {
        this.sLine.EndPosition = _position;
        this.sLine.Visible = true;
        this.Calc();
    },
    DetachNeuron: function()
    {
        this.sLine.Visible = false;
    },
    JoinAkson: function(_position)
    {
        this.jLine.EndPosition = _position;
        this.jLine.Visible = true;
        this.Calc();
    },
    DetachAkson: function()
    {
        this.jLine.Visible = false;
    },
    Calc: function()
    {
        if(this.sLine.Position.y > this.sLine.EndPosition.y)
            this.sLine.ControlPosition.Set(this.sLine.Position.x-(this.sLine.Position.x-this.sLine.EndPosition.x)/2,this.sLine.EndPosition.y+(this.sLine.Position.y - this.sLine.EndPosition.y));
        else
            this.sLine.ControlPosition.Set(this.sLine.Position.x-(this.sLine.Position.x-this.sLine.EndPosition.x)/2,this.sLine.EndPosition.y+(this.sLine.Position.y - this.sLine.EndPosition.y));

        if(this.jLine.Position.y > this.jLine.EndPosition.y)
            this.jLine.ControlPosition.Set(this.jLine.Position.x-(this.jLine.Position.x-this.jLine.EndPosition.x)/2,this.jLine.EndPosition.y+(this.jLine.Position.y - this.jLine.EndPosition.y));
        else
            this.jLine.ControlPosition.Set(this.jLine.Position.x-(this.jLine.Position.x-this.jLine.EndPosition.x)/2,this.jLine.EndPosition.y+(this.jLine.Position.y - this.jLine.EndPosition.y));
    },
    GetPosition: function()
    {
        return this.Node.Position;
    },
    OnObject: function()
    {
        return this.Node.onObject(this.Layer.Camera.Position);
    }
}

Wive2D.Akson = function(_id)
{
    this.id = _id;
    this.Synapses = [];
    this.Out = 0;
}
Wive2D.Akson.prototype =
{
    constructor: Wive2D.Akson,
    object: function()
    {
        var _Synapses = [];
        for(var i = 0; i < this.Synapses.length; i++)
            _Synapses.push(this.Synapses[i].object());
        return {
                id: this.id,
                Synapses: _Synapses,
                Out: this.Out
               };
    },
    Join: function(_synapse) { this.Synapses.push(_synapse); },
    Get: function() { var _out = this.Out; this.Out = 0; return _out; },
    Detach: function(_id)
    {
        for(var i = 0; i < this.Synapses.length; i++)
            if(this.Synapses[i].id == _id)
            { this.Synapses[i].DetachAkson(); this.Synapses.splice(i, 1); break; }
    },
    Remove: function()
    {
        for(var i = 0; i < this.Synapses.length; i++)
          this.Synapses[i].DetachAkson();

        this.Synapses.splice(0, this.Synapses.length);
    },
    Calc: function(_value)
    {
        for(var i = 0; i < this.Synapses.length; i++)
            this.Synapses[i].Set(_value);
        this.Out =  _value;
    }
}

Wive2D.Synapse = function(_id, _distance, _polarity, _layer)
{
    this.id = _id;
    this.In = 0;
    this.Distance = _distance;
    this.Polarity = 1;
    this.Neuron = 0;
    this.Akson = 0;

    this.S2D = new Wive2D.S2D(_layer);
}
Wive2D.Synapse.prototype =
{
    constructor: Wive2D.Synapse,
    copy: function(_obj)
    {
        this.id = _obj.id;
        this.In = _obj.In;
        this.Distance = _obj.Distance;
        this.Polarity = _obj.Polarity;
        this.S2D.Set(_obj.S2D);
    },
    object: function()
    {
        var idN = -1, idA = -1;
        if(this.Neuron) idN = this.Neuron.id;
        if(this.Akson) idA = this.Akson.id;
        return {
                id: this.id,
                In: this.In,
                Distance: this.Distance,
                Polarity: this.Polarity,
                Neuron: idN,
                Akson: idA,
                S2D: this.S2D.object()
               }
    },
    Set: function(_value){ this.In = _value; },
    JoinNeuron: function(_neuron)
    {
        if(this.Neuron)
            this.Neuron.Detach(this.id);
        this.Neuron = _neuron;
        this.Neuron.Join(this);
        this.S2D.JoinNeuron(this.Neuron.N2D.Node.Position);
    },
    JoinAkson: function(_neuron)
    {
        if(this.Akson)
            this.Akson.Detach(this.id);
        this.Akson = _neuron.Akson;
        this.Akson.Join(this);
        this.S2D.JoinAkson(_neuron.N2D.Node.Position);
    },
    DetachNeuron: function()
    {
        this.Neuron = 0;
        this.S2D.DetachNeuron();
    },
    DetachAkson: function()
    {
        this.Akson = 0;
        this.S2D.DetachAkson();
    },
    Remove: function()
    {
        if(this.Neuron)
            this.Neuron.Detach(this.id);
        if(this.Akson)
            this.Akson.Detach(this.id);
        this.S2D.Remove();
        delete this.S2D;
    },
    Calc: function()
    {
        var _Out = 0;
        if(this.In == 0) { this.Atachment(1/100000); return _Out; }
        if(this.Distance < 1) this.Distance = 1;

        _Out = this.In * ((1 / this.Distance));
        this.Atachment(1/1000);

        this.In = 0;
        return _Out;
    },
    Atachment: function(_value)
    { if(this.Distance > 1) this.Distance -= _value; },
    Detachment: function(_value)
    { if(this.Polarity > 0) this.Distance += _value; }
}

Wive2D.Neuron = function(_id, _layer)
{
    this.id = _id;
    this.Type = 'G';
    this._Event = 0;
    this.Limit = 1.0;
    this.Sum = 0.0;
    this.Synapses = [];
    this.Akson = new Wive2D.Akson(_id);
    this.N2D = new Wive2D.N2D(_layer);
}
Wive2D.Neuron.prototype =
{
    constructor: Wive2D.Neuron,
    copy: function(_obj)
    {
        this.id = _obj.id;
        this.Type = _obj.Type;
        this._Event = _obj._Event;
        this.Limit = _obj.Limit;
        this.Akson.id = _obj.Akson.id;
        this.N2D.Set(_obj.N2D);
    },
    object: function()
    {
        var _Synapses = [];
        for(var i = 0; i < this.Synapses.length; i++)
            _Synapses.push(this.Synapses[i].object());
        return {
                id: this.id,
                Type: this.Type,
                _Event: this._Event,
                Limit: this.Limit,
                Synapses: _Synapses,
                Akson: this.Akson.object(),
                N2D: this.N2D.object()
               };
    },
    Join: function(_synapse) { this.Synapses.push(_synapse); },
    Detach: function(_id)
    {
        for(var i = 0; i < this.Synapses.length; i++)
            if(this.Synapses[i].id == _id)
            { this.Synapses[i].DetachNeuron(); this.Synapses.splice(i, 1); break; }
    },
    Remove: function()
    {
        for(var i = 0; i < this.Synapses.length; i++)
            this.Synapses[i].DetachNeuron();

        this.Synapses.splice(0, this.Synapses.length);

        this.Akson.Remove();
        this.N2D.Remove();
        delete this.Akson;
        delete this.N2D;
    },
    Calc: function()
    {
        switch(this.Type)
        {
            case 'R':
              this.Sum = Random(1,this.Limit+2)-1;
              this.Akson.Calc(this.Sum);
            break;
            case 'G':
              this.Sum = this.Limit;
              this.Akson.Calc(this.Sum);
            break;
            case 'O':
                for(var i = 0; i < this.Synapses.length; i++)
                    this.Sum += this.Synapses[i].Calc();

                if(this.Sum >= this.Limit) { this.Akson.Calc(this.Limit); this.Sum = 0; }
                else if(this.Sum > 0) { this.Akson.Calc(this.Sum); this.Sum -= 1/1000;}
                else if(this.Sum < 0)
                {
                  for(var i = 0; i < this.Synapses.length; i++)
                    if(this.Synapses[i].Polarity > 0)
                      this.Synapses[i].Detachment(1/100);
                  this.Sum = 0;
                }
                else this.Akson.Calc(0);
            break;
        }

        // if(this.N2D.Name.text == "GenR" || this.N2D.Name.text == "GenL" || this.N2D.Name.text == "GenT" || this.N2D.Name.text == "GenD")
        //     log(this.N2D.Name.text + " " + this.Sum);


    }
}
