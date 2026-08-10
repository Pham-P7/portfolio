function processOrders() {
  const catalogOrders = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Orders");
  const catalog = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Item Catalog");
  const name = catalogOrders.getRange("C" + catalogOrders.getLastRow()).getValue(); //get most recent order name
  const order = catalogOrders.getRange("D" + catalogOrders.getLastRow()).getValue().toString().split(","); //get most recent order details
  var cost = 0;
  for(var i = 0; i < order.length; i++){
    cost += +order[i].substring(order[i].indexOf(":") + 1);
  }
  console.log(cost);
  const volunteerHours = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("volunteer hours");
  for(var i = 2; i < volunteerHours.getLastRow(); i++){
    if(volunteerHours.getRange("A" + i).getValue() == name){ 
      if(volunteerHours.getRange("H" + i).getValue() >= cost){
        volunteerHours.getRange("H" + i).setValue(volunteerHours.getRange("H" + i).getValue() - cost);
        //update catalog stock
        //email new order alert to the (volunteer/whatever is responcible) department

        return;
      }
      else{
        //not enough points, email the volunteer
        return;
      }
    }
  }
  //error name not found, email the volunteer
  return;
}
