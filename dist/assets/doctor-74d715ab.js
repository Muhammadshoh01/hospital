import{r as y,d as v}from"./places-6e1844b7.js";import{_ as f,a as D,m,o as n,c as d,b as t,t as l,j as b,F as h,r as p,w as _,d as c,v as u,f as k,n as H,p as T,l as w}from"./index-58808999.js";import{_ as x,a as I}from"./remove-c812daa3.js";const M={data(){return{regions:y,districts:v,doctor:{},history:{position:""},familyList:[{id:1,title:"Uylangan/Turmushga chiqqan"},{id:2,title:"Uylanmagan/Turmushga chiqmagan"}],educationList:[{id:1,title:"Maktabni bitirgan"},{id:2,title:"O'rta Maxsus"},{id:3,title:"Oliy"}],workTimeList:[{id:1,name:"Yarim stavka"},{id:2,name:"Asosiy shtat"},{id:3,name:"O`rindosh"}]}},computed:{...D(["specs","positions","departments","doctorHistorys","doctorHistoryToggle","doctorEditHistoryToggle"])},methods:{...m(["getDoctor"]),...m(["getAllSpecs","getAllDepartments","getAllPositions","getAllDoctorHistorys","addDoctorHistory","updateDoctorHistory","deleteDoctorHistory","getDoctorHistory"]),postDoctorHistory(){this.history.startDate&&this.history.endDate&&this.history.title&&this.history.position?(this.addDoctorHistory({...this.history,doctor:this.$route.params.id}),this.clear()):this.$store.commit("setNotif",{type:"warning",text:"Barcha maydonlarni to'ldiring"})},async edit(r){let o=await this.getDoctorHistory(r);(o==null?void 0:o.status)==200&&(this.$store.commit("setDoctorHistoryToggle",!0),this.$store.commit("setDoctorEditHistoryToggle",!0),this.history=o.data)},save(){this.updateDoctorHistory({...this.history,doctor:this.$route.params.id}),this.clear()},remove(r){confirm("Qaroringiz qat'iymi?")&&this.deleteDoctorHistory(r)},openModal(){this.$store.commit("setDoctorHistoryToggle",!0)},clear(){this.$store.commit("setDoctorHistoryToggle",!1),this.$store.commit("setDoctorEditHistoryToggle",!1),this.history={position:""}}},async mounted(){await this.getAllDoctorHistorys(this.$route.params.id),await this.getAllSpecs(),await this.getAllDepartments(),await this.getAllPositions();let r=await this.getDoctor(this.$route.params.id);r.status==200&&(this.doctor={...r.data},this.specs.forEach(o=>{o._id==this.doctor.spec&&(this.doctor.spec=o.title)}),this.departments.forEach(o=>{o._id==this.doctor.department&&(this.doctor.department=o.title)}),this.doctor.worktime=this.workTimeList[this.doctor.worktime-1].name,this.doctor.family=this.familyList[this.doctor.family-1].title,this.doctor.education=this.educationList[this.doctor.education-1].title,this.regions.forEach(o=>{o.id==this.doctor.region&&(this.doctor.region=o.name)}),this.districts.forEach(o=>{o.id==this.doctor.district&&(this.doctor.district=o.name)}))}},e=r=>(T("data-v-25d6af70"),r=r(),w(),r),S={class:"doctor"},E={class:"doctor__head"},A=["src"],L={class:"doctor__data"},C={class:"doctor__name"},q={class:"doctor__param"},z={class:"doctor__cat"},U=e(()=>t("h4",null,"Mutaxassisligi",-1)),V={class:"doctor__cat"},B=e(()=>t("h4",null,"Ishlayotgan bo’lim",-1)),O={class:"doctor__cat"},j=e(()=>t("h4",null,"Ish staji",-1)),N={class:"doctor__cat"},F=e(()=>t("h4",null,"Ish grafigi",-1)),P={class:"doctor__cat"},Y=e(()=>t("h4",null,"Ishga kirgan sana",-1)),G=e(()=>t("div",{class:"doctor__edit"},null,-1)),K={class:"doctor__personal"},Q=e(()=>t("div",{class:"doctor__minititle"},"Shaxsiy ma’lumotlar",-1)),J={class:"doctor__datas"},R={class:"doctor__cat"},W=e(()=>t("h4",null,"Tug’ilgan sanasi",-1)),X={class:"doctor__cat"},Z=e(()=>t("h4",null,"Oilaviy holat",-1)),$={class:"doctor__cat"},tt=e(()=>t("h4",null,"Telefon raqam",-1)),ot={class:"doctor__cat"},st=e(()=>t("h4",null,"Tug’ilgan hudud",-1)),it={class:"doctor__cat"},et=e(()=>t("h4",null,"Tug’ilgan tuman",-1)),lt={class:"doctor__cat"},rt=e(()=>t("h4",null,"Ma’lumoti",-1)),at={class:"box"},nt={class:"d-flex justify-content-between align-items-center"},dt=e(()=>t("div",{class:"title"},"Mehnat faoliyati",-1)),ct=e(()=>t("span",null,"+",-1)),ht={class:"table"},_t=e(()=>t("thead",null,[t("tr",null,[t("th",null,"Muassasa nomi"),t("th",null,"Ish faoliyat muddati"),t("th",null,"Lavozimi"),t("th")])],-1)),ut=["onClick"],mt=e(()=>t("img",{src:x},null,-1)),pt=[mt],gt=["onClick"],yt=e(()=>t("img",{src:I},null,-1)),vt=[yt],ft={class:"modal__box"},Dt={class:"text-center mb-20"},bt=e(()=>t("div",{class:"part mt-10 mb-10 text-center"},"Ish faoliyati tarixi",-1)),kt={class:"row step-1"},Ht={class:"col-6 col-sm-12 mb-20"},Tt={class:"col-6 col-sm-12 mb-20"},wt={class:"col-6 col-sm-12 mb-20"},xt=e(()=>t("option",{value:""},"Lavozimni tanlang",-1)),It=["value"],Mt={class:"col-6 col-sm-12 mb-20"},St={class:"modal__footer"};function Et(r,o,At,Lt,i,a){return n(),d(h,null,[t("div",S,[t("div",E,[t("div",null,[t("img",{src:`http://95.130.227.52:3112/${i.doctor.file}`},null,8,A)]),t("div",L,[t("div",C,l(i.doctor.name),1),t("div",q,[t("div",z,[U,t("p",null,l(i.doctor.spec),1)]),t("div",V,[B,t("p",null,l(i.doctor.department),1)]),t("div",O,[j,t("p",null,l(i.doctor.exp)+" yil",1)]),t("div",N,[F,t("p",null,l(i.doctor.worktime),1)]),t("div",P,[Y,t("p",null,l(i.doctor.startTime),1)])]),G])]),t("div",K,[Q,t("div",J,[t("div",R,[W,t("p",null,l(i.doctor.birthday),1)]),t("div",X,[Z,t("p",null,l(i.doctor.family),1)]),t("div",$,[tt,t("p",null,l(i.doctor.phone),1)]),t("div",ot,[st,t("p",null,l(i.doctor.region),1)]),t("div",it,[et,t("p",null,l(i.doctor.district),1)]),t("div",lt,[rt,t("p",null,l(i.doctor.education),1)])])])]),t("div",at,[t("div",nt,[dt,t("button",{class:"doctor__work",onClick:o[0]||(o[0]=(...s)=>a.openModal&&a.openModal(...s))},[ct,b(" Yangi ish faoliyat tarixi ")])]),t("table",ht,[_t,t("tbody",null,[(n(!0),d(h,null,p(r.doctorHistorys,(s,Ct)=>(n(),d("tr",{key:s._id},[t("td",null,l(s.title),1),t("td",null,l(s.startDate)+" - "+l(s.endDate),1),t("td",null,l(s.position),1),t("td",null,[t("button",{onClick:_(g=>a.edit(s._id),["stop"])},pt,8,ut),t("button",{onClick:_(g=>a.remove(s._id),["stop"])},vt,8,gt)])]))),128))])])]),t("div",{class:H(` modal ${r.doctorHistoryToggle?"open":""}`)},[t("div",ft,[t("h4",Dt,l(r.doctorEditHistoryToggle?"Shifokorni tarixi ma'lumotlarini tahrirlash":"Shifokorning yangi tarixini ro’yhatdan o’tkazish"),1),t("form",{onSubmit:o[5]||(o[5]=_(s=>r.doctorEditHistoryToggle?a.save():a.postDoctorHistory(),["prevent"]))},[t("div",null,[bt,t("section",kt,[t("div",Ht,[c(t("input",{class:"input",type:"text",placeholder:"Ishga kirgan sana",onfocus:'this.type="date"',"onUpdate:modelValue":o[1]||(o[1]=s=>i.history.startDate=s)},null,512),[[u,i.history.startDate]])]),t("div",Tt,[c(t("input",{class:"input",type:"text",placeholder:"Ishni tugatgan sanasi",onfocus:'this.type="date"',"onUpdate:modelValue":o[2]||(o[2]=s=>i.history.endDate=s)},null,512),[[u,i.history.endDate]])]),t("div",wt,[c(t("select",{class:"input","onUpdate:modelValue":o[3]||(o[3]=s=>i.history.position=s),placeholder:"Lavozimni tanlang"},[xt,(n(!0),d(h,null,p(r.positions,s=>(n(),d("option",{key:s._id,value:s._id},l(s.title),9,It))),128))],512),[[k,i.history.position]])]),t("div",Mt,[c(t("input",{class:"input",placeholder:"Ishlagan shifoxona manzili",type:"text","onUpdate:modelValue":o[4]||(o[4]=s=>i.history.title=s)},null,512),[[u,i.history.title]])])])])],32),t("div",St,[t("button",{class:"btn danger",onClick:o[6]||(o[6]=(...s)=>a.clear&&a.clear(...s))},"Bekor qilish"),r.doctorEditHistoryToggle?(n(),d("button",{key:1,class:"btn success hide btn__edit",onClick:o[8]||(o[8]=s=>a.save())}," Saqlash ")):(n(),d("button",{key:0,class:"btn success btn__add",onClick:o[7]||(o[7]=(...s)=>a.postDoctorHistory&&a.postDoctorHistory(...s))}," Kiritish "))])])],2)],64)}const Vt=f(M,[["render",Et],["__scopeId","data-v-25d6af70"]]);export{Vt as default};
