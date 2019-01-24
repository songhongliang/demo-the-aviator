window.__require=function e(t,i,n){function s(a,r){if(!i[a]){if(!t[a]){var c=a.split("/");if(c=c[c.length-1],!t[c]){var h="function"==typeof __require&&__require;if(!r&&h)return h(c,!0);if(o)return o(c,!0);throw new Error("Cannot find module '"+a+"'")}}var l=i[a]={exports:{}};t[a][0].call(l.exports,function(e){return s(t[a][1][e]||e)},l,l.exports,e,t,i,n)}return i[a].exports}for(var o="function"==typeof __require&&__require,a=0;a<n.length;a++)s(n[a]);return s}({box:[function(e,t,i){"use strict";cc._RF.push(t,"a70270Fvd9Mn66Upk302M+8","box");var n=e("./primitive");cc.Class({extends:n,properties:{width:{default:100,notify:function(){this.delayInit()}},height:{default:100,notify:function(){this.delayInit()}},length:{default:100,notify:function(){this.delayInit()}}},_createData:function(){return cc.primitive.box(this.width,this.height,this.length)}}),cc._RF.pop()},{"./primitive":"primitive"}],cylinder:[function(e,t,i){"use strict";cc._RF.push(t,"44dc5bGoJVG973D/qrBQr94","cylinder");var n=e("./primitive");cc.Class({extends:n,properties:{radiusTop:{default:30,notify:function(){this.delayInit()}},radiusBottom:{default:30,notify:function(){this.delayInit()}},height:{default:100,notify:function(){this.delayInit()}},radialSegments:{default:32,notify:function(){this.delayInit()}},heightSegments:{default:1,notify:function(){this.delayInit()}}},_createData:function(){return cc.primitive.cylinder(this.radiusTop,this.radiusBottom,this.height,{radialSegments:this.radialSegments,heightSegments:this.heightSegments})}}),cc._RF.pop()},{"./primitive":"primitive"}],"enemy-manager":[function(e,t,i){"use strict";cc._RF.push(t,"09ddf+1UthOJqlpZy+ajb5j","enemy-manager");var n=e("./primitive/primitive");cc.Class({extends:cc.Component,properties:{enemyCount:10,enemyColor:cc.color().fromHEX("0xf25346"),rotateSpeed:360},_initMesh:function(){var e=cc.primitive.polyhedron?cc.primitive.polyhedron(4,8):cc.primitive.box(8,8,8),t=n.createMesh(e,this.enemyColor);this._mesh=t},start:function(){this._initMesh(),this.enemies=[];for(var e=this.enemyPool=[],t=0;t<this.enemyCount;t++){var i=this.createEnemy();e.push(i)}this.spawnEnemy(),window.game.node.on("level-upgrade",this.spawnEnemy,this),window.game.node.on("collide-enemy",this.onCollider,this)},createEnemy:function(){return window.game.createMeshNode("enemy",this._mesh,!0)},spawnEnemy:function(){for(var e=window.game.level,t=this.enemyPool,i=this.enemies,n=0;n<e;n++){var s=t.pop();s||(s=this.createEnemy());var o=-window.game.angles.z-.1*n,a=game.seaHeight+game.playerDefaultY+(2*Math.random()-1)*(game.playerYRange-20);s.x=Math.cos(o)*a,s.y=Math.sin(o)*a,s.parent=this.node,i.push(s)}},onCollider:function(e){var t=e.enemy;this.enemies.splice(this.enemies.indexOf(t),1),this.enemyPool.push(t),t.parent=null},update:function(e){for(var t=this.enemies,i=0;i<t.length;i++){var n=t[i];n._eulerAngles.x+=Math.random(),n._eulerAngles.y+=Math.random(),n.eulerAngles=n._eulerAngles}}}),cc._RF.pop()},{"./primitive/primitive":"primitive"}],game:[function(e,t,i){"use strict";cc._RF.push(t,"b201btp/JxCdaQYiSCLDnTl","game"),t.exports=cc.Class({extends:cc.Component,properties:{playerXRange:100,playerYRange:80,playerDefaultY:100,seaHeight:600,skyHeight:150,skyHeightRange:200,world:cc.Node,speed:30,ratioSpeedDistance:.05,material:cc.Material,levelDistance:1e3,distanceLabel:cc.Label,levelLabel:cc.Label,energyProgress:cc.ProgressBar,collisionDistance:15,energy:1,collisionDamage:.1,player:cc.Node,enemyManager:cc.Node},onLoad:function(){window.game=this,this.reset()},reset:function(){this.angles=cc.v3(),this.distance=0,this.lastLevelDistance=0,this.level=1},createMeshNode:function(e,t,i){var n=new cc.Node(e);n.is3DNode=!0;var s=n.addComponent(cc.MeshRenderer);return s.setMaterial(0,this.material),s.mesh=t,s.shadowCastingMode=!!i&&cc.MeshRenderer.ShadowCastingMode.ON,n},update:function(e){this.angles.z+=this.speed*e,this.world.eulerAngles=this.angles,this.checkCollision();var t=this.speed*e*this.ratioSpeedDistance;this.distance+=t,this.lastLevelDistance+=t,this.lastLevelDistance>this.levelDistance&&(this.level++,this.lastLevelDistance=this.lastLevelDistance%this.levelDistance,this.speed*=1.1,this.node.emit("level-upgrade")),this.updateUI()},updateUI:function(){this.distanceLabel.string=0|this.distance,this.levelLabel.string=this.level,function(e,t){return Math.abs(e-t)<1e-5}(this.energyProgress.progress,this.energy)||(this.energyProgress.progress-=this.collisionDamage/20)},checkCollision:function(){var e=cc.v2(),t=cc.v2(),i=cc.v2(),n=cc.v2();return function(){t=this.player.convertToWorldSpaceAR(e,t);for(var s=this.enemyManager.getComponent("enemy-manager").enemies,o=0;o<s.length;o++){var a=s[o];i=s[o].convertToWorldSpaceAR(e,i);var r=t.sub(i,n).mag();if(r<this.collisionDistance){this.energy-=this.collisionDamage,this.node.emit("collide-enemy",{dif:n,enemy:a,distance:r});break}}}}()}),cc._RF.pop()},{}],"player-control":[function(e,t,i){"use strict";function n(e,t,i,n,s){return n+(Math.max(Math.min(e,i),t)-t)/(i-t)*(s-n)}cc._RF.push(t,"d53b1LPmLJOtL/2J/ZOSrA7","player-control"),cc.Class({extends:cc.Component,properties:{moveSensivity:5,rotXSensivity:.8,rotZSensivity:.4,camera:cc.Camera,cameraSensivity:2},onLoad:function(){this.reset()},reset:function(){this.angles=cc.v3(),this.node.position=cc.v3(0,game.playerDefaultY,0),this.touchPos=cc.v2(),this.planeCollisionDisplacementX=0,this.planeCollisionSpeedX=0,this.planeCollisionDisplacementY=0,this.planeCollisionSpeedY=0},start:function(){var e=cc.find("Canvas");e.on(cc.Node.EventType.TOUCH_MOVE,this.onTouchMove,this),e.on(cc.Node.EventType.MOUSE_MOVE,this.onMoseMove,this),window.game.node.on("collide-enemy",this.onCollider,this)},onTouchMove:function(e){var t=e.getTouches();this._setTouchPos(t[0].getLocation())},onMoseMove:function(e){this._setTouchPos(e.getLocation())},onCollider:function(e){var t=e.dif,i=e.distance;this.planeCollisionSpeedX=150*t.x/i,this.planeCollisionSpeedY=150*t.y/i},_setTouchPos:function(e){this.touchPos.x=e.x/cc.visibleRect.width*2-1,this.touchPos.y=e.y/cc.visibleRect.height*2-1},update:function(e){var t=this.touchPos,i=n(t.y,-.75,.75,game.playerDefaultY-game.playerYRange,game.playerDefaultY+game.playerYRange),s=n(t.x,-1,1,.7*-game.playerXRange,-game.playerXRange);this.planeCollisionDisplacementX+=this.planeCollisionSpeedX,s+=this.planeCollisionDisplacementX,this.planeCollisionDisplacementY+=this.planeCollisionSpeedY,i+=this.planeCollisionDisplacementY,this.node.y+=(i-this.node.y)*e*this.moveSensivity,this.node.x+=(s-this.node.x)*e*this.moveSensivity,this.angles.z=(i-this.node.y)*e*this.rotZSensivity,this.angles.x=(this.node.y-i)*e*this.rotXSensivity,this.node.eulerAngles=this.angles,this.planeCollisionSpeedX+=(0-this.planeCollisionSpeedX)*e*30,this.planeCollisionDisplacementX+=(0-this.planeCollisionDisplacementX)*e*10,this.planeCollisionSpeedY+=(0-this.planeCollisionSpeedY)*e*30,this.planeCollisionDisplacementY+=(0-this.planeCollisionDisplacementY)*e*10;var o=this.camera;o.fov=n(t.x,-1,1,40,80),o.node.y+=(this.node.y-o.node.y)*e*this.cameraSensivity}}),cc._RF.pop()},{}],primitive:[function(e,t,i){"use strict";cc._RF.push(t,"17327Iro65DFIL3lynXAorV","primitive");var n=cc.Class({extends:cc.Component,editor:{executeInEditMode:!0,requireComponent:cc.MeshRenderer},properties:{color:{default:cc.Color.WHITE,notify:function(){this.delayInit()}}},onLoad:function(){this.init()},init:function(){var e=this._createData(),t=n.createMesh(e,this.color);this.getComponent(cc.MeshRenderer).mesh=t,this.data=e,this._delatIniting=!1},delayInit:function(){this._delatIniting||(this._delatIniting=!0,this.scheduleOnce(this.init))},_createData:function(){return{}}});n.createMesh=function(e,t){for(var i=cc.gfx,n=new i.VertexFormat([{name:i.ATTR_POSITION,type:i.ATTR_TYPE_FLOAT32,num:3},{name:i.ATTR_NORMAL,type:i.ATTR_TYPE_FLOAT32,num:3},{name:i.ATTR_COLOR,type:i.ATTR_TYPE_UINT8,num:4,normalize:!0}]),s=[],o=0;o<e.positions.length;o++)s.push(t);var a=new cc.Mesh;return a.init(n,e.positions.length),a.setVertices(i.ATTR_POSITION,e.positions),a.setVertices(i.ATTR_NORMAL,e.normals),a.setVertices(i.ATTR_COLOR,s),a.setIndices(e.indices),a.setBoundingBox(e.minPos,e.maxPos),a},t.exports=n,cc._RF.pop()},{}],propeller:[function(e,t,i){"use strict";cc._RF.push(t,"cb92dR/FtVI558n2xXaixEz","propeller"),cc.Class({extends:cc.Component,properties:{rotateSpeed:360},start:function(){this.angles=cc.v3()},update:function(e){this.angles.x+=this.rotateSpeed*e,this.node.eulerAngles=this.angles}}),cc._RF.pop()},{}],"scene-ambient":[function(e,t,i){"use strict";cc._RF.push(t,"f8bd8ThP5VFOrMtn2xMutCw","scene-ambient"),cc.Class({extends:cc.Component,editor:{executeInEditMode:!0},properties:{_ambient:cc.Color,ambient:{get:function(){return this._ambient},set:function(e){this._ambient=e,this._updateSceneAmbient()}}},start:function(){this._updateSceneAmbient()},_updateSceneAmbient:function(){cc.renderer._forward.sceneAmbient=this.ambient}}),cc._RF.pop()},{}],sea:[function(e,t,i){"use strict";cc._RF.push(t,"786dftT62NLJKOjBpXgOP5B","sea"),cc.Class({extends:cc.Component,properties:{rotateSpeed:360,wavesMinAmp:5,wavesMaxAmp:20,wavesMinSpeed:.001,wavesMaxSpeed:.003},start:function(){this.node._eulerAngles=cc.v3(-90,0,0);var e=this.data=this.getComponent("cylinder").data;this.mesh=this.getComponent(cc.MeshRenderer).mesh,this.waves=[];for(var t=e.positions,i=0,n=e.positions.length;i<n;i+=3)this.waves.push({x:t[i],y:t[i+1],z:t[i+2],ang:Math.random()*Math.PI*2,amp:this.wavesMinAmp+Math.random()*(this.wavesMaxAmp-this.wavesMinAmp),speed:this.wavesMinSpeed+Math.random()*(this.wavesMaxSpeed-this.wavesMinSpeed)});this.loopCylinder()},loopCylinder:function(){for(var e=this.getComponent("cylinder"),t=e.heightSegments,i=e.radialSegments,n=e.data.indices,s=n.length,o=i+1,a=0;a<t;++a){var r=a*o+i,c=(a+1)*o+i,h=(a+1)*o,l=a*o;n[s]=r,n[++s]=l,n[++s]=c,n[++s]=l,n[++s]=h,n[++s]=c,++s}this.mesh.setIndices(n)},update:function(e){for(var t=this.data.positions,i=0,n=t.length;i<n;i+=3){var s=this.waves[i/3];t[i]=s.x+Math.cos(s.ang)*s.amp,t[i+1]=s.y+Math.sin(s.ang)*s.amp,s.ang+=s.speed*e}this.mesh.setVertices(cc.gfx.ATTR_POSITION,t)}}),cc._RF.pop()},{}],sky:[function(e,t,i){"use strict";cc._RF.push(t,"857eaB/7qJL5YogoKjv/zE1","sky");var n=e("./primitive/primitive"),s=cc.v3();cc.Class({extends:cc.Component,properties:{cloudCount:20,cloudColor:cc.color().fromHEX("0xF7D9AA"),rotateSpeed:360},start:function(){this._initMesh();for(var e=new Array(this.cloudCount),t=2*Math.PI/this.cloudCount,i=0;i<this.cloudCount;i++){var n=this.createCloud();e[i]=n;var o=t*i,a=game.seaHeight+game.skyHeight+Math.random()*game.skyHeightRange;n.y=Math.sin(o)*a,n.x=Math.cos(o)*a,n.z=-300-500*Math.random(),s.x=s.y=0,s.z=o+Math.PI/2,n.eulerAngles=s,n.scale=1+2*Math.random(),n.parent=this.node}this.clouds=e},_initMesh:function(){var e=cc.primitive.box(1,1,1),t=n.createMesh(e,this.cloudColor);this._mesh=t},createCloud:function(){var e=new cc.Node("cloud");e.is3DNode=!0;for(var t=3+Math.floor(3*Math.random()),i=0;i<t;i++){var n=window.game.createMeshNode("barrier",this._mesh);n.x=15*i,n.y=10*Math.random(),n.z=10*Math.random();var s=cc.v3();s.z=Math.random()*Math.PI*2,s.y=Math.random()*Math.PI*2,n._eulerAngles=s,n.scale=20*(.3+.7*Math.random()),n.parent=e}return e},update:function(e){for(var t=0;t<this.clouds.length;t++)for(var i=this.clouds[t],n=0;n<i.children.length;n++){var s=i.children[n];s._eulerAngles.z+=.5*Math.random()*(n+1),s._eulerAngles.y+=.2*Math.random()*(n+1),s.eulerAngles=s._eulerAngles}}}),cc._RF.pop()},{"./primitive/primitive":"primitive"}],sphere:[function(e,t,i){"use strict";cc._RF.push(t,"ce4b6wXjklDp5eO/hh8VSzY","sphere");var n=e("./primitive");cc.Class({extends:n,properties:{radius:{default:25,notify:function(){this.delayInit()}},segments:{default:32,notify:function(){this.delayInit()}}},_createData:function(){return cc.primitive.sphere(this.radius,{segments:this.segments})}}),cc._RF.pop()},{"./primitive":"primitive"}]},{},["enemy-manager","game","player-control","box","cylinder","primitive","sphere","propeller","scene-ambient","sea","sky"]);