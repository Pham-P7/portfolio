function updateVolunteers() {
  const responses = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Volunteer Signups"); //binds responses form
  const volunteerHours = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("volunteer hours");
  const sortRules = [{column: 1, accending: true},{column: 2, accending: true}];
  for(var i = 0; i < 26; i++){
    sortRules.push({column: i + 3, accending: false});
  }
  console.log(responses.getLastRow());
  const range = responses.getRange("A2:AB" + responses.getLastRow()).sort(sortRules).getValues();
  const volunteers = volunteerHours.getRange("A2:A" + volunteerHours.getLastRow()).getValues().flat(); //flat array of volunteer names 
  var names = [];
  for(var i = 0; i < responses.getLastRow() - 1;i++){
    var name = range[i][1];
    var university = range[i][3];
    var email = range[i][4];
    var phone = range[i][6].toString().replace(/\D/g, "");

    var org = range[i][12];
    if(org != ""){
      if(org.toString().split(/\s+/).length != 3){
        org = translate(org); 
        console.log(org);
        responses.getRange("M" + (i + 2)).setValue(org);
        }
    }

    var hours = 0;
    for(var x = i; x < responses.getLastRow() - 1; x++){
      if(range[x][1] == ""){
        return;
      }
      if(range[x][1] == name){
        hours += 8; //8 hours per event
        i = x;
      }
      else{
        break;
      }
    }
    var level; //temp level names and values
    if(hours > (8 * 4)){
      level = "renound volunteer";
    }
    else if(hours > (8 * 2)){
      level = "reoccuring volunteer";
    }
    else{
      level = "new volunteer";
    }
    names.push({name: name, email: email, phone: phone, hours: hours, university: university, greek: org, tier: level});
  }

  for(var i = 0;i < names.length;i++){
    var indexToRow = i + 2; //accounts for donor profiles rows starting on 2
    if(!volunteers.includes(names[i].name)){
      volunteerHours.insertRowAfter(indexToRow - 1);
    }
      const newPoints = volunteerHours.getRange("D" + indexToRow).getValue() - names[i].hours;
      volunteerHours.getRange("A" + indexToRow).setValue(names[i].name);
      volunteerHours.getRange("B" + indexToRow).setValue(names[i].email);
      volunteerHours.getRange("C" + indexToRow).setValue(names[i].phone);
      volunteerHours.getRange("D" + indexToRow).setValue(names[i].hours);
      volunteerHours.getRange("E" + indexToRow).setValue(names[i].university);
      volunteerHours.getRange("F" + indexToRow).setValue(names[i].greek);
      volunteerHours.getRange("G" + indexToRow).setValue(names[i].tier);
      volunteerHours.getRange("H" + indexToRow).setValue(volunteerHours.getRange("H" + indexToRow).getValue() + newPoints);
  }
}

function translate(org){
  const greekLetters = ["alpha","beta","chi","delta","epsilon","gamma","zeta","eta","theta","iota","kappa","lambda","mu","nu","xi","omicron","pi","rho","sigma","tau","upsilon","phi","psi","omega"];
  const split = org.split(/\s+/);
  var count = 0;

  for(var i = 0; i < split.length; i++){
    if(greekLetters.includes(split[i].toString().toLowerCase())){
      count++;
    }
    else{
      count = 0;
    }
    if(count == 3){
      return split[i - 2] + " " + split[i - 1] + " "  +split[i];
    }
  }
  return "";
}