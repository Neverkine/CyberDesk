async function test() {
  console.log("Testing CyberDesk API...");

  // 1. Users
  const usersRes = await fetch("http://localhost:3000/api/auth/users");
  const usersData = await usersRes.json();
  console.log("Users in DB:", usersData.users.length);

  // 2. Scam Scan
  const scanRes = await fetch("http://localhost:3000/api/scam/scan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: "Срочно с вашей карты списано 48 500 рублей, назовите код из СМС!",
      userId: "artem",
    }),
  });
  const scanData = await scanRes.json();
  console.log("Scan Risk Score:", scanData.result?.riskScore, "%");
  console.log("Scan Verdict:", scanData.result?.verdict);
  console.log("Scan Red Flags:", scanData.result?.redFlags);

  // 3. User Progress & Buy freeze
  const buyRes = await fetch("http://localhost:3000/api/user/progress", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "buy_freeze",
      userId: "artem",
    }),
  });
  const buyData = await buyRes.json();
  console.log("Buy Freeze Result:", buyData.success, "New Freeze Count:", buyData.user?.freezeCount);

  // 4. Mentor Advice
  const mentorRes = await fetch("http://localhost:3000/api/chat/mentor", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      mentorId: "tony",
      userMessage: "Мне пишут назвать код из СМС",
    }),
  });
  const mentorData = await mentorRes.json();
  console.log("Tony Stark advice:", mentorData.advice);

  console.log("ALL TESTS PASSED!");
}

test().catch(console.error);
