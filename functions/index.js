// Firebase User ID and Battalion ID
const userId = firebase.auth().currentUser.uid; // Get the currently signed-in user's ID
const battalionId = "battalion1"; // Replace with your battalion document ID

// Update Completed Count
function updateCompletedCount(newCount) {
  const battalionRef = firebase.firestore().collection("battalions").doc(battalionId);

  // Update the user's count and recalculate the total
  firebase.firestore().runTransaction(async (transaction) => {
    const battalionDoc = await transaction.get(battalionRef);
    if (!battalionDoc.exists) {
      throw new Error("Battalion does not exist!");
    }

    const users = battalionDoc.data().users || {};
    users[userId] = newCount; // Update the user's count

    // Calculate the new total
    const totalNames = Object.values(users).reduce((sum, count) => sum + count, 0);

    transaction.update(battalionRef, { users, totalNames });
  })
    .then(() => {
      console.log("User count and battalion total updated successfully!");
    })
    .catch((error) => {
      console.error("Error updating battalion totals:", error);
    });
}

// Register Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker registered:", registration);
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}
