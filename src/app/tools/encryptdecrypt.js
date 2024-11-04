import crypto from "crypto";

const key = Buffer.from("jan2Z1rlb6fWRQ7mzYY8KS0FPeoY8vX1", "utf8");
const iv = Buffer.from("gxt2Qxl8au90Ob85", "utf8");

export const decryptData = (encryptedData) => {
   const algorithm = "aes-256-cbc";
   let decrypted = "";
   try {
      let decipher = crypto.createDecipheriv(algorithm, key, iv);
      decrypted = decipher.update(encryptedData, "base64", "utf8");
      decrypted += decipher.final("utf8");
   } catch (error) {
      console.error("Decryption failed:", error);
   }
   return decrypted;
};

const key2 = Buffer.from("1IvrK7MlN0zOmCVr5prnQ4ssLgnBza2Q");
const iv2 = Buffer.from("PIGvFDztzpE1HcqI");

export const encryptData = (text) => {
   let cipher = crypto.createCipheriv("aes-256-cbc", key2, iv2);
   let encrypted = cipher.update(text);
   encrypted = Buffer.concat([encrypted, cipher.final()]);
   return encrypted.toString("base64");
};
