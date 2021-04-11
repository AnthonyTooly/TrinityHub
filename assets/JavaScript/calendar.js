
function openModal(date) {
  clicked = date;
    bookingMessage.innerText="New booking on "+clicked;
    newEventModal.style.display = 'block';
    var dataTrans={"date":clicked};
    $.ajax({
      url:"/getBooking",
      type:"POST",
      data:{}
    }).done(function(result){
      for(var i=0; i<result.length;i++){
        $("#roomsInput").append(`<option value="${result[i].room_name}">${result[i].room_name}</option>`);
      }
    })
    $.ajax({
      url:"/validBooking",
      type: "POST",
      data:dataTrans
    }).done(function(result){
      for(var i=0; i<result.length;i++){
       $("#roomsInput").find('option[value="'+result[i].room_name+'"]').remove();
      }
    })
  backDrop.style.display = 'block';
}

function load() {
  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();
  premonth=month+1;
  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  var paddingDays;
  if(weekdays.indexOf(dateString.split(', ')[0])==7){
        paddingDays=0;
  }else{
      paddingDays=weekdays.indexOf(dateString.split(', ')[0]);
  }

  document.getElementById('monthDisplay').innerText = 
    `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

  calendar.innerHTML = '';

  for(let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');
    const dayString = `${month + 1}/${i - paddingDays}/${year}`;
    var dateInput0;
    if(month+1<10){
      if(i-paddingDays<10){
        dateInput0={date:`${year}-${0}${month+1}-${0}${i-paddingDays}`};
      }else{
        dateInput0={date:`${year}-${0}${month+1}-${i-paddingDays}`};
      }
    }else if(i-paddingDays<10){
      dateInput0={date:`${year}-${month+1}-${0}${i-paddingDays}`};
    }else{
      dateInput0={date:`${year}-${month+1}-${i-paddingDays}`};
    }
    const dateInput=dateInput0;
    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;

      if (i - paddingDays === day && nav === 0) {
        daySquare.classList.add('currentDay');
      }
      $.ajax({
        url:"/validBooking",
        type: "POST",
        data:dateInput
      }).done(function(result){
        if(result!="None"){
          daySquare.id=i-paddingDays;
          daySquare.addEventListener('click', () => openModal(dateInput.date));
        } else{
          daySquare.classList.add('padding');
        }
      })
    } else {
      daySquare.classList.add('padding');
    }
    calendar.appendChild(daySquare);    
    
  }
}

function closeModal() {
  if($("#roomsInput option").length<1){
    var check=parseInt(clicked[8]+clicked[9]);
    console.log(check);
    document.getElementById(check).classList.add('padding');
    console.log(document.getElementById(check).classList);
    document.getElementById(check).removeEventListener('click', () => openModal(dateInput.date));
  }
  $('#roomsInput').empty();
  newEventModal.style.display = 'none';
  deleteEventModal.style.display = 'none';
  backDrop.style.display = 'none';
  roomsInput.value = '';
  message.text='';
  clicked = null;
  
}

function saveBooking(){
  var date = bookingMessage.innerText;
  var temp = "New booking on ";
  date=date.substring(temp.length);
  var name=$("#username").text();
  name=name.substring("Username:   ".length);
  var room=$("#roomsInput option:selected").text();
  console.log(room);
  dataTrans={date:date,room:room,name:name};
  $.ajax({
    url:"/makeBooking",
    type: "POST",
    data:dataTrans
  }).done(function(result){
  })
  openModal(date);
  closeModal();
}



function initButtons() {
  document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    load();
  });

  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    load();
  });

  document.getElementById('saveButton').addEventListener('click', saveBooking);
  document.getElementById('cancelButton').addEventListener('click', closeModal);
  document.getElementById('closeButton').addEventListener('click', closeModal);
}
let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const bookingMessage = document.getElementById('bookingMessage')
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const message = document.getElementById('Message');
const roomsInput = document.querySelector('#roomsInput');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var premonth;
initButtons();
load();

