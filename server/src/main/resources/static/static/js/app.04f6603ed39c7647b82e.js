webpackJsonp([1],Array(19).concat([function(t,e,s){"use strict";var o=s(11),n=new o.default;e.a=n},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e,s){function o(t){s(137)}var n=s(0)(s(81),s(164),o,null,null);t.exports=n.exports},,function(t,e,s){"use strict";var o=s(11),n=s(168),a=s(145),r=s.n(a),i=s(144),l=s.n(i),u=s(143),d=s.n(u),c=s(142),p=s.n(c),m=s(152),g=s.n(m),h=s(148),v=s.n(h),f=s(146),w=s.n(f);o.default.use(n.a);var y=new n.a({routes:[{path:"/",name:"anonymous-home-page",components:{default:l.a,"ano-navigation":r.a}},{path:"/sign-up",name:"sign-up",components:{default:d.a,"ano-navigation":r.a}},{path:"/login",name:"login",components:{default:p.a,"ano-navigation":r.a}},{path:"/:username/playlists",name:"PlaylistsList",component:g.a},{path:"/:username/playlists/:playlist_id",name:"Playlist",component:v.a},{path:"/error",name:"Error",component:w.a},{path:"/*",name:"global-error",component:w.a}],mode:"history"}),_=["anonymous-home-page","login","sign-up"];y.beforeEach(function(t,e,s){if(-1!==_.indexOf(t.name)){var o=localStorage.getItem("user");o?s({path:"/"+o+"/playlists"}):s()}else s()}),e.a=y},function(t,e,s){"use strict";var o=s(11),n=s(187);o.default.use(n.a);var a=new n.a.Store({state:{loggedInUser:null,error:null,loadedPlaylist:null},mutations:{logUserIn:function(t,e){t.loggedInUser=e},logUserOut:function(t){t.loggedInUser=null,localStorage.clear()},setLoadedPlaylist:function(t,e){t.loadedPlaylist=e},setError:function(t,e){t.error=e}},getters:{getLoggedInUser:function(t){return t.loggedInUser},getLoadedPlaylist:function(t){return t.loadedPlaylist},getError:function(t){return t.error}}});e.a=a},,,function(t,e,s){function o(t){s(127)}var n=s(0)(s(77),s(154),o,null,null);t.exports=n.exports},,,,,,,,,,,,,,,,,,,,function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=s(11),n=s(56),a=s.n(n),r=s(53),i=s(52),l=s(57),u=s.n(l),d=s(33),c=s.n(d),p=s(54),m=s.n(p),g=s(58),h=s.n(g),v=s(55),f=s.n(v);o.default.use(h.a),o.default.use(u.a),o.default.use(m.a,c.a),o.default.use(f.a),o.default.config.productionTip=!1,new o.default({el:"#app",router:i.a,store:r.a,template:"<App/>",components:{App:a.a}})},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"app",data:function(){return{route:this.$route.name}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"login",data:function(){return{userName:"",userPassword:""}},methods:{Login:function(){var t=this;return t.axios({method:"post",url:"/api/auth/login",data:{username:t.userName,password:t.userPassword}}).then(function(e){localStorage.setItem("user",e.data.username),localStorage.setItem("jwtToken",e.data.jwt),t.$router.push(t.userName+"/playlists")}).catch(function(){alert("Incorrect username/password")})}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=s(91),n=s.n(o),a=s(175);s.n(a);e.default={name:"sign-up",data:function(){return{userName:"",userEmail:"",userPassword:"",passwordMatch:"",errors:[]}},methods:{signUp:function(){if(this.validateFields()){var t=this,e=sessionStorage.getItem("epc-values");t.axios.post("/api/auth/sign-up",{username:t.userName,email:t.userEmail,password:t.userPassword,passwordMatch:t.passwordMatch,playlists:e?[JSON.parse(e)]:[]}).then(function(e){localStorage.setItem("user",e.data.username),localStorage.setItem("jwtToken",e.data.jwt),t.$router.push("/"+t.userName+"/playlists")}).catch(function(e){409===e.response.status?t.errors.push("Username or email are already in use"):alert("problem occured, please refresh and try again")})}},validateFields:function(){var t=this;this.errors=[];var e={userName:"Username must contain 4 to 22 alphanumeric characters",userEmail:"Not a valid email address",userPassword:"Password must contain 6 to 32 characters",passwordMatch:"Passwords don`t match"};return n()(this.$v.$params).forEach(function(s){for(var o in t.$v[s].$params)if(!t.$v[s][o])return t.errors.push(e[s]),!1}),0===this.errors.length||!1}},validations:{userName:{required:a.required,alphaNum:a.alphaNum,minLength:s.i(a.minLength)(4),maxLength:s.i(a.maxLength)(22)},userEmail:{required:a.required,email:a.email},userPassword:{required:a.required,minLength:s.i(a.minLength)(6),maxLength:s.i(a.maxLength)(32)},passwordMatch:{required:a.required,sameAsUserPassword:s.i(a.sameAs)("userPassword")}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=s(39),n=s.n(o),a=s(50),r=s.n(a);e.default={name:"example-playlist-creator",components:{"get-songs-from-youtube":r.a},data:function(){return{currentStep:1,pTitle:"",pPassword:"",playlistAddedSongs:[]}},methods:{addSong:function(t){this.playlistAddedSongs.push(JSON.parse(n()(t)))}},beforeDestroy:function(){sessionStorage.setItem("epc-values",n()({title:this.pTitle||"Default Playlist",password:this.pPassword||"",songs:this.playlistAddedSongs||[]}))}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=s(39),n=s.n(o),a=s(19);e.default={name:"get-songs-from-youtube",props:["mode"],data:function(){return{songUrl:"",ytSongObject:{title:"",thumbnail:"",time:"",vidId:""},showOrHideAddButton:!0}},mounted:function(){var t=this;"playlist"===this.mode&&(this.showOrHideAddButton=!1),a.a.$on("changeSongUrl",function(e){t.songUrl=e})},methods:{getSongObjectFromYoutube:function(t){var e=this,s=this.$youtube.getIdFromURL(t);if(s!==t)return this.axios.get("https://www.googleapis.com/youtube/v3/videos",{params:{id:s,part:"snippet,contentDetails",key:"AIzaSyAtwxH_RK0NDVhNYLcTERQ9tTvAkBc01cQ"}}).then(function(t){e.ytSongObject.title=t.data.items[0].snippet.title,e.ytSongObject.thumbnail=t.data.items[0].snippet.thumbnails.medium.url,e.ytSongObject.time=e.convertYoutubeTime(t.data.items[0].contentDetails.duration),e.ytSongObject.vidId=s,e.showOrHideAddButton=!0}).catch(function(){e.showOrHideAddButton=!1,alert("Something went wrong, please refresh and try again")});this.ytSongObject.songUrl="",this.showOrHideAddButton=!1,alert("Not a valid url!")},convertYoutubeTime:function(t){var e=t.match(/PT(\d+H)?(\d+M)?(\d+S)?/),s=3600*(parseInt(e[1])||0),o=60*(parseInt(e[2])||0),n=parseInt(e[3])||0,a=new Date(1e3*(s+o+n)).toISOString().substr(11,8);return 0===s?a.substr(3):a},addSong:function(){this.$emit("addSong",JSON.parse(n()(this.ytSongObject))),this.songUrl=""}},watch:{songUrl:function(t){""!==t?this.getSongObjectFromYoutube(t):(this.showOrHideAddButton=!1,this.ytSongObject.title="")}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"ano-navigation"}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"error-handler",data:function(){return{type:"default"}},beforeRouteEnter:function(t,e,s){s(function(e){var s=e.$store.getters.getError;s?e.type=s.type:"global-error"===t.name&&(e.type=404)})},computed:{errorMessageByType:function(){return{default:"There was an error...",400:"User doesn't exists",401:"You don't have permission to view this page",404:"Page doesn't exists"}[this.type]}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"music-player",props:["songs","currentSong","currentSongIndx"],methods:{playNext:function(){var t=this.songs[this.currentSongIndx+1];t=t?{song:t,indx:this.currentSongIndx+1}:{song:this.songs[0],indx:0},this.$emit("nextSong",t)}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=s(147),n=s.n(o),a=s(150),r=s.n(a),i=s(149),l=s.n(i),u=s(151),d=s.n(u);e.default={name:"playlist",components:{"music-player":n.a,"songs-list":r.a,"related-songs-list":l.a,toolbar:d.a},data:function(){return{songsList:null,currentSong:{},currentSongIndx:0,author:this.$route.params.username,title:null,pid:this.$route.params.playlist_id,isDeleteMode:!1,slide:!1}},beforeRouteEnter:function(t,e,s){s(function(t){var e=t.$store.getters.getLoadedPlaylist;e?t.fillPlaylistData(e):t.loadPlaylist()})},methods:{loadPlaylist:function(t){var e=this;this.axios.get("/api/playlists/"+this.author+"/"+this.pid,{headers:{Authorization:"Bearer "+localStorage.getItem("jwtToken")}}).then(function(t){e.fillPlaylistData(t.data.playlist),e.$store.commit("logUserIn",t.data.authenticatedUser)}).catch(function(t){alert(t.response.data),e.$router.push("/")})},fillPlaylistData:function(t){this.songsList=t.songs,this.currentSong=t.songs[0]||{},this.title=t.title},changeSong:function(t){this.currentSongIndx=t.indx,this.currentSong=t.song},playNext:function(t){this.changeSong(t)},addSong:function(t){this.songsList.push(t),this.$toast(t.title+" was added to your playlist!",{duration:4500})},deleteSong:function(t){this.songsList.splice(t.indx,1),this.$toast(t.song.title+" was deleted from your playlist!",{duration:4500})},toggleDeleteMode:function(){this.isDeleteMode=!this.isDeleteMode},returnHome:function(){var t=this;this.slide=!0,setTimeout(function(){t.$router.push("/"+t.author+"/playlists"),t.slide=!1},500)}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=s(19);e.default={name:"related-songs-list",props:["currentSong"],data:function(){return{relatedSongs:null}},watch:{currentSong:function(t){t.vidId?this.getRelatedVideos(t.vidId):this.getRelatedVideos("d-diB65scQU")}},methods:{chooseVideo:function(t){this.$emit("changeSong",{song:{vidId:t.id.videoId}}),o.a.$emit("changeSongUrl","https://www.youtube.com/watch?v="+t.id.videoId)},getRelatedVideos:function(t){var e=this;this.axios.get("https://www.googleapis.com/youtube/v3/search",{params:{relatedToVideoId:t,part:"snippet",type:"video",maxResults:"3",key:"AIzaSyAtwxH_RK0NDVhNYLcTERQ9tTvAkBc01cQ"}}).then(function(t){e.relatedSongs=t.data.items})}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"songs-list",props:["songs","currentSong","author","pid","deleteMode"],data:function(){return{password:""}},methods:{playSong:function(t,e){this.$emit("changeSong",{song:t,indx:e})},deleteSong:function(t,e){var s=this;this.axios.delete("/api/playlists/"+this.author+"/"+this.pid,{params:{songIndx:e,password:this.$store.getters.getLoggedInUser===this.author?"":this.password||prompt("Enter playlist's password")},headers:{Authorization:"Bearer "+localStorage.getItem("jwtToken")}}).then(function(o){s.$emit("deleteSong",{indx:e,song:t})}).catch(function(t){switch("testuser"===s.author&&(alert("testuser has been reset, refreshing browser"),window.location="/testuser/playlists"),t.response.data){case"Please login again or refresh the page":s.$store.commit("logUserOut")}})}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=s(19),n=s(50),a=s.n(n);e.default={name:"playlists-tools",props:["author","pid"],components:{"get-songs-from-youtube":a.a},data:function(){return{mode:"",password:""}},mounted:function(){var t=this;o.a.$on("changeSongUrl",function(){t.mode="add"})},methods:{toggleDeleteMode:function(){this.mode="delete"===this.mode?"":"delete",this.$emit("toggleDeleteMode")},toggleAddMode:function(){"delete"===this.mode&&this.toggleDeleteMode(),this.mode="add"===this.mode?"":"add"},addSong:function(t){var e=this;this.axios.post("/api/playlists/"+this.author+"/"+this.pid,{song:t,password:this.$store.getters.getLoggedInUser===this.author?"":this.password||prompt("Enter playlist's password")},{headers:{Authorization:"Bearer "+localStorage.getItem("jwtToken")}}).then(function(s){e.$emit("addSong",t),e.toggleAddMode()}).catch(function(t){alert(t.response.data)})},showYoutube:function(){document.getElementById("yt-mp-wrapper").classList.toggle("active")}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=s(94),n=s.n(o),a=s(153),r=s.n(a),i=s(33),l=s.n(i);e.default={name:"playlists-list",components:{toolbar:r.a},data:function(){return{owner:null,playlists:null,deleteMode:!1,slide:!1,onLogout:!1}},created:function(){var t=this;this.owner=this.$route.params.username,localStorage.getItem("user")?l.a.get("/api/playlists/"+this.owner,{params:{"auth-required":!0},headers:{Authorization:"Bearer "+localStorage.getItem("jwtToken")}}).then(function(e){t.playlists=0===e.data.length?[]:e.data,t.$store.commit("logUserIn",t.owner)}).catch(function(e){switch(e.response.status){case 401:"object"===n()(e.response.data)&&e.response.data.userFromToken?(t.$store.commit("setError",{type:401}),t.$router.push("/error")):(localStorage.clear(),t.$router.push("/login"));break;case 400:t.$store.commit("setError",{type:400}),t.$router.push("/error")}t.$destroy()}):(this.$store.commit("setError",{type:401}),this.$router.push("/error"),this.$destroy())},methods:{openPlaylist:function(t,e){var s=this;this.slide=!0,setTimeout(function(){s.$router.push(s.$route.path+"/"+e),s.$store.commit("setLoadedPlaylist",t),s.slide=!1},500)},logout:function(){var t=this;this.onLogout=!0,setTimeout(function(){t.$store.commit("logUserOut"),t.$router.push("/"),t.$destroy()},550)},addNewPlaylist:function(t){this.playlists.push({title:t,password:"",songs:[]}),this.$toast('New playlist "'+t+'" has been added!',{duration:4500})},toggleDeleteMode:function(){this.deleteMode=!this.deleteMode},deletePlaylist:function(t){var e=this;confirm("Are you sure you want to delete this playlist?")&&this.axios.delete("/api/playlists/"+this.owner,{params:{pid:t,"auth-required":!0},headers:{Authorization:"Bearer "+(localStorage.getItem("jwtToken")||"")}}).then(function(){e.$toast('"'+e.playlists[t].title+'" was deleted from your list',{duration:4500}),e.playlists.splice(t,1)}).catch(function(t){alert(t.response.data)})}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"playlists-list-tools",props:["owner"],data:function(){return{mode:"",title:"",password:""}},methods:{toggleDeleteMode:function(){this.mode="delete"===this.mode?"":"delete",this.$emit("toggleDeleteMode")},toggleAddMode:function(){"delete"===this.mode&&this.toggleDeleteMode(),this.mode="add"===this.mode?"":"add"},addNewPlaylist:function(){var t=this;this.title&&this.password?this.axios.post("/api/playlists/"+this.owner,{title:this.title,password:this.password,songs:[]},{params:{"auth-required":!0},headers:{Authorization:"Bearer "+localStorage.getItem("jwtToken")}}).then(function(e){t.$emit("addNewPlaylist",t.title),t.toggleAddMode(),t.title="",t.password=""}).catch(function(t){console.log(t.response.data.message)}):alert("You must enter a title and a password first")}}}},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},,,function(t,e,s){function o(t){s(129)}var n=s(0)(s(78),s(156),o,null,null);t.exports=n.exports},function(t,e,s){function o(t){s(131)}var n=s(0)(s(79),s(158),o,null,null);t.exports=n.exports},function(t,e,s){function o(t){s(128)}var n=s(0)(s(80),s(155),o,null,null);t.exports=n.exports},function(t,e,s){function o(t){s(134)}var n=s(0)(s(82),s(161),o,null,null);t.exports=n.exports},function(t,e,s){function o(t){s(138)}var n=s(0)(s(83),s(165),o,null,null);t.exports=n.exports},function(t,e,s){var o=s(0)(s(84),s(167),null,null,null);t.exports=o.exports},function(t,e,s){function o(t){s(132)}var n=s(0)(s(85),s(159),o,null,null);t.exports=n.exports},function(t,e,s){function o(t){s(136)}var n=s(0)(s(86),s(163),o,null,null);t.exports=n.exports},function(t,e,s){function o(t){s(135)}var n=s(0)(s(87),s(162),o,null,null);t.exports=n.exports},function(t,e,s){function o(t){s(133)}var n=s(0)(s(88),s(160),o,null,null);t.exports=n.exports},function(t,e,s){function o(t){s(130)}var n=s(0)(s(89),s(157),o,null,null);t.exports=n.exports},function(t,e,s){function o(t){s(139)}var n=s(0)(s(90),s(166),o,null,null);t.exports=n.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{class:t.route,attrs:{id:"app"}},[s("router-view",{attrs:{name:"ano-navigation"}}),t._v(" "),s("keep-alive",{attrs:{include:"playlists-list, playlist"}},[s("router-view")],1)],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"example-playlist-creator"},[s("div",{staticClass:"steps"},[s("div",{directives:[{name:"show",rawName:"v-show",value:1===t.currentStep,expression:"currentStep === 1"}],staticClass:"s1"},[s("h1",[t._v(" Create your first playlist ")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.pTitle,expression:"pTitle",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:"Enter playlist's name"},domProps:{value:t.pTitle},on:{input:function(e){e.target.composing||(t.pTitle=e.target.value.trim())},blur:function(e){t.$forceUpdate()}}}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.pPassword,expression:"pPassword"}],attrs:{type:"password",placeholder:"Enter playlist's password"},domProps:{value:t.pPassword},on:{input:function(e){e.target.composing||(t.pPassword=e.target.value)}}})]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:2===t.currentStep,expression:"currentStep === 2"}],staticClass:"s2"},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.playlistAddedSongs.length<3,expression:"playlistAddedSongs.length < 3"}],staticClass:"add-songs"},[s("h1",[t._v(" Add a few songs ")]),t._v(" "),s("get-songs-from-youtube",{attrs:{mode:"list"},on:{addSong:t.addSong}})],1),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:3===t.playlistAddedSongs.length,expression:"playlistAddedSongs.length === 3"}]},[s("h1",[t._v(" Add more later... ")])]),t._v(" "),s("ul",{staticClass:"added-songs-list"},t._l(t.playlistAddedSongs,function(e){return s("li",{domProps:{textContent:t._s(e.title)}})}))]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:3===t.currentStep,expression:"currentStep === 3"}],staticClass:"s3"},[s("h1",[t._v(" Create an account ")]),t._v(" "),s("router-link",{staticClass:"btn-newAccount",attrs:{to:"/sign-up",tag:"button"}},[t._v("Click to create a new account!")]),t._v(" "),s("span",[t._v(" (Your playlist will be created and saved automatically) ")])],1)]),t._v(" "),s("div",{staticClass:"arrows"},[s("i",{directives:[{name:"show",rawName:"v-show",value:t.currentStep>1&&t.currentStep<=3,expression:"currentStep > 1 && currentStep <= 3"}],staticClass:"material-icons left",on:{click:function(e){t.currentStep-=1}}},[t._v("arrow_back")]),t._v(" "),s("i",{directives:[{name:"show",rawName:"v-show",value:t.currentStep>=1&&t.currentStep<3,expression:"currentStep >= 1 && currentStep < 3"}],staticClass:"material-icons right",on:{click:function(e){t.currentStep+=1}}},[t._v("arrow_forward")])])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"authentication"},[s("div",{staticClass:"authentication-form"},[s("h1",[t._v(" Login ")]),t._v(" "),s("form",[s("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.userName,expression:"userName",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:"Enter username"},domProps:{value:t.userName},on:{input:function(e){e.target.composing||(t.userName=e.target.value.trim())},blur:function(e){t.$forceUpdate()}}}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.userPassword,expression:"userPassword"}],attrs:{type:"password",placeholder:"Enter password"},domProps:{value:t.userPassword},on:{input:function(e){e.target.composing||(t.userPassword=e.target.value)}}}),t._v(" "),s("button",{on:{click:function(e){e.preventDefault(),t.Login(e)}}},[t._v("Log In")])])])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{directives:[{name:"show",rawName:"v-show",value:t.owner,expression:"owner"}],staticClass:"user-playlists"},[s("div",{staticClass:"header"},[s("div",{staticClass:"title"},[t._v(" "+t._s(t.owner)+"'s Playlists")]),t._v(" "),s("span",{staticClass:"btn-logout",on:{click:t.logout}},[t._v("Logout")])]),t._v(" "),s("toolbar",{attrs:{owner:t.owner},on:{addNewPlaylist:t.addNewPlaylist,toggleDeleteMode:t.toggleDeleteMode}}),t._v(" "),s("transition-group",{staticClass:"playlists-wrapper",attrs:{name:"playlists-list",tag:"div"}},t._l(t.playlists,function(e,o){return s("div",{key:o,staticClass:"playlist-box",on:{click:function(s){t.openPlaylist(e,o)}}},[e.songs[0]?s("img",{attrs:{src:e.songs[0].thumbnail}}):t._e(),t._v(" "),s("span",{staticClass:"p-size",domProps:{textContent:t._s(e.songs.length+" Videos")}}),t._v(" "),s("span",{staticClass:"p-title",domProps:{textContent:t._s(e.title)}}),t._v(" "),s("i",{directives:[{name:"show",rawName:"v-show",value:t.deleteMode,expression:"deleteMode"}],staticClass:"material-icons btn-delete",on:{click:function(e){e.stopPropagation(),t.deletePlaylist(o)}}},[t._v("delete")])])})),t._v(" "),t.playlists&&0===t.playlists.length?s("p",{staticClass:"nothing-here"},[t._v(" Nothing here yet.. ")]):t._e(),t._v(" "),s("div",{staticClass:"slider-cover",class:{active:t.slide}}),t._v(" "),s("div",{staticClass:"logout-cover",class:{active:t.onLogout}})],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"authentication"},[s("div",{staticClass:"authentication-form"},[s("h1",[t._v(" Sign Up ")]),t._v(" "),s("ul",t._l(t.errors,function(e){return s("li",{domProps:{textContent:t._s(e)}})})),t._v(" "),s("form",[s("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.userName,expression:"userName",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:"Enter username"},domProps:{value:t.userName},on:{input:function(e){e.target.composing||(t.userName=e.target.value.trim())},blur:function(e){t.$forceUpdate()}}}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.userEmail,expression:"userEmail",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:"Enter Email"},domProps:{value:t.userEmail},on:{input:function(e){e.target.composing||(t.userEmail=e.target.value.trim())},blur:function(e){t.$forceUpdate()}}}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.userPassword,expression:"userPassword"}],attrs:{type:"password",placeholder:"Enter password"},domProps:{value:t.userPassword},on:{input:function(e){e.target.composing||(t.userPassword=e.target.value)}}}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.passwordMatch,expression:"passwordMatch"}],attrs:{type:"password",placeholder:"Enter password again"},domProps:{value:t.passwordMatch},on:{input:function(e){e.target.composing||(t.passwordMatch=e.target.value)}}}),t._v(" "),s("button",{on:{click:function(e){e.preventDefault(),t.signUp(e)}}},[t._v("Sign Up")])])])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"playlist-page"},[s("div",{staticClass:"col left"},[s("div",{staticClass:"playlist-details"},[s("div",{staticClass:"author-wrapper",on:{click:t.returnHome}},[s("span",{domProps:{textContent:t._s(t.author)}})]),t._v(" "),s("toolbar",{attrs:{author:t.author,pid:t.pid},on:{addSong:t.addSong,toggleDeleteMode:t.toggleDeleteMode}}),t._v(" "),s("span",{staticClass:"title"},[t._v(t._s(t.title))])],1),t._v(" "),s("songs-list",{attrs:{songs:t.songsList,"current-song":t.currentSong,author:t.author,pid:t.pid,deleteMode:t.isDeleteMode},on:{deleteSong:t.deleteSong,changeSong:t.changeSong}})],1),t._v(" "),s("div",{staticClass:"col right",attrs:{id:"yt-mp-wrapper"}},[s("music-player",{attrs:{songs:t.songsList,"current-song":t.currentSong,"current-song-indx":t.currentSongIndx},on:{nextSong:t.playNext}}),t._v(" "),s("related-songs-list",{attrs:{"current-song":t.currentSong},on:{changeSong:t.changeSong}})],1),t._v(" "),s("div",{staticClass:"slider-cover",class:{active:t.slide}})])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"playlist-tools pt"},[s("div",{staticClass:"tool",on:{click:t.toggleAddMode}},[s("i",{staticClass:"material-icons"},[t._v("add")])]),t._v(" "),s("div",{staticClass:"tool",on:{click:t.toggleDeleteMode}},[s("i",{staticClass:"material-icons"},[t._v("delete")])]),t._v(" "),s("div",{staticClass:"tool show-yt",on:{click:t.showYoutube}},[s("i",{staticClass:"material-icons"},[t._v("music_video")])]),t._v(" "),s("router-link",{staticClass:"tool",attrs:{to:"/"}},[s("i",{staticClass:"material-icons home"},[t._v("home")])]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:"add"===t.mode,expression:"mode === 'add'"}],staticClass:"add-box"},[s("get-songs-from-youtube",{attrs:{mode:"playlist"},on:{addSong:t.addSong}})],1)],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"ano-nav"},[s("ul",[s("li",[s("router-link",{attrs:{to:"/"}},[t._v("Home")])],1),t._v(" "),t._m(0),t._v(" "),s("li",[s("router-link",{attrs:{to:"/login"}},[t._v("Login")])],1),t._v(" "),s("li",[s("router-link",{attrs:{to:"/sign-up"}},[t._v("Sign Up")])],1)])])},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("li",[s("span",{staticClass:"divider"})])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("transition-group",{attrs:{name:"song-list",tag:"div",id:"playlist-list"}},t._l(t.songs,function(e,o){return s("div",{key:o,staticClass:"song-item",class:t.currentSong===e?"active":"",on:{click:function(s){t.playSong(e,o)}}},[s("div",{staticClass:"song-title"},[s("i",{directives:[{name:"show",rawName:"v-show",value:t.deleteMode,expression:"deleteMode"}],staticClass:"material-icons",on:{click:function(s){s.stopPropagation(),t.deleteSong(e,o)}}},[t._v("delete")]),t._v(" "),s("span",{domProps:{textContent:t._s(e.title)}})]),t._v(" "),s("span",{staticClass:"song-time",domProps:{textContent:t._s(e.time)}})])}))},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"related-list"},t._l(t.relatedSongs,function(e){return s("div",{staticClass:"song",on:{click:function(s){t.chooseVideo(e)}}},[s("img",{attrs:{src:e.snippet.thumbnails.medium.url}}),t._v(" "),s("p",{domProps:{textContent:t._s(e.snippet.title)}})])}))},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"songs-from-youtube-box"},[s("label",{staticClass:"yt-label",attrs:{for:"yt-url"}},[t._v("Ex: https://www.youtube.com/watch?v=d_HlPboLRL8")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.songUrl,expression:"songUrl",modifiers:{trim:!0}}],staticClass:"yt-url",attrs:{type:"text",placeholder:"Song's URL",name:"yt-url"},domProps:{value:t.songUrl},on:{input:function(e){e.target.composing||(t.songUrl=e.target.value.trim())},blur:function(e){t.$forceUpdate()}}}),t._v(" "),s("i",{directives:[{name:"show",rawName:"v-show",value:t.showOrHideAddButton,expression:"showOrHideAddButton"}],staticClass:"material-icons add-icon",on:{click:t.addSong}},[t._v("add_circle_outline")]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.ytSongObject.title,expression:"ytSongObject.title"}],staticClass:"yt-video-details"},[s("img",{attrs:{src:t.ytSongObject.thumbnail}}),t._v(" "),s("p",{domProps:{textContent:t._s(t.ytSongObject.title)}})])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"error-page"},[t.type?s("h1",{domProps:{textContent:t._s(t.errorMessageByType)}}):t._e(),t._v(" "),s("router-link",{staticClass:"btn-circle",attrs:{to:"/",tag:"div"}},[s("i",{staticClass:"material-icons home"},[t._v("home")])])],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"playlists-list-tools"},[s("div",{staticClass:"tool",on:{click:t.toggleAddMode}},[s("i",{staticClass:"material-icons"},[t._v("add")])]),t._v(" "),s("div",{staticClass:"tool",on:{click:t.toggleDeleteMode}},[s("i",{staticClass:"material-icons"},[t._v("delete")])]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:"add"===t.mode,expression:"mode === 'add'"}],staticClass:"add-box"},[s("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.title,expression:"title",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:"Title"},domProps:{value:t.title},on:{input:function(e){e.target.composing||(t.title=e.target.value.trim())},blur:function(e){t.$forceUpdate()}}}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{type:"password",placeholder:"Password"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}}),t._v(" "),s("button",{on:{click:t.addNewPlaylist}},[s("i",{staticClass:"material-icons"},[t._v("check")])])])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"music-player"},[s("youtube",{attrs:{"video-id":t.currentSong.vidId||"",mute:!0,"player-vars":{autoplay:1},"player-width":400,"player-height":250},on:{ended:t.playNext}})],1)},staticRenderFns:[]}}]),[76]);
//# sourceMappingURL=app.04f6603ed39c7647b82e.js.map