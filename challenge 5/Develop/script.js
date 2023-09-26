$(function () {
  // Constants for weekdays and time range
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const currentHour = dayjs().hour();
  
  // Set the current day and date in the header
  $("#currentDay").text(dayjs().format('dddd, MMMM D, YYYY'));

  weekdays.forEach((day, idx) => {
      const dateForWeekday = dayjs().startOf('week').add(idx + 1, 'day');  // +1 because dayjs starts the week on Sunday

      const dayHeader = $("<h3>").text(`${day}, ${dateForWeekday.format('MMMM D, YYYY')}`);
      $("#time-blocks-container").append(dayHeader);

      for (let hour = 9; hour <= 17; hour++) {
          // Create time block dynamically
          const timeBlock = $("<div>").attr("id", `hour-${hour}-${day}`).addClass("row time-block");
          $("#time-blocks-container").append(timeBlock);

          const hourLabel = $("<div>").addClass("col-2 col-md-1 hour text-center py-3").text(hour <= 11 ? `${hour}AM` : hour === 12 ? "12PM" : `${hour - 12}PM`);
          timeBlock.append(hourLabel);

          const eventTextArea = $("<textarea>").addClass("col-8 col-md-10 description").val(localStorage.getItem(`event-${hour}-${day}`) || "");
          if (hour < currentHour) {
              eventTextArea.addClass("past");
          } else if (hour === currentHour) {
              eventTextArea.addClass("present");
          } else {
              eventTextArea.addClass("future");
          }
          timeBlock.append(eventTextArea);

          const saveButton = $("<button>").addClass("btn saveBtn col-2 col-md-1").html('<i class="fas fa-save"></i>').on("click", function() {
              const eventText = eventTextArea.val();
              localStorage.setItem(`event-${hour}-${day}`, eventText);
          });
          timeBlock.append(saveButton);
      }
  });
});

//code repeats one day not different days for example tomorrow should be all green
