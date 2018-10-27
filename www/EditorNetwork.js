var EventsNeuron = ["none", "Interval", "SensorR", "SensorL", "SensorT", "SensorD", "MoveR", "MoveL", "MoveT", "MoveD"];
var SceneEditor = 0;
var _Background = 0;
var _Layer = 0;
var _Layer1 = 0;
var Lable = 0;
var TableNeuron = 0;
var InputNameN = 0;
var InputLimit = 0;
var SelectType = 0;
var TableSynapse = 0;
var ButtonJoinA = 0;
var ButtonJoinN = 0;
var InputNameS = 0;
var SelectPolarity = 0;
var InputDistance = 0;
var ButtonAddN = 0;
var ButtonAddS = 0;
var ButtonSave = 0;
var ButtonLoad = 0;
var AINeurons = [];
var AISynapses = [];

var isAddNeuron = false, isAddSynapse = false, isJoinN = false, isJoinA = false;
var idSelected = -1, idSelectedS = -1;
var SDM = 0;
var isProperty = false;
var countAdd = 0;

function EditorVisible(_visible)
{
    if(_visible)
    {
        SelectNeuron(idSelected);
        SelectSynapse(idSelectedS);
    }
    else
    {
        TableNeuron.Visible(_visible);
        TableSynapse.Visible(_visible);
    }
    ButtonAddN.Visible(_visible);
    ButtonAddS.Visible(_visible);
    ButtonSave.Visible(_visible);
    ButtonLoad.Visible(_visible);
    SceneEditor.SetVisible(_visible);
}

function ResizeEditor()
{
    ButtonAddN.SetPosition(window.innerWidth/2-100-50, 25);
    ButtonAddS.SetPosition(window.innerWidth/2-100+50, 25);
    ButtonSave.SetPosition(window.innerWidth/2+100-50, 25);
    ButtonLoad.SetPosition(window.innerWidth/2+100+50, 25);
}

function InitEditor()
{
    SceneEditor = new Wive2D.Scene();
    _Background = new Wive2D.Layer(window.innerWidth,window.innerHeight,-1005);
    _Background.Fill('rgb(40,40,40)');
    //_Background.SetAlpha(0.5);

    _Layer = new Wive2D.Layer(window.innerWidth,window.innerHeight, -1001);
    _Layer1 = new Wive2D.Layer(window.innerWidth,window.innerHeight, -1002);

    TableNeuron = new Wive2D.Table(20,45,0);
    TableNeuron.AddCell("Property", "center", 5);
    TableNeuron.AddCell("Value");
    TableNeuron.AddRow();
    TableNeuron.AddCell("Name", "left", 5);
    TableNeuron.AddCell("", "right");
    TableNeuron.AddRow();
    TableNeuron.AddCell("Type", "left", 5);
    TableNeuron.AddCell("", "right");
    TableNeuron.AddRow();
    TableNeuron.AddCell("Limit", "left", 5);
    TableNeuron.AddCell("", "right");
    TableNeuron.AddRow();
    TableNeuron.AddCell("Event", "left", 5);
    TableNeuron.AddCell("", "right");
    InputNameN = new Wive2D.InputText(205, 20, "Default");
    InputLimit = new Wive2D.InputText(205, 20, "1.0");
    SelectType = new Wive2D.Select(210, 25);
    SelectEvent = new Wive2D.Select(210, 25);
    SelectType.Add("Generated");
    SelectType.Add("Out");
    SelectType.Add("Random");

    for(var i = 0; i < EventsNeuron.length; i++)
        SelectEvent.Add(EventsNeuron[i]);

    TableNeuron.AddElement(1, 1, InputNameN);
    TableNeuron.AddElement(2, 1, SelectType);
    TableNeuron.AddElement(3, 1, InputLimit);
    TableNeuron.AddElement(4, 1, SelectEvent);
    TableNeuron.Visible(0);

    TableSynapse = new Wive2D.Table(20,45,0);
    TableSynapse.AddCell("Property");
    TableSynapse.AddCell("Value");
    TableSynapse.AddRow();
    TableSynapse.AddCell("Name", "left", 5);
    TableSynapse.AddCell("", "right");
    TableSynapse.AddRow();
    TableSynapse.AddCell("Polarity", "left", 5);
    TableSynapse.AddCell("", "right");
    TableSynapse.AddRow();
    TableSynapse.AddCell("Distance", "left", 5);
    TableSynapse.AddCell("", "right");
    TableSynapse.AddRow();
    TableSynapse.AddCell("Neuron", "left", 5);
    TableSynapse.AddCell("", "right");
    TableSynapse.AddRow();
    TableSynapse.AddCell("Akson", "left", 5);
    TableSynapse.AddCell("", "right");
    ButtonJoinA = new Wive2D.Button(0, 0, 205, 25, "Join akson");
    ButtonJoinN = new Wive2D.Button(0, 0, 205, 25, "Join neuron");
    InputNameS = new Wive2D.InputText(205, 20, "Default");
    InputPolarity = new Wive2D.InputText(205, 20, "1");
    InputDistance = new Wive2D.InputText(205, 20, "1.0");
    TableSynapse.AddElement(1, 1, InputNameS);
    TableSynapse.AddElement(2, 1, InputPolarity);
    TableSynapse.AddElement(3, 1, InputDistance);
    TableSynapse.AddElement(4, 1, ButtonJoinN);
    TableSynapse.AddElement(5, 1, ButtonJoinA);
    TableSynapse.Visible(0);

    ButtonAddN = new Wive2D.Button(window.innerWidth/2-100-50, 25, 100, 25, "Add neuron", 1);
    ButtonAddS = new Wive2D.Button(window.innerWidth/2-100+50, 25, 100, 25, "Add synapse", 1);
    ButtonSave = new Wive2D.Button(window.innerWidth/2+100-50, 25, 100, 25, "Save", 1);
    ButtonLoad = new Wive2D.Button(window.innerWidth/2+100+50, 25, 100, 25, "Load", 1);
    SDM = Vector2D(0, 0);

    ButtonAddN.onClick(function(){ isAddNeuron = true; });
    ButtonAddS.onClick(function(){ isAddSynapse = true; });

    ButtonSave.onClick(function(){ Save("Network"); });
    ButtonLoad.onClick(function(){ Load("Network"); });

    ButtonJoinA.onClick(function(){ isJoinA = true; });
    ButtonJoinN.onClick(function(){ isJoinN = true; });

    TableNeuron.onOver(function(){isProperty = true;});
    TableNeuron.onOut(function(){isProperty = false;});
    TableSynapse.onOver(function(){isProperty = true;});
    TableSynapse.onOut(function(){isProperty = false;});

    InputNameN.onChange(function(){if(idSelected != -1) AINeurons[idSelected].N2D.Name.text = InputNameN.Get();});
    InputLimit.onChange(function(){if(idSelected != -1) AINeurons[idSelected].Limit = parseFloat(InputLimit.Get());});
    SelectType.onChange(function(){
    if(idSelected != -1)
            switch(SelectType.GetNameSelected())
            {
                case 'Generated': AINeurons[idSelected].Type = 'G';  AINeurons[idSelected].N2D.Node.Color = "#4cf"; break;
                case 'Out': AINeurons[idSelected].Type = 'O';   AINeurons[idSelected].N2D.Node.Color = "#fff"; break;
                case 'Random': AINeurons[idSelected].Type = 'R';   AINeurons[idSelected].N2D.Node.Color = "#4f4"; break;
            }
    });
    SelectEvent.onChange(function(){
    if(idSelected != -1)
        AINeurons[idSelected]._Event = SelectEvent.GetIDSelected(); //log(SelectEvent.GetIDSelected());
    });
    InputNameS.onChange(function(){if(idSelectedS != -1) AISynapses[idSelectedS].S2D.Name.text = InputNameS.Get();});
    InputDistance.onChange(function(){if(idSelectedS != -1) AISynapses[idSelectedS].Distance = parseFloat(InputDistance.Get());});
    InputPolarity.onChange(function(){
        if(idSelectedS != -1)
        {
            AISynapses[idSelectedS].Polarity =  parseInt(InputPolarity.Get());
            if(AISynapses[idSelectedS].Polarity > 0)
                AISynapses[idSelectedS].S2D.Node.Color = "#0f0";
            else
                AISynapses[idSelectedS].S2D.Node.Color = "#f0f";
        }
    });

    SceneEditor.Add(_Layer1);
    SceneEditor.Add(_Layer);
}

function onKey()
{
    if(Wive2D.isKeyPress('DEL') && !isProperty)
    {
        if(idSelectedS == -1)
            DeleteNeuron(idSelected);
        else
            DeleteSynapse(idSelectedS);
    }
}
function onMouse()
{
    if(Wive2D.isMouseClick('LEFT') && !isProperty)
    {
        if(isAddNeuron)
        {
            AddNeuron(Wive2D.Mouse.x, Wive2D.Mouse.y);
            isAddNeuron = false;
        }
        else if(isAddSynapse)
        {
            AddSynapse(Wive2D.Mouse.x, Wive2D.Mouse.y);
            isAddSynapse = false;
        }

        if(isJoinN)
        {
            EventsNeurons();
            SelectNeuron(idSelected);
            if(idSelected != -1 && idSelectedS != -1)
                AISynapses[idSelectedS].JoinNeuron(AINeurons[idSelected]);
            isJoinN = false;
            EventsSynapse();
            SelectSynapse(idSelectedS);
        }
        else if(isJoinA)
        {
            EventsNeurons();
            SelectNeuron(idSelected);
            if(idSelected != -1 && idSelectedS != -1)
                AISynapses[idSelectedS].JoinAkson(AINeurons[idSelected]);
            isJoinA = false;
            EventsSynapse();
            SelectSynapse(idSelectedS);
        }
        else
        {
            EventCamera();
            EventsNeurons();
            SelectNeuron(idSelected);
            EventsSynapse();
            SelectSynapse(idSelectedS);
        }
    }
    else if(Wive2D.isMouseDown('LEFT') && !isProperty)
    {

        if(idSelected != -1)
            MoveNeuron(idSelected, Wive2D.Mouse);
        else if(idSelectedS != -1)
            MoveSynapse(idSelectedS, Wive2D.Mouse);
        else
            MoveCamera(Wive2D.Mouse);

    }
    else if(Wive2D.isMouseWheel('DOWN') && !isProperty)
    {
        if(Wive2D.Zoom > 0.1)
            Wive2D.Zoom -= -Wive2D.MouseWheel/1000;
        Wive2D.MouseWheel = 0;
    }
    else if(Wive2D.isMouseWheel('UP') && !isProperty)
    {
        if(Wive2D.Zoom < 1)
            Wive2D.Zoom -= -Wive2D.MouseWheel/1000;
        Wive2D.MouseWheel = 0;
    }
}

function EventCamera()
{
    var OPosition = _Layer.Camera.Position;
    SDM = Vector2D(OPosition.x - Wive2D.Mouse.x, OPosition.y - Wive2D.Mouse.y); //дистанция от мыши до точки ( для правильного перемещения )
}

function MoveCamera(_pos)
{
    _Layer.Camera.Position = Vector2D(_pos.x+SDM.x, _pos.y+SDM.y);
    _Layer1.Camera.Position = Vector2D(_pos.x+SDM.x, _pos.y+SDM.y);
}

function AddNeuron(_x, _y)
{
    TableSynapse.Visible(0);
    var Neuron = new Wive2D.Neuron(countAdd, _Layer);
    Neuron.N2D.Name.text += countAdd++;
    Neuron.N2D.SetPosition((_x-_Layer.Camera.Position.x)/Wive2D.Zoom, (_y-_Layer.Camera.Position.y)/Wive2D.Zoom);
    Neuron.N2D.Node.SColor = "#FF0";
    AINeurons.push(Neuron);

    InputNameN.Set(Neuron.N2D.Name.text);
    switch(Neuron.Type)
    {
        case 'G': SelectType.Set(0); break;
        case 'O': SelectType.Set(1); break;
        case 'R': SelectType.Set(2); break;
    }

    SelectEvent.Set(Neuron.Event);

    InputLimit.Set(Neuron.Limit);
    TableNeuron.Visible(1);
};

function AddSynapse(_x, _y)
{
    TableNeuron.Visible(0);
    var Synapse = new Wive2D.Synapse(countAdd, 1, 1, _Layer1);
    Synapse.S2D.Name.text += countAdd++;
    Synapse.S2D.SetPosition((_x-_Layer.Camera.Position.x)/Wive2D.Zoom, (_y-_Layer.Camera.Position.y)/Wive2D.Zoom);
    Synapse.S2D.Node.SColor = "#FF0";
    AISynapses.push(Synapse);

    InputNameS.Set(Synapse.S2D.Name.text);
    InputPolarity.Set(Synapse.Polarity);
    InputDistance.Set(Synapse.Distance);
    TableSynapse.Visible(1);
};

function SelectNeuron(_id)
{
    if(_id == -1) return;

    TableSynapse.Visible(0);
    AINeurons[_id].N2D.Node.SColor = "#FF0";
    InputNameN.Set(AINeurons[_id].N2D.Name.text);
    switch(AINeurons[_id].Type)
    {
        case 'G': SelectType.Set(0); break;
        case 'O': SelectType.Set(1); break;
        case 'R': SelectType.Set(2); break;
    }

    SelectEvent.Set(AINeurons[_id]._Event);

    InputLimit.Set(AINeurons[_id].Limit);
    TableNeuron.Visible(1);

    var OPosition = AINeurons[_id].N2D.GetPosition();
    SDM = Vector2D(OPosition.x - Wive2D.Mouse.x, OPosition.y - Wive2D.Mouse.y); //дистанция от мыши до точки ( для правильного перемещения )
};

function MoveNeuron(_id, _pos)
{
    if(_id == -1) return;
    var CurrentPosition = Vector2D(_pos.x+SDM.x, _pos.y+SDM.y);
    AINeurons[_id].N2D.SetPosition(CurrentPosition.x, CurrentPosition.y);
};

function DeleteNeuron(_id)
{
     if(_id == -1) return;
     AINeurons[_id].Remove();
     delete AINeurons[_id];
     AINeurons.splice(_id, 1);
     TableNeuron.Visible(0);
     idSelected = -1;
}

function EventsNeurons()
{
    var ids = -1;
    for(var i = 0; i < AINeurons.length; i++)
        if(AINeurons[i].N2D.OnObject()) { ids = i; }
        else { AINeurons[i].N2D.Node.SColor = "#999"; }

    idSelected = ids;
    if(idSelected == -1) { TableNeuron.Visible(0); }
};

function SelectSynapse(_id)
{
    if(_id == -1) return;

    TableNeuron.Visible(0);
    var Synapse = AISynapses[_id];
    Synapse.S2D.Node.SColor = "#FF0";
    InputNameS.Set(Synapse.S2D.Name.text);
    InputPolarity.Set(Synapse.Polarity);
    InputDistance.Set(Synapse.Distance);
    TableSynapse.Visible(1);

    var OPosition = Synapse.S2D.GetPosition();
    SDM = Vector2D(OPosition.x - Wive2D.Mouse.x, OPosition.y - Wive2D.Mouse.y); //дистанция от мыши до точки ( для правильного перемещения )
};

 function MoveSynapse(_id, _pos)
 {
     if(_id == -1) return;
     var CurrentPosition = Vector2D(_pos.x+SDM.x, _pos.y+SDM.y);
     AISynapses[_id].S2D.SetPosition(CurrentPosition.x, CurrentPosition.y);
 }

 function DeleteSynapse(_id)
 {
    if(_id == -1) return;
     AISynapses[_id].Remove();
     delete AISynapses[_id];
     AISynapses.splice(_id, 1);
     TableSynapse.Visible(0);
     idSelectedS = -1;
 }

function EventsSynapse()
{
    var ids = -1;
    for(var i = 0; i < AISynapses.length; i++)
        if(AISynapses[i].S2D.OnObject()) { ids = i; }
        else { AISynapses[i].S2D.Node.SColor = "#999"; }

    idSelectedS = ids;
    if(idSelected == -1 && idSelectedS == -1) { TableSynapse.Visible(0); }
};

function Save(_name)
{
    $.ajax({type: "POST",
        url: "Save.php",
        data: {resave:1,name:_name,countN:AINeurons.length,countS:AISynapses.length,json:0},
        async: false});

    for(var i = 0; i < AINeurons.length; i++)
    {
        var str = JSON.stringify(AINeurons[i].object());
        $.ajax({type: "POST",
            url: "Save.php",
            data: {resave:0,name:_name,countN:0,countS:0,json:str},
            async: false});
    }

    for(var i = 0; i < AISynapses.length; i++)
    {
        var str = JSON.stringify(AISynapses[i].object());
        $.ajax({type: "POST",
            url: "Save.php",
            data: {resave:0,name:_name,countN:0,countS:0,json:str},
            async: false});
    }
}

function Load(_name)
{
    var Text = $.ajax({
        type: "POST",
        url: "Load.php",
        data: {name:_name},
        async: false
    }).responseText;

    eval(Text);

    for(var i = 0; i < _jsonN.length; i++)
    {
        AINeurons[i] = new Wive2D.Neuron(0, _Layer);
        AINeurons[i].copy(_jsonN[i]);
        if(_jsonN[i].id > countAdd) countAdd = _jsonN[i].id;
    }

    _jsonN.splice(0,_jsonN.length);

    for(var i = 0; i < _jsonS.length; i++)
    {
        AISynapses[i] = new Wive2D.Synapse(0, 1, 1, _Layer1);
        AISynapses[i].copy(_jsonS[i]);
        if(_jsonS[i].id > countAdd) countAdd = _jsonS[i].id;
        for(var j = 0; j < AINeurons.length; j++)
        {
            if(_jsonS[i].Neuron == AINeurons[j].id)
                AISynapses[i].JoinNeuron(AINeurons[j]);
            if(_jsonS[i].Akson == AINeurons[j].Akson.id)
                AISynapses[i].JoinAkson(AINeurons[j]);
        }
    }
    _jsonS.splice(0,_jsonS.length);
    countAdd++;
}
