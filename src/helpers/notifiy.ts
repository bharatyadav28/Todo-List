function notifyMe() {
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    const notification = new Notification("Hi there!", {
      body: "You have some pending todos",
    });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        const notification = new Notification("Hi there!", {
          body: "You have some pending todos",
        });
      }
    });
  } else {
    const notification = new Notification("Hi there!", {
      body: "You have some pending todos",
    });
  }
}

const notification = () => {
  const now = new Date();
  const targetTime = new Date(now);
  targetTime.setHours(19, 3, 0, 0); // Set the target time to 18:00:00.000

  let timeUntilTarget = targetTime.getTime() - now.getTime();

  // If the target time has already passed for today, set it for tomorrow
  if (timeUntilTarget < 0) {
    targetTime.setDate(targetTime.getDate() + 1);
    timeUntilTarget = targetTime.getTime() - now.getTime();
  }

  // Set a timeout to run your function at the specified time
  const timeoutId = setTimeout(() => {
    notifyMe();
    const nextDay = new Date(now);
    nextDay.setDate(nextDay.getDate() + 1);
    nextDay.setHours(18, 0, 0, 0);

    const timeUntilNextDay = nextDay.getTime() - now.getTime();
    setTimeout(() => {
      // Call the function again for the next day
      notifyMe();
      // ... your function code ...

      // Repeat the process for the day after and so on...
    }, timeUntilNextDay);
  }, timeUntilTarget);

  return timeoutId;
};

export default notification;
