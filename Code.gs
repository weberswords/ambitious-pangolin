  //add menu
function onInstall(e) {
  onOpen(e);
}

function onOpen(e) {
  var ui = DocumentApp.getUi();
  // Or DocumentApp or FormApp.
  ui.createMenu('TA by IH')
      .addItem('Send to Calendar', 'checkCalForExistingDoc')
      .addToUi();
}

function getDocumentInfo() {
  var title = DocumentApp.getActiveDocument().getName();
  var description = DocumentApp.getActiveDocument().getUrl();
  var info = {'title': title, 'description':description}
  return info;
}

function checkCalForExistingDoc() {
  var ui = DocumentApp.getUi();
  var title = DocumentApp.getActiveDocument().getName();
  var eventsToday = CalendarApp.getEventsForDay(new Date());
  for (i = 0; i < eventsToday.length; i++) { 
    if (eventsToday[i].getTitle() == title) {
      var response = ui.alert('Add Event to Calendar', 'That event exists already. Would you like to add this event anyway?', ui.ButtonSet.YES_NO);
        if (response == ui.Button.YES) {
          sendToCal();
        } 
    } 
  }
}

function sendToCal() {
  var info = getDocumentInfo();
  CalendarApp.getDefaultCalendar().createAllDayEvent(info['title'], new Date(), {'description': info['description']});
  DocumentApp.getUi() // Or DocumentApp or FormApp.
     .alert('Sent to calendar!');
}