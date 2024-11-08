function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    document.getElementById('hrs').textContent = String(hours).padStart(2, '0');
    document.getElementById('mins').textContent = String(minutes).padStart(2, '0');
    document.getElementById('secs').textContent = String(seconds).padStart(2, '0');
    document.getElementById('ampm').textContent = ampm;
    const hourOffset = 440 - (440 * hours) / 12;
    const minuteOffset = 440 - (440 * minutes) / 60;
    const secondOffset = 440 - (440 * seconds) / 60;
    document.getElementById('hh').style.strokeDashoffset = hourOffset;
    document.getElementById('mm').style.strokeDashoffset = minuteOffset;
    document.getElementById('ss').style.strokeDashoffset = secondOffset;
    setTimeout(updateClock, 1000);
}

updateClock();
