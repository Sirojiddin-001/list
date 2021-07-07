let firebaseConfig = {
  apiKey: "AIzaSyDbs1-8C6N2wnpda9FWTIzdSCiXjAuAEho",
  authDomain: "test-130f5.firebaseapp.com",
  databaseURL: "https://test-130f5-default-rtdb.firebaseio.com",
  projectId: "test-130f5",
  storageBucket: "test-130f5.appspot.com",
  messagingSenderId: "326851116449",
  appId: "1:326851116449:web:20ec1ad9be86347401dfe0",
};
firebase.initializeApp(firebaseConfig);

const list = document.getElementById("list");
const clear = document.getElementById("clear");

const setData = (index, text) => {
  firebase
    .database()
    .ref("list/" + index)
    .set(text);
};

const render = () => {
  list.innerHTML = "";
  let query = firebase.database().ref("list").orderByKey();
  query
    .once("value")
    .then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        let id = childSnapshot.key;
        let text = childSnapshot.val();
        list.insertAdjacentHTML(
          "beforeend",
          `<li>
         <div class="uk-inline uk-width-1-1">
            <span data-id="${id}" class="uk-form-icon">${id}</span>
            <input data-id="${id}" onchange="setData(${id},this.value)" class="uk-input" type="number" value="${text}">
         </div>
         </li>`
        );
      });
    })
    .then(() => {
      for (let i = 0; i < 20; i++) {
        let items = firebase.database().ref(`list/${i + 1}`);
        items.on("value", (snapshot) => {
          let data = snapshot.val();
          document.querySelector(`input[data-id='${i + 1}']`).value = data;
        });
      }
    });
};

render();

clear.addEventListener("click", () => {
  for (let i = 0; i < 20; i++) {
    setData(i + 1, "");
  }
  render();
});
