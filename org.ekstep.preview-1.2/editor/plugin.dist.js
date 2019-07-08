org.ekstep.pluginframework.pluginManager.registerPlugin({"id":"org.ekstep.preview","ver":"1.2","author":"Sunil A S","title":"preview","description":"","publishedDate":"","editor":{"main":"editor/plugin.js","menu":[],"dependencies":[{"type":"css","src":"editor/style.css"}]}},org.ekstep.contenteditor.basePlugin.extend({type:"preview",previewURL:(ecEditor.getConfig("previewURL")||"/content/preview/preview.html")+"?webview=true",contentBody:void 0,initialize:function(){ecEditor.addEventListener("atpreview:show",this.initPreview,this);var e=document.createElement("div");e.classList.add("preview-modal"),e.id="contentPreview",e.innerHTML='<div class="preview-modal-content"><div class="preview-modal-wrapper"><div class="child preview-bgimage"></div><div class="child preview-iframe"><iframe id="previewContentIframe" width=100% height=100%></iframe></div></div>',document.body.appendChild(e)},initPreview:function(e,t){console.log("data",t),this.contentBody=t.contentBody,t.currentStage&&(this.contentBody.theme.startStage=ecEditor.getCurrentStage().id),ecEditor.getAngularScope().developerMode&&(this.contentBody.theme["plugin-manifest"]||(this.contentBody.theme["plugin-manifest"]={plugin:[]}),_.isArray(this.contentBody.theme["plugin-manifest"].plugin)||(this.contentBody.theme["plugin-manifest"].plugin=[this.contentBody.theme["plugin-manifest"].plugin]),this.contentBody.theme["plugin-manifest"].plugin.splice(0,0,{id:"org.ekstep.developer",ver:"1.0",type:"plugin",hostPath:org.ekstep.pluginframework.hostRepo.basePath,preload:!0})),this.showPreview(t)},getConfiguration:function(){var e={},t={},i={repos:ecEditor.getConfig("pluginRepo"),showEndpage:!0},n=ecEditor.getService("content").getContentMeta(ecEditor.getContext("contentId"));return e.etags=ecEditor.getContext("etags")||[],t.context={mode:"edit",contentId:ecEditor.getContext("contentId"),sid:ecEditor.getContext("sid"),uid:ecEditor.getContext("uid"),channel:ecEditor.getContext("channel")||"in.ekstep",pdata:ecEditor.getContext("pdata")||{id:"in.ekstep",pid:"",ver:"1.0"},app:e.etags.app||[],dims:e.etags.dims||[],partner:e.etags.partner||[]},ecEditor.getConfig("previewConfig")?t.config=ecEditor.getConfig("previewConfig"):t.config=i,t.metadata=n,t.data="application/vnd.ekstep.ecml-archive"==n.mimeType?this.contentBody:{},t},showPreview:function(e){var t=this,i=t.getConfiguration(),n=ecEditor.jQuery("#previewContentIframe")[0];if(e.parentElement)i.config.showEndPage=i.config.showEndPage||!1,n=ecEditor.jQuery(e.element)[0];else{var o=ecEditor.resolvePluginResource(t.manifest.id,t.manifest.ver,"editor/images/editor-frame.png");ecEditor.jQuery(".preview-bgimage").css("background","url("+o+")")}ecEditor._.isEmpty(n.src)?(n.src=t.previewURL,n.onload=function(){n.contentWindow.initializePreview(i)}):n.contentWindow.initializePreview(i);var r=document.getElementById("contentPreview"),d=document.getElementsByClassName("preview-modal-content")[0];e.parentElement||(r.style.display="block"),window.onclick=function(e){e.target==d&&(r.style.display="none",n.contentWindow.EkstepRendererAPI.stopAll(),n.contentWindow.EkstepRendererAPI.removeHtmlElements(),ecEditor.dispatchEvent("org.ekstep.contenteditor:preview:close"))}}}))