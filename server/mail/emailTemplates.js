const verificationTemplate = ({ username, verificationToken }) =>
  `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="style.css" />
  <title>Verification Email</title>
</head>

<body>
  <div style="margin:0;padding:2rem">
    <h1 style="color:blue">Email verification</h1>
    <div style="font-size:1.1rem;letter-spacing:1px;line-height:120%">
      <p>Dear <span style="color:blue">${username}</span>:</p>
      <p>
        Thank you for joining us, you are almost there please help us to complete your verification by enter this code to comfirm.
        <p><span style="color:red">Important:</span> this code will be expired within 5 minitues so make sure to use it before that<p/>
      </p>
        <div style="background:blue;color:white;font-size:2rem;padding:2rem;border-radius:.2rem;text-align:center">${verificationToken}</div>
    </div>
  </div>
</body>

</html>
  `;
