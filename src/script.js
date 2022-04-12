const AES  =  require('./Aes');
const { EncryptData } = require('./rsa');

const textToEncode = "Linear Programming (LP) or Linear Optimization can be defined as a problem of maximizing or minimizing a linear function subject to linear constraints. Constraints can be equality or inequality. Optimization problems include profit and loss calculations. Linear programming problems are an important type of optimization problem that helps you find the possible region and optimize the solution to obtain the maximum or minimum value of a function.In other words, linear programming is considered as an optimization method to maximize or minimize the objective function of a given mathematical model given a given set of requirements represented in linear relations. The main goal of a linear programming problem is to find the optimal solution. Linear programming is a method of looking at the various inequalities relevant to a situation and calculating the best value to be obtained under those conditions. Some assumptions to be made when working with linear programming are LP techniques allow HR managers to deal with issues related to the recruitment, selection, training, and deployment of a workforce in different parts of the company. It is also used to determine the minimum number of employees required in different shifts to meet scheduled production schedules";
const encryptedMessage = AES.AesDataEncrypt(textToEncode);


const JSON_DATA = {

    encryptedMessage: encryptedMessage,
    encryptedKey: AES.encryptedKey
}



/* TODO:
    Set  Receiver side decryption,
    Create Design & Frontend end for User Interface
    Develop Backend for duplex communication between client and Server

*/ 