function findZip(){
  const folderID = "removedForGithubVersion"; //censored google drive folder ID
  var parentFolder = DriveApp.getFolderById(folderID);
  var childZips = parentFolder.getFiles(); //get all the zip files
  var newestDate = 0;
  var newest = null;

  while(childZips.hasNext()){
    let zip = childZips.next();
    const lastUpdated = zip.getLastUpdated().getTime(); // Get timestamp

    if (lastUpdated > newestDate) {
      newestDate = lastUpdated;
      newest = zip;
    }
  }
  fileBlob = newest.getBlob();
  fileBlob.setContentType("application/zip");
  var blobs = Utilities.unzip(fileBlob);
  return blobs;
}

function sendEmails() {
  const donorProfiles = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet(); //bound to donation profiles
  var profileNames = donorProfiles.getRange("A2:B" + donorProfiles.getLastRow()).getValues(); //pulls each name and email into a 2d array

  const today = new Date();
  var subject = "(name removed for github) monthly newsletter for " + today.toLocaleString('default', { month: 'long' }) + ", " + today.getFullYear();
  var textBody = "";
  var template = HtmlService.createTemplateFromFile('emailBody');

  var blobs = findZip();

  template.page1 = Utilities.base64Encode(blobs[0].getBytes());
  template.page2 = Utilities.base64Encode(blobs[1].getBytes());
  template.page3 = Utilities.base64Encode(blobs[2].getBytes());
  template.page4 = Utilities.base64Encode(blobs[3].getBytes());

  for(var i = 0;i < profileNames.length;i++){
    var email = {
      name: profileNames[i][0],
      email: profileNames[i][1]
    }
    if(email.name == " " || email.email == ""){ //cleaning check
      continue;
    }
    template.name = email.name;
    var htmlBody = template.evaluate().getContent();
    try{
      GmailApp.sendEmail(email.email, subject, textBody, {from: "donors.relations@(name removed for github).org",  htmlBody: htmlBody}); 
    }
    catch{
      continue;
    }
  }
}
