const bcrypt = require('bcryptjs');

const doHashing = async () => {
    const password = "lancef1";
    const hashedPassword = await bcrypt.hash(password, 8); //8 Incdicates the no of rounds hashalgorith will run, 8 is recomonded value
    console.log(password);
    console.log(hashedPassword);

    //Compare the matching
    const isMatch = await bcrypt.compare(password, hashedPassword);
    console.log("isMatched: ", isMatch);
}

doHashing();

/*
NOTE:
Encryption: We can derypt the orginal value; A->(Encryption)-> khdwuehwe ->(Decryption) -> A
Hashing: Its a one way process. We can not restore the orginal from hashed value.
A -> (Hashed) -> wejfioewfjoirfioef
*/