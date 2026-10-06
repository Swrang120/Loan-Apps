const screens=[...document.querySelectorAll('.screen')];
let current=0;
const STORAGE_KEY='apnaSathiPrototypeApplication';
const $=id=>document.getElementById(id);

function show(i){
  current=i;
  screens.forEach((s,n)=>s.classList.toggle('active',n===i));
  $('backBtn').hidden=i===0;
  window.scrollTo({top:0,behavior:'smooth'});
}

function validMobile(v){return /^[0-9]{10}$/.test(String(v||''))}
function toast(message){
  const el=$('toast');
  el.textContent=message;
  el.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer=setTimeout(()=>el.classList.remove('show'),2600);
}

function saveApplication(){
  const data={
    mobile:$('mobile').value.trim(),
    kyc:{
      pan:$('panTest').value.trim().toUpperCase(),
      panName:$('panName').value.trim(),
      panDob:$('panDob').value,
      aadhaar:$('aadhaarTest').value.trim(),
      aadhaarName:$('aadhaarName').value.trim(),
      aadhaarDob:$('aadhaarDob').value,
      faceStatus:$('faceStatus').textContent
    },
    bank:{bankName:$('bankName').value.trim(),account:$('account').value.trim()},
    profile:{
      fullName:$('fullName').value.trim(),marital:$('marital').value,
      education:$('education').value.trim(),work:$('work').value.trim(),
      income:$('income').value.trim(),contact1:$('contact1').value.trim(),
      contact2:$('contact2').value.trim()
    },
    loanAmount:Number($('amount').value),
    updatedAt:new Date().toISOString()
  };
  localStorage.setItem(STORAGE_KEY,JSON.stringify(data));
  return data;
}

function loadApplication(){
  try{
    const data=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');
    if(!data)return;
    $('mobile').value=data.mobile||'';
    if(data.kyc){
      $('panTest').value=data.kyc.pan||'';
      $('panName').value=data.kyc.panName||'';
      $('panDob').value=data.kyc.panDob||'';
      $('aadhaarTest').value=data.kyc.aadhaar||'';
      $('aadhaarName').value=data.kyc.aadhaarName||'';
      $('aadhaarDob').value=data.kyc.aadhaarDob||'';
    }
    if(data.bank){
      $('bankName').value=data.bank.bankName||'';
      $('account').value=data.bank.account||'';
      $('account2').value=data.bank.account||'';
    }
    if(data.profile){
      Object.entries(data.profile).forEach(([key,value])=>{if($(key))$(key).value=value||''});
    }
    if(Number.isFinite(data.loanAmount))$('amount').value=data.loanAmount;
  }catch(e){localStorage.removeItem(STORAGE_KEY)}
}

$('sendOtp').onclick=()=>{
  if(!validMobile($('mobile').value)){toast('Please enter a valid 10-digit mobile number.');return}
  // Issue 1: Prototype OTP stays local; no real SMS or credential is sent.
  const otp=String(Math.floor(100000+Math.random()*900000));
  $('demoOtp').textContent=otp;
  sessionStorage.setItem('testOtp',otp);
  show(1);
};

$('verifyOtp').onclick=()=>{
  if($('otp').value!==sessionStorage.getItem('testOtp')){toast('Incorrect test OTP.');return}
  show(2);
};

$('kycNext').onclick=()=>{
  // Issue 2: Validate every test-KYC field before accepting the simulated result.
  const pan=$('panTest').value.trim().toUpperCase();
  const aadhaar=$('aadhaarTest').value.trim();
  const panName=$('panName').value.trim().replace(/\s+/g,' ').toUpperCase();
  const aadhaarName=$('aadhaarName').value.trim().replace(/[[:space:]]+/g,' ').toUpperCase();
  const panDob=$('panDob').value;
  const aadhaarDob=$('aadhaarDob').value;
  if(!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan)||!/^[0-9]{12}$/.test(aadhaar)||!panName||!aadhaarName||!panDob||!aadhaarDob){
    toast('Complete all fictional PAN/Aadhaar test details.');return;
  }
  if(panName!==aadhaarName){toast('KYC failed: PAN and Aadhaar names do not match.');return}
  if(panDob!==aadhaarDob){toast('KYC failed: PAN and Aadhaar dates of birth do not match.');return}
  $('faceStatus').textContent='Test match';
  $('kycResult').hidden=false;
  saveApplication();
  show(3);
};

$('bankNext').onclick=()=>{
  if(!$('bankName').value.trim()||!/^[0-9]+$/.test($('account').value)||$('account').value!==$('account2').value){
    toast('Complete the fictional bank fields and match both account numbers.');return;
  }
  saveApplication();show(4);
};

$('basicNext').onclick=()=>{
  if(!$('fullName').value.trim()||!$('income').value||!validMobile($('contact1').value)||!validMobile($('contact2').value)){
    toast('Complete the required basic information using test values.');return;
  }
  saveApplication();show(5);
};

$('apply').onclick=()=>{
  const n=Number($('amount').value);
  if(!Number.isFinite(n)||n<20000||n>1000000){
    toast('Loan amount must be between ₹20,000 and ₹10,00,000 in this prototype.');return;
  }
  // Issue 3: Submission goes directly to review; no borrower payment is required to unlock or withdraw a loan.
  saveApplication();
  $('reviewStep').textContent='Admin review pending';
  $('reviewStep').className='';
  $('successStep').textContent='Disbursement status';
  $('successStep').className='';
  $('approved').hidden=true;
  $('adminApprove').disabled=false;
  $('adminApprove').textContent='Admin Review (Prototype)';
  show(6);
};

$('adminApprove').onclick=()=>{
  $('reviewStep').textContent='Admin review completed';
  $('reviewStep').className='done';
  $('successStep').textContent='Prototype approval successful';
  $('successStep').className='done';
  $('approved').hidden=false;
  $('adminApprove').disabled=true;
  $('adminApprove').textContent='Approved';
};

$('restart').onclick=()=>{
  localStorage.removeItem(STORAGE_KEY);
  sessionStorage.removeItem('testOtp');
  location.reload();
};

$('backBtn').onclick=()=>show(Math.max(0,current-1));
loadApplication();
show(0);