const router=require('express').Router();
const xlsx=require('xlsx');
const path = require('path');
const fullfile = path.join(__dirname,"../data/IPL_Data.xlsx")


const wb=xlsx.readFile(fullfile);
const wbPlayer=wb.SheetNames[0];
const wbEvent=wb.SheetNames[1];
const wsPlayer=wb.Sheets[wbPlayer];
const wsEvent=wb.Sheets[wbEvent];

const playerData=xlsx.utils.sheet_to_json(wsPlayer,{raw:false})
const eventData=xlsx.utils.sheet_to_json(wsEvent,{raw:false});

console.log(playerData.length);
let uniqueChar=[...new Set(playerData)]
console.log(uniqueChar.length)

router.get("/playerData",(req,res)=>{
    res.send(playerData);
})
router.get("/eventData",(req,res)=>{
    res.send(eventData)
})

module.exports=router;
