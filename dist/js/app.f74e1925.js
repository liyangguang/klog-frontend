(function(t){function e(e){for(var a,r,i=e[0],c=e[1],u=e[2],d=0,p=[];d<i.length;d++)r=i[d],Object.prototype.hasOwnProperty.call(s,r)&&s[r]&&p.push(s[r][0]),s[r]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(t[a]=c[a]);l&&l(e);while(p.length)p.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],a=!0,i=1;i<n.length;i++){var c=n[i];0!==s[c]&&(a=!1)}a&&(o.splice(e--,1),t=r(r.s=n[0]))}return t}var a={},s={app:0},o=[];function r(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=a,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)r.d(n,a,function(e){return t[e]}.bind(null,a));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=e,i=i.slice();for(var u=0;u<i.length;u++)e(i[u]);var l=c;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"0b86":function(t,e,n){t.exports=n.p+"img/camera.ae722111.svg"},"0eb9":function(t,e,n){"use strict";var a=n("2813"),s=n.n(a);s.a},2813:function(t,e,n){},"2c7f":function(t,e,n){t.exports=n.p+"img/speech-bubble.187c8efb.svg"},3547:function(t,e,n){t.exports=n.p+"img/phone.a0ada1a1.png"},"3b8c":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("e623"),n("e379"),n("5dc8"),n("37e1");var a=n("2b0e"),s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[t.isEmbed?t._e():n("my-header",{attrs:{navs:t.navs}}),n("router-view")],1)},o=[],r=(n("caad6"),n("2532"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("header",{class:{"-scrolled":t.isScrolled}},[n("router-link",{staticClass:"logo",attrs:{to:"/"}},[t._v("KLog")]),n("nav",t._l(t.navs,(function(e,a){return n("ant-button",{key:a,attrs:{type:"primary"},on:{click:function(n){return t.navigateTo(e.path)}}},[t._v(t._s(e.title))])})),1)],1)}),i=[],c=n("5efb"),u=60,l={components:{AntButton:c["a"]},props:["navs"],data:function(){return{isScrolled:!1}},created:function(){var t=this;window.addEventListener("scroll",(function(){t.isScrolled=window.scrollY>u}))},methods:{navigateTo:function(t){this.$router.push(t)}}},d=l,p=(n("6aab"),n("2877")),f=Object(p["a"])(d,r,i,!1,null,"79f5e72a",null),h=f.exports,m=[{path:"courses",title:"课程管理入口"}],_={components:{myHeader:h},data:function(){return{isEmbed:this._checkEmbed(this.$route.path),navs:this._getNavs(this.$route.path)}},watch:{$route:function(t){this.isEmbed=this._checkEmbed(t.path),this.navs=this._getNavs(t.path)}},methods:{_checkEmbed:function(t){return t.includes("_embed")},_getNavs:function(t){return"/"===t?m:[]}}},b=_,g=(n("f8933"),Object(p["a"])(b,s,o,!1,null,"51298a01",null)),v=g.exports,C=(n("ac1f"),n("5319"),n("8c4f")),k=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("main",[a("div",{staticClass:"content"},[a("div",{staticClass:"left"},[a("h1",[t._v("KLog")]),a("p",[t._v("记录学生们上课的精彩瞬间, 自动生成每个学生的精彩片段")]),t._m(0),a("ant-button",{attrs:{ghost:"",type:"primary",icon:"download",size:"large"}},[t._v("安卓应用市场")])],1),a("img",{staticClass:"right",attrs:{src:n("3547"),alt:"Phone frame"}})]),t._l(t.photos,(function(e,n){return a("div",{staticClass:"background-photo",style:{opacity:n===t.photoIndex?1:0,"background-image":"url("+e+")"}})}))],2)},y=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ul",{staticClass:"features"},[a("li",[a("img",{attrs:{src:n("0b86"),alt:"camera icon"}}),a("p",[t._v("用手机记录下学生们的上课活动")])]),a("li",[a("img",{attrs:{src:n("f623"),alt:"neural icon"}}),a("p",[t._v("机器学习识别每个学生, 生成视频")])]),a("li",[a("img",{attrs:{src:n("2c7f"),alt:"speech bubble icon"}}),a("p",[t._v("老师向家长们分享每个孩子的精彩片段")])])])}],S=5e3,w={components:{AntButton:c["a"]},data:function(){return{photoIndex:0,photos:[n("c216"),n("cff0"),n("cd59"),n("a488")]}},created:function(){var t=this;setInterval((function(){t.photoIndex=(t.photoIndex+1)%t.photos.length}),S)}},E=w,x=(n("0eb9"),Object(p["a"])(E,k,y,!1,null,"21705dec",null)),L=x.exports,O=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("main",[n("h1",[t._v("课程管理")]),n("p",[t._v(t._s(t.pageMessage))]),n("div",{staticClass:"grid"},[t._l(t.courses,(function(e,a){return n("ant-card",{key:a,attrs:{title:e.course_name}},[n("ant-button",{attrs:{slot:"extra",shape:"circle",icon:"edit","aria-label":"编辑课程"},on:{click:function(n){return t.editButton(e)}},slot:"extra"}),n("p",{staticClass:"teacher"},[t._v("老师: "+t._s(t.getTeacherName(e.teacher_pid)))]),n("p",{staticClass:"teacher"},[t._v("助教: "+t._s(t.getTeacherName(e.assistant_pid)))]),n("p",{staticClass:"more"},[t._v("课程信息: "+t._s(e.course_intro))]),n("ant-button",{attrs:{size:"small"},on:{click:function(n){return t.openStudents(e.pid)}}},[t._v("管理学生 ("+t._s(e.studentCount)+")")])],1)})),n("ant-card",{attrs:{title:"添加新课程",bodyStyle:{"min-height":"10em","text-align":"center"}}},[n("ant-button",{staticClass:"add-button",attrs:{type:"primary",shape:"circle",icon:"plus",size:"large","aria-label":"添加"},on:{click:t.addButton}})],1)],2),n("ant-modal",{attrs:{title:t.modalContent.pid?"编辑课程":"添加新课程",visible:t.isModalVisible},on:{ok:t.modalOk,cancel:function(e){t.isModalVisible=!1}}},[n("ant-form",{attrs:{formLayout:"horizontal"}},[n("ant-form-item",{attrs:{label:"名称","label-col":{span:4},"wrapper-col":{span:20}}},[n("ant-input",{model:{value:t.modalContent.course_name,callback:function(e){t.$set(t.modalContent,"course_name",e)},expression:"modalContent.course_name"}})],1),n("ant-form-item",{attrs:{label:"老师","label-col":{span:4},"wrapper-col":{span:20}}},[n("ant-select",{model:{value:t.modalContent.teacher_pid,callback:function(e){t.$set(t.modalContent,"teacher_pid",e)},expression:"modalContent.teacher_pid"}},t._l(t.teacherList,(function(e,a){return n("ant-select-option",{key:a,attrs:{value:e.pid}},[t._v(t._s(e.teacher_name))])})),1)],1),n("ant-form-item",{attrs:{label:"助教","label-col":{span:4},"wrapper-col":{span:20}}},[n("ant-select",{model:{value:t.modalContent.assistant_pid,callback:function(e){t.$set(t.modalContent,"assistant_pid",e)},expression:"modalContent.assistant_pid"}},t._l(t.teacherList,(function(e,a){return n("ant-select-option",{key:a,attrs:{value:e.pid}},[t._v(t._s(e.teacher_name))])})),1)],1),n("ant-form-item",{attrs:{label:"介绍","label-col":{span:4},"wrapper-col":{span:20}}},[n("ant-input",{model:{value:t.modalContent.course_intro,callback:function(e){t.$set(t.modalContent,"course_intro",e)},expression:"modalContent.course_intro"}})],1),n("p",[t._v(t._s(t.modalMessage))])],1)],1)],1)},A=[],M=(n("4de4"),n("4160"),n("159b"),n("cdeb")),$=n("ed3b"),T=n("3af3"),I=n("b558"),R=n("9839"),j=n("6c27"),U=(n("99af"),n("a15b"),n("d81d"),n("4fad"),n("d3b7"),n("e587")),N="https://klogserver.westus2.cloudapp.azure.com/api/0/",P="all";function F(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2?arguments[2]:void 0,a={},s="";return n?(e.teacher_key&&(e.teacher_key=Object(j["sha256"])(e.teacher_key)),a={method:n,body:JSON.stringify(e)}):(e.pid||(e.pid=P),s=Object.entries(e).map((function(t){var e=Object(U["a"])(t,2),n=e[0],a=e[1];return"".concat(n,"=").concat(a)})).join("&"),s&&(s="?"+s)),fetch("".concat(N).concat(t).concat(s),a).then((function(t){return t.ok?t.json().then((function(t){return t.payload})):t.json().then((function(t){throw new Error(t.message)}))}))}var D="000000000000000000000000",V={components:{AntButton:c["a"],AntCard:M["a"],AntModal:$["a"],AntForm:T["a"],AntFormItem:T["a"].Item,AntInput:I["a"],AntSelect:R["a"],AntSelectOption:R["a"].Option},data:function(){return{courses:[],isModalVisible:!1,modalContent:{},modalMessage:"",pageMessage:"",teacherList:[]}},created:function(){this._loadCourses(),this._loadTeacherList()},methods:{_loadTeacherList:function(){var t=this,e={fkey:"institute_pid",fid:this.$store.state.currentUser.institute_pid};return F("config/teacher",e).then((function(e){t.teacherList=e})).catch((function(e){console.error(e),t.teacherList=[{pid:null,teacher_name:"获取教师列表失败"}]}))},_loadCourses:function(){var t=this,e={fkey:"teacher_pid",fid:this.$store.state.currentUser.pid};return F("config/course",e).then((function(e){t.courses=e.filter((function(e){return e.teacher_pid===t.$store.state.currentUser.pid||e.assistant_pid===t.$store.state.currentUser.pid})),t.courses.forEach((function(e){t._loadCourseStudentsRefs(e)}))})).catch((function(e){console.error(e),t.pageMessage="获取课程列表失败. "+e.message}))},_loadCourseStudentsRefs:function(t){var e=this;return F("config/reference/student_course",{student_pid:"all",course_pid:t.pid}).then((function(n){e.$set(t,"studentCount",n.length)})).catch((function(n){console.error(n),e.$set(t,"studentCount","(获取学生人数失败)")}))},addButton:function(){this.modalContent=this._getDefaultNewCourseFields(),this.isModalVisible=!0},editButton:function(t){this.modalContent=t,this.isModalVisible=!0},modalOk:function(){var t=this,e=!this.modalContent.pid;e&&(this.modalContent.course_uid=Object(j["sha256"])(this.modalContent.course_name)),F("config/course",this.modalContent,e?"POST":"PUT").then((function(n){e&&(t.modalContent.pid=n,t.courses.push(t.modalContent)),t.isModalVisible=!1})).catch((function(e){console.error(e),t.modalMessage=e.message}))},getTeacherName:function(t){if(!t||t===D)return"(无)";if(!this.teacherList.length)return"(载入中)";var e=this.teacherList.filter((function(e){return e.pid===t}))[0];if(!e)throw new Error("No teacher found matching pid ".concat(t));return e.teacher_name},_getDefaultNewCourseFields:function(){return{teacher_pid:this.$store.state.currentUser.pid,institute_pid:this.$store.state.currentUser.institute_pid,course_targets:[]}},openStudents:function(t){this.$router.push("/students/".concat(t))}}},B=V,z=(n("f688"),Object(p["a"])(B,O,A,!1,null,"737e6571",null)),W=z.exports,J=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("main",[n("h1",[t._v("学生管理")]),n("p",[t._v(t._s(t.pageMessage))]),n("p",[t._v(t._s(t.course.name))]),n("p",{staticClass:"teacher"},[t._v("老师: "+t._s(t.getTeacherName(t.course.teacher_pid)))]),n("p",{staticClass:"teacher"},[t._v("助教: "+t._s(t.getTeacherName(t.course.assistant_pid)))]),n("div",{staticClass:"grid"},[t._l(t.currentCourseStudentRefs,(function(e,a){return n("ant-card",{key:a},[n("p",[t._v(t._s(t.getStudentName(e.student_pid)))])])})),n("ant-card",{attrs:{title:"添加学生",bodyStyle:{"min-height":"10em","text-align":"center"}}},[n("ant-button",{staticClass:"add-button",attrs:{type:"primary",shape:"circle",icon:"plus",size:"large","aria-label":"添加"},on:{click:t.addButton}})],1)],2),n("ant-modal",{attrs:{title:"添加学生",visible:t.isModalVisible},on:{ok:t.modalOk,cancel:function(e){t.isModalVisible=!1}}},[n("ant-form",{attrs:{formLayout:"horizontal"}},[n("ant-form-item",{attrs:{label:"学生列表","label-col":{span:4},"wrapper-col":{span:20}}},[n("ant-select",{model:{value:t.modalContent.student_pid,callback:function(e){t.$set(t.modalContent,"student_pid",e)},expression:"modalContent.student_pid"}},[t._l(t.availableStudents,(function(e,a){return n("ant-select-option",{key:a,attrs:{value:e.pid}},[t._v(t._s(e.student_name))])})),n("ant-select-option",{attrs:{value:t.NEW_STUDENT_VALUE}},[t._v("[注册新学生]")])],2)],1),t.modalContent.student_pid===t.NEW_STUDENT_VALUE?[n("ant-form-item",{attrs:{label:"姓名","label-col":{span:4},"wrapper-col":{span:20}}},[n("ant-input",{model:{value:t.modalContent.student_name,callback:function(e){t.$set(t.modalContent,"student_name",e)},expression:"modalContent.student_name"}})],1)]:t._e(),n("p",[t._v(t._s(t.modalMessage))])],2)],1)],1)},K=[],Q=(n("7db0"),"000000000000000000000000"),H="CREATE_NEW",Y={components:{AntButton:c["a"],AntCard:M["a"],AntModal:$["a"],AntForm:T["a"],AntFormItem:T["a"].Item,AntInput:I["a"],AntSelect:R["a"],AntSelectOption:R["a"].Option},data:function(){return{course:{},isModalVisible:!1,modalContent:{},modalMessage:"",pageMessage:"",currentCourseStudentRefs:[],teacherList:[],studentList:[],NEW_STUDENT_VALUE:H}},computed:{availableStudents:function(){var t=this;return this.studentList?this.studentList.filter((function(e){return!t.currentCourseStudentRefs.find((function(t){return t.student_pid===e.pid}))})):[]}},created:function(){this._loadCourse(),this._loadCourseStudentsRefs(),this._loadAllStudents(),this._loadTeacherList()},methods:{_loadCourse:function(){var t=this;return F("config/course",{pid:this.$route.params.coursePid}).then((function(e){t.course=e[0]})).catch((function(e){console.error(e),t.pageMessage="获取课程信息失败. "+e.message}))},_loadCourseStudentsRefs:function(){var t=this;return F("config/reference/student_course",{student_pid:"all",course_pid:this.$route.params.coursePid}).then((function(e){t.currentCourseStudentRefs=e})).catch((function(e){console.error(e),t.pageMessage="获取学生列表失败. "+e.message}))},_loadAllStudents:function(){var t=this;return F("config/student").then((function(e){t.studentList=e})).catch((function(e){console.error(e),t.studentList=[{student_name:"获取学生列表失败"}]}))},_loadTeacherList:function(){var t=this,e={fkey:"institute_pid",fid:this.$store.state.currentUser.institute_pid};return F("config/teacher",e).then((function(e){t.teacherList=e})).catch((function(t){console.error(t)}))},addButton:function(){this.modalContent={},this.isModalVisible=!0},modalOk:function(){var t=this;this.modalContent.student_pid===H?F("config/student",this.modalContent,"POST").then((function(e){return t._addStudentCourseRelationship(e)})).catch((function(e){console.error(e),t.modalMessage="更新学生信息失败. "+e.message})):this._addStudentCourseRelationship(this.modalContent.student_pid)},_addStudentCourseRelationship:function(t){var e=this,n={course_pid:this.$route.params.coursePid,student_pid:t};return F("config/reference/student_course",n,"POST").then((function(){e.currentCourseStudentRefs.push(n),e.isModalVisible=!1})).catch((function(t){console.error(t),e.modalMessage="添加学生失败. "+t.message}))},getTeacherName:function(t){if(!t||t===Q)return"(无)";if(!this.teacherList||!this.teacherList.length)return"(载入中)";var e=this.teacherList.filter((function(e){return e.pid===t}))[0];if(!e)throw new Error("No teacher found matching pid ".concat(t));return e.teacher_name},getStudentName:function(t){if(!t||t===Q)return"(无)";if(!this.studentList||!this.studentList.length)return"(载入中)";var e=this.studentList.filter((function(e){return e.pid===t}))[0];if(!e)throw new Error("No student found matching pid ".concat(t));return e.student_name}}},q=Y,G=(n("bebb"),Object(p["a"])(q,J,K,!1,null,"7abd6d87",null)),X=G.exports,Z=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("main",[n("ant-form",{attrs:{formLayout:"horizontal"}},[n("ant-form-item",{attrs:{label:"账号","label-col":{span:4},"wrapper-col":{span:20}}},[n("ant-input",{model:{value:t.teacher_uid,callback:function(e){t.teacher_uid=e},expression:"teacher_uid"}})],1),n("ant-form-item",{attrs:{label:"密码","label-col":{span:4},"wrapper-col":{span:20}}},[n("ant-input-password",{model:{value:t.teacher_key,callback:function(e){t.teacher_key=e},expression:"teacher_key"}})],1),t.isRegistering?[n("ant-form-item",{attrs:{label:"姓名","label-col":{span:4},"wrapper-col":{span:20}}},[n("ant-input",{model:{value:t.teacher_name,callback:function(e){t.teacher_name=e},expression:"teacher_name"}})],1),n("ant-form-item",{attrs:{label:"邮箱","label-col":{span:4},"wrapper-col":{span:20}}},[n("ant-input",{attrs:{type:"email"},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}})],1),n("ant-form-item",{attrs:{label:"电话","label-col":{span:4},"wrapper-col":{span:20}}},[n("ant-input",{attrs:{type:"tel"},model:{value:t.phone_number,callback:function(e){t.phone_number=e},expression:"phone_number"}})],1),n("ant-form-item",{attrs:{label:"学校","label-col":{span:4},"wrapper-col":{span:20}}},[n("ant-select",{model:{value:t.institute_pid,callback:function(e){t.institute_pid=e},expression:"institute_pid"}},t._l(t.instituteList,(function(e,a){return n("ant-select-option",{key:a,attrs:{value:e.pid}},[t._v(t._s(e.institute_name))])})),1)],1),n("p",[n("ant-button",{attrs:{type:"primary",size:"large"},on:{click:t.register}},[t._v("注册")])],1),n("p",[n("ant-button",{attrs:{type:"link"},on:{click:function(e){t.isRegistering=!1}}},[t._v("已有账号? 登录")])],1)]:[n("p",[n("ant-checkbox",{attrs:{checked:t.doSaveInCookie},on:{change:function(e){t.doSaveInCookie=e.target.checked}}},[t._v("下次自动登录")])],1),n("p",[n("ant-button",{attrs:{type:"primary",size:"large"},on:{click:t.login}},[t._v("登录")])],1),n("p",[n("ant-button",{attrs:{type:"link"},on:{click:function(e){t.isRegistering=!0}}},[t._v("注册教师账号")])],1)],n("p",[t._v(t._s(t.message))])],2)],1)},tt=[],et=n("bb76"),nt={components:{AntButton:c["a"],AntForm:T["a"],AntFormItem:T["a"].Item,AntInput:I["a"],AntInputPassword:I["a"].Password,AntCheckbox:et["a"],AntSelect:R["a"],AntSelectOption:R["a"].Option},data:function(){return{isRegistering:!1,doSaveInCookie:!1,message:"",teacher_uid:"",teacher_key:"",teacher_name:"",phone_number:"",email:"",institute_pid:"",instituteList:[]}},created:function(){this._loadInstituteList()},methods:{_loadInstituteList:function(){var t=this;F("config/institute").then((function(e){t.instituteList=e})).catch((function(e){t.instituteList=[{institute_name:"获取学校列表失败"}]}))},login:function(){var t=this,e={teacher_uid:this.teacher_uid,teacher_key:this.teacher_key};F("workflow/teacher/login",e,"POST").then((function(e){t.$store.commit("setCurrentUser",{user:e,save:t.doSaveInCookie}),t.$router.push("/dashboard")})).catch((function(e){t.message=e}))},register:function(){var t=this;if(this.isRegistering){var e={teacher_uid:this.teacher_uid,teacher_key:this.teacher_key,teacher_name:this.teacher_name,phone_number:this.phone_number,email:this.email,institute_pid:this.institute_pid};F("config/teacher",e,"POST").then((function(){t.$router.go()})).catch((function(e){t.message=e}))}else this.isRegistering=!0}}},at=nt,st=(n("9b27"),Object(p["a"])(at,Z,tt,!1,null,"6d84c05f",null)),ot=st.exports,rt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("form",{ref:"formEl",attrs:{enctype:t.REQUIRED_FILED_FOR_MULTIPART}},[n("p",[t._v("This is a page to test the upload feature, not a real page in the app.")]),n("p",[t._v(t._s(t.message))]),n("input",{attrs:{type:"file",name:t.FORM_FILED_NAME},on:{change:function(e){t.file=e.target.files[0]}}}),n("ant-button",{attrs:{disabled:!t.file||t.isDisabled},on:{click:t.submit}},[t._v("Upload Image")]),t.url?n("img",{attrs:{src:t.url}}):t._e()],1)},it=[],ct="/_api/upload",ut="multipart/form-data",lt="image",dt={components:{AntButton:c["a"]},data:function(){return{file:null,message:"Select an image to upload",url:"",isDisabled:!1,REQUIRED_FILED_FOR_MULTIPART:ut,FORM_FILED_NAME:lt}},methods:{submit:function(){var t=this;this.isDisabled=!0,this.message="Uploading...";var e=new FormData(this.$refs.formEl);fetch(ct,{method:"POST",body:e}).then((function(t){if(!t.ok)throw new Error("".concat(t.status," ").concat(t.statusText));return t.json()})).then((function(e){t.message="Uploaded successfully",t.url=e.path,t.isDisabled=!1})).catch((function(e){t.message="Failed to upload. "+e.message,t.isDisabled=!1}))}}},pt=dt,ft=(n("df18"),Object(p["a"])(pt,rt,it,!1,null,"a5f4b786",null)),ht=ft.exports,mt=n("2f62"),_t=n("a78e"),bt=n.n(_t);a["a"].use(mt["a"]);var gt="klog-user-pid",vt=new mt["a"].Store({state:{currentUser:null},mutations:{setCurrentUser:function(t,e){t.currentUser=e.user,e.save?bt.a.set(gt,e.user.pid,{expires:30}):!1===e.save&&bt.a.remove(gt)}}});a["a"].use(C["a"]);var Ct=function(t,e,n){var a=bt.a.get("klog-user-pid")||(vt.state.currentUser||{}).pid;a?F("config/teacher",{pid:a}).then((function(t){vt.commit("setCurrentUser",{user:t[0]}),n()})):yt.replace("signin")},kt=[{path:"/",component:L},{path:"/signin",component:ot},{path:"/courses",component:W,beforeEnter:Ct},{path:"/students/:coursePid",component:X,beforeEnter:Ct},{path:"/_embed/upload",component:ht},{path:"*",redirect:"/"}],yt=new C["a"]({mode:"history",base:"/",routes:kt}),St=yt;n("202f");a["a"].config.productionTip=!1,new a["a"]({router:St,store:vt,render:function(t){return t(v)}}).$mount("#app")},"6aab":function(t,e,n){"use strict";var a=n("c9e7"),s=n.n(a);s.a},7972:function(t,e,n){},"8f8f":function(t,e,n){},"9b27":function(t,e,n){"use strict";var a=n("3b8c"),s=n.n(a);s.a},a488:function(t,e,n){t.exports=n.p+"img/4.c848b14a.jpg"},bebb:function(t,e,n){"use strict";var a=n("c858"),s=n.n(a);s.a},c216:function(t,e,n){t.exports=n.p+"img/1.8eee14e7.jpg"},c858:function(t,e,n){},c9e7:function(t,e,n){},cd59:function(t,e,n){t.exports=n.p+"img/3.3944809d.jpg"},cff0:function(t,e,n){t.exports=n.p+"img/2.87141047.jpg"},d418:function(t,e,n){},df18:function(t,e,n){"use strict";var a=n("7972"),s=n.n(a);s.a},f623:function(t,e,n){t.exports=n.p+"img/neural.30d44924.svg"},f688:function(t,e,n){"use strict";var a=n("8f8f"),s=n.n(a);s.a},f8933:function(t,e,n){"use strict";var a=n("d418"),s=n.n(a);s.a}});
//# sourceMappingURL=app.f74e1925.js.map