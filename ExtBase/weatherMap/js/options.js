var cityVal = localStorage.city || 'beijing',
  cityInp = document.getElementById('city');

cityInp.value = cityVal;

document.getElementById('save').onclick = function () {
  localStorage.city = cityInp.value;
  alert("保存成功");
};