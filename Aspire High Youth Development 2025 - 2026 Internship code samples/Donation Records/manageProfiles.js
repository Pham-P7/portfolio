function onOpen() {
  const donorProfiles = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet(); //bound to donation profiles
  const fileName = "Donation History";
  const files = DriveApp.getFilesByName(fileName);
  let spreadsheet = null;
  const file = files.next();
  const spreadsheetId = file.getId();
  spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  var donorHistory = spreadsheet.getSheetByName("Sheet1");
  var range = donorHistory.getRange("A2:I" + donorHistory.getLastRow()).sort([{column: 3, accending: true}, {column:4, accending: true}]).getValues();
  var profileNames = donorProfiles.getRange("A2:A" + donorProfiles.getLastRow()).getValues().flat(); //pulls each name and flattens it into a 1d array from donor profiles
  var names = [];
  for(var i = 0; i < donorHistory.getLastRow() - 1;i++){
      var name = range[i][2] + " " + range[i][3];
      if(name == " "){
        continue;
      }
      var email = range[i][4];
      var donations = range[i][1];

    for(var x = i + 1; x < donorHistory.getLastRow() - 1; x++){
      if(range[x][2] + " " + range[x][3] == name){
        donations += range[x][1];
        i = x;
      }
      else{
        break;
      }
    }
    var level; //temp level names and values
    if(donations > 500){
      level = "highest";
    }
    else if(donations > 250){
      level = "2nd highest";
    }
    else if(donations > 50){
      level = "3rd highest";
    }
    else{
      level = "general member";
    }
    names.push({person: name, contact: email, amount: donations, membership: level});
  }

  for(var i = 0;i < names.length;i++){
    //donorName = range[i][2] + " " +  range[i][3];
    //names.push(donorName);
    var indexToRow = i + 2; //accounts for donor profiles rows starting on 2
    if(!profileNames.includes(names[i].person)){
      donorProfiles.insertRowAfter(indexToRow - 1);
    }
      donorProfiles.getRange("A" + indexToRow).setValue(names[i].person);
      donorProfiles.getRange("B" + indexToRow).setValue(names[i].contact);
      donorProfiles.getRange("C" + indexToRow).setValue(names[i].amount);
      if(donorProfiles.getRange("D" + indexToRow).getValue !== names[i].membership){
        donorProfiles.getRange("D" + indexToRow).setValue(names[i].membership);
        newMember(names[i].person,names[i].contact,names[i].membership);
      }
  }
  donorProfiles.getRange("A2:D" + donorProfiles.getLastRow()).sort([{column: 1, accending: true}]);
}
