function format_date_type_a(response_String) {
    const date = new Date(response_String);
    const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits with leading zero
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure two digits with leading zero
    const year = String(date.getMonth() + 1).padStart(2, '0'); // Ensure two digits with leading zero
    return `${day}-${month}-${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
 }





 function format_date_type_c(inputDate) {
    const [dd, mm, yyyy,hh, min, sec] = inputDate.split('-');
    const formattedDate = `${dd}-${mm}-${yyyy} ${hh}:${min}`;
    return formattedDate;
  }
  









export { format_date_type_a ,format_date_type_c};