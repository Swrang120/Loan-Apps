const screens=[...document.querySelectorAll('.screen')];
let current=0;
const $=id=>document.getElementById(id);
function show(i){current=i;screens.forEach((s,n)=>s.classList.toggle('active',n===i));$('backBtn').hidden=i===0}
function validMobile(v){return /^\d{10}$/.test(v)}

$('sendOtp').onclick=()=>{
  if(!validMobile($('mobile').value)){alert('Please enter a valid 10-digit mobile number.');return}
  const otp=String(Math.floor(100000+Math.random()*900000));
  $('demoOtp').textContent=otp;
  sessionStorage.setItem('testOtp',otp);
  show(1);
};

$('verifyOtp').onclick=()=>{
  if($('otp').value!==sessionStorage.getItem('testOtp')){alert('Incorrect test OTP.');return}
  show(2);
};

$('kycNext').onclick=()=>{
  const pan=$('panTest').value.trim().toUpperCase();
  const aadhaar=$('aadhaarTest').value.trim();
  const panName=$('panName').value.trim().replace(/\s+/g,' ').toUpperCase();
  const aadhaarName=$('aadhaarName').value.trim().replace(/\s+/g,' ').toUpperCase();
  const panDob=$('panDob').value;
  const aadhaarDob=$('aadhaarDob').value;
  if(!/^[A-Z]{5}\d{4}[A-Z]$/.test(pan)||!/^[0-9]{12}$/.test(aadhaar)||!panName||!aadhaarName||!panDob||!aadhaarDob){
    alert('Complete the fictional PAN and Aadhaar test details, including name and date of birth.');
    return;
  }
  if(panName!==aadhaarName){
    alert('KYC failed: PAN name and Aadhaar name do not match.');
    return;
  }
  if(panDob!==aadhaarDob){
    alert('KYC failed: PAN date of birth and Aadhaar date of birth do not match.');
    return;
  }
  $('faceStatus').textContent='Test match';
  $('kycResult').hidden=false;
  show(3);
};

$('bankNext').onclick=()=>{
  if(!$('bankName').value.trim()||$('account').value!==$('account2').value||!$('account').value){
    alert('Please complete the test bank fields and make sure the account numbers match.');
    return;
  }
  show(4);
};

$('basicNext').onclick=()=>{
  if(!$('fullName').value.trim()||!$('income').value||!validMobile($('contact1').value)||!validMobile($('contact2').value)){
    alert('Please complete the required basic information using test values.');
    return;
  }
  show(5);
};

$('apply').onclick=()=>{
  const n=Number($('amount').value);
  if(!Number.isFinite(n)||n<20000||n>1000000){
    alert('Loan amount must be between ₹20,000 and ₹10,00,000 in this prototype.');
    return;
  }
  show(6);
};

$('fee1').onclick=()=>show(7);
$('fee2').onclick=()=>show(8);

$('adminApprove').onclick=()=>{
  $('reviewStep').textContent='Admin review completed';
  $('reviewStep').className='done';
  $('successStep').textContent='Prototype approval successful';
  $('successStep').className='done';
  $('approved').hidden=false;
  $('adminApprove').disabled=true;
  $('adminApprove').textContent='Approved';
};

$('restart').onclick=()=>location.reload();
$('backBtn').onclick=()=>show(Math.max(0,current-1));
show(0);