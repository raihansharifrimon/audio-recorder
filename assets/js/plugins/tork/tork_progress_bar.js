/*
this function receive a object must be property name will be: progressClass: '.className'

*/

function intializeTorkProgressBar(params) {
  const progress = document.querySelectorAll(params.progressClass);

  for (let i = 0; i < progress.length; i++) {
    progress[i].style.width = progress[i].getAttribute("data-done");
  }
}
