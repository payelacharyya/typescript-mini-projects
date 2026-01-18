enum Strength {
    WEAK = "WEAK",
    MEDIUM = "MEDIUM",
    STRONG = "STRONG"
}

interface checkResult {
    strength : Strength;
    reasons : string[];
}
 function checkPassword(password: string): checkResult {
    const reasons : string[]=[];
    let score = 0;

//check the length of password

  if(password.length >= 8) {
    score ++;
    reasons.push("✔Password length is atleast 8 characters!")
  } else {
    reasons.push("❌Password length is not 8 characters!")
  }

  //check for numbers

  if (/\d/.test(password)) {
    score++;
    reasons.push("✔The password contains numbers!")
  } else{
    reasons.push("❌ The password doesn't contain any number!")
  }

//   check for uppercase characters

  if(/[A-Z]/.test(password)) {
    score++;
    reasons.push("✔The password has atleast 1 uppercase characters!")
  }else {
     reasons.push("❌The password don't have atleast 1 uppercase character!")
  }

// check for special characters

  if(/[^A-Za-z0-9]/.test(password)){
    score++;
    reasons.push("✔The password has atleast 1 special character!")
  }else {
     reasons.push("❌The password don't have atleast 1 special character!")
  }

  //determine the strength score
 let strength : Strength;
  if(score<=1) {
    strength = Strength.WEAK
  }
  else if (score <=3) {
     strength = Strength.MEDIUM
  }
  else {
     strength = Strength.STRONG
  }
    return {strength, reasons};
 }

 const password = process.argv[2];

 if (!password){
    console.log("No passsword")
    console.log ("Usage")
    console.log("  npx ts-node index.ts MyP@ssw0rd");
    process.exit(1);
 }
 const result =checkPassword(password);

 console.log(`password strength: ${result.strength}`);
 result.reasons.forEach(reason => console.log(reason));
 
