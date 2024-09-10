export function extractTime(dateString){
    const date = new Date(dateString);
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", 
                    "July", "Aug", "Sept", "October", "November", "December"];

    // Extract day, month, and year
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    // Format the date
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return `${formattedDate} ${hours}:${minutes}`;

}
function padZero(number){
    return number.toString().padStart(2,"0");
}