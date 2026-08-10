function updateCatalog() {
  var form = FormApp.openById('1gqS-jitueOAPMPVXNw3PL2evCwjRUSPPZUTZGkF4LAE'); //bind catalog form

  const catalog = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Item Catalog"); //bind catalog form
  catalog.getRange("A2:C" + catalog.getLastRow()).sort([{column: 2, accending: true},{column: 1, accending: true}]); //sort by points then alphabet
  var items = form.getItems()[3].asCheckboxItem();
  var choices = [];
  for(var i = 2; i < catalog.getLastRow(); i++){
    if(catalog.getRange("C" + i).getValue() != 0){
      choices.push(catalog.getRange("A" + i).getValue() + " cost: " + catalog.getRange("B" + i).getValue());
    }
  }
  console.log(choices);
  items.setChoiceValues([""]); //wipes out previous values
  items.setChoiceValues(choices);
}
