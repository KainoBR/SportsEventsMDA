function datepicker(){
  let now = new Date;
  let maxDateLimit = new Date;
  maxDateLimit.setFullYear(now.getFullYear() + 1);
  maxDateLimit.setMonth(now.getMonth() + 6);
  $('input[name="date_"]').daterangepicker({
    singleDatePicker: true,
    timePicker: true,
    timePicker24Hour: true,
    minDate: now,
    maxDate: maxDateLimit,
    locale: {
      format: 'DD/MM/YYYY hh:mm'
    }
  });
}