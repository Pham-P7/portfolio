function newMember(name, address, membership) {
  var subject = "(name removed) membership congratulations";
  var textBody = "";
  var template = HtmlService.createTemplateFromFile('membership email');
  template.name = name;
  template.status = membership;
  var htmlBody = template.evaluate().getContent();
  try{
    GmailApp.sendEmail(address, subject, textBody, {from: "donors.relations@(name removed).org",  htmlBody: htmlBody}); 
  }
  catch{
  }
}
