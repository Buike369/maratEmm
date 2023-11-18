const express = require('express')
const nodemailer = require('nodemailer');
const { EMAIL, PASSWORD } = require("../env.js")
var validator = require("email-validator");

const formSubmit = async (req, res) => {

    // console.log(req.body)
    try {

        const { firstName, lastName, email,message} = req.body;


        const externalData = {

            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "message": message,
        
    
        }

        // console.log(externalData)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: EMAIL,
                pass: PASSWORD
            }
        });

        const mailOptions = {
            from: 'MaratB Technology',
            to: 'chukwubuikekingsley369@gmail.com',
            subject: 'Message From Marat Website ',
            html: `<html>
                      <body>
                          <h2 style="font-size:18px;font-weight:600;color:#000">MaratB Technology</h2>
                          <table style="border-collapse: collapse; width: 100%;">
                              <tr>
                                  <th style="border: 1px solid black; padding: 8px; text-align: left; background-color: #f2f2f2;">Field</th>
                                  <th style="border: 1px solid black; padding: 8px; text-align: left; background-color: #f2f2f2;">Value</th>
                              </tr>
                              ${Object.entries(externalData).map(([field, value]) => `
                                  <tr>
                                      <td style="border: 1px solid black; padding: 8px; text-align: left;">${field}</td>
                                      <td style="border: 1px solid black; padding: 8px; text-align: left;">${value}</td>
                                  </tr>
                              `).join('')}
                          </table>
                      </body>
                  </html>`,
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({
            message: 'Successfully submitted the form',
            data: {
                data: externalData
            }
        });

    } catch (err) {

        console.log(err);
        res.status(500).json({
            status: 'fail',
            error: err.message,
        });
    }
};








module.exports = { formSubmit }