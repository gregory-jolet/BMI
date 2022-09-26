const BMIData = [
  { name: "Maigreur", color: "midnightblue", range: [0, 18.5] },
  { name: "Bonne santé", color: "green", range: [18.5, 25] },
  { name: "Surpoids", color: "lightcoral", range: [25, 30] },
  { name: "Obésité modérée", color: "orange", range: [30, 35] },
  { name: "Obésité sévère", color: "crimson", range: [35, 40] },
  { name: "Obésité morbide", color: "purple", range: 40 },
];

// IMC = poids en kg / taille² en m

const submit = document.querySelector("form button");

// event sur le button du form
submit.addEventListener("click", handleForm);

function handleForm(e) {
  // methode pour prévenir le comportement
  e.preventDefault(e);

  calculBMI();
}

const values = document.querySelectorAll("input");

// calcul de l'IMC
function calculBMI() {
  const heigth = values[0].value;
  const weigth = values[1].value;

  // if valeurs falsy ou <= 0, return true et affiche une erreur
  if (!heigth || !weigth || heigth <= 0 || weigth <= 0) {
    handleError();
    return;
  }

  const BMI = (weigth / Math.pow(heigth / 100, 2)).toFixed(1);

  showResult(BMI);
}

const result = document.querySelector(".result #result");
const message = document.querySelector(".result #message");

// crétion de l'erreur
function handleError() {
  result.textContent = "Erreur !";
  result.style.color = "inherit";
  message.textContent = "Veuillez remplir correctement les champs !";
}

// Affichage du résultat
function showResult(BMI) {
  const rank = BMIData.find((data) => {
    // condition suivant la valeur data'entrée
    if (BMI >= data.range[0] && BMI < data.range[1]) return data;
    else if (typeof data.range === "number" && BMI >= data.range) return data;
  });

  result.textContent = BMI;
  result.style.color = `${rank.color}`;
  if (rank.name === "Maigreur")
    return (message.textContent = `Vous souffrez de : ${rank.name}`);
  message.textContent = `Vous êtes en : ${rank.name}`;
}
