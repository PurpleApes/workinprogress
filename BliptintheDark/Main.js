(function ($hx_exports) { "use strict";
$hx_exports.promhx = $hx_exports.promhx || {};
var console = (1,eval)('this').console || {log:function(){}};
var $hxClasses = {},$estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = ["EReg"];
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,__class__: EReg
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.strDate = function(s) {
	var _g = s.length;
	switch(_g) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k1 = s.split("-");
		return new Date(k1[0],k1[1] - 1,k1[2],0,0,0);
	case 19:
		var k2 = s.split(" ");
		var y = k2[0].split("-");
		var t = k2[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw "Invalid date format : " + s;
	}
};
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = ["Lambda"];
Lambda.exists = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
};
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = ["List"];
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,pop: function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		if(this.h == null) this.q = null;
		this.length--;
		return x;
	}
	,isEmpty: function() {
		return this.h == null;
	}
	,iterator: function() {
		return new _List.ListIterator(this.h);
	}
	,__class__: List
};
var _List = {};
_List.ListIterator = function(head) {
	this.head = head;
	this.val = null;
};
$hxClasses["_List.ListIterator"] = _List.ListIterator;
_List.ListIterator.__name__ = ["_List","ListIterator"];
_List.ListIterator.prototype = {
	hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		this.val = this.head[0];
		this.head = this.head[1];
		return this.val;
	}
	,__class__: _List.ListIterator
};
Math.__name__ = ["Math"];
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
};
Reflect.deleteField = function(o,field) {
	if(!Object.prototype.hasOwnProperty.call(o,field)) return false;
	delete(o[field]);
	return true;
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
Std.parseFloat = function(x) {
	return parseFloat(x);
};
Std.random = function(x) {
	if(x <= 0) return 0; else return Math.floor(Math.random() * x);
};
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	add: function(x) {
		this.b += Std.string(x);
	}
	,__class__: StringBuf
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
var ValueType = $hxClasses["ValueType"] = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] };
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	return js.Boot.getClass(o);
};
Type.getClassName = function(c) {
	var a = c.__name__;
	if(a == null) return null;
	return a.join(".");
};
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
};
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
};
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
};
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		return Reflect.callMethod(e,f,params);
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	return f;
};
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
};
Type["typeof"] = function(v) {
	var _g = typeof(v);
	switch(_g) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = js.Boot.getClass(v);
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
};
var com = {};
com.fermmtools = {};
com.fermmtools.utils = {};
com.fermmtools.utils.ObjectHash = function() {
	this.ival = new haxe.ds.IntMap();
	this.length = 0;
};
$hxClasses["com.fermmtools.utils.ObjectHash"] = com.fermmtools.utils.ObjectHash;
com.fermmtools.utils.ObjectHash.__name__ = ["com","fermmtools","utils","ObjectHash"];
com.fermmtools.utils.ObjectHash.prototype = {
	set: function(k,v) {
		var oid = this.getObjectId(k);
		var g = this.ival.get(oid);
		if(g == null) {
			g = [];
			this.ival.set(oid,g);
		}
		var i = 0;
		var len = g.length;
		while(i < len) {
			if(g[i] == k) {
				g[i + 1] = v;
				return;
			}
			i += 2;
		}
		g.push(k);
		g.push(v);
		this.length++;
	}
	,getObjectId: function(obj) {
		if(js.Boot.__instanceof(obj,Class)) {
			if(obj.__cls_id__ == null) obj.__cls_id__ = com.fermmtools.utils.ObjectHash.clsId++;
			return obj.__cls_id__;
		} else {
			if(obj.__get_id__ == null) {
				var cls = Type.getClass(obj);
				if(cls == null) {
					var id = Std.random(2147483647);
					obj.__get_id__ = function() {
						return id;
					};
					return id;
				}
				var fstid = Std.random(2147483647);
				var _this = this;
				cls.prototype.__get_id__ = function() {
					if(_this.___id___ == null) return _this.___id___ = Std.random(2147483647);
					return _this.___id___;
				};
			}
			return obj.__get_id__();
		}
	}
	,get: function(k) {
		if(k == null) return null;
		var oid = this.getObjectId(k);
		var g = this.ival.get(oid);
		if(g == null) return null;
		var i = 0;
		var len = g.length;
		while(i < len) {
			if(g[i] == k) return g[i + 1];
			i += 2;
		}
		return null;
	}
	,exists: function(k) {
		var oid = this.getObjectId(k);
		var removed = false;
		var g = this.ival.get(oid);
		if(g == null) return false;
		var i = 0;
		var len = g.length;
		while(i < len) {
			if(g[i] == k) return true;
			i += 2;
		}
		return false;
	}
	,'delete': function(k) {
		var oid = this.getObjectId(k);
		var removed = false;
		var g = this.ival.get(oid);
		if(g == null) return false;
		var i = 0;
		var len = g.length;
		while(i < len) {
			if(g[i] == k) {
				g.splice(i,2);
				removed = true;
				this.length--;
				break;
			}
			i += 2;
		}
		if(g.length == 0) this.ival.remove(oid);
		return removed;
	}
	,keys: function() {
		var valit = this.ival.iterator();
		var curr = null;
		var currIndex = 0;
		return { hasNext : function() {
			return curr != null || valit.hasNext();
		}, next : function() {
			if(curr == null) curr = valit.next();
			var ret = curr[currIndex];
			currIndex += 2;
			if(currIndex >= curr.length) {
				currIndex = 0;
				curr = null;
			}
			return ret;
		}};
	}
	,values: function() {
		var valit = this.ival.iterator();
		var curr = null;
		var currIndex = 1;
		return { hasNext : function() {
			return curr != null || valit.hasNext();
		}, next : function() {
			if(curr == null) curr = valit.next();
			var ret = curr[currIndex];
			currIndex += 2;
			if(currIndex >= curr.length) {
				currIndex = 1;
				curr = null;
			}
			return ret;
		}};
	}
	,iterator: function() {
		return this.keys();
	}
	,toString: function() {
		var ret = new StringBuf();
		ret.b += "{ ";
		var first = true;
		var $it0 = this.keys();
		while( $it0.hasNext() ) {
			var k = $it0.next();
			if(first) {
				ret.b += "\"";
				first = false;
			} else ret.b += ", \"";
			ret.b += Std.string(k);
			ret.b += "\" => \"";
			ret.add(this.get(k));
			ret.b += "\"";
		}
		ret.b += " }";
		return ret.b;
	}
	,hxSerialize: function(s) {
		s.serialize(this.length);
		var valit = this.ival.iterator();
		var curr = null;
		var currIndex = 0;
		while(curr != null || valit.hasNext()) {
			if(curr == null) curr = valit.next();
			var ret = curr[currIndex];
			s.serialize(curr[currIndex]);
			s.serialize(curr[currIndex + 1]);
			currIndex += 2;
			if(currIndex >= curr.length) {
				currIndex = 0;
				curr = null;
			}
		}
	}
	,hxUnserialize: function(s) {
		var len = s.unserialize();
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			var k = s.unserialize();
			var v = s.unserialize();
			this.set(k,v);
		}
	}
	,__class__: com.fermmtools.utils.ObjectHash
};
var egg = {};
egg.AssetLoader = function() { };
$hxClasses["egg.AssetLoader"] = egg.AssetLoader;
egg.AssetLoader.__name__ = ["egg","AssetLoader"];
egg.AssetLoader.prototype = {
	__class__: egg.AssetLoader
};
egg.AssetStore = function() { };
$hxClasses["egg.AssetStore"] = egg.AssetStore;
egg.AssetStore.__name__ = ["egg","AssetStore"];
egg.AssetStore.prototype = {
	__class__: egg.AssetStore
};
egg.ImageLoader = function() {
	this.futures = new haxe.ds.StringMap();
};
$hxClasses["egg.ImageLoader"] = egg.ImageLoader;
egg.ImageLoader.__name__ = ["egg","ImageLoader"];
egg.ImageLoader.__interfaces__ = [egg.AssetLoader];
egg.ImageLoader.prototype = {
	load: function(assetId,path) {
		if(path == null) path = assetId;
		var future = this.futures.get(assetId);
		if(future != null) return future;
		future = tink.core._Future.Future_Impl_.async(function(handler) {
			var loader = window.document;
			var url = path;
			var success = function(data) {
				handler(tink.core.Outcome.Success(data));
			};
			var error1 = function(error) {
				handler(tink.core.Outcome.Failure(error));
			};
			var image = new Image();
			image.onload = function(_) {
				success(image);
			};
			image.onerror = function(_1) {
				error1("failed to load " + url);
			};
			image.src = url;
		});
		return future;
	}
	,__class__: egg.ImageLoader
};
egg.TextLoader = function() {
	this.futures = new haxe.ds.StringMap();
};
$hxClasses["egg.TextLoader"] = egg.TextLoader;
egg.TextLoader.__name__ = ["egg","TextLoader"];
egg.TextLoader.__interfaces__ = [egg.AssetLoader];
egg.TextLoader.prototype = {
	load: function(assetId,path) {
		if(path == null) path = assetId;
		var future = this.futures.get(assetId);
		if(future != null) return future;
		future = tink.core._Future.Future_Impl_.async(function(handler) {
			var loader = window.document;
			var http = new haxe.Http(path);
			http.onData = function(data) {
				handler(tink.core.Outcome.Success(data));
			};
			http.onError = function(error) {
				handler(tink.core.Outcome.Failure(error));
			};
			http.request();
		});
		return future;
	}
	,__class__: egg.TextLoader
};
egg.Assets = function(texts,images) {
	this.texts = texts;
	this.images = images;
};
$hxClasses["egg.Assets"] = egg.Assets;
egg.Assets.__name__ = ["egg","Assets"];
egg.Assets.load = function(texts,images) {
	var textsFuture = egg.Batch.load(egg.Assets.textLoader,texts,null);
	var imagesFuture = egg.Batch.load(egg.Assets.imageLoader,images,null);
	return tink.core._Future.Future_Impl_.merge(textsFuture,imagesFuture,function(textBatch,imageBatch) {
		var resultingTexts = null;
		var textError = null;
		switch(textBatch[1]) {
		case 0:
			var texts1 = textBatch[2];
			resultingTexts = texts1;
			break;
		case 1:
			var outcomes = textBatch[2];
			textError = outcomes;
			break;
		}
		var resultingImages = null;
		var imageError = null;
		switch(imageBatch[1]) {
		case 0:
			var images1 = imageBatch[2];
			resultingImages = images1;
			break;
		case 1:
			var outcomes1 = imageBatch[2];
			imageError = outcomes1;
			break;
		}
		if(resultingImages != null && resultingTexts != null) return tink.core.Outcome.Success(new egg.Assets(resultingTexts,resultingImages)); else return tink.core.Outcome.Failure({ textOutcomes : textError, imageOutcomes : imageError});
	});
};
egg.Assets.prototype = {
	__class__: egg.Assets
};
egg.Batch = function(items) {
	this.dict = new haxe.ds.StringMap();
	var $it0 = items.keys();
	while( $it0.hasNext() ) {
		var itemId = $it0.next();
		var value = items.get(itemId);
		this.dict.set(itemId,value);
	}
};
$hxClasses["egg.Batch"] = egg.Batch;
egg.Batch.__name__ = ["egg","Batch"];
egg.Batch.__interfaces__ = [egg.AssetStore];
egg.Batch.load = function(assetLoader,ids,paths) {
	if(paths == null) paths = ids;
	while(paths.length < ids.length) paths.push(ids[paths.length]);
	var allFutures = [];
	var _g1 = 0;
	var _g = paths.length;
	while(_g1 < _g) {
		var i = _g1++;
		var path = paths[i];
		var id = [ids[i]];
		var future = tink.core._Future.Future_Impl_.map(assetLoader.load(path),(function(id) {
			return function(o) {
				switch(o[1]) {
				case 0:
					var d = o[2];
					return tink.core.Outcome.Success({ data : d, id : id[0]});
				case 1:
					var e = o[2];
					return tink.core.Outcome.Failure(e);
				}
			};
		})(id));
		allFutures.push(future);
	}
	var futureForAll = tink.core._Future.Future_Impl_.fromMany(allFutures);
	var futureTrigger = new tink.core.FutureTrigger();
	futureForAll(function(outcomes) {
		var data = new haxe.ds.StringMap();
		var originalOutcomes = [];
		var atleastOneFailed = false;
		var _g2 = 0;
		while(_g2 < outcomes.length) {
			var outcome = outcomes[_g2];
			++_g2;
			switch(outcome[1]) {
			case 0:
				var d1 = outcome[2];
				data.set(d1.id,d1.data);
				originalOutcomes.push(tink.core.Outcome.Success(d1.data));
				break;
			case 1:
				var error = outcome[2];
				atleastOneFailed = true;
				originalOutcomes.push(tink.core.Outcome.Failure(error));
				break;
			}
		}
		if(atleastOneFailed) futureTrigger.trigger(tink.core.Outcome.Failure(originalOutcomes)); else futureTrigger.trigger(tink.core.Outcome.Success(new egg.Batch(data)));
	});
	return futureTrigger.future;
};
egg.Batch.prototype = {
	get: function(assetId) {
		return this.dict.get(assetId);
	}
	,all: function() {
		var all = [];
		var $it0 = this.dict.iterator();
		while( $it0.hasNext() ) {
			var t = $it0.next();
			all.push(t);
		}
		return all;
	}
	,__class__: egg.Batch
};
var glow = {};
glow.GPU = function(gl) {
	this.gl = gl;
};
$hxClasses["glow.GPU"] = glow.GPU;
glow.GPU.__name__ = ["glow","GPU"];
glow.GPU.prototype = {
	clearWith: function(r,g,b,a) {
		this.gl.clearColor(r,g,b,a);
		this.gl.clear(16384);
	}
	,uploadTexture: function(image) {
		return glow.GPUTexture.upload(this,image);
	}
	,__class__: glow.GPU
};
glow.GPUBuffer = function() { };
$hxClasses["glow.GPUBuffer"] = glow.GPUBuffer;
glow.GPUBuffer.__name__ = ["glow","GPUBuffer"];
glow.GPUBufferBase = function(gpu,usage) {
	this._gl = gpu.gl;
	this._usage = usage;
	this.nativeBuffer = this._gl.createBuffer();
};
$hxClasses["glow.GPUBufferBase"] = glow.GPUBufferBase;
glow.GPUBufferBase.__name__ = ["glow","GPUBufferBase"];
glow.GPUBufferBase.prototype = {
	upload: function() {
		var offset = 0;
		this._gl.bindBuffer(34962,this.nativeBuffer);
		if(offset != 0) this._gl.bufferSubData(34962,offset,this._float32Array); else this._gl.bufferData(34962,this._float32Array,this._usage);
		this._gl.bindBuffer(34962,null);
		this.uploaded = true;
	}
	,__class__: glow.GPUBufferBase
};
glow.GPUProgramUtil = function() { };
$hxClasses["glow.GPUProgramUtil"] = glow.GPUProgramUtil;
glow.GPUProgramUtil.__name__ = ["glow","GPUProgramUtil"];
glow.GPUProgramUtil.setupShader = function(gl,shaderSrc,shaderType) {
	var shader = gl.createShader(shaderType);
	gl.shaderSource(shader,shaderSrc);
	gl.compileShader(shader);
	var success = gl.getShaderParameter(shader,35713);
	if(success == 0) throw "could not compile shader:" + gl.getShaderInfoLog(shader);
	return shader;
};
glow.GPUProgramUtil.upload = function(gl,vertexShaderSrc,fragmentShaderSrc) {
	var vertexShader = glow.GPUProgramUtil.setupShader(gl,vertexShaderSrc,35633);
	var fragmentShader = glow.GPUProgramUtil.setupShader(gl,fragmentShaderSrc,35632);
	var nativeProgram = gl.createProgram();
	gl.attachShader(nativeProgram,vertexShader);
	gl.attachShader(nativeProgram,fragmentShader);
	gl.linkProgram(nativeProgram);
	var success = gl.getProgramParameter(nativeProgram,35714);
	if(success == 0) throw "program filed to link:" + gl.getProgramInfoLog(nativeProgram);
	return nativeProgram;
};
glow.GPUProgramUtil.unload = function(gl,nativeProgram) {
	gl.deleteProgram(nativeProgram);
};
glow.GPUProgram = function() { };
$hxClasses["glow.GPUProgram"] = glow.GPUProgram;
glow.GPUProgram.__name__ = ["glow","GPUProgram"];
glow.GPUTexture = function(gl,nativeTexture) {
	this._gl = gl;
	this.nativeTexture = nativeTexture;
};
$hxClasses["glow.GPUTexture"] = glow.GPUTexture;
glow.GPUTexture.__name__ = ["glow","GPUTexture"];
glow.GPUTexture.upload = function(gpu,image) {
	var gl = gpu.gl;
	var nativeTexture = gl.createTexture();
	gl.bindTexture(3553,nativeTexture);
	gl.texImage2D(3553,0,6408,6408,5121,image);
	gl.texParameteri(3553,10240,9728);
	gl.texParameteri(3553,10241,9728);
	gl.texParameteri(3553,10242,33071);
	gl.texParameteri(3553,10243,33071);
	gl.bindTexture(3553,null);
	return new glow.GPUTexture(gl,nativeTexture);
};
glow.GPUTexture.prototype = {
	__class__: glow.GPUTexture
};
glow.buffer = {};
glow.buffer.Buffer_texCoordsVec_28Float_2C2_29positionVec_28Float_2C3_29alphaFloat = function(gpu,usage) {
	this._alpha_bufferPosition = 0;
	this._position_bufferPosition = 0;
	this._texCoords_bufferPosition = 0;
	glow.GPUBufferBase.call(this,gpu,usage);
};
$hxClasses["glow.buffer.Buffer_texCoordsVec_28Float_2C2_29positionVec_28Float_2C3_29alphaFloat"] = glow.buffer.Buffer_texCoordsVec_28Float_2C2_29positionVec_28Float_2C3_29alphaFloat;
glow.buffer.Buffer_texCoordsVec_28Float_2C2_29positionVec_28Float_2C3_29alphaFloat.__name__ = ["glow","buffer","Buffer_texCoordsVec_28Float_2C2_29positionVec_28Float_2C3_29alphaFloat"];
glow.buffer.Buffer_texCoordsVec_28Float_2C2_29positionVec_28Float_2C3_29alphaFloat.__super__ = glow.GPUBufferBase;
glow.buffer.Buffer_texCoordsVec_28Float_2C2_29positionVec_28Float_2C3_29alphaFloat.prototype = $extend(glow.GPUBufferBase.prototype,{
	write_texCoords: function(v0,v1) {
		this.uploaded = false;
		if(this._float32Array == null) this._float32Array = new Float32Array(512);
		if(this._float32Array.length <= this._texCoords_bufferPosition * 6 + 2) {
			var newArray = new Float32Array(this._float32Array.length * 2);
			this._float32Array = newArray;
		}
		var pos = this._texCoords_bufferPosition * 6;
		this._texCoords_bufferPosition++;
		this._float32Array[pos] = v0;
		return this._float32Array[pos + 1] = v1;
	}
	,write_position: function(v0,v1,v2) {
		this.uploaded = false;
		if(this._float32Array == null) this._float32Array = new Float32Array(512);
		if(this._float32Array.length <= this._position_bufferPosition * 6 + 3) {
			var newArray = new Float32Array(this._float32Array.length * 2);
			this._float32Array = newArray;
		}
		var pos = this._position_bufferPosition * 6 + 2;
		this._position_bufferPosition++;
		this._float32Array[pos] = v0;
		this._float32Array[pos + 1] = v1;
		return this._float32Array[pos + 2] = v2;
	}
	,write_alpha: function(v0) {
		this.uploaded = false;
		if(this._float32Array == null) this._float32Array = new Float32Array(512);
		if(this._float32Array.length <= this._alpha_bufferPosition * 6 + 1) {
			var newArray = new Float32Array(this._float32Array.length * 2);
			this._float32Array = newArray;
		}
		var pos = this._alpha_bufferPosition * 6 + 5;
		this._alpha_bufferPosition++;
		return this._float32Array[pos] = v0;
	}
	,getNumVerticesWritten: function() {
		var max = 0;
		max = Math.max(max,this._texCoords_bufferPosition);
		max = Math.max(max,this._position_bufferPosition);
		max = Math.max(max,this._alpha_bufferPosition);
		return max | 0;
	}
	,rewind: function() {
		this._texCoords_bufferPosition = 0;
		this._position_bufferPosition = 0;
		return this._alpha_bufferPosition = 0;
	}
	,__class__: glow.buffer.Buffer_texCoordsVec_28Float_2C2_29positionVec_28Float_2C3_29alphaFloat
});
var haxe = {};
haxe.IMap = function() { };
$hxClasses["haxe.IMap"] = haxe.IMap;
haxe.IMap.__name__ = ["haxe","IMap"];
haxe.Http = function(url) {
	this.url = url;
	this.headers = new List();
	this.params = new List();
	this.async = true;
};
$hxClasses["haxe.Http"] = haxe.Http;
haxe.Http.__name__ = ["haxe","Http"];
haxe.Http.prototype = {
	request: function(post) {
		var me = this;
		me.responseData = null;
		var r = this.req = js.Browser.createXMLHttpRequest();
		var onreadystatechange = function(_) {
			if(r.readyState != 4) return;
			var s;
			try {
				s = r.status;
			} catch( e ) {
				s = null;
			}
			if(s != null) {
				var protocol = window.location.protocol.toLowerCase();
				var rlocalProtocol = new EReg("^(?:about|app|app-storage|.+-extension|file|res|widget):$","");
				var isLocal = rlocalProtocol.match(protocol);
				if(isLocal) if(r.responseText != null) s = 200; else s = 404;
			}
			if(s == undefined) s = null;
			if(s != null) me.onStatus(s);
			if(s != null && s >= 200 && s < 400) {
				me.req = null;
				me.onData(me.responseData = r.responseText);
			} else if(s == null) {
				me.req = null;
				me.onError("Failed to connect or resolve host");
			} else switch(s) {
			case 12029:
				me.req = null;
				me.onError("Failed to connect to host");
				break;
			case 12007:
				me.req = null;
				me.onError("Unknown host");
				break;
			default:
				me.req = null;
				me.responseData = r.responseText;
				me.onError("Http Error #" + r.status);
			}
		};
		if(this.async) r.onreadystatechange = onreadystatechange;
		var uri = this.postData;
		if(uri != null) post = true; else {
			var _g_head = this.params.h;
			var _g_val = null;
			while(_g_head != null) {
				var p;
				_g_val = _g_head[0];
				_g_head = _g_head[1];
				p = _g_val;
				if(uri == null) uri = ""; else uri += "&";
				uri += encodeURIComponent(p.param) + "=" + encodeURIComponent(p.value);
			}
		}
		try {
			if(post) r.open("POST",this.url,this.async); else if(uri != null) {
				var question = this.url.split("?").length <= 1;
				r.open("GET",this.url + (question?"?":"&") + uri,this.async);
				uri = null;
			} else r.open("GET",this.url,this.async);
		} catch( e1 ) {
			me.req = null;
			this.onError(e1.toString());
			return;
		}
		if(!Lambda.exists(this.headers,function(h) {
			return h.header == "Content-Type";
		}) && post && this.postData == null) r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		var _g_head1 = this.headers.h;
		var _g_val1 = null;
		while(_g_head1 != null) {
			var h1;
			_g_val1 = _g_head1[0];
			_g_head1 = _g_head1[1];
			h1 = _g_val1;
			r.setRequestHeader(h1.header,h1.value);
		}
		r.send(uri);
		if(!this.async) onreadystatechange(null);
	}
	,onData: function(data) {
	}
	,onError: function(msg) {
	}
	,onStatus: function(status) {
	}
	,__class__: haxe.Http
};
haxe.Log = function() { };
$hxClasses["haxe.Log"] = haxe.Log;
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
};
haxe.Serializer = function() { };
$hxClasses["haxe.Serializer"] = haxe.Serializer;
haxe.Serializer.__name__ = ["haxe","Serializer"];
haxe.Serializer.prototype = {
	serializeString: function(s) {
		var x = this.shash.get(s);
		if(x != null) {
			this.buf.b += "R";
			if(x == null) this.buf.b += "null"; else this.buf.b += "" + x;
			return;
		}
		this.shash.set(s,this.scount++);
		this.buf.b += "y";
		s = encodeURIComponent(s);
		if(s.length == null) this.buf.b += "null"; else this.buf.b += "" + s.length;
		this.buf.b += ":";
		if(s == null) this.buf.b += "null"; else this.buf.b += "" + s;
	}
	,serializeRef: function(v) {
		var vt = typeof(v);
		var _g1 = 0;
		var _g = this.cache.length;
		while(_g1 < _g) {
			var i = _g1++;
			var ci = this.cache[i];
			if(typeof(ci) == vt && ci == v) {
				this.buf.b += "r";
				if(i == null) this.buf.b += "null"; else this.buf.b += "" + i;
				return true;
			}
		}
		this.cache.push(v);
		return false;
	}
	,serializeFields: function(v) {
		var _g = 0;
		var _g1 = Reflect.fields(v);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			this.serializeString(f);
			this.serialize(Reflect.field(v,f));
		}
		this.buf.b += "g";
	}
	,serialize: function(v) {
		{
			var _g = Type["typeof"](v);
			switch(_g[1]) {
			case 0:
				this.buf.b += "n";
				break;
			case 1:
				var v1 = v;
				if(v1 == 0) {
					this.buf.b += "z";
					return;
				}
				this.buf.b += "i";
				if(v1 == null) this.buf.b += "null"; else this.buf.b += "" + v1;
				break;
			case 2:
				var v2 = v;
				if(isNaN(v2)) this.buf.b += "k"; else if(!isFinite(v2)) if(v2 < 0) this.buf.b += "m"; else this.buf.b += "p"; else {
					this.buf.b += "d";
					if(v2 == null) this.buf.b += "null"; else this.buf.b += "" + v2;
				}
				break;
			case 3:
				if(v) this.buf.b += "t"; else this.buf.b += "f";
				break;
			case 6:
				var c = _g[2];
				if(c == String) {
					this.serializeString(v);
					return;
				}
				if(this.useCache && this.serializeRef(v)) return;
				switch(c) {
				case Array:
					var ucount = 0;
					this.buf.b += "a";
					var l = v.length;
					var _g1 = 0;
					while(_g1 < l) {
						var i = _g1++;
						if(v[i] == null) ucount++; else {
							if(ucount > 0) {
								if(ucount == 1) this.buf.b += "n"; else {
									this.buf.b += "u";
									if(ucount == null) this.buf.b += "null"; else this.buf.b += "" + ucount;
								}
								ucount = 0;
							}
							this.serialize(v[i]);
						}
					}
					if(ucount > 0) {
						if(ucount == 1) this.buf.b += "n"; else {
							this.buf.b += "u";
							if(ucount == null) this.buf.b += "null"; else this.buf.b += "" + ucount;
						}
					}
					this.buf.b += "h";
					break;
				case List:
					this.buf.b += "l";
					var v3 = v;
					var _g1_head = v3.h;
					var _g1_val = null;
					while(_g1_head != null) {
						var i1;
						_g1_val = _g1_head[0];
						_g1_head = _g1_head[1];
						i1 = _g1_val;
						this.serialize(i1);
					}
					this.buf.b += "h";
					break;
				case Date:
					var d = v;
					this.buf.b += "v";
					this.buf.add(d.getTime());
					break;
				case haxe.ds.StringMap:
					this.buf.b += "b";
					var v4 = v;
					var $it0 = v4.keys();
					while( $it0.hasNext() ) {
						var k = $it0.next();
						this.serializeString(k);
						this.serialize(v4.get(k));
					}
					this.buf.b += "h";
					break;
				case haxe.ds.IntMap:
					this.buf.b += "q";
					var v5 = v;
					var $it1 = v5.keys();
					while( $it1.hasNext() ) {
						var k1 = $it1.next();
						this.buf.b += ":";
						if(k1 == null) this.buf.b += "null"; else this.buf.b += "" + k1;
						this.serialize(v5.get(k1));
					}
					this.buf.b += "h";
					break;
				case haxe.ds.ObjectMap:
					this.buf.b += "M";
					var v6 = v;
					var $it2 = v6.keys();
					while( $it2.hasNext() ) {
						var k2 = $it2.next();
						var id = Reflect.field(k2,"__id__");
						Reflect.deleteField(k2,"__id__");
						this.serialize(k2);
						k2.__id__ = id;
						this.serialize(v6.h[k2.__id__]);
					}
					this.buf.b += "h";
					break;
				case haxe.io.Bytes:
					var v7 = v;
					var i2 = 0;
					var max = v7.length - 2;
					var charsBuf = new StringBuf();
					var b64 = haxe.Serializer.BASE64;
					while(i2 < max) {
						var b1 = v7.get(i2++);
						var b2 = v7.get(i2++);
						var b3 = v7.get(i2++);
						charsBuf.add(b64.charAt(b1 >> 2));
						charsBuf.add(b64.charAt((b1 << 4 | b2 >> 4) & 63));
						charsBuf.add(b64.charAt((b2 << 2 | b3 >> 6) & 63));
						charsBuf.add(b64.charAt(b3 & 63));
					}
					if(i2 == max) {
						var b11 = v7.get(i2++);
						var b21 = v7.get(i2++);
						charsBuf.add(b64.charAt(b11 >> 2));
						charsBuf.add(b64.charAt((b11 << 4 | b21 >> 4) & 63));
						charsBuf.add(b64.charAt(b21 << 2 & 63));
					} else if(i2 == max + 1) {
						var b12 = v7.get(i2++);
						charsBuf.add(b64.charAt(b12 >> 2));
						charsBuf.add(b64.charAt(b12 << 4 & 63));
					}
					var chars = charsBuf.b;
					this.buf.b += "s";
					if(chars.length == null) this.buf.b += "null"; else this.buf.b += "" + chars.length;
					this.buf.b += ":";
					if(chars == null) this.buf.b += "null"; else this.buf.b += "" + chars;
					break;
				default:
					if(this.useCache) this.cache.pop();
					if(v.hxSerialize != null) {
						this.buf.b += "C";
						this.serializeString(Type.getClassName(c));
						if(this.useCache) this.cache.push(v);
						v.hxSerialize(this);
						this.buf.b += "g";
					} else {
						this.buf.b += "c";
						this.serializeString(Type.getClassName(c));
						if(this.useCache) this.cache.push(v);
						this.serializeFields(v);
					}
				}
				break;
			case 4:
				if(this.useCache && this.serializeRef(v)) return;
				this.buf.b += "o";
				this.serializeFields(v);
				break;
			case 7:
				var e = _g[2];
				if(this.useCache) {
					if(this.serializeRef(v)) return;
					this.cache.pop();
				}
				if(this.useEnumIndex) this.buf.b += "j"; else this.buf.b += "w";
				this.serializeString(Type.getEnumName(e));
				if(this.useEnumIndex) {
					this.buf.b += ":";
					this.buf.b += Std.string(v[1]);
				} else this.serializeString(v[0]);
				this.buf.b += ":";
				var l1 = v.length;
				this.buf.b += Std.string(l1 - 2);
				var _g11 = 2;
				while(_g11 < l1) {
					var i3 = _g11++;
					this.serialize(v[i3]);
				}
				if(this.useCache) this.cache.push(v);
				break;
			case 5:
				throw "Cannot serialize function";
				break;
			default:
				throw "Cannot serialize " + Std.string(v);
			}
		}
	}
	,__class__: haxe.Serializer
};
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
$hxClasses["haxe.Timer"] = haxe.Timer;
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.stamp = function() {
	return new Date().getTime() / 1000;
};
haxe.Timer.prototype = {
	run: function() {
	}
	,__class__: haxe.Timer
};
haxe.Unserializer = function() { };
$hxClasses["haxe.Unserializer"] = haxe.Unserializer;
haxe.Unserializer.__name__ = ["haxe","Unserializer"];
haxe.Unserializer.initCodes = function() {
	var codes = [];
	var _g1 = 0;
	var _g = haxe.Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe.Unserializer.BASE64.charCodeAt(i)] = i;
	}
	return codes;
};
haxe.Unserializer.prototype = {
	get: function(p) {
		return this.buf.charCodeAt(p);
	}
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) break;
			if(c == 45) {
				if(this.pos != fpos) break;
				s = true;
				this.pos++;
				continue;
			}
			if(c < 48 || c > 57) break;
			k = k * 10 + (c - 48);
			this.pos++;
		}
		if(s) k *= -1;
		return k;
	}
	,readFloat: function() {
		var p1 = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
		}
		return Std.parseFloat(HxOverrides.substr(this.buf,p1,this.pos - p1));
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) throw "Invalid object";
			if(this.buf.charCodeAt(this.pos) == 103) break;
			var k = this.unserialize();
			if(!(typeof(k) == "string")) throw "Invalid object key";
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.get(this.pos++) != 58) throw "Invalid enum format";
		var nargs = this.readDigits();
		if(nargs == 0) return Type.createEnum(edecl,tag);
		var args = [];
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserialize: function() {
		var _g = this.get(this.pos++);
		switch(_g) {
		case 110:
			return null;
		case 116:
			return true;
		case 102:
			return false;
		case 122:
			return 0;
		case 105:
			return this.readDigits();
		case 100:
			return this.readFloat();
		case 121:
			var len = this.readDigits();
			if(this.get(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid string length";
			var s = HxOverrides.substr(this.buf,this.pos,len);
			this.pos += len;
			s = decodeURIComponent(s.split("+").join(" "));
			this.scache.push(s);
			return s;
		case 107:
			return NaN;
		case 109:
			return -Infinity;
		case 112:
			return Infinity;
		case 97:
			var buf = this.buf;
			var a = [];
			this.cache.push(a);
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c == 104) {
					this.pos++;
					break;
				}
				if(c == 117) {
					this.pos++;
					var n = this.readDigits();
					a[a.length + n - 1] = null;
				} else a.push(this.unserialize());
			}
			return a;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 114:
			var n1 = this.readDigits();
			if(n1 < 0 || n1 >= this.cache.length) throw "Invalid reference";
			return this.cache[n1];
		case 82:
			var n2 = this.readDigits();
			if(n2 < 0 || n2 >= this.scache.length) throw "Invalid string reference";
			return this.scache[n2];
		case 120:
			throw this.unserialize();
			break;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw "Class not found " + name;
			var o1 = Type.createEmptyInstance(cl);
			this.cache.push(o1);
			this.unserializeObject(o1);
			return o1;
		case 119:
			var name1 = this.unserialize();
			var edecl = this.resolver.resolveEnum(name1);
			if(edecl == null) throw "Enum not found " + name1;
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 106:
			var name2 = this.unserialize();
			var edecl1 = this.resolver.resolveEnum(name2);
			if(edecl1 == null) throw "Enum not found " + name2;
			this.pos++;
			var index = this.readDigits();
			var tag = Type.getEnumConstructs(edecl1)[index];
			if(tag == null) throw "Unknown enum index " + name2 + "@" + index;
			var e1 = this.unserializeEnum(edecl1,tag);
			this.cache.push(e1);
			return e1;
		case 108:
			var l = new List();
			this.cache.push(l);
			var buf1 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 98:
			var h = new haxe.ds.StringMap();
			this.cache.push(h);
			var buf2 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s1 = this.unserialize();
				h.set(s1,this.unserialize());
			}
			this.pos++;
			return h;
		case 113:
			var h1 = new haxe.ds.IntMap();
			this.cache.push(h1);
			var buf3 = this.buf;
			var c1 = this.get(this.pos++);
			while(c1 == 58) {
				var i = this.readDigits();
				h1.set(i,this.unserialize());
				c1 = this.get(this.pos++);
			}
			if(c1 != 104) throw "Invalid IntMap format";
			return h1;
		case 77:
			var h2 = new haxe.ds.ObjectMap();
			this.cache.push(h2);
			var buf4 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s2 = this.unserialize();
				h2.set(s2,this.unserialize());
			}
			this.pos++;
			return h2;
		case 118:
			var d;
			if(this.buf.charCodeAt(this.pos) >= 48 && this.buf.charCodeAt(this.pos) <= 57 && this.buf.charCodeAt(this.pos + 1) >= 48 && this.buf.charCodeAt(this.pos + 1) <= 57 && this.buf.charCodeAt(this.pos + 2) >= 48 && this.buf.charCodeAt(this.pos + 2) <= 57 && this.buf.charCodeAt(this.pos + 3) >= 48 && this.buf.charCodeAt(this.pos + 3) <= 57 && this.buf.charCodeAt(this.pos + 4) == 45) {
				var s3 = HxOverrides.substr(this.buf,this.pos,19);
				d = HxOverrides.strDate(s3);
				this.pos += 19;
			} else {
				var t = this.readFloat();
				var d1 = new Date();
				d1.setTime(t);
				d = d1;
			}
			this.cache.push(d);
			return d;
		case 115:
			var len1 = this.readDigits();
			var buf5 = this.buf;
			if(this.get(this.pos++) != 58 || this.length - this.pos < len1) throw "Invalid bytes length";
			var codes = haxe.Unserializer.CODES;
			if(codes == null) {
				codes = haxe.Unserializer.initCodes();
				haxe.Unserializer.CODES = codes;
			}
			var i1 = this.pos;
			var rest = len1 & 3;
			var size;
			size = (len1 >> 2) * 3 + (rest >= 2?rest - 1:0);
			var max = i1 + (len1 - rest);
			var bytes = haxe.io.Bytes.alloc(size);
			var bpos = 0;
			while(i1 < max) {
				var c11 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c2 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c11 << 2 | c2 >> 4);
				var c3 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c2 << 4 | c3 >> 2);
				var c4 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c3 << 6 | c4);
			}
			if(rest >= 2) {
				var c12 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c21 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c12 << 2 | c21 >> 4);
				if(rest == 3) {
					var c31 = codes[StringTools.fastCodeAt(buf5,i1++)];
					bytes.set(bpos++,c21 << 4 | c31 >> 2);
				}
			}
			this.pos += len1;
			this.cache.push(bytes);
			return bytes;
		case 67:
			var name3 = this.unserialize();
			var cl1 = this.resolver.resolveClass(name3);
			if(cl1 == null) throw "Class not found " + name3;
			var o2 = Type.createEmptyInstance(cl1);
			this.cache.push(o2);
			o2.hxUnserialize(this);
			if(this.get(this.pos++) != 103) throw "Invalid custom data";
			return o2;
		default:
		}
		this.pos--;
		throw "Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos;
	}
	,__class__: haxe.Unserializer
};
haxe.ds = {};
haxe.ds.IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe.ds.IntMap;
haxe.ds.IntMap.__name__ = ["haxe","ds","IntMap"];
haxe.ds.IntMap.__interfaces__ = [haxe.IMap];
haxe.ds.IntMap.prototype = {
	set: function(key,value) {
		this.h[key] = value;
	}
	,get: function(key) {
		return this.h[key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
	}
	,remove: function(key) {
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i];
		}};
	}
	,__class__: haxe.ds.IntMap
};
haxe.ds.ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe.ds.ObjectMap;
haxe.ds.ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe.ds.ObjectMap.__interfaces__ = [haxe.IMap];
haxe.ds.ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe.ds.ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,remove: function(key) {
		var id = key.__id__;
		if(this.h.__keys__[id] == null) return false;
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe.ds.ObjectMap
};
haxe.ds.Option = $hxClasses["haxe.ds.Option"] = { __ename__ : ["haxe","ds","Option"], __constructs__ : ["Some","None"] };
haxe.ds.Option.Some = function(v) { var $x = ["Some",0,v]; $x.__enum__ = haxe.ds.Option; $x.toString = $estr; return $x; };
haxe.ds.Option.None = ["None",1];
haxe.ds.Option.None.toString = $estr;
haxe.ds.Option.None.__enum__ = haxe.ds.Option;
haxe.ds.StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe.ds.StringMap;
haxe.ds.StringMap.__name__ = ["haxe","ds","StringMap"];
haxe.ds.StringMap.__interfaces__ = [haxe.IMap];
haxe.ds.StringMap.prototype = {
	set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref["$" + i];
		}};
	}
	,__class__: haxe.ds.StringMap
};
haxe.io = {};
haxe.io.Bytes = function(length,b) {
	this.length = length;
	this.b = b;
};
$hxClasses["haxe.io.Bytes"] = haxe.io.Bytes;
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.alloc = function(length) {
	return new haxe.io.Bytes(length,new Uint8Array(length));
};
haxe.io.Bytes.prototype = {
	get: function(pos) {
		return this.b[pos];
	}
	,set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,__class__: haxe.io.Bytes
};
var howler = {};
howler.HowlOptions = function(urls) {
	this.model = "equalpower";
	this.rate = 1;
	this.urls = [];
	this.volume = 1;
	this.sprite = { };
	this.loop = false;
	this.format = null;
	this.buffer = false;
	this.autoplay = false;
	if(urls != null && urls.length > 0) this.urls = urls;
};
$hxClasses["howler.HowlOptions"] = howler.HowlOptions;
howler.HowlOptions.__name__ = ["howler","HowlOptions"];
howler.HowlOptions.prototype = {
	__class__: howler.HowlOptions
};
var js = {};
js.Boot = function() { };
$hxClasses["js.Boot"] = js.Boot;
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js.Boot.__trace = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ": "; else msg = "";
	msg += js.Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js.Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof console != "undefined" && console.log != null) console.log(msg);
};
js.Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js.Boot.__nativeClassName(o);
		if(name != null) return js.Boot.__resolveNativeClass(name);
		return null;
	}
};
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js.Boot.__string_rec(o[i1],s); else str2 += js.Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
};
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js.Boot.__interfLoop(js.Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js.Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
};
js.Boot.__nativeClassName = function(o) {
	var name = js.Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js.Boot.__isNativeObj = function(o) {
	return js.Boot.__nativeClassName(o) != null;
};
js.Boot.__resolveNativeClass = function(name) {
	if(typeof window != "undefined") return window[name]; else return global[name];
};
js.Browser = function() { };
$hxClasses["js.Browser"] = js.Browser;
js.Browser.__name__ = ["js","Browser"];
js.Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") return new XMLHttpRequest();
	if(typeof ActiveXObject != "undefined") return new ActiveXObject("Microsoft.XMLHTTP");
	throw "Unable to create XMLHttpRequest object.";
};
js.html = {};
js.html._CanvasElement = {};
js.html._CanvasElement.CanvasUtil = function() { };
$hxClasses["js.html._CanvasElement.CanvasUtil"] = js.html._CanvasElement.CanvasUtil;
js.html._CanvasElement.CanvasUtil.__name__ = ["js","html","_CanvasElement","CanvasUtil"];
js.html._CanvasElement.CanvasUtil.getContextWebGL = function(canvas,attribs) {
	var _g = 0;
	var _g1 = ["webgl","experimental-webgl"];
	while(_g < _g1.length) {
		var name = _g1[_g];
		++_g;
		var ctx = canvas.getContext(name,attribs);
		if(ctx != null) return ctx;
	}
	return null;
};
js.html.compat = {};
js.html.compat.ArrayBuffer = function(a) {
	if((a instanceof Array) && a.__enum__ == null) {
		this.a = a;
		this.byteLength = a.length;
	} else throw "TODO";
};
$hxClasses["js.html.compat.ArrayBuffer"] = js.html.compat.ArrayBuffer;
js.html.compat.ArrayBuffer.__name__ = ["js","html","compat","ArrayBuffer"];
js.html.compat.ArrayBuffer.sliceImpl = function(begin,end) {
	var u = new Uint8Array(this,begin,end == null?null:end - begin);
	var result = new ArrayBuffer(u.byteLength);
	var resultArray = new Uint8Array(result);
	resultArray.set(u);
	return result;
};
js.html.compat.ArrayBuffer.prototype = {
	slice: function(begin,end) {
		return new js.html.compat.ArrayBuffer(this.a.slice(begin,end));
	}
	,__class__: js.html.compat.ArrayBuffer
};
js.html.compat.Uint8Array = function() { };
$hxClasses["js.html.compat.Uint8Array"] = js.html.compat.Uint8Array;
js.html.compat.Uint8Array.__name__ = ["js","html","compat","Uint8Array"];
js.html.compat.Uint8Array._new = function(arg1,offset,length) {
	var arr;
	if(typeof(arg1) == "number") {
		arr = [];
		var _g = 0;
		while(_g < arg1) {
			var i = _g++;
			arr[i] = 0;
		}
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js.html.compat.ArrayBuffer(arr);
	} else if(js.Boot.__instanceof(arg1,js.html.compat.ArrayBuffer)) {
		var buffer = arg1;
		if(offset == null) offset = 0;
		if(length == null) length = buffer.byteLength - offset;
		if(offset == 0) arr = buffer.a; else arr = buffer.a.slice(offset,offset + length);
		arr.byteLength = arr.length;
		arr.byteOffset = offset;
		arr.buffer = buffer;
	} else if((arg1 instanceof Array) && arg1.__enum__ == null) {
		arr = arg1.slice();
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js.html.compat.ArrayBuffer(arr);
	} else throw "TODO";
	arr.subarray = js.html.compat.Uint8Array._subarray;
	arr.set = js.html.compat.Uint8Array._set;
	return arr;
};
js.html.compat.Uint8Array._set = function(arg,offset) {
	var t = this;
	if(js.Boot.__instanceof(arg.buffer,js.html.compat.ArrayBuffer)) {
		var a = arg;
		if(arg.byteLength + offset > t.byteLength) throw "set() outside of range";
		var _g1 = 0;
		var _g = arg.byteLength;
		while(_g1 < _g) {
			var i = _g1++;
			t[i + offset] = a[i];
		}
	} else if((arg instanceof Array) && arg.__enum__ == null) {
		var a1 = arg;
		if(a1.length + offset > t.byteLength) throw "set() outside of range";
		var _g11 = 0;
		var _g2 = a1.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			t[i1 + offset] = a1[i1];
		}
	} else throw "TODO";
};
js.html.compat.Uint8Array._subarray = function(start,end) {
	var t = this;
	return js.html.compat.Uint8Array._new(t.buffer,start + t.byteOffset,end == null?null:end - start);
};
var jsbox = {};
jsbox.Window = function() {
	var _this = window.document;
	this._canvas = _this.createElement("canvas");
	this._canvas.style.width = "100%";
	this._canvas.style.height = "100%";
	this._canvas.style.display = "block";
	this._canvas.style.position = "relative";
	this._canvas.style.margin = "0 auto 0 auto";
	this._canvas.style.background = "#000";
	window.document.body.appendChild(this._canvas);
	var webglCtx = js.html._CanvasElement.CanvasUtil.getContextWebGL(this._canvas,{ });
	this.gl = webglCtx;
};
$hxClasses["jsbox.Window"] = jsbox.Window;
jsbox.Window.__name__ = ["jsbox","Window"];
jsbox.Window.createWindow = function() {
	return new jsbox.Window();
};
jsbox.Window.prototype = {
	get_width: function() {
		return this._canvas.clientWidth;
	}
	,get_height: function() {
		return this._canvas.clientHeight;
	}
	,resize: function() {
		var width = this._canvas.clientWidth;
		var height = this._canvas.clientHeight;
		if(this._canvas.width != width || this._canvas.height != height) {
			this._canvas.width = width;
			this._canvas.height = height;
		}
	}
	,__class__: jsbox.Window
};
jsbox.asset = {};
jsbox.asset._Loader = {};
jsbox.asset._Loader.Loader_Impl_ = {};
$hxClasses["jsbox.asset._Loader.Loader_Impl_"] = jsbox.asset._Loader.Loader_Impl_;
jsbox.asset._Loader.Loader_Impl_.__name__ = ["jsbox","asset","_Loader","Loader_Impl_"];
jsbox.asset._Loader.Loader_Impl_._new = function() {
	return window.document;
};
jsbox.asset._Loader.Loader_Impl_.loadImage = function(this1,url,success,error) {
	var image = new Image();
	image.onload = function(_) {
		success(image);
	};
	image.onerror = function(_1) {
		error("failed to load " + url);
	};
	image.src = url;
};
jsbox.asset._Loader.Loader_Impl_.loadText = function(this1,url,success,error) {
	var http = new haxe.Http(url);
	http.onData = success;
	http.onError = error;
	http.request();
};
jsbox.gl = {};
jsbox.gl._GL = {};
jsbox.gl._GL.GL_Impl_ = {};
$hxClasses["jsbox.gl._GL.GL_Impl_"] = jsbox.gl._GL.GL_Impl_;
jsbox.gl._GL.GL_Impl_.__name__ = ["jsbox","gl","_GL","GL_Impl_"];
jsbox.gl._GL.GL_Impl_._new = function(webglCtx) {
	return webglCtx;
};
jsbox.gl._GL.GL_Impl_.get_version = function() {
	return 7938;
};
jsbox.gl._GL.GL_Impl_.versionString = function(this1) {
	var ver = this1.getParameter(7938);
	var slver = this1.getParameter(35724);
	var ren = this1.getParameter(7937);
	var ven = this1.getParameter(7936);
	return "/ " + ver + " / " + slver + " / " + ren + " / " + ven + " /";
};
jsbox.gl._GL.GL_Impl_.activeTexture = function(this1,texture) {
	this1.activeTexture(texture);
};
jsbox.gl._GL.GL_Impl_.attachShader = function(this1,program,shader) {
	this1.attachShader(program,shader);
};
jsbox.gl._GL.GL_Impl_.bindAttribLocation = function(this1,program,index,name) {
	this1.bindAttribLocation(program,index,name);
};
jsbox.gl._GL.GL_Impl_.bindBuffer = function(this1,target,buffer) {
	this1.bindBuffer(target,buffer);
};
jsbox.gl._GL.GL_Impl_.bindFramebuffer = function(this1,target,framebuffer) {
	this1.bindFramebuffer(target,framebuffer);
};
jsbox.gl._GL.GL_Impl_.bindRenderbuffer = function(this1,target,renderbuffer) {
	this1.bindRenderbuffer(target,renderbuffer);
};
jsbox.gl._GL.GL_Impl_.bindTexture = function(this1,target,texture) {
	this1.bindTexture(target,texture);
};
jsbox.gl._GL.GL_Impl_.blendColor = function(this1,red,green,blue,alpha) {
	this1.blendColor(red,green,blue,alpha);
};
jsbox.gl._GL.GL_Impl_.blendEquation = function(this1,mode) {
	this1.blendEquation(mode);
};
jsbox.gl._GL.GL_Impl_.blendEquationSeparate = function(this1,modeRGB,modeAlpha) {
	this1.blendEquationSeparate(modeRGB,modeAlpha);
};
jsbox.gl._GL.GL_Impl_.blendFunc = function(this1,sfactor,dfactor) {
	this1.blendFunc(sfactor,dfactor);
};
jsbox.gl._GL.GL_Impl_.blendFuncSeparate = function(this1,srcRGB,dstRGB,srcAlpha,dstAlpha) {
	this1.blendFuncSeparate(srcRGB,dstRGB,srcAlpha,dstAlpha);
};
jsbox.gl._GL.GL_Impl_.bufferData = function(this1,target,data,usage) {
	this1.bufferData(target,data,usage);
};
jsbox.gl._GL.GL_Impl_.bufferSubData = function(this1,target,offset,data) {
	this1.bufferSubData(target,offset,data);
};
jsbox.gl._GL.GL_Impl_.checkFramebufferStatus = function(this1,target) {
	return this1.checkFramebufferStatus(target);
};
jsbox.gl._GL.GL_Impl_.clear = function(this1,mask) {
	this1.clear(mask);
};
jsbox.gl._GL.GL_Impl_.clearColor = function(this1,red,green,blue,alpha) {
	this1.clearColor(red,green,blue,alpha);
};
jsbox.gl._GL.GL_Impl_.clearDepth = function(this1,depth) {
	this1.clearDepth(depth);
};
jsbox.gl._GL.GL_Impl_.clearStencil = function(this1,s) {
	this1.clearStencil(s);
};
jsbox.gl._GL.GL_Impl_.colorMask = function(this1,red,green,blue,alpha) {
	this1.colorMask(red,green,blue,alpha);
};
jsbox.gl._GL.GL_Impl_.compileShader = function(this1,shader) {
	this1.compileShader(shader);
};
jsbox.gl._GL.GL_Impl_.compressedTexImage2D = function(this1,target,level,internalformat,width,height,border,data) {
	this1.compressedTexImage2D(target,level,internalformat,width,height,border,data);
};
jsbox.gl._GL.GL_Impl_.compressedTexSubImage2D = function(this1,target,level,xoffset,yoffset,width,height,format,data) {
	this1.compressedTexSubImage2D(target,level,xoffset,yoffset,width,height,format,data);
};
jsbox.gl._GL.GL_Impl_.copyTexImage2D = function(this1,target,level,internalformat,x,y,width,height,border) {
	this1.copyTexImage2D(target,level,internalformat,x,y,width,height,border);
};
jsbox.gl._GL.GL_Impl_.copyTexSubImage2D = function(this1,target,level,xoffset,yoffset,x,y,width,height) {
	this1.copyTexSubImage2D(target,level,xoffset,yoffset,x,y,width,height);
};
jsbox.gl._GL.GL_Impl_.createBuffer = function(this1) {
	return this1.createBuffer();
};
jsbox.gl._GL.GL_Impl_.createFramebuffer = function(this1) {
	return this1.createFramebuffer();
};
jsbox.gl._GL.GL_Impl_.createProgram = function(this1) {
	return this1.createProgram();
};
jsbox.gl._GL.GL_Impl_.createRenderbuffer = function(this1) {
	return this1.createRenderbuffer();
};
jsbox.gl._GL.GL_Impl_.createShader = function(this1,type) {
	return this1.createShader(type);
};
jsbox.gl._GL.GL_Impl_.createTexture = function(this1) {
	return this1.createTexture();
};
jsbox.gl._GL.GL_Impl_.cullFace = function(this1,mode) {
	this1.cullFace(mode);
};
jsbox.gl._GL.GL_Impl_.deleteBuffer = function(this1,buffer) {
	this1.deleteBuffer(buffer);
};
jsbox.gl._GL.GL_Impl_.deleteFramebuffer = function(this1,framebuffer) {
	this1.deleteFramebuffer(framebuffer);
};
jsbox.gl._GL.GL_Impl_.deleteProgram = function(this1,program) {
	this1.deleteProgram(program);
};
jsbox.gl._GL.GL_Impl_.deleteRenderbuffer = function(this1,renderbuffer) {
	this1.deleteRenderbuffer(renderbuffer);
};
jsbox.gl._GL.GL_Impl_.deleteShader = function(this1,shader) {
	this1.deleteShader(shader);
};
jsbox.gl._GL.GL_Impl_.deleteTexture = function(this1,texture) {
	this1.deleteTexture(texture);
};
jsbox.gl._GL.GL_Impl_.depthFunc = function(this1,func) {
	this1.depthFunc(func);
};
jsbox.gl._GL.GL_Impl_.depthMask = function(this1,flag) {
	this1.depthMask(flag);
};
jsbox.gl._GL.GL_Impl_.depthRange = function(this1,zNear,zFar) {
	this1.depthRange(zNear,zFar);
};
jsbox.gl._GL.GL_Impl_.detachShader = function(this1,program,shader) {
	this1.detachShader(program,shader);
};
jsbox.gl._GL.GL_Impl_.disable = function(this1,cap) {
	this1.disable(cap);
};
jsbox.gl._GL.GL_Impl_.disableVertexAttribArray = function(this1,index) {
	this1.disableVertexAttribArray(index);
};
jsbox.gl._GL.GL_Impl_.drawArrays = function(this1,mode,first,count) {
	this1.drawArrays(mode,first,count);
};
jsbox.gl._GL.GL_Impl_.drawElements = function(this1,mode,count,type,offset) {
	this1.drawElements(mode,count,type,offset);
};
jsbox.gl._GL.GL_Impl_.enable = function(this1,cap) {
	this1.enable(cap);
};
jsbox.gl._GL.GL_Impl_.enableVertexAttribArray = function(this1,index) {
	this1.enableVertexAttribArray(index);
};
jsbox.gl._GL.GL_Impl_.finish = function(this1) {
	this1.finish();
};
jsbox.gl._GL.GL_Impl_.flush = function(this1) {
	this1.flush();
};
jsbox.gl._GL.GL_Impl_.framebufferRenderbuffer = function(this1,target,attachment,renderbuffertarget,renderbuffer) {
	this1.framebufferRenderbuffer(target,attachment,renderbuffertarget,renderbuffer);
};
jsbox.gl._GL.GL_Impl_.framebufferTexture2D = function(this1,target,attachment,textarget,texture,level) {
	this1.framebufferTexture2D(target,attachment,textarget,texture,level);
};
jsbox.gl._GL.GL_Impl_.frontFace = function(this1,mode) {
	this1.frontFace(mode);
};
jsbox.gl._GL.GL_Impl_.generateMipmap = function(this1,target) {
	this1.generateMipmap(target);
};
jsbox.gl._GL.GL_Impl_.getActiveAttrib = function(this1,program,index) {
	return this1.getActiveAttrib(program,index);
};
jsbox.gl._GL.GL_Impl_.getActiveUniform = function(this1,program,index) {
	return this1.getActiveUniform(program,index);
};
jsbox.gl._GL.GL_Impl_.getAttachedShaders = function(this1,program) {
	return this1.getAttachedShaders(program);
};
jsbox.gl._GL.GL_Impl_.getAttribLocation = function(this1,program,name) {
	return this1.getAttribLocation(program,name);
};
jsbox.gl._GL.GL_Impl_.getBufferParameter = function(this1,target,pname) {
	return this1.getBufferParameter(target,pname);
};
jsbox.gl._GL.GL_Impl_.getContextAttributes = function(this1) {
	return this1.getContextAttributes();
};
jsbox.gl._GL.GL_Impl_.getError = function(this1) {
	return this1.getError();
};
jsbox.gl._GL.GL_Impl_.getExtension = function(this1,name) {
	return this1.getExtension(name);
};
jsbox.gl._GL.GL_Impl_.getFramebufferAttachmentParameter = function(this1,target,attachment,pname) {
	return this1.getFramebufferAttachmentParameter(target,attachment,pname);
};
jsbox.gl._GL.GL_Impl_.getParameter = function(this1,pname) {
	return this1.getParameter(pname);
};
jsbox.gl._GL.GL_Impl_.getProgramInfoLog = function(this1,program) {
	return this1.getProgramInfoLog(program);
};
jsbox.gl._GL.GL_Impl_.getProgramParameter = function(this1,program,pname) {
	return this1.getProgramParameter(program,pname);
};
jsbox.gl._GL.GL_Impl_.getRenderbufferParameter = function(this1,target,pname) {
	return this1.getRenderbufferParameter(target,pname);
};
jsbox.gl._GL.GL_Impl_.getShaderInfoLog = function(this1,shader) {
	return this1.getShaderInfoLog(shader);
};
jsbox.gl._GL.GL_Impl_.getShaderParameter = function(this1,shader,pname) {
	return this1.getShaderParameter(shader,pname);
};
jsbox.gl._GL.GL_Impl_.getShaderPrecisionFormat = function(this1,shadertype,precisiontype) {
	return this1.getShaderPrecisionFormat(shadertype,precisiontype);
};
jsbox.gl._GL.GL_Impl_.getShaderSource = function(this1,shader) {
	return this1.getShaderSource(shader);
};
jsbox.gl._GL.GL_Impl_.getSupportedExtensions = function(this1) {
	return this1.getSupportedExtensions();
};
jsbox.gl._GL.GL_Impl_.getTexParameter = function(this1,target,pname) {
	return this1.getTexParameter(target,pname);
};
jsbox.gl._GL.GL_Impl_.getUniform = function(this1,program,location) {
	return this1.getUniform(program,location);
};
jsbox.gl._GL.GL_Impl_.getUniformLocation = function(this1,program,name) {
	return this1.getUniformLocation(program,name);
};
jsbox.gl._GL.GL_Impl_.getVertexAttrib = function(this1,index,pname) {
	return this1.getVertexAttrib(index,pname);
};
jsbox.gl._GL.GL_Impl_.getVertexAttribOffset = function(this1,index,pname) {
	return this1.getVertexAttribOffset(index,pname);
};
jsbox.gl._GL.GL_Impl_.hint = function(this1,target,mode) {
	this1.hint(target,mode);
};
jsbox.gl._GL.GL_Impl_.isBuffer = function(this1,buffer) {
	return this1.isBuffer(buffer);
};
jsbox.gl._GL.GL_Impl_.isEnabled = function(this1,cap) {
	return this1.isEnabled(cap);
};
jsbox.gl._GL.GL_Impl_.isFramebuffer = function(this1,framebuffer) {
	return this1.isFramebuffer(framebuffer);
};
jsbox.gl._GL.GL_Impl_.isProgram = function(this1,program) {
	return this1.isProgram(program);
};
jsbox.gl._GL.GL_Impl_.isRenderbuffer = function(this1,renderbuffer) {
	return this1.isRenderbuffer(renderbuffer);
};
jsbox.gl._GL.GL_Impl_.isShader = function(this1,shader) {
	return this1.isShader(shader);
};
jsbox.gl._GL.GL_Impl_.isTexture = function(this1,texture) {
	return this1.isTexture(texture);
};
jsbox.gl._GL.GL_Impl_.lineWidth = function(this1,width) {
	this1.lineWidth(width);
};
jsbox.gl._GL.GL_Impl_.linkProgram = function(this1,program) {
	this1.linkProgram(program);
};
jsbox.gl._GL.GL_Impl_.pixelStorei = function(this1,pname,param) {
	this1.pixelStorei(pname,param);
};
jsbox.gl._GL.GL_Impl_.polygonOffset = function(this1,factor,units) {
	this1.polygonOffset(factor,units);
};
jsbox.gl._GL.GL_Impl_.readPixels = function(this1,x,y,width,height,format,type,pixels) {
	this1.readPixels(x,y,width,height,format,type,pixels);
};
jsbox.gl._GL.GL_Impl_.renderbufferStorage = function(this1,target,internalformat,width,height) {
	this1.renderbufferStorage(target,internalformat,width,height);
};
jsbox.gl._GL.GL_Impl_.sampleCoverage = function(this1,value,invert) {
	this1.sampleCoverage(value,invert);
};
jsbox.gl._GL.GL_Impl_.scissor = function(this1,x,y,width,height) {
	this1.scissor(x,y,width,height);
};
jsbox.gl._GL.GL_Impl_.shaderSource = function(this1,shader,source) {
	this1.shaderSource(shader,source);
};
jsbox.gl._GL.GL_Impl_.stencilFunc = function(this1,func,ref,mask) {
	this1.stencilFunc(func,ref,mask);
};
jsbox.gl._GL.GL_Impl_.stencilFuncSeparate = function(this1,face,func,ref,mask) {
	this1.stencilFuncSeparate(face,func,ref,mask);
};
jsbox.gl._GL.GL_Impl_.stencilMask = function(this1,mask) {
	this1.stencilMask(mask);
};
jsbox.gl._GL.GL_Impl_.stencilMaskSeparate = function(this1,face,mask) {
	this1.stencilMaskSeparate(face,mask);
};
jsbox.gl._GL.GL_Impl_.stencilOp = function(this1,fail,zfail,zpass) {
	this1.stencilOp(fail,zfail,zpass);
};
jsbox.gl._GL.GL_Impl_.stencilOpSeparate = function(this1,face,fail,zfail,zpass) {
	this1.stencilOpSeparate(face,fail,zfail,zpass);
};
jsbox.gl._GL.GL_Impl_.texImage2D = function(this1,target,level,internalformat,width,height,border,format,type,pixels) {
	this1.texImage2D(target,level,internalformat,width,height,border,format,type,pixels);
};
jsbox.gl._GL.GL_Impl_.texImage2DViaImage = function(this1,target,level,internalformat,format,type,image) {
	this1.texImage2D(target,level,internalformat,format,type,image);
};
jsbox.gl._GL.GL_Impl_.texParameterf = function(this1,target,pname,param) {
	this1.texParameterf(target,pname,param);
};
jsbox.gl._GL.GL_Impl_.texParameteri = function(this1,target,pname,param) {
	this1.texParameteri(target,pname,param);
};
jsbox.gl._GL.GL_Impl_.texSubImage2D = function(this1,target,level,xoffset,yoffset,width,height,format,type,pixels) {
	this1.texSubImage2D(target,level,xoffset,yoffset,width,height,format,type,pixels);
};
jsbox.gl._GL.GL_Impl_.uniform1f = function(this1,location,x) {
	this1.uniform1f(location,x);
};
jsbox.gl._GL.GL_Impl_.uniform1fv = function(this1,location,x) {
	this1.uniform1fv(location,x);
};
jsbox.gl._GL.GL_Impl_.uniform1i = function(this1,location,x) {
	this1.uniform1i(location,x);
};
jsbox.gl._GL.GL_Impl_.uniform1iv = function(this1,location,v) {
	this1.uniform1iv(location,v);
};
jsbox.gl._GL.GL_Impl_.uniform2f = function(this1,location,x,y) {
	this1.uniform2f(location,x,y);
};
jsbox.gl._GL.GL_Impl_.uniform2fv = function(this1,location,v) {
	this1.uniform2fv(location,v);
};
jsbox.gl._GL.GL_Impl_.uniform2i = function(this1,location,x,y) {
	this1.uniform2i(location,x,y);
};
jsbox.gl._GL.GL_Impl_.uniform2iv = function(this1,location,v) {
	this1.uniform2iv(location,v);
};
jsbox.gl._GL.GL_Impl_.uniform3f = function(this1,location,x,y,z) {
	this1.uniform3f(location,x,y,z);
};
jsbox.gl._GL.GL_Impl_.uniform3fv = function(this1,location,v) {
	this1.uniform3fv(location,v);
};
jsbox.gl._GL.GL_Impl_.uniform3i = function(this1,location,x,y,z) {
	this1.uniform3i(location,x,y,z);
};
jsbox.gl._GL.GL_Impl_.uniform3iv = function(this1,location,v) {
	this1.uniform3iv(location,v);
};
jsbox.gl._GL.GL_Impl_.uniform4f = function(this1,location,x,y,z,w) {
	this1.uniform4f(location,x,y,z,w);
};
jsbox.gl._GL.GL_Impl_.uniform4fv = function(this1,location,v) {
	this1.uniform4fv(location,v);
};
jsbox.gl._GL.GL_Impl_.uniform4i = function(this1,location,x,y,z,w) {
	this1.uniform4i(location,x,y,z,w);
};
jsbox.gl._GL.GL_Impl_.uniform4iv = function(this1,location,v) {
	this1.uniform4iv(location,v);
};
jsbox.gl._GL.GL_Impl_.uniformMatrix2fv = function(this1,location,transpose,v) {
	this1.uniformMatrix2fv(location,transpose,v);
};
jsbox.gl._GL.GL_Impl_.uniformMatrix3fv = function(this1,location,transpose,v) {
	this1.uniformMatrix3fv(location,transpose,v);
};
jsbox.gl._GL.GL_Impl_.uniformMatrix4fv = function(this1,location,transpose,v) {
	this1.uniformMatrix4fv(location,transpose,v);
};
jsbox.gl._GL.GL_Impl_.useProgram = function(this1,program) {
	this1.useProgram(program);
};
jsbox.gl._GL.GL_Impl_.validateProgram = function(this1,program) {
	this1.validateProgram(program);
};
jsbox.gl._GL.GL_Impl_.vertexAttrib1f = function(this1,indx,x) {
	this1.vertexAttrib1f(indx,x);
};
jsbox.gl._GL.GL_Impl_.vertexAttrib1fv = function(this1,indx,values) {
	this1.vertexAttrib1fv(indx,values);
};
jsbox.gl._GL.GL_Impl_.vertexAttrib2f = function(this1,indx,x,y) {
	this1.vertexAttrib2f(indx,x,y);
};
jsbox.gl._GL.GL_Impl_.vertexAttrib2fv = function(this1,indx,values) {
	this1.vertexAttrib2fv(indx,values);
};
jsbox.gl._GL.GL_Impl_.vertexAttrib3f = function(this1,indx,x,y,z) {
	this1.vertexAttrib3f(indx,x,y,z);
};
jsbox.gl._GL.GL_Impl_.vertexAttrib3fv = function(this1,indx,values) {
	this1.vertexAttrib3fv(indx,values);
};
jsbox.gl._GL.GL_Impl_.vertexAttrib4f = function(this1,indx,x,y,z,w) {
	this1.vertexAttrib4f(indx,x,y,z,w);
};
jsbox.gl._GL.GL_Impl_.vertexAttrib4fv = function(this1,indx,values) {
	this1.vertexAttrib4fv(indx,values);
};
jsbox.gl._GL.GL_Impl_.vertexAttribPointer = function(this1,indx,size,type,normalized,stride,offset) {
	this1.vertexAttribPointer(indx,size,type,normalized,stride,offset);
};
jsbox.gl._GL.GL_Impl_.viewport = function(this1,x,y,width,height) {
	this1.viewport(x,y,width,height);
};
var korrigan = {};
korrigan.NormalTexturedProgram = function(gl,nativeProgram) {
	this._alpha_shaderLocation = 0;
	this._position_shaderLocation = 0;
	this._texCoords_shaderLocation = 0;
	this._lightPos_shaderLocation = null;
	this._ambientColor_shaderLocation = null;
	this._resolution_shaderLocation = null;
	this._tex_shaderLocation = null;
	this._normal_shaderLocation = null;
	this._lightColor_shaderLocation = null;
	this._falloff_shaderLocation = null;
	this._nativeProgram = null;
	this._gl = null;
	this._nativeProgram = nativeProgram;
	this._gl = gl;
	this._falloff_shaderLocation = this._gl.getUniformLocation(this._nativeProgram,"falloff");
	this._lightColor_shaderLocation = this._gl.getUniformLocation(this._nativeProgram,"lightColor");
	this._normal_shaderLocation = this._gl.getUniformLocation(this._nativeProgram,"normal");
	this._tex_shaderLocation = this._gl.getUniformLocation(this._nativeProgram,"tex");
	this._resolution_shaderLocation = this._gl.getUniformLocation(this._nativeProgram,"resolution");
	this._ambientColor_shaderLocation = this._gl.getUniformLocation(this._nativeProgram,"ambientColor");
	this._lightPos_shaderLocation = this._gl.getUniformLocation(this._nativeProgram,"lightPos");
	this._texCoords_shaderLocation = this._gl.getAttribLocation(this._nativeProgram,"texCoords");
	this._position_shaderLocation = this._gl.getAttribLocation(this._nativeProgram,"position");
	this._alpha_shaderLocation = this._gl.getAttribLocation(this._nativeProgram,"alpha");
};
$hxClasses["korrigan.NormalTexturedProgram"] = korrigan.NormalTexturedProgram;
korrigan.NormalTexturedProgram.__name__ = ["korrigan","NormalTexturedProgram"];
korrigan.NormalTexturedProgram.__interfaces__ = [glow.GPUProgram];
korrigan.NormalTexturedProgram.upload = function(gpu) {
	var program = glow.GPUProgramUtil.upload(gpu.gl,"attribute vec3 position;\r\nattribute float alpha;\r\nattribute vec2 texCoords;\r\nvarying vec2 vTextureCoord;\r\nvarying float vAlpha;\r\nvoid main(void) {\r\n\tvTextureCoord = texCoords;\r\n\tvAlpha = alpha;\r\n    gl_Position = vec4(position,1.0);\r\n}","precision mediump float;\r\nuniform sampler2D tex;\r\nuniform sampler2D normal;\r\nvarying vec2 vTextureCoord;\r\nvarying float vAlpha;\r\n\r\nuniform vec3 lightPos;\r\nuniform vec4 lightColor;      //light RGBA -- alpha is intensity\r\nuniform vec2 resolution;      //resolution of screen need to know the position of the pixel\r\nuniform vec4 ambientColor;    //ambient RGBA -- alpha is intensity\r\nuniform vec3 falloff;\r\nvoid main(void)\r\n{\r\n\t//vec3 texNormal =  texture2D (uNormals, vTexCoord).rgb;\r\n    //vec4 texColor =  texture2D (uColors, vTexCoord).rgba;\r\n    vec3 texNormal =  texture2D (normal, vTextureCoord).rgb;\r\n    vec4 texColor =  texture2D (tex, vTextureCoord).rgba;\r\n\r\n    texColor = texColor * vAlpha;\r\n\r\n\tvec3 lightDir = vec3(lightPos.x / resolution.x, 1.0 - (lightPos.y / resolution.y), lightPos.z);\r\n    lightDir = vec3(lightDir.xy - (gl_FragCoord.xy / resolution.xy), lightDir.z);\r\n\r\n    lightDir.x *= resolution.x / resolution.y;\r\n\r\n    float D = length(lightDir);\r\n\r\n    vec3 N = normalize(texNormal * 2.0 - 1.0);\r\n    vec3 L = normalize(lightDir);\r\n\r\n    vec3 diffuse = (lightColor.rgb * lightColor.a) * max(dot(N, L), 0.0);\r\n    vec3 ambient = ambientColor.rgb * ambientColor.a;\r\n    float attenuation = 1.0 / ( falloff.x + (falloff.y*D) + (falloff.z*D*D) );\r\n\r\n    vec3 intensity = ambient + diffuse * attenuation;\r\n    vec3 finalColor = texColor.rgb * intensity;\r\n    gl_FragColor = vec4(finalColor, texColor.a);\r\n}\r\n\r\n\r\n//float a = texture2D(texture1,vTexCoord).a;\r\n//float r=uTextColor.r*a;\r\n//float g=uTextColor.g*a; \r\n//float b=uTextColor.b*a;\r\n//gl_FragColor = vec4(r,g,b,a);");
	return new korrigan.NormalTexturedProgram(gpu.gl,program);
};
korrigan.NormalTexturedProgram.prototype = {
	set_falloff: function(x,y,z) {
		this._gl.useProgram(this._nativeProgram);
		this._gl.uniform3f(this._falloff_shaderLocation,x,y,z);
	}
	,set_lightColor: function(x,y,z,w) {
		this._gl.useProgram(this._nativeProgram);
		this._gl.uniform4f(this._lightColor_shaderLocation,x,y,z,w);
	}
	,set_normal: function(texture) {
		this._gl.useProgram(this._nativeProgram);
		this._gl.activeTexture(33984);
		this._gl.bindTexture(3553,texture.nativeTexture);
		this._gl.uniform1i(this._normal_shaderLocation,0);
	}
	,set_tex: function(texture) {
		this._gl.useProgram(this._nativeProgram);
		this._gl.activeTexture(33985);
		this._gl.bindTexture(3553,texture.nativeTexture);
		this._gl.uniform1i(this._tex_shaderLocation,1);
	}
	,set_resolution: function(x,y) {
		this._gl.useProgram(this._nativeProgram);
		this._gl.uniform2f(this._resolution_shaderLocation,x,y);
	}
	,set_ambientColor: function(x,y,z,w) {
		this._gl.useProgram(this._nativeProgram);
		this._gl.uniform4f(this._ambientColor_shaderLocation,x,y,z,w);
	}
	,set_lightPos: function(x,y,z) {
		this._gl.useProgram(this._nativeProgram);
		this._gl.uniform3f(this._lightPos_shaderLocation,x,y,z);
	}
	,draw: function(buffer) {
		this._gl.useProgram(this._nativeProgram);
		this._gl.bindBuffer(34962,buffer.nativeBuffer);
		this._gl.enableVertexAttribArray(this._texCoords_shaderLocation);
		this._gl.vertexAttribPointer(this._texCoords_shaderLocation,2,5126,false,24,0);
		this._gl.enableVertexAttribArray(this._position_shaderLocation);
		this._gl.vertexAttribPointer(this._position_shaderLocation,3,5126,false,24,8);
		this._gl.enableVertexAttribArray(this._alpha_shaderLocation);
		this._gl.vertexAttribPointer(this._alpha_shaderLocation,1,5126,false,24,20);
		if(!buffer.uploaded) buffer.upload();
		this._gl.bindBuffer(34962,buffer.nativeBuffer);
		var count = buffer.getNumVerticesWritten();
		this._gl.drawArrays(4,0,count);
		this._gl.useProgram(null);
	}
	,__class__: korrigan.NormalTexturedProgram
};
korrigan.SimpleTexturedProgram = function(gl,nativeProgram) {
	this._alpha_shaderLocation = 0;
	this._position_shaderLocation = 0;
	this._texCoords_shaderLocation = 0;
	this._tex_shaderLocation = null;
	this._nativeProgram = null;
	this._gl = null;
	this._nativeProgram = nativeProgram;
	this._gl = gl;
	this._tex_shaderLocation = this._gl.getUniformLocation(this._nativeProgram,"tex");
	this._texCoords_shaderLocation = this._gl.getAttribLocation(this._nativeProgram,"texCoords");
	this._position_shaderLocation = this._gl.getAttribLocation(this._nativeProgram,"position");
	this._alpha_shaderLocation = this._gl.getAttribLocation(this._nativeProgram,"alpha");
};
$hxClasses["korrigan.SimpleTexturedProgram"] = korrigan.SimpleTexturedProgram;
korrigan.SimpleTexturedProgram.__name__ = ["korrigan","SimpleTexturedProgram"];
korrigan.SimpleTexturedProgram.__interfaces__ = [glow.GPUProgram];
korrigan.SimpleTexturedProgram.upload = function(gpu) {
	var program = glow.GPUProgramUtil.upload(gpu.gl,"attribute vec3 position;\r\nattribute float alpha;\r\nattribute vec2 texCoords;\r\nvarying vec2 vTextureCoord;\r\nvarying float vAlpha;\r\nvoid main(void) {\r\n\tvTextureCoord = texCoords;\r\n\tvAlpha = alpha;\r\n    gl_Position = vec4(position,1.0);\r\n}","precision mediump float;\r\nuniform sampler2D tex;\r\nvarying vec2 vTextureCoord;\r\nvarying float vAlpha;\r\n\r\n\r\nvoid main(void)\r\n{\r\n    vec4 texColor =  texture2D (tex, vTextureCoord).rgba;\r\n\r\n    texColor = texColor * vAlpha;\r\n\r\n    gl_FragColor = texColor;\r\n}\r\n");
	return new korrigan.SimpleTexturedProgram(gpu.gl,program);
};
korrigan.SimpleTexturedProgram.prototype = {
	set_tex: function(texture) {
		this._gl.useProgram(this._nativeProgram);
		this._gl.activeTexture(33984);
		this._gl.bindTexture(3553,texture.nativeTexture);
		this._gl.uniform1i(this._tex_shaderLocation,0);
	}
	,draw: function(buffer) {
		this._gl.useProgram(this._nativeProgram);
		this._gl.bindBuffer(34962,buffer.nativeBuffer);
		this._gl.enableVertexAttribArray(this._texCoords_shaderLocation);
		this._gl.vertexAttribPointer(this._texCoords_shaderLocation,2,5126,false,24,0);
		this._gl.enableVertexAttribArray(this._position_shaderLocation);
		this._gl.vertexAttribPointer(this._position_shaderLocation,3,5126,false,24,8);
		this._gl.enableVertexAttribArray(this._alpha_shaderLocation);
		this._gl.vertexAttribPointer(this._alpha_shaderLocation,1,5126,false,24,20);
		if(!buffer.uploaded) buffer.upload();
		this._gl.bindBuffer(34962,buffer.nativeBuffer);
		var count = buffer.getNumVerticesWritten();
		this._gl.drawArrays(4,0,count);
		this._gl.useProgram(null);
	}
	,__class__: korrigan.SimpleTexturedProgram
};
korrigan.TexturedQuadMesh = function(meshData) {
	this.x1 = meshData.x1;
	this.y1 = meshData.y1;
	this.x2 = meshData.x2;
	this.y2 = meshData.y2;
	this.u1 = meshData.u1;
	this.v1 = meshData.v1;
	this.u2 = meshData.u2;
	this.v2 = meshData.v2;
	this.refX = meshData.refX;
	this.refY = meshData.refY;
};
$hxClasses["korrigan.TexturedQuadMesh"] = korrigan.TexturedQuadMesh;
korrigan.TexturedQuadMesh.__name__ = ["korrigan","TexturedQuadMesh"];
korrigan.TexturedQuadMesh.prototype = {
	__class__: korrigan.TexturedQuadMesh
};
korrigan.Frame = function(index,frameData) {
	this.index = index;
	this.mesh = new korrigan.TexturedQuadMesh(frameData.meshData);
	if(Object.prototype.hasOwnProperty.call(frameData,"scaleX")) this.scaleX = frameData.scaleX; else this.scaleX = 1;
	if(Object.prototype.hasOwnProperty.call(frameData,"scaleY")) this.scaleY = frameData.scaleY; else this.scaleY = 1;
};
$hxClasses["korrigan.Frame"] = korrigan.Frame;
korrigan.Frame.__name__ = ["korrigan","Frame"];
korrigan.Frame.prototype = {
	__class__: korrigan.Frame
};
korrigan.FrameAnimation = function(id,frames) {
	this.frames = [];
	var i = 0;
	var _g = 0;
	while(_g < frames.length) {
		var frame = frames[_g];
		++_g;
		this.frames.push(new korrigan.Frame(i,frame));
		i++;
	}
};
$hxClasses["korrigan.FrameAnimation"] = korrigan.FrameAnimation;
korrigan.FrameAnimation.__name__ = ["korrigan","FrameAnimation"];
korrigan.FrameAnimation.prototype = {
	getFrame: function(elapsedTime) {
		return this.frames[0];
	}
	,__class__: korrigan.FrameAnimation
};
korrigan.Sprite = function(id,spriteData) {
	this.animations = new haxe.ds.StringMap();
	var _g = 0;
	var _g1 = Reflect.fields(spriteData);
	while(_g < _g1.length) {
		var animationId = _g1[_g];
		++_g;
		var v = new korrigan.FrameAnimation(animationId,Reflect.field(spriteData,animationId));
		this.animations.set(animationId,v);
		v;
	}
};
$hxClasses["korrigan.Sprite"] = korrigan.Sprite;
korrigan.Sprite.__name__ = ["korrigan","Sprite"];
korrigan.Sprite.prototype = {
	getFrame: function(animationId,elapsedTime) {
		var animation = this.animations.get(animationId);
		if(animation != null) return animation.getFrame(elapsedTime);
		return null;
	}
	,__class__: korrigan.Sprite
};
korrigan.SpriteLibrary = function() {
	this._sprites = new haxe.ds.StringMap();
};
$hxClasses["korrigan.SpriteLibrary"] = korrigan.SpriteLibrary;
korrigan.SpriteLibrary.__name__ = ["korrigan","SpriteLibrary"];
korrigan.SpriteLibrary.prototype = {
	loadSprites: function(spriteSet,textureAtlas) {
		var _g = 0;
		var _g1 = Reflect.fields(spriteSet);
		while(_g < _g1.length) {
			var spriteId = _g1[_g];
			++_g;
			var spriteData = Reflect.field(spriteSet,spriteId);
			var _g2 = 0;
			var _g3 = Reflect.fields(spriteData);
			while(_g2 < _g3.length) {
				var animationId = _g3[_g2];
				++_g2;
				var animationData = Reflect.field(spriteData,animationId);
				var _g4 = 0;
				while(_g4 < animationData.length) {
					var frameData = animationData[_g4];
					++_g4;
					var originalCutOut = Reflect.field(textureAtlas.cutOuts,frameData.textureCutOut);
					var uRatio = 1 / textureAtlas.width;
					var vRatio = 1 / textureAtlas.height;
					frameData.meshData = { x1 : originalCutOut.x1, y1 : originalCutOut.y1, x2 : originalCutOut.x2, y2 : originalCutOut.y2, u1 : originalCutOut.x1 * uRatio, v1 : originalCutOut.y1 * vRatio, u2 : originalCutOut.x2 * uRatio, v2 : originalCutOut.y2 * vRatio, refX : originalCutOut.refX, refY : originalCutOut.refY};
				}
			}
			var sprite = new korrigan.Sprite(spriteId,spriteData);
			this._sprites.set(spriteId,sprite);
			sprite;
		}
	}
	,draw: function(buffer,context,spriteId,animationName,elapsedTime,x,y,z,width,height,keepRatio) {
		if(keepRatio == null) keepRatio = true;
		if(height == null) height = 0;
		if(width == null) width = 0;
		var placement = this.getTexturePlacement(context,spriteId,animationName,elapsedTime,x,y,z,width,height,keepRatio);
		buffer.write_position(placement.dstX1,placement.dstY1,z);
		buffer.write_position(placement.dstX3,placement.dstY3,z);
		buffer.write_position(placement.dstX2,placement.dstY2,z);
		buffer.write_position(placement.dstX4,placement.dstY4,z);
		buffer.write_position(placement.dstX2,placement.dstY2,z);
		buffer.write_position(placement.dstX3,placement.dstY3,z);
		buffer.write_alpha(context.get_alpha());
		buffer.write_alpha(context.get_alpha());
		buffer.write_alpha(context.get_alpha());
		buffer.write_alpha(context.get_alpha());
		buffer.write_alpha(context.get_alpha());
		buffer.write_alpha(context.get_alpha());
		buffer.write_texCoords(placement.srcX1,placement.srcY1);
		buffer.write_texCoords(placement.srcX1,placement.srcY2);
		buffer.write_texCoords(placement.srcX2,placement.srcY1);
		buffer.write_texCoords(placement.srcX2,placement.srcY2);
		buffer.write_texCoords(placement.srcX2,placement.srcY1);
		buffer.write_texCoords(placement.srcX1,placement.srcY2);
	}
	,getTexturePlacement: function(context,spriteId,animationName,elapsedTime,x,y,z,width,height,keepRatio) {
		if(keepRatio == null) keepRatio = true;
		if(height == null) height = 0;
		if(width == null) width = 0;
		var sprite = this._sprites.get(spriteId);
		var frame = null;
		var error = false;
		if(sprite == null) {
			haxe.Log.trace("no sprite with id : " + spriteId,{ fileName : "SpriteLibrary.hx", lineNumber : 188, className : "korrigan.SpriteLibrary", methodName : "getTexturePlacement"});
			error = true;
		} else {
			frame = sprite.getFrame(animationName,elapsedTime);
			if(frame == null) {
				error = true;
				haxe.Log.trace("no frame for animation : " + animationName,{ fileName : "SpriteLibrary.hx", lineNumber : 194, className : "korrigan.SpriteLibrary", methodName : "getTexturePlacement"});
			}
		}
		if(error) {
			if(width == 0) width = 100; else width = width;
			if(height == 0) height = 100; else height = height;
			return null;
		} else {
			var mesh = frame.mesh;
			var meshWidth = mesh.x2 - mesh.x1;
			var meshHeight = mesh.y2 - mesh.y1;
			if(width == 0) width = meshWidth;
			if(height == 0) height = meshHeight;
			var scaleX = width / meshWidth;
			var scaleY = height / meshHeight;
			if(keepRatio) scaleX = scaleY = Math.min(scaleX,scaleY);
			var offsetX = mesh.refX * frame.scaleX;
			var offsetY = mesh.refY * frame.scaleY;
			var targetX = x - offsetX * scaleX;
			var targetY = y - offsetY * scaleY;
			var rectX1 = targetX;
			var rectY1 = targetY;
			var rectX2 = targetX + meshWidth * scaleX;
			var rectY2 = targetY + meshHeight * scaleY;
			var vec;
			var this1;
			this1 = new Float32Array(4);
			this1[0] = 0;
			this1[1] = 0;
			this1[2] = 0;
			this1[3] = 0;
			vec = this1;
			vec[0] = rectX1;
			vec[1] = rectY1;
			vec[2] = z;
			vec[3] = 1;
			context.transform(vec);
			var dstX1 = vec[0];
			var dstY1 = vec[1];
			vec[0] = rectX2;
			vec[1] = rectY1;
			vec[2] = z;
			vec[3] = 1;
			context.transform(vec);
			var dstX2 = vec[0];
			var dstY2 = vec[1];
			vec[0] = rectX1;
			vec[1] = rectY2;
			vec[2] = z;
			vec[3] = 1;
			context.transform(vec);
			var dstX3 = vec[0];
			var dstY3 = vec[1];
			vec[0] = rectX2;
			vec[1] = rectY2;
			vec[2] = z;
			vec[3] = 1;
			context.transform(vec);
			var dstX4 = vec[0];
			var dstY4 = vec[1];
			return { srcX1 : mesh.u1, srcY1 : mesh.v1, srcX2 : mesh.u2, srcY2 : mesh.v2, dstX1 : dstX1, dstY1 : dstY1, dstX2 : dstX2, dstY2 : dstY2, dstX3 : dstX3, dstY3 : dstY3, dstX4 : dstX4, dstY4 : dstY4, dstZ : z};
		}
	}
	,__class__: korrigan.SpriteLibrary
};
korrigan.TransformationContext = function() {
	this._stateList = new korrigan.TransformationState();
};
$hxClasses["korrigan.TransformationContext"] = korrigan.TransformationContext;
korrigan.TransformationContext.__name__ = ["korrigan","TransformationContext"];
korrigan.TransformationContext.prototype = {
	get_alpha: function() {
		return this._stateList.alpha;
	}
	,save: function() {
		var current = this._stateList;
		var state = this._stateList.next;
		if(state == null) {
			state = new korrigan.TransformationState();
			state.prev = current;
			current.next = state;
		}
		num._Matrix.Matrix_Impl_.copyFrom(state.matrix,current.matrix);
		state.alpha = current.alpha;
		this._stateList = state;
	}
	,translate: function(x,y) {
		var state = this._stateList;
		num._Matrix.Matrix_Impl_.translate(state.matrix,state.matrix,x,y,0);
	}
	,scale: function(x,y) {
		if(x == 0 || y == 0) return;
		var state = this._stateList;
		num._Matrix.Matrix_Impl_.scale(state.matrix,state.matrix,x,y,1);
	}
	,rotate: function(rotation) {
		var state = this._stateList;
	}
	,multiplyAlpha: function(factor) {
		this._stateList.alpha *= factor;
	}
	,setAlpha: function(alpha) {
		this._stateList.alpha = alpha;
	}
	,ortho: function(left,right,bottom,top,near,far) {
		num._Matrix.Matrix_Impl_.ortho(this._stateList.matrix,left,right,bottom,top,near,far);
	}
	,restore: function() {
		this._stateList = this._stateList.prev;
	}
	,getTopState: function() {
		return this._stateList;
	}
	,transform: function(vec) {
		var m = this._stateList.matrix;
		vec[0] = m[0] * vec[0] + m[4] * vec[1] + m[8] * vec[2] + m[12] * vec[3];
		vec[1] = m[1] * vec[0] + m[5] * vec[1] + m[9] * vec[2] + m[13] * vec[3];
		vec[2] = m[2] * vec[0] + m[6] * vec[1] + m[10] * vec[2] + m[14] * vec[3];
		vec[3] = m[3] * vec[0] + m[7] * vec[1] + m[11] * vec[2] + m[15] * vec[3];
		vec;
	}
	,__class__: korrigan.TransformationContext
};
korrigan.TransformationState = function() {
	var this1;
	var out = this1 = new Float32Array(16);
	out[0] = 1;
	out[1] = 0;
	out[2] = 0;
	out[3] = 0;
	out[4] = 0;
	out[5] = 1;
	out[6] = 0;
	out[7] = 0;
	out[8] = 0;
	out[9] = 0;
	out[10] = 1;
	out[11] = 0;
	out[12] = 0;
	out[13] = 0;
	out[14] = 0;
	out[15] = 1;
	this.matrix = this1;
	this.alpha = 1;
};
$hxClasses["korrigan.TransformationState"] = korrigan.TransformationState;
korrigan.TransformationState.__name__ = ["korrigan","TransformationState"];
korrigan.TransformationState.prototype = {
	__class__: korrigan.TransformationState
};
var snail = {};
snail.Screen = function() { };
$hxClasses["snail.Screen"] = snail.Screen;
snail.Screen.__name__ = ["snail","Screen"];
snail.Screen.prototype = {
	__class__: snail.Screen
};
var ld31 = {};
ld31.GameScreen = function() {
	this._finished = false;
	this._done = false;
};
$hxClasses["ld31.GameScreen"] = ld31.GameScreen;
ld31.GameScreen.__name__ = ["ld31","GameScreen"];
ld31.GameScreen.__interfaces__ = [snail.Screen];
ld31.GameScreen.prototype = {
	enter: function(shell,now) {
		ld31.Main.exitconditionfullfil = false;
		this._shell = shell;
		this._done = false;
		this._finished = false;
		this._bgSound = this._setupSound("output.mp3");
		this._bgSound.loop(true);
		this._bgSound.play();
		window.Howler.volume(0.1);
		var texts = shell.data.assets.texts;
		var images = shell.data.assets.images;
		var textureAtlas = JSON.parse(texts.get("img/texture.json"));
		var json = JSON.parse(texts.get("img/sprites.json"));
		this.spriteLibrary = new korrigan.SpriteLibrary();
		this.spriteLibrary.loadSprites(json,textureAtlas);
		this._image = images.get("img/colors.png");
		this._normal = images.get("img/normals.png");
		var tiledmap = shell.data.tiledmap;
		this.presenter = new ld31.view.Presenter(shell.data.window,this.spriteLibrary,shell.data.gpu,this._image,this._normal,tiledmap);
		var typeplayer = new wax.system.EntityType();
		typeplayer.setup([new ld31.model.PlayerTypeComponent()]);
		var typeai = new wax.system.EntityType();
		typeai.setup([new ld31.model.AITypeComponent()]);
		this.typelibrary = new haxe.ds.StringMap();
		this.typelibrary.set("player",typeplayer);
		this.typelibrary.set("ai",typeai);
		var systems = [new ld31.model.AISystem(this.typelibrary,tiledmap),new ld31.model.DoorSystem(this.typelibrary,tiledmap),new ld31.model.PlayerSystem(this.typelibrary),new ld31.model.GestionLevelSystem(this.typelibrary,tiledmap),new ld31.controller.ControllerKey(this.typelibrary),new ld31.model.GestionForceSystem(this.typelibrary),new ld31.model.GestionDynamicSystem(this.typelibrary),new ld31.model.GridSystem(this.typelibrary,tiledmap),new ld31.model.CameraSystem(this.typelibrary)];
		this.worldModel = new wax.system.Model();
		this.worldModel.setup(systems);
		this.presenter.present(this.worldModel);
	}
	,_setupSound: function(url) {
		var options = new howler.HowlOptions();
		options.urls = [url];
		options.autoplay = false;
		var snd = new window.Howl(options);
		return snd;
	}
	,update: function(now,dt) {
		if(this.worldModel != null && ld31.Main.exitconditionfullfil == false && ld31.Main.gameover == false) {
			this.worldModel.update(dt,now);
			this.presenter.update(dt,now);
		}
		if(!this._finished && (ld31.Main.exitconditionfullfil || ld31.Main.gameover)) {
			this._finished = true;
			window.document.addEventListener("keydown",$bind(this,this.keyDownHandler),false);
		}
		return this._done;
	}
	,quit: function(now) {
		this._bgSound.stop();
	}
	,keyDownHandler: function(event) {
		var keyPressed = event.keyCode;
		if(keyPressed == "32") this._done = true;
		window.document.removeEventListener("keydown",$bind(this,this.keyDownHandler),false);
	}
	,__class__: ld31.GameScreen
};
ld31.Main = function() {
	var this1 = egg.Assets.load(["img/texture.json","img/sprites.json","img/map-complex.json"],["img/start.png","img/colors.png","img/normals.png"]);
	this1($bind(this,this.assetsLoaded));
};
$hxClasses["ld31.Main"] = ld31.Main;
ld31.Main.__name__ = ["ld31","Main"];
ld31.Main.main = function() {
	new ld31.Main();
};
ld31.Main.prototype = {
	assetsLoaded: function(outcome) {
		switch(outcome[1]) {
		case 1:
			var error = outcome[2];
			haxe.Log.trace(error,{ fileName : "Main.hx", lineNumber : 51, className : "ld31.Main", methodName : "assetsLoaded"});
			break;
		case 0:
			var assets = outcome[2];
			window.document.getElementById("loading").remove();
			var $window = jsbox.Window.createWindow();
			var gpu = new glow.GPU($window.gl);
			this.shell = new snail.Shell({ window : $window, gpu : gpu, assets : null, tiledmap : null, startImage : null},[new ld31.StartScreen(),new ld31.GameScreen()]);
			this.shell.data.assets = assets;
			var runner = new run.Runner(this.shell);
			runner.start();
			break;
		}
	}
	,__class__: ld31.Main
};
ld31.StartScreen = function() {
	this._done = false;
};
$hxClasses["ld31.StartScreen"] = ld31.StartScreen;
ld31.StartScreen.__name__ = ["ld31","StartScreen"];
ld31.StartScreen.__interfaces__ = [snail.Screen];
ld31.StartScreen.prototype = {
	enter: function(shell,now) {
		this.window = shell.data.window;
		this.gpu = shell.data.gpu;
		this._texture = this.gpu.uploadTexture(shell.data.assets.images.get("img/start.png"));
		this.program = korrigan.SimpleTexturedProgram.upload(this.gpu);
		this.program.set_tex(this._texture);
		this.buffer = new glow.buffer.Buffer_texCoordsVec_28Float_2C2_29positionVec_28Float_2C3_29alphaFloat(this.gpu,35044);
		this.buffer.write_position(-1,-1,0);
		this.buffer.write_position(-1,1,0);
		this.buffer.write_position(1,-1,0);
		this.buffer.write_position(1,1,0);
		this.buffer.write_position(1,-1,0);
		this.buffer.write_position(-1,1,0);
		this.buffer.write_alpha(1);
		this.buffer.write_alpha(1);
		this.buffer.write_alpha(1);
		this.buffer.write_alpha(1);
		this.buffer.write_alpha(1);
		this.buffer.write_alpha(1);
		this.buffer.write_texCoords(0,1);
		this.buffer.write_texCoords(0,0);
		this.buffer.write_texCoords(1,1);
		this.buffer.write_texCoords(1,0);
		this.buffer.write_texCoords(1,1);
		this.buffer.write_texCoords(0,0);
		this._shell = shell;
		this._done = false;
		this._shell.data.tiledmap = this.parseTiledMap(this._shell.data.assets.texts.get("img/map-complex.json"));
		window.document.addEventListener("keydown",$bind(this,this.keyDownHandler),false);
	}
	,parseTiledMap: function(data) {
		var res = JSON.parse(data);
		var n = 0;
		var k = 0;
		var l = 0;
		ld31.Main.WIDTH = Std["int"](Std["int"](this._shell.data.window.get_width()) / (res.layers[0].data1.length / res.height | 0));
		ld31.Main.HEIGHT = Std["int"](Std["int"](this._shell.data.window.get_height()) / res.height);
		var tiledmap;
		var _g = [];
		var _g1 = 0;
		while(_g1 < 3) {
			var x = _g1++;
			_g.push((function($this) {
				var $r;
				var _g2 = [];
				{
					var _g4 = 0;
					var _g3 = res.layers[0].data1.length / res.height | 0;
					while(_g4 < _g3) {
						var x1 = _g4++;
						_g2.push((function($this) {
							var $r;
							var _g5 = [];
							{
								var _g7 = 0;
								var _g6 = res.height;
								while(_g7 < _g6) {
									var y = _g7++;
									_g5.push(0);
								}
							}
							$r = _g5;
							return $r;
						}($this)));
					}
				}
				$r = _g2;
				return $r;
			}(this)));
		}
		tiledmap = _g;
		var _g21 = 0;
		var _g11 = tiledmap[0].length;
		while(_g21 < _g11) {
			var x2 = _g21++;
			var _g41 = 0;
			var _g31 = tiledmap[0][x2].length;
			while(_g41 < _g31) {
				var y1 = _g41++;
				tiledmap[0][x2][y1] = res.layers[0].data1[x2 + (res.layers[0].data1.length / res.height | 0) * y1];
				tiledmap[1][x2][y1] = res.layers[0].data2[x2 + (res.layers[0].data1.length / res.height | 0) * y1];
				tiledmap[2][x2][y1] = res.layers[0].data3[x2 + (res.layers[0].data1.length / res.height | 0) * y1];
				l++;
			}
		}
		return tiledmap;
	}
	,update: function(now,dt) {
		this.window.resize();
		var width = Std["int"](this.window.get_width());
		var height = Std["int"](this.window.get_height());
		this.window.gl.viewport(0,0,width,height);
		this.program.draw(this.buffer);
		return this._done;
	}
	,quit: function(now) {
	}
	,keyDownHandler: function(event) {
		var keyPressed = event.keyCode;
		if(keyPressed == "32") this._done = true;
		window.document.removeEventListener("keydown",$bind(this,this.keyDownHandler),false);
	}
	,__class__: ld31.StartScreen
};
var wax = {};
wax.system = {};
wax.system.Updatable = function() { };
$hxClasses["wax.system.Updatable"] = wax.system.Updatable;
wax.system.Updatable.__name__ = ["wax","system","Updatable"];
wax.system.Updatable.prototype = {
	__class__: wax.system.Updatable
};
wax.system.Component = function() { };
$hxClasses["wax.system.Component"] = wax.system.Component;
wax.system.Component.__name__ = ["wax","system","Component"];
wax.system.Component.prototype = {
	__class__: wax.system.Component
};
wax.system.ModelComponent = function() { };
$hxClasses["wax.system.ModelComponent"] = wax.system.ModelComponent;
wax.system.ModelComponent.__name__ = ["wax","system","ModelComponent"];
wax.system.ModelComponent.__interfaces__ = [wax.system.Component];
wax.system.ModelComponent.prototype = {
	__class__: wax.system.ModelComponent
};
wax.system.SystemComponent = function() { };
$hxClasses["wax.system.SystemComponent"] = wax.system.SystemComponent;
wax.system.SystemComponent.__name__ = ["wax","system","SystemComponent"];
wax.system.SystemComponent.__interfaces__ = [wax.system.ModelComponent];
wax.system.SystemComponent.prototype = {
	__class__: wax.system.SystemComponent
};
ld31.controller = {};
ld31.controller.ControllerKey = function(typelibrary) {
	window.document.addEventListener("keydown",$bind(this,this.keyDownHandler),false);
	window.document.addEventListener("keyup",$bind(this,this.keyUpHandler),false);
	this.registeredEntities = [];
	this._entityRegistrar = new haxe.ds.ObjectMap();
	this._requiredEntityComponents = [ld31.model.PlayerComponent];
};
$hxClasses["ld31.controller.ControllerKey"] = ld31.controller.ControllerKey;
ld31.controller.ControllerKey.__name__ = ["ld31","controller","ControllerKey"];
ld31.controller.ControllerKey.__interfaces__ = [wax.system.Updatable,wax.system.SystemComponent];
ld31.controller.ControllerKey.prototype = {
	keyDownHandler: function(event) {
		var keyPressed = event.keyCode;
		if(keyPressed == "38") this.playercomponent.trytomovein = 1; else if(keyPressed == "40") this.playercomponent.trytomoveout = 1;
		if(keyPressed == "88") this.playercomponent.jump = 1;
		if(keyPressed == "39") this.playercomponent.direction = 1; else if(keyPressed == "37") this.playercomponent.direction = -1;
	}
	,keyUpHandler: function(event) {
		var keyPressed = event.keyCode;
		if(keyPressed == "38" || keyPressed == "40") {
			this.playercomponent.trytomovein = 0;
			this.playercomponent.trytomoveout = 0;
		}
		if(keyPressed == "88") this.playercomponent.jump = 0;
		if(keyPressed == "37" || keyPressed == "39") this.playercomponent.direction = 0;
	}
	,onEntityRegistered: function(entity) {
		if(this.playercomponent != null) haxe.Log.trace("error",{ fileName : "ControllerKey.hx", lineNumber : 86, className : "ld31.controller.ControllerKey", methodName : "onEntityRegistered", customParams : ["GameController","the controller support only one player action component","ignoring the new entity",null]}); else this.playercomponent = entity.get(ld31.model.PlayerComponent);
	}
	,onEntityUnregistered: function(entity) {
	}
	,initialise: function() {
	}
	,update: function(dt,now) {
	}
	,set_model: function(aModel) {
		this.model = aModel;
		this.model.onEntityAdded.add($bind(this,this.onEntityAdded));
		this.model.onEntityRemoved.add($bind(this,this.onEntityRemoved));
		var _g = 0;
		var _g1 = this.model.entities;
		while(_g < _g1.length) {
			var entity = _g1[_g];
			++_g;
			this.onEntityAdded(entity);
		}
		return this.model;
	}
	,onEntityAdded: function(entity) {
		if(!(this._entityRegistrar.h.__keys__[entity.__id__] != null)) {
			if(this.hasRequiredComponents(entity)) {
				this.registeredEntities.push(entity);
				this._entityRegistrar.set(entity,true);
				this.onEntityRegistered(entity);
			}
		}
	}
	,onEntityRemoved: function(entity) {
		if(this._entityRegistrar.h.__keys__[entity.__id__] != null) {
			HxOverrides.remove(this.registeredEntities,entity);
			this._entityRegistrar.remove(entity);
			this.onEntityUnregistered(entity);
		}
	}
	,hasRequiredComponents: function(entity) {
		var _g = 0;
		var _g1 = this._requiredEntityComponents;
		while(_g < _g1.length) {
			var requiredComponent = _g1[_g];
			++_g;
			if(entity.get(requiredComponent) == null) return false;
		}
		return true;
	}
	,attach: function(componentOwner) {
		this.owner = componentOwner;
		return ld31.controller.ControllerKey;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ld31.controller.ControllerKey
};
wax.system.EntityComponent = function() { };
$hxClasses["wax.system.EntityComponent"] = wax.system.EntityComponent;
wax.system.EntityComponent.__name__ = ["wax","system","EntityComponent"];
wax.system.EntityComponent.__interfaces__ = [wax.system.Component];
wax.system.EntityComponent.prototype = {
	__class__: wax.system.EntityComponent
};
ld31.model = {};
ld31.model.AIComponent = function(velo,distance,level,key,typeoffoe) {
	this.level = 0;
	this.parcouru = 0;
	this.distance = 0;
	this.velo = 0;
	this.velo = velo;
	this.distance = distance;
	this.level = level;
	this.key = key;
	this.typeoffoe = typeoffoe;
};
$hxClasses["ld31.model.AIComponent"] = ld31.model.AIComponent;
ld31.model.AIComponent.__name__ = ["ld31","model","AIComponent"];
ld31.model.AIComponent.__interfaces__ = [wax.system.EntityComponent];
ld31.model.AIComponent.prototype = {
	initialise: function() {
	}
	,attachEntity: function(anEntity) {
		var missingComponents = [];
		if(missingComponents.length > 0) {
			haxe.Log.trace("" + Std.string(Type.getClass(this)) + " disabled as the entity type does not have these required components " + Std.string(missingComponents),{ fileName : "EntityComponent.hx", lineNumber : 11, className : "ld31.model.AIComponent", methodName : "attachEntity"});
			return false;
		}
		this.entity = anEntity;
		return true;
	}
	,detachEntity: function() {
		this.entity = null;
	}
	,attach: function(componentOwner) {
		this.owner = componentOwner;
		return ld31.model.AIComponent;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ld31.model.AIComponent
};
ld31.model.AISystem = function(typelibrary,tiledmap) {
	this.key = 7;
	this.keymapai = new haxe.ds.IntMap();
	this.tiledmap = tiledmap;
	this.typelibrary = typelibrary;
	this.registeredEntities = [];
	this._entityRegistrar = new haxe.ds.ObjectMap();
	this._requiredEntityComponents = [ld31.model.AIComponent];
};
$hxClasses["ld31.model.AISystem"] = ld31.model.AISystem;
ld31.model.AISystem.__name__ = ["ld31","model","AISystem"];
ld31.model.AISystem.__interfaces__ = [wax.system.Updatable,wax.system.SystemComponent];
ld31.model.AISystem.prototype = {
	onEntityRegistered: function(entity) {
		var key = entity.get(ld31.model.AIComponent).key;
		this.keymapai.set(key,entity);
	}
	,onEntityUnregistered: function(entity) {
	}
	,initialise: function() {
		var aitype = this.typelibrary.get("ai");
		var entity = aitype.createEntity([new ld31.model.PositionComponent(ld31.Main.WIDTH * 22,ld31.Main.HEIGHT * 6,ld31.Main.HEIGHT,ld31.Main.HEIGHT,0,ld31.Main.WIDTH * 22 / ld31.Main.WIDTH | 0,ld31.Main.HEIGHT * 6 / ld31.Main.HEIGHT | 0),new ld31.model.ExitComponent(0)]);
		this.model.addEntity(entity);
		var _g = 0;
		while(_g < 24) {
			var i = _g++;
			var aitype6 = this.typelibrary.get("ai");
			var entity6 = aitype6.createEntity([new ld31.model.PositionComponent(ld31.Main.WIDTH * i,ld31.Main.HEIGHT * 13 - ld31.Main.WIDTH * 56 / 120,ld31.Main.WIDTH * 120 / 120,ld31.Main.WIDTH * 56 / 120,0,0 / ld31.Main.WIDTH | 0,0 / ld31.Main.HEIGHT | 0),new ld31.model.AIComponent(0,0,2,this.key,2),new ld31.model.VelocityComponent()]);
			this.model.addEntity(entity6);
			this.key += 1;
		}
		var aitype1 = this.typelibrary.get("ai");
		var entity1 = aitype1.createEntity([new ld31.model.PositionComponent(ld31.Main.WIDTH * 3,ld31.Main.HEIGHT * 6 - ld31.Main.WIDTH * 56 / 120,ld31.Main.WIDTH * 120 / 120,ld31.Main.WIDTH * 56 / 120,0,0 / ld31.Main.WIDTH | 0,0 / ld31.Main.HEIGHT | 0),new ld31.model.AIComponent(0,0,0,this.key,2),new ld31.model.VelocityComponent()]);
		this.model.addEntity(entity1);
		this.key += 1;
		var aitype2 = this.typelibrary.get("ai");
		var entity2 = aitype2.createEntity([new ld31.model.PositionComponent(ld31.Main.WIDTH * 17,ld31.Main.HEIGHT * 3 - ld31.Main.WIDTH * 56 / 120,ld31.Main.WIDTH * 120 / 120,ld31.Main.WIDTH * 56 / 120,0,0 / ld31.Main.WIDTH | 0,0 / ld31.Main.HEIGHT | 0),new ld31.model.AIComponent(0,0,2,this.key,2),new ld31.model.VelocityComponent()]);
		this.model.addEntity(entity2);
		this.key += 1;
		this.tiledmap[0][22][6] = -1;
		var aitype3 = this.typelibrary.get("ai");
		var entity3 = aitype3.createEntity([new ld31.model.PositionComponent(ld31.Main.WIDTH * 9,ld31.Main.HEIGHT * 13 - ld31.Main.WIDTH * 46 / 120,ld31.Main.WIDTH * 120 / 120,ld31.Main.WIDTH * 46 / 120,0,0 / ld31.Main.WIDTH | 0,0 / ld31.Main.HEIGHT | 0),new ld31.model.AIComponent(1,ld31.Main.WIDTH * 2,0,this.key,1),new ld31.model.VelocityComponent()]);
		this.model.addEntity(entity3);
		this.key += 1;
		var aitype4 = this.typelibrary.get("ai");
		var entity4 = aitype4.createEntity([new ld31.model.PositionComponent(ld31.Main.WIDTH * 20,ld31.Main.HEIGHT * 10 - ld31.Main.WIDTH * 46 / 120,ld31.Main.WIDTH * 120 / 120,ld31.Main.WIDTH * 46 / 120,0,0 / ld31.Main.WIDTH | 0,0 / ld31.Main.HEIGHT | 0),new ld31.model.AIComponent(1,ld31.Main.WIDTH * 2,1,this.key,1),new ld31.model.VelocityComponent()]);
		this.model.addEntity(entity4);
		this.key += 1;
		var aitype5 = this.typelibrary.get("ai");
		var entity5 = aitype5.createEntity([new ld31.model.PositionComponent(ld31.Main.WIDTH * 8,ld31.Main.HEIGHT * 3 - ld31.Main.WIDTH * 46 / 120,ld31.Main.WIDTH * 120 / 120,ld31.Main.WIDTH * 46 / 120,0,0 / ld31.Main.WIDTH | 0,0 / ld31.Main.HEIGHT | 0),new ld31.model.AIComponent(1,ld31.Main.WIDTH * 2,2,this.key,1),new ld31.model.VelocityComponent()]);
		this.model.addEntity(entity5);
		this.key += 1;
	}
	,update: function(dt,now) {
		var _g = 0;
		var _g1 = this.registeredEntities;
		while(_g < _g1.length) {
			var entity = _g1[_g];
			++_g;
			var pos = entity.get(ld31.model.PositionComponent);
			var velocitycomponent = entity.get(ld31.model.VelocityComponent);
			var ai = entity.get(ld31.model.AIComponent);
			if(ai.parcouru <= ai.distance) {
				pos.x += ai.velo;
				ai.parcouru += 1;
			} else if(ai.parcouru > ai.distance) {
				ai.parcouru = 0;
				ai.velo = -ai.velo;
			}
			pos.gx = pos.x / ld31.Main.WIDTH | 0;
			pos.gy = pos.y / ld31.Main.HEIGHT | 0;
			this.tiledmap[ai.level][pos.gx][pos.gy] = ai.key;
		}
	}
	,set_model: function(aModel) {
		this.model = aModel;
		this.model.onEntityAdded.add($bind(this,this.onEntityAdded));
		this.model.onEntityRemoved.add($bind(this,this.onEntityRemoved));
		var _g = 0;
		var _g1 = this.model.entities;
		while(_g < _g1.length) {
			var entity = _g1[_g];
			++_g;
			this.onEntityAdded(entity);
		}
		return this.model;
	}
	,onEntityAdded: function(entity) {
		if(!(this._entityRegistrar.h.__keys__[entity.__id__] != null)) {
			if(this.hasRequiredComponents(entity)) {
				this.registeredEntities.push(entity);
				this._entityRegistrar.set(entity,true);
				this.onEntityRegistered(entity);
			}
		}
	}
	,onEntityRemoved: function(entity) {
		if(this._entityRegistrar.h.__keys__[entity.__id__] != null) {
			HxOverrides.remove(this.registeredEntities,entity);
			this._entityRegistrar.remove(entity);
			this.onEntityUnregistered(entity);
		}
	}
	,hasRequiredComponents: function(entity) {
		var _g = 0;
		var _g1 = this._requiredEntityComponents;
		while(_g < _g1.length) {
			var requiredComponent = _g1[_g];
			++_g;
			if(entity.get(requiredComponent) == null) return false;
		}
		return true;
	}
	,attach: function(componentOwner) {
		this.owner = componentOwner;
		return ld31.model.AISystem;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ld31.model.AISystem
};
wax.system.EntityTypeComponent = function() { };
$hxClasses["wax.system.EntityTypeComponent"] = wax.system.EntityTypeComponent;
wax.system.EntityTypeComponent.__name__ = ["wax","system","EntityTypeComponent"];
wax.system.EntityTypeComponent.__interfaces__ = [wax.system.Component];
wax.system.EntityTypeComponent.prototype = {
	__class__: wax.system.EntityTypeComponent
};
ld31.model.AITypeComponent = function() {
	this.animosity = 1;
};
$hxClasses["ld31.model.AITypeComponent"] = ld31.model.AITypeComponent;
ld31.model.AITypeComponent.__name__ = ["ld31","model","AITypeComponent"];
ld31.model.AITypeComponent.__interfaces__ = [wax.system.EntityTypeComponent];
ld31.model.AITypeComponent.prototype = {
	populateEntity: function(entityComponents) {
	}
	,initialise: function() {
	}
	,attach: function(componentOwner) {
		this.owner = componentOwner;
		return ld31.model.AITypeComponent;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ld31.model.AITypeComponent
};
ld31.model.ButtonComponent = function(level,keydoor,keybutton,view) {
	this.view = "mauve";
	this.actif = 1;
	this.keybutton = 0;
	this.keydoor = 0;
	this.level = 0;
	this.level = level;
	this.keydoor = keydoor;
	this.keybutton = keybutton;
	this.view = view;
};
$hxClasses["ld31.model.ButtonComponent"] = ld31.model.ButtonComponent;
ld31.model.ButtonComponent.__name__ = ["ld31","model","ButtonComponent"];
ld31.model.ButtonComponent.__interfaces__ = [wax.system.EntityComponent];
ld31.model.ButtonComponent.prototype = {
	initialise: function() {
	}
	,attachEntity: function(anEntity) {
		var missingComponents = [];
		if(missingComponents.length > 0) {
			haxe.Log.trace("" + Std.string(Type.getClass(this)) + " disabled as the entity type does not have these required components " + Std.string(missingComponents),{ fileName : "EntityComponent.hx", lineNumber : 11, className : "ld31.model.ButtonComponent", methodName : "attachEntity"});
			return false;
		}
		this.entity = anEntity;
		return true;
	}
	,detachEntity: function() {
		this.entity = null;
	}
	,attach: function(componentOwner) {
		this.owner = componentOwner;
		return ld31.model.ButtonComponent;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ld31.model.ButtonComponent
};
ld31.model.CameraSystem = function(typelibrary) {
	this.mapheight = 480;
	this.mapwidth = 3200;
	this.screenheight = 480;
	this.screenwidth = 640;
	this.typelibrary = typelibrary;
	this.registeredEntities = [];
	this._entityRegistrar = new haxe.ds.ObjectMap();
	this._requiredEntityComponents = [ld31.model.PlayerComponent,ld31.model.PositionComponent];
};
$hxClasses["ld31.model.CameraSystem"] = ld31.model.CameraSystem;
ld31.model.CameraSystem.__name__ = ["ld31","model","CameraSystem"];
ld31.model.CameraSystem.__interfaces__ = [wax.system.Updatable,wax.system.SystemComponent];
ld31.model.CameraSystem.prototype = {
	onEntityRegistered: function(entity) {
	}
	,onEntityUnregistered: function(entity) {
	}
	,initialise: function() {
		this.screenwidth = ld31.view.Presenter.screenwidth;
		this.screenheight = ld31.view.Presenter.screenheight;
		this.mapwidth = ld31.view.Presenter.mapwidth;
		this.mapheight = ld31.view.Presenter.mapheight;
	}
	,update: function(dt,now) {
		var _g = 0;
		var _g1 = this.registeredEntities;
		while(_g < _g1.length) {
			var entity = _g1[_g];
			++_g;
			var position = entity.get(ld31.model.PositionComponent);
			if(this.screenwidth < this.mapwidth) {
				if(position.x < this.screenwidth / 2) ld31.model.CameraSystem.cameraX = 0; else if(position.x > this.mapwidth - this.screenwidth / 2) ld31.model.CameraSystem.cameraX = (this.mapwidth - this.screenwidth) / ld31.Main.WIDTH | 0; else ld31.model.CameraSystem.cameraX = (position.x - this.screenwidth / 2) / ld31.Main.WIDTH | 0;
			}
			if(this.screenheight < this.mapheight) {
				if(position.y < this.screenheight / 2) ld31.model.CameraSystem.cameraY = 0; else if(position.y > this.mapheight - this.screenheight / 2) ld31.model.CameraSystem.cameraY = (this.mapheight - this.screenheight) / ld31.Main.HEIGHT | 0; else ld31.model.CameraSystem.cameraY = (position.y - this.screenheight / 2) / ld31.Main.HEIGHT | 0;
			}
		}
	}
	,set_model: function(aModel) {
		this.model = aModel;
		this.model.onEntityAdded.add($bind(this,this.onEntityAdded));
		this.model.onEntityRemoved.add($bind(this,this.onEntityRemoved));
		var _g = 0;
		var _g1 = this.model.entities;
		while(_g < _g1.length) {
			var entity = _g1[_g];
			++_g;
			this.onEntityAdded(entity);
		}
		return this.model;
	}
	,onEntityAdded: function(entity) {
		if(!(this._entityRegistrar.h.__keys__[entity.__id__] != null)) {
			if(this.hasRequiredComponents(entity)) {
				this.registeredEntities.push(entity);
				this._entityRegistrar.set(entity,true);
				this.onEntityRegistered(entity);
			}
		}
	}
	,onEntityRemoved: function(entity) {
		if(this._entityRegistrar.h.__keys__[entity.__id__] != null) {
			HxOverrides.remove(this.registeredEntities,entity);
			this._entityRegistrar.remove(entity);
			this.onEntityUnregistered(entity);
		}
	}
	,hasRequiredComponents: function(entity) {
		var _g = 0;
		var _g1 = this._requiredEntityComponents;
		while(_g < _g1.length) {
			var requiredComponent = _g1[_g];
			++_g;
			if(entity.get(requiredComponent) == null) return false;
		}
		return true;
	}
	,attach: function(componentOwner) {
		this.owner = componentOwner;
		return ld31.model.CameraSystem;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ld31.model.CameraSystem
};
ld31.model.DoorComponent = function(level,keydoor,keybutton,wall) {
	this.wall = "4";
	this.remove = 0;
	this.keybutton = 0;
	this.keydoor = 0;
	this.level = 0;
	this.level = level;
	this.keydoor = keydoor;
	this.keybutton = keybutton;
	this.wall = wall;
};
$hxClasses["ld31.model.DoorComponent"] = ld31.model.DoorComponent;
ld31.model.DoorComponent.__name__ = ["ld31","model","DoorComponent"];
ld31.model.DoorComponent.__interfaces__ = [wax.system.EntityComponent];
ld31.model.DoorComponent.prototype = {
	initialise: function() {
	}
	,attachEntity: function(anEntity) {
		var missingComponents = [];
		if(missingComponents.length > 0) {
			haxe.Log.trace("" + Std.string(Type.getClass(this)) + " disabled as the entity type does not have these required components " + Std.string(missingComponents),{ fileName : "EntityComponent.hx", lineNumber : 11, className : "ld31.model.DoorComponent", methodName : "attachEntity"});
			return false;
		}
		this.entity = anEntity;
		return true;
	}
	,detachEntity: function() {
		this.entity = null;
	}
	,attach: function(componentOwner) {
		this.owner = componentOwner;
		return ld31.model.DoorComponent;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ld31.model.DoorComponent
};
ld31.model.DoorSystem = function(typelibrary,tiledmap) {
	this.keybutton = -7;
	this.keydoor = 0;
	this.tiledmap = tiledmap;
	this.typelibrary = typelibrary;
	this.registeredEntities = [];
	this._entityRegistrar = new haxe.ds.ObjectMap();
	this._requiredEntityComponents = [ld31.model.SwitchComponent];
};
$hxClasses["ld31.model.DoorSystem"] = ld31.model.DoorSystem;
ld31.model.DoorSystem.__name__ = ["ld31","model","DoorSystem"];
ld31.model.DoorSystem.__interfaces__ = [wax.system.Updatable,wax.system.SystemComponent];
ld31.model.DoorSystem.prototype = {
	onEntityRegistered: function(entity) {
		if(entity.get(ld31.model.DoorComponent) != null) {
			var key = entity.get(ld31.model.DoorComponent).keydoor;
			ld31.model.DoorSystem.doormap.set(key,entity);
		} else {
			var key1 = entity.get(ld31.model.ButtonComponent).keybutton;
			ld31.model.DoorSystem.buttonmap.set(key1,entity);
		}
	}
	,onEntityUnregistered: function(entity) {
	}
	,initialise: function() {
		var aitype = this.typelibrary.get("ai");
		var entity = aitype.createEntity([new ld31.model.PositionComponent(ld31.Main.WIDTH * 5 | 0,ld31.Main.HEIGHT * 12 | 0,ld31.Main.HEIGHT * 76 / 120,ld31.Main.HEIGHT,0,5,12),new ld31.model.DoorComponent(0,this.keydoor,this.keybutton,"6"),new ld31.model.SwitchComponent()]);
		this.model.addEntity(entity);
		this.tiledmap[0][5][12] = 4;
		var aitype1 = this.typelibrary.get("ai");
		var entity1 = aitype1.createEntity([new ld31.model.PositionComponent(ld31.Main.WIDTH * 2 + ld31.Main.HEIGHT * 76 / 120 / 4,ld31.Main.HEIGHT * 12,ld31.Main.HEIGHT * 76 / 120,ld31.Main.HEIGHT,0,2,12),new ld31.model.ButtonComponent(0,this.keydoor,this.keybutton,"mauve"),new ld31.model.SwitchComponent()]);
		this.model.addEntity(entity1);
		this.tiledmap[0][2][12] = this.keybutton;
		this.keydoor += 1;
		this.keybutton -= 1;
		var aitype2 = this.typelibrary.get("ai");
		var entity2 = aitype2.createEntity([new ld31.model.PositionComponent(ld31.Main.WIDTH * 14 | 0,ld31.Main.HEIGHT * 12 | 0,ld31.Main.HEIGHT * 76 / 120,ld31.Main.HEIGHT,0,14,12),new ld31.model.DoorComponent(0,this.keydoor,this.keybutton,"6"),new ld31.model.SwitchComponent()]);
		this.model.addEntity(entity2);
		this.tiledmap[0][14][12] = 4;
		var aitype3 = this.typelibrary.get("ai");
		var entity3 = aitype3.createEntity([new ld31.model.PositionComponent(ld31.Main.WIDTH * 14 + ld31.Main.HEIGHT * 76 / 120 / 4,ld31.Main.HEIGHT * 6,ld31.Main.HEIGHT * 76 / 120,ld31.Main.HEIGHT,0,14,6),new ld31.model.ButtonComponent(2,this.keydoor,this.keybutton,"mauve"),new ld31.model.SwitchComponent()]);
		this.model.addEntity(entity3);
		this.tiledmap[2][15][6] = this.keybutton;
		this.keydoor += 1;
		this.keybutton -= 1;
		var aitype4 = this.typelibrary.get("ai");
		var entity4 = aitype4.createEntity([new ld31.model.PositionComponent(ld31.Main.WIDTH * 18 | 0,ld31.Main.HEIGHT * 5 | 0,ld31.Main.HEIGHT * 76 / 120,ld31.Main.HEIGHT,0,18,5),new ld31.model.DoorComponent(1,this.keydoor,this.keybutton,"4"),new ld31.model.SwitchComponent()]);
		this.model.addEntity(entity4);
		this.tiledmap[1][18][5] = 4;
		var aitype5 = this.typelibrary.get("ai");
		var entity5 = aitype5.createEntity([new ld31.model.PositionComponent(ld31.Main.WIDTH * 23 + ld31.Main.HEIGHT * 76 / 120 / 4,ld31.Main.HEIGHT * 12,ld31.Main.HEIGHT * 76 / 120,ld31.Main.HEIGHT,0,23,12),new ld31.model.ButtonComponent(0,this.keydoor,this.keybutton,"bleu"),new ld31.model.SwitchComponent()]);
		this.model.addEntity(entity5);
		this.tiledmap[0][23][12] = this.keybutton;
		this.keydoor += 1;
		this.keybutton -= 1;
		var aitype6 = this.typelibrary.get("ai");
		var entity6 = aitype6.createEntity([new ld31.model.PositionComponent(ld31.Main.WIDTH * 11 | 0,ld31.Main.HEIGHT * 4 | 0,ld31.Main.HEIGHT * 76 / 120,ld31.Main.HEIGHT,0,11,4),new ld31.model.DoorComponent(1,this.keydoor,this.keybutton,"4"),new ld31.model.SwitchComponent()]);
		this.model.addEntity(entity6);
		this.tiledmap[1][11][4] = 4;
		var aitype7 = this.typelibrary.get("ai");
		var entity7 = aitype7.createEntity([new ld31.model.PositionComponent(ld31.Main.WIDTH + ld31.Main.HEIGHT * 76 / 120 / 4,ld31.Main.HEIGHT * 5,ld31.Main.HEIGHT * 76 / 120,ld31.Main.HEIGHT,0,1,5),new ld31.model.ButtonComponent(0,this.keydoor,this.keybutton,"bleu"),new ld31.model.SwitchComponent()]);
		this.model.addEntity(entity7);
		this.tiledmap[0][1][5] = this.keybutton;
		this.keydoor += 1;
		this.keybutton -= 1;
		var aitype8 = this.typelibrary.get("ai");
		var entity8 = aitype8.createEntity([new ld31.model.PositionComponent(ld31.Main.WIDTH * 9 | 0,ld31.Main.HEIGHT * 10 | 0,ld31.Main.HEIGHT * 76 / 120,ld31.Main.HEIGHT,0,9,10),new ld31.model.DoorComponent(2,this.keydoor,this.keybutton,"5"),new ld31.model.SwitchComponent()]);
		this.model.addEntity(entity8);
		this.tiledmap[2][9][10] = 4;
		var aitype9 = this.typelibrary.get("ai");
		var entity9 = aitype9.createEntity([new ld31.model.PositionComponent(ld31.Main.WIDTH * 12 + ld31.Main.HEIGHT * 76 / 120 / 4,ld31.Main.HEIGHT * 4,ld31.Main.HEIGHT * 76 / 120,ld31.Main.HEIGHT,0,12,4),new ld31.model.ButtonComponent(1,this.keydoor,this.keybutton,"orange"),new ld31.model.SwitchComponent()]);
		this.model.addEntity(entity9);
		this.tiledmap[1][12][4] = this.keybutton;
		this.keydoor += 1;
		this.keybutton -= 1;
		var aitype10 = this.typelibrary.get("ai");
		var entity10 = aitype10.createEntity([new ld31.model.PositionComponent(ld31.Main.WIDTH * 20 | 0,ld31.Main.HEIGHT * 2 | 0,ld31.Main.HEIGHT * 76 / 120,ld31.Main.HEIGHT,0,20,2),new ld31.model.DoorComponent(2,this.keydoor,this.keybutton,"5"),new ld31.model.SwitchComponent()]);
		this.model.addEntity(entity10);
		this.tiledmap[2][20][2] = 4;
		var aitype11 = this.typelibrary.get("ai");
		var entity11 = aitype11.createEntity([new ld31.model.PositionComponent(ld31.Main.WIDTH * 14 + ld31.Main.HEIGHT * 76 / 120 / 4,ld31.Main.HEIGHT * 10,ld31.Main.HEIGHT * 76 / 120,ld31.Main.HEIGHT,0,14,10),new ld31.model.ButtonComponent(2,this.keydoor,this.keybutton,"orange"),new ld31.model.SwitchComponent()]);
		this.model.addEntity(entity11);
		this.tiledmap[2][12][10] = this.keybutton;
		this.keydoor += 1;
		this.keybutton -= 1;
	}
	,update: function(dt,now) {
		var _g = 0;
		var _g1 = this.registeredEntities;
		while(_g < _g1.length) {
			var entity = _g1[_g];
			++_g;
			if(entity.get(ld31.model.DoorComponent) != null) {
				if(entity.get(ld31.model.DoorComponent).remove > 0) {
					entity.get(ld31.model.DoorComponent).remove += 1;
					entity.get(ld31.model.PositionComponent).y -= 1;
					if(entity.get(ld31.model.DoorComponent).remove > ld31.Main.HEIGHT) this.model.removeEntity(entity);
				}
			}
		}
	}
	,set_model: function(aModel) {
		this.model = aModel;
		this.model.onEntityAdded.add($bind(this,this.onEntityAdded));
		this.model.onEntityRemoved.add($bind(this,this.onEntityRemoved));
		var _g = 0;
		var _g1 = this.model.entities;
		while(_g < _g1.length) {
			var entity = _g1[_g];
			++_g;
			this.onEntityAdded(entity);
		}
		return this.model;
	}
	,onEntityAdded: function(entity) {
		if(!(this._entityRegistrar.h.__keys__[entity.__id__] != null)) {
			if(this.hasRequiredComponents(entity)) {
				this.registeredEntities.push(entity);
				this._entityRegistrar.set(entity,true);
				this.onEntityRegistered(entity);
			}
		}
	}
	,onEntityRemoved: function(entity) {
		if(this._entityRegistrar.h.__keys__[entity.__id__] != null) {
			HxOverrides.remove(this.registeredEntities,entity);
			this._entityRegistrar.remove(entity);
			this.onEntityUnregistered(entity);
		}
	}
	,hasRequiredComponents: function(entity) {
		var _g = 0;
		var _g1 = this._requiredEntityComponents;
		while(_g < _g1.length) {
			var requiredComponent = _g1[_g];
			++_g;
			if(entity.get(requiredComponent) == null) return false;
		}
		return true;
	}
	,attach: function(componentOwner) {
		this.owner = componentOwner;
		return ld31.model.DoorSystem;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ld31.model.DoorSystem
};
ld31.model.EnvironmentalComponent = function() {
	this.aircomposition = 1;
	this.airdensity = 0.001;
	this.wind = { x : -10, y : 10};
};
$hxClasses["ld31.model.EnvironmentalComponent"] = ld31.model.EnvironmentalComponent;
ld31.model.EnvironmentalComponent.__name__ = ["ld31","model","EnvironmentalComponent"];
ld31.model.EnvironmentalComponent.__interfaces__ = [wax.system.EntityComponent];
ld31.model.EnvironmentalComponent.prototype = {
	initialise: function() {
	}
	,attachEntity: function(anEntity) {
		var missingComponents = [];
		if(missingComponents.length > 0) {
			haxe.Log.trace("" + Std.string(Type.getClass(this)) + " disabled as the entity type does not have these required components " + Std.string(missingComponents),{ fileName : "EntityComponent.hx", lineNumber : 11, className : "ld31.model.EnvironmentalComponent", methodName : "attachEntity"});
			return false;
		}
		this.entity = anEntity;
		return true;
	}
	,detachEntity: function() {
		this.entity = null;
	}
	,attach: function(componentOwner) {
		this.owner = componentOwner;
		return ld31.model.EnvironmentalComponent;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ld31.model.EnvironmentalComponent
};
ld31.model.ExitComponent = function(level) {
	this.level = 0;
	this.level = level;
};
$hxClasses["ld31.model.ExitComponent"] = ld31.model.ExitComponent;
ld31.model.ExitComponent.__name__ = ["ld31","model","ExitComponent"];
ld31.model.ExitComponent.__interfaces__ = [wax.system.EntityComponent];
ld31.model.ExitComponent.prototype = {
	initialise: function() {
	}
	,attachEntity: function(anEntity) {
		var missingComponents = [];
		if(missingComponents.length > 0) {
			haxe.Log.trace("" + Std.string(Type.getClass(this)) + " disabled as the entity type does not have these required components " + Std.string(missingComponents),{ fileName : "EntityComponent.hx", lineNumber : 11, className : "ld31.model.ExitComponent", methodName : "attachEntity"});
			return false;
		}
		this.entity = anEntity;
		return true;
	}
	,detachEntity: function() {
		this.entity = null;
	}
	,attach: function(componentOwner) {
		this.owner = componentOwner;
		return ld31.model.ExitComponent;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ld31.model.ExitComponent
};
ld31.model.GestionDynamicSystem = function(typelibrary) {
	this.registeredEntities = [];
	this._entityRegistrar = new haxe.ds.ObjectMap();
	this._requiredEntityComponents = [ld31.model.VelocityComponent,ld31.model.PositionComponent];
};
$hxClasses["ld31.model.GestionDynamicSystem"] = ld31.model.GestionDynamicSystem;
ld31.model.GestionDynamicSystem.__name__ = ["ld31","model","GestionDynamicSystem"];
ld31.model.GestionDynamicSystem.__interfaces__ = [wax.system.Updatable,wax.system.SystemComponent];
ld31.model.GestionDynamicSystem.prototype = {
	onEntityRegistered: function(entity) {
	}
	,onEntityUnregistered: function(entity) {
	}
	,initialise: function() {
	}
	,update: function(dt,now) {
		var _g = 0;
		var _g1 = this.registeredEntities;
		while(_g < _g1.length) {
			var entity = _g1[_g];
			++_g;
			var placementcomponent = entity.get(ld31.model.PositionComponent);
			var player = entity.get(ld31.model.PlayerComponent);
			var velocitycomponent = entity.get(ld31.model.VelocityComponent);
			if(ld31.model.GestionLevelSystem.alerttempo == 0) {
				placementcomponent.x += velocitycomponent.v.x;
				placementcomponent.y += velocitycomponent.v.y;
			}
		}
	}
	,set_model: function(aModel) {
		this.model = aModel;
		this.model.onEntityAdded.add($bind(this,this.onEntityAdded));
		this.model.onEntityRemoved.add($bind(this,this.onEntityRemoved));
		var _g = 0;
		var _g1 = this.model.entities;
		while(_g < _g1.length) {
			var entity = _g1[_g];
			++_g;
			this.onEntityAdded(entity);
		}
		return this.model;
	}
	,onEntityAdded: function(entity) {
		if(!(this._entityRegistrar.h.__keys__[entity.__id__] != null)) {
			if(this.hasRequiredComponents(entity)) {
				this.registeredEntities.push(entity);
				this._entityRegistrar.set(entity,true);
				this.onEntityRegistered(entity);
			}
		}
	}
	,onEntityRemoved: function(entity) {
		if(this._entityRegistrar.h.__keys__[entity.__id__] != null) {
			HxOverrides.remove(this.registeredEntities,entity);
			this._entityRegistrar.remove(entity);
			this.onEntityUnregistered(entity);
		}
	}
	,hasRequiredComponents: function(entity) {
		var _g = 0;
		var _g1 = this._requiredEntityComponents;
		while(_g < _g1.length) {
			var requiredComponent = _g1[_g];
			++_g;
			if(entity.get(requiredComponent) == null) return false;
		}
		return true;
	}
	,attach: function(componentOwner) {
		this.owner = componentOwner;
		return ld31.model.GestionDynamicSystem;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ld31.model.GestionDynamicSystem
};
ld31.model.GestionForceSystem = function(typelibrary) {
	this.registeredEntities = [];
	this._entityRegistrar = new haxe.ds.ObjectMap();
	this._requiredEntityComponents = [ld31.model.PlayerComponent];
};
$hxClasses["ld31.model.GestionForceSystem"] = ld31.model.GestionForceSystem;
ld31.model.GestionForceSystem.__name__ = ["ld31","model","GestionForceSystem"];
ld31.model.GestionForceSystem.__interfaces__ = [wax.system.Updatable,wax.system.SystemComponent];
ld31.model.GestionForceSystem.prototype = {
	onEntityRegistered: function(entity) {
	}
	,onEntityUnregistered: function(entity) {
	}
	,initialise: function() {
	}
	,update: function(dt,now) {
		var environmentalcomponent = new ld31.model.EnvironmentalComponent();
		var _g = 0;
		var _g1 = this.registeredEntities;
		while(_g < _g1.length) {
			var entity = _g1[_g];
			++_g;
			var velocitycomponent = entity.get(ld31.model.VelocityComponent);
			var playercomponent = entity.get(ld31.model.PlayerComponent);
			var placementcomponent = entity.get(ld31.model.PositionComponent);
			var jump = playercomponent.jump;
			var jforce = playercomponent.jumpforce;
			var canjump = playercomponent.canjump;
			var direction = playercomponent.direction;
			var gravity = -ld31.Main.HEIGHT * 0.017;
			velocitycomponent.v.x = direction * 0.9 + velocitycomponent.v.x * 0.92;
			if(velocitycomponent.v.x > ld31.Main.WIDTH / 12) velocitycomponent.v.x = ld31.Main.WIDTH / 12; else if(velocitycomponent.v.x < -ld31.Main.WIDTH / 12) velocitycomponent.v.x = -ld31.Main.WIDTH / 12;
			if(velocitycomponent.v.y < 0) jump = 0;
			velocitycomponent.v.y = -jump * canjump * jforce + gravity * (-1 + canjump) + velocitycomponent.v.y * 0.94;
			if(velocitycomponent.v.y > 20) playercomponent.crash = 1;
			if(jump == 1 && canjump == 1) playercomponent.canjump = 0;
		}
	}
	,set_model: function(aModel) {
		this.model = aModel;
		this.model.onEntityAdded.add($bind(this,this.onEntityAdded));
		this.model.onEntityRemoved.add($bind(this,this.onEntityRemoved));
		var _g = 0;
		var _g1 = this.model.entities;
		while(_g < _g1.length) {
			var entity = _g1[_g];
			++_g;
			this.onEntityAdded(entity);
		}
		return this.model;
	}
	,onEntityAdded: function(entity) {
		if(!(this._entityRegistrar.h.__keys__[entity.__id__] != null)) {
			if(this.hasRequiredComponents(entity)) {
				this.registeredEntities.push(entity);
				this._entityRegistrar.set(entity,true);
				this.onEntityRegistered(entity);
			}
		}
	}
	,onEntityRemoved: function(entity) {
		if(this._entityRegistrar.h.__keys__[entity.__id__] != null) {
			HxOverrides.remove(this.registeredEntities,entity);
			this._entityRegistrar.remove(entity);
			this.onEntityUnregistered(entity);
		}
	}
	,hasRequiredComponents: function(entity) {
		var _g = 0;
		var _g1 = this._requiredEntityComponents;
		while(_g < _g1.length) {
			var requiredComponent = _g1[_g];
			++_g;
			if(entity.get(requiredComponent) == null) return false;
		}
		return true;
	}
	,attach: function(componentOwner) {
		this.owner = componentOwner;
		return ld31.model.GestionForceSystem;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ld31.model.GestionForceSystem
};
ld31.model.GestionLevelSystem = function(typelibrary,tiledmap) {
	this.alertmove = 0;
	this.tiledmap = tiledmap;
	this.registeredEntities = [];
	this._entityRegistrar = new haxe.ds.ObjectMap();
	this._requiredEntityComponents = [ld31.model.PlayerComponent];
};
$hxClasses["ld31.model.GestionLevelSystem"] = ld31.model.GestionLevelSystem;
ld31.model.GestionLevelSystem.__name__ = ["ld31","model","GestionLevelSystem"];
ld31.model.GestionLevelSystem.__interfaces__ = [wax.system.Updatable,wax.system.SystemComponent];
ld31.model.GestionLevelSystem.prototype = {
	onEntityRegistered: function(entity) {
	}
	,onEntityUnregistered: function(entity) {
	}
	,initialise: function() {
	}
	,update: function(dt,now) {
		var environmentalcomponent = new ld31.model.EnvironmentalComponent();
		if(ld31.model.GestionLevelSystem.alerttempo > 0) ld31.model.GestionLevelSystem.alerttempo -= 1;
		var _g = 0;
		var _g1 = this.registeredEntities;
		while(_g < _g1.length) {
			var entity = _g1[_g];
			++_g;
			var velocitycomponent = entity.get(ld31.model.VelocityComponent);
			var playercomponent = entity.get(ld31.model.PlayerComponent);
			var placementcomponent = entity.get(ld31.model.PositionComponent);
			var level = playercomponent.level;
			var tryin = playercomponent.trytomovein;
			var tryout = playercomponent.trytomoveout;
			var gx = placementcomponent.gx;
			var gy = placementcomponent.gy;
			if(tryin == 1 && level < 2 && this.alertmove == 0 && playercomponent.canjump == 1 && ld31.model.GestionLevelSystem.alerttempo == 0) {
				if(this.tiledmap[level + 1][gx][gy + 1] == 0 || this.tiledmap[level + 1][gx][gy] > 0 && this.tiledmap[level + 1][gx][gy] < 7) {
					ld31.model.GestionLevelSystem.showalertleveltargeted = level + 1;
					ld31.model.GestionLevelSystem.showalertpositionGx = gx;
					ld31.model.GestionLevelSystem.showalertpositionGy = gy;
					ld31.model.GestionLevelSystem.alerttempo = 20;
					this.alertmove = 0;
				} else {
					ld31.model.GestionLevelSystem.alerttempo = 10;
					playercomponent.level += 1;
					placementcomponent.x = gx * ld31.Main.WIDTH;
					placementcomponent.y = gy * ld31.Main.HEIGHT;
				}
			}
			if(tryout == 1 && level > 0 && this.alertmove == 0 && playercomponent.canjump == 1 && ld31.model.GestionLevelSystem.alerttempo == 0) {
				if(this.tiledmap[level - 1][gx][gy + 1] == 0 || this.tiledmap[level - 1][gx][gy] > 0 && this.tiledmap[level - 1][gx][gy] < 7) {
					ld31.model.GestionLevelSystem.showalertleveltargeted = level - 1;
					ld31.model.GestionLevelSystem.showalertpositionGx = gx;
					ld31.model.GestionLevelSystem.showalertpositionGy = gy;
					ld31.model.GestionLevelSystem.alerttempo = 20;
					this.alertmove = 0;
				} else {
					ld31.model.GestionLevelSystem.alerttempo = 10;
					playercomponent.level -= 1;
					placementcomponent.x = gx * ld31.Main.WIDTH;
					placementcomponent.y = gy * ld31.Main.HEIGHT;
				}
			}
			if(level == 0) {
				ld31.model.GestionLevelSystem.hll1 = 1;
				ld31.model.GestionLevelSystem.hll2 = 0;
				ld31.model.GestionLevelSystem.hll3 = 0;
			} else if(level == 1) {
				ld31.model.GestionLevelSystem.hll1 = 0;
				ld31.model.GestionLevelSystem.hll2 = 1;
				ld31.model.GestionLevelSystem.hll3 = 0;
			} else if(level == 2) {
				ld31.model.GestionLevelSystem.hll1 = 0;
				ld31.model.GestionLevelSystem.hll2 = 0;
				ld31.model.GestionLevelSystem.hll3 = 1;
			}
		}
	}
	,set_model: function(aModel) {
		this.model = aModel;
		this.model.onEntityAdded.add($bind(this,this.onEntityAdded));
		this.model.onEntityRemoved.add($bind(this,this.onEntityRemoved));
		var _g = 0;
		var _g1 = this.model.entities;
		while(_g < _g1.length) {
			var entity = _g1[_g];
			++_g;
			this.onEntityAdded(entity);
		}
		return this.model;
	}
	,onEntityAdded: function(entity) {
		if(!(this._entityRegistrar.h.__keys__[entity.__id__] != null)) {
			if(this.hasRequiredComponents(entity)) {
				this.registeredEntities.push(entity);
				this._entityRegistrar.set(entity,true);
				this.onEntityRegistered(entity);
			}
		}
	}
	,onEntityRemoved: function(entity) {
		if(this._entityRegistrar.h.__keys__[entity.__id__] != null) {
			HxOverrides.remove(this.registeredEntities,entity);
			this._entityRegistrar.remove(entity);
			this.onEntityUnregistered(entity);
		}
	}
	,hasRequiredComponents: function(entity) {
		var _g = 0;
		var _g1 = this._requiredEntityComponents;
		while(_g < _g1.length) {
			var requiredComponent = _g1[_g];
			++_g;
			if(entity.get(requiredComponent) == null) return false;
		}
		return true;
	}
	,attach: function(componentOwner) {
		this.owner = componentOwner;
		return ld31.model.GestionLevelSystem;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ld31.model.GestionLevelSystem
};
ld31.model.GridSystem = function(typelibrary,tiledmap) {
	this.collisionAI = [];
	this.collisionaround = [];
	this.tiledmap = tiledmap;
	this.typelibrary = typelibrary;
	this.registeredEntities = [];
	this._entityRegistrar = new haxe.ds.ObjectMap();
	this._requiredEntityComponents = [ld31.model.PlayerComponent];
};
$hxClasses["ld31.model.GridSystem"] = ld31.model.GridSystem;
ld31.model.GridSystem.__name__ = ["ld31","model","GridSystem"];
ld31.model.GridSystem.__interfaces__ = [wax.system.Updatable,wax.system.SystemComponent];
ld31.model.GridSystem.prototype = {
	onEntityRegistered: function(entity) {
	}
	,onEntityUnregistered: function(entity) {
	}
	,initialise: function() {
	}
	,update: function(dt,now) {
		var _g = 0;
		var _g1 = this.registeredEntities;
		while(_g < _g1.length) {
			var entity = _g1[_g];
			++_g;
			var pos = entity.get(ld31.model.PositionComponent);
			var vel = entity.get(ld31.model.VelocityComponent);
			var width = pos.width;
			var height = pos.height;
			var gx = pos.gx;
			if(gx >= this.tiledmap[0].length) {
				pos.x = gx * ld31.Main.WIDTH - 5;
				gx = gx - 1;
				pos.gx = gx - 1;
				entity.get(ld31.model.VelocityComponent).v.x = 0;
			}
			var gy = pos.gy;
			var player = entity.get(ld31.model.PlayerComponent);
			if(this.tiledmap[player.level][gx][gy] == -1) ld31.Main.exitconditionfullfil = true;
			if(this.tiledmap[player.level][gx][gy] < -6) {
				var touch = ld31.model.DoorSystem.buttonmap.get(this.tiledmap[player.level][gx][gy]);
				touch.get(ld31.model.ButtonComponent).actif = 0;
				this.tiledmap[player.level][gx][gy] = 0;
				var updoor;
				var key = touch.get(ld31.model.ButtonComponent).keydoor;
				updoor = ld31.model.DoorSystem.doormap.get(key);
				updoor.get(ld31.model.DoorComponent).remove = 1;
				this.tiledmap[updoor.get(ld31.model.DoorComponent).level][updoor.get(ld31.model.PositionComponent).gx][updoor.get(ld31.model.PositionComponent).gy] = 0;
			}
			var testerplayer = 0;
			var fgx;
			var fgy;
			var max = 1;
			if(gx == this.tiledmap[0].length - 1) max = 0;
			if(gx == 0) fgx = 0; else fgx = gx - 1;
			if(gy == 0) fgy = 0; else fgy = gy - 1;
			var _g3 = fgx;
			var _g2 = gx + 1 + max;
			while(_g3 < _g2) {
				var i = _g3++;
				var _g5 = fgy;
				var _g4 = gy + 2;
				while(_g5 < _g4) {
					var j = _g5++;
					if(this.tiledmap[player.level][i][j] > 0 && this.tiledmap[player.level][i][j] < 7) this.collisionaround.push({ gx : i, gy : j, value : this.tiledmap[player.level][i][j]}); else if(this.tiledmap[player.level][i][j] > 6) this.collisionAI.push({ gx : i, gy : j, value : this.tiledmap[player.level][i][j]});
				}
			}
			if(pos.x < 0) {
				entity.get(ld31.model.VelocityComponent).v.x = 0;
				pos.x = 0;
			}
			if(pos.y < 0) {
				entity.get(ld31.model.VelocityComponent).v.y = 0;
				pos.y = 0;
			}
			var recordxy = 0;
			var recordxyh = 0;
			var recordxwy = 0;
			var recordxwyh = 0;
			var _g21 = 0;
			var _g31 = this.collisionaround;
			while(_g21 < _g31.length) {
				var checker = _g31[_g21];
				++_g21;
				var area = (checker.gx * ld31.Main.WIDTH + ld31.Main.WIDTH - checker.gx * ld31.Main.WIDTH) * (checker.gy * ld31.Main.HEIGHT + ld31.Main.HEIGHT - checker.gy * ld31.Main.HEIGHT);
				var xy = this.areaof4tri(checker.gx * ld31.Main.WIDTH,checker.gx * ld31.Main.WIDTH + ld31.Main.WIDTH,checker.gy * ld31.Main.HEIGHT,checker.gy * ld31.Main.HEIGHT + ld31.Main.HEIGHT,pos.x,pos.y);
				var xyh = this.areaof4tri(checker.gx * ld31.Main.WIDTH,checker.gx * ld31.Main.WIDTH + ld31.Main.WIDTH,checker.gy * ld31.Main.HEIGHT,checker.gy * ld31.Main.HEIGHT + ld31.Main.HEIGHT,pos.x,pos.y + height);
				var xwy = this.areaof4tri(checker.gx * ld31.Main.WIDTH,checker.gx * ld31.Main.WIDTH + ld31.Main.WIDTH,checker.gy * ld31.Main.HEIGHT,checker.gy * ld31.Main.HEIGHT + ld31.Main.HEIGHT,pos.x + width,pos.y);
				var xwyh = this.areaof4tri(checker.gx * ld31.Main.WIDTH,checker.gx * ld31.Main.WIDTH + ld31.Main.WIDTH,checker.gy * ld31.Main.HEIGHT,checker.gy * ld31.Main.HEIGHT + ld31.Main.HEIGHT,pos.x + width,pos.y + height);
				if(xy == area) recordxy = 1;
				if(xyh == area) recordxyh = 1;
				if(xwy == area) recordxwy = 1;
				if(xwyh == area) recordxwyh = 1;
				if(xy == area && xyh == area && xwy == area && xwyh == area) {
				} else if(xy == area && xyh == area && xwy != area && xwyh != area) {
					pos.x += checker.gx * ld31.Main.WIDTH + ld31.Main.WIDTH - pos.x;
					if(vel.v.x < 0) vel.v.x = 0;
				} else if(xy != area && xyh == area && xwy != area && xwyh == area) {
					pos.y -= pos.y + height - checker.gy * ld31.Main.HEIGHT;
					if(vel.v.y > 0) vel.v.y = 0;
					testerplayer = 1;
				} else if(xy == area && xyh != area && xwy == area && xwyh != area) {
					pos.y += checker.gy * ld31.Main.HEIGHT + ld31.Main.HEIGHT - pos.y;
					if(vel.v.y < 0) vel.v.y = 0;
				} else if(xy != area && xyh != area && xwy == area && xwyh == area) {
					pos.x -= pos.x + width - checker.gx * ld31.Main.WIDTH;
					if(vel.v.x > 0) vel.v.x = 0;
				} else if(xy == area && xyh != area && xwy != area && xwyh != area) {
					if(pos.x - checker.gx * ld31.Main.WIDTH > ld31.Main.WIDTH - 4 && pos.y - checker.gy * ld31.Main.HEIGHT > ld31.Main.HEIGHT - 4) {
					} else if(pos.x - checker.gx * ld31.Main.WIDTH < ld31.Main.WIDTH - 5 && pos.y - checker.gy * ld31.Main.HEIGHT > ld31.Main.HEIGHT - 4) {
						pos.y += checker.gy * ld31.Main.HEIGHT + ld31.Main.HEIGHT - pos.y;
						if(vel.v.y < 0) vel.v.y = 0;
					} else {
						pos.x += checker.gx * ld31.Main.WIDTH + ld31.Main.WIDTH - pos.x;
						if(vel.v.x < 0) vel.v.x = 0;
					}
				} else if(xy != area && xyh == area && xwy != area && xwyh != area) {
					if(pos.x - checker.gx * ld31.Main.WIDTH > ld31.Main.WIDTH - 4 && pos.y + height - checker.gy * ld31.Main.HEIGHT < 5) {
					} else if(pos.x - checker.gx * ld31.Main.WIDTH > ld31.Main.WIDTH - 4 && pos.y + height - checker.gy * ld31.Main.HEIGHT > 4) pos.x += checker.gx * ld31.Main.WIDTH + ld31.Main.WIDTH - pos.x; else {
						pos.y -= pos.y + height - checker.gy * ld31.Main.HEIGHT;
						if(vel.v.y > 0) vel.v.y = 0;
						testerplayer = 1;
					}
				} else if(xy != area && xyh != area && xwy == area && xwyh != area) {
					if(pos.x + width - checker.gx * ld31.Main.WIDTH < 5 && pos.y - checker.gy * ld31.Main.HEIGHT > ld31.Main.HEIGHT - 4) {
					} else if(pos.x + width - checker.gx * ld31.Main.WIDTH > 4 && pos.y - checker.gy * ld31.Main.HEIGHT > ld31.Main.HEIGHT - 4) {
						pos.y += checker.gy * ld31.Main.HEIGHT + ld31.Main.HEIGHT - pos.y;
						if(vel.v.y < 0) vel.v.y = 0;
					} else {
						pos.x -= pos.x + width - checker.gx * ld31.Main.WIDTH;
						if(vel.v.x > 0) vel.v.x = 0;
					}
				} else if(xy != area && xyh != area && xwy != area && xwyh == area) {
					if(pos.x + width - checker.gx * ld31.Main.WIDTH < 5 && pos.y + height - checker.gy * ld31.Main.HEIGHT < 5) {
					} else if(pos.x + width - checker.gx * ld31.Main.WIDTH < 5 && pos.y + height - checker.gy * ld31.Main.HEIGHT > 4) pos.x -= pos.x + width - checker.gx * ld31.Main.WIDTH; else {
						pos.y -= pos.y + height - checker.gy * ld31.Main.HEIGHT;
						if(vel.v.y > 0) vel.v.y = 0;
						testerplayer = 1;
					}
				}
			}
			var _g22 = 0;
			var _g32 = this.collisionAI;
			while(_g22 < _g32.length) {
				var checker1 = _g32[_g22];
				++_g22;
				var map = this.model.get(ld31.model.AISystem).keymapai;
				var foe = map.get(checker1.value);
				var ai = foe.get(ld31.model.AIComponent);
				var aipos = foe.get(ld31.model.PositionComponent);
				var hor = aipos.x + aipos.width <= pos.x || aipos.x >= pos.x + width;
				var ver = aipos.y + aipos.height <= pos.y || aipos.y >= pos.y + height;
				var separ = hor || ver;
				if(separ == false && player.recuperation < 1) {
					player.lives -= 1;
					player.recuperation = 45;
				}
			}
			this.collisionaround = [];
			this.collisionAI = [];
			player.canjump = testerplayer;
			pos.gx = pos.x / ld31.Main.WIDTH | 0;
			pos.gy = pos.y / ld31.Main.HEIGHT | 0;
		}
	}
	,areaof4tri: function(X,XW,Y,YH,pointX,pointY) {
		var t1 = this.triarea(XW - X,Math.abs(pointY - Y));
		var t2 = this.triarea(XW - X,Math.abs(YH - pointY));
		var t3 = this.triarea(YH - Y,Math.abs(pointX - X));
		var t4 = this.triarea(YH - Y,Math.abs(XW - pointX));
		return t1 + t2 + t3 + t4;
	}
	,triarea: function(A,B) {
		return 0.5 * A * B;
	}
	,set_model: function(aModel) {
		this.model = aModel;
		this.model.onEntityAdded.add($bind(this,this.onEntityAdded));
		this.model.onEntityRemoved.add($bind(this,this.onEntityRemoved));
		var _g = 0;
		var _g1 = this.model.entities;
		while(_g < _g1.length) {
			var entity = _g1[_g];
			++_g;
			this.onEntityAdded(entity);
		}
		return this.model;
	}
	,onEntityAdded: function(entity) {
		if(!(this._entityRegistrar.h.__keys__[entity.__id__] != null)) {
			if(this.hasRequiredComponents(entity)) {
				this.registeredEntities.push(entity);
				this._entityRegistrar.set(entity,true);
				this.onEntityRegistered(entity);
			}
		}
	}
	,onEntityRemoved: function(entity) {
		if(this._entityRegistrar.h.__keys__[entity.__id__] != null) {
			HxOverrides.remove(this.registeredEntities,entity);
			this._entityRegistrar.remove(entity);
			this.onEntityUnregistered(entity);
		}
	}
	,hasRequiredComponents: function(entity) {
		var _g = 0;
		var _g1 = this._requiredEntityComponents;
		while(_g < _g1.length) {
			var requiredComponent = _g1[_g];
			++_g;
			if(entity.get(requiredComponent) == null) return false;
		}
		return true;
	}
	,attach: function(componentOwner) {
		this.owner = componentOwner;
		return ld31.model.GridSystem;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ld31.model.GridSystem
};
ld31.model.PlayerComponent = function(level) {
	this.crash = 0;
	this.recuperation = 0;
	this.lives = 3;
	this.level = 0;
	this.trytomoveout = 0;
	this.trytomovein = 0;
	this.roof = 0;
	this.wallright = 0;
	this.wallleft = 0;
	this.onground = 0;
	this.direction = 0;
	this.crouch = 0;
	this.canjump = 0;
	this.jumpforce = 30 * ld31.Main.HEIGHT / 100;
	this.jump = 0;
	this.level = level;
};
$hxClasses["ld31.model.PlayerComponent"] = ld31.model.PlayerComponent;
ld31.model.PlayerComponent.__name__ = ["ld31","model","PlayerComponent"];
ld31.model.PlayerComponent.__interfaces__ = [wax.system.EntityComponent];
ld31.model.PlayerComponent.prototype = {
	initialise: function() {
	}
	,attachEntity: function(anEntity) {
		var missingComponents = [];
		if(missingComponents.length > 0) {
			haxe.Log.trace("" + Std.string(Type.getClass(this)) + " disabled as the entity type does not have these required components " + Std.string(missingComponents),{ fileName : "EntityComponent.hx", lineNumber : 11, className : "ld31.model.PlayerComponent", methodName : "attachEntity"});
			return false;
		}
		this.entity = anEntity;
		return true;
	}
	,detachEntity: function() {
		this.entity = null;
	}
	,attach: function(componentOwner) {
		this.owner = componentOwner;
		return ld31.model.PlayerComponent;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ld31.model.PlayerComponent
};
ld31.model.PlayerSystem = function(typelibrary) {
	this.typelibrary = typelibrary;
	this.registeredEntities = [];
	this._entityRegistrar = new haxe.ds.ObjectMap();
	this._requiredEntityComponents = [ld31.model.PlayerComponent];
};
$hxClasses["ld31.model.PlayerSystem"] = ld31.model.PlayerSystem;
ld31.model.PlayerSystem.__name__ = ["ld31","model","PlayerSystem"];
ld31.model.PlayerSystem.__interfaces__ = [wax.system.Updatable,wax.system.SystemComponent];
ld31.model.PlayerSystem.prototype = {
	onEntityRegistered: function(entity) {
	}
	,onEntityUnregistered: function(entity) {
	}
	,initialise: function() {
		var playertype = this.typelibrary.get("player");
		var entity = playertype.createEntity([new ld31.model.PositionComponent(ld31.Main.WIDTH * 0,ld31.Main.HEIGHT * 12,ld31.Main.HEIGHT * 68 / 118 / 2,ld31.Main.HEIGHT / 2 * 2,0,0 / ld31.Main.WIDTH | 0,0 / ld31.Main.HEIGHT | 0),new ld31.model.PlayerComponent(0),new ld31.model.VelocityComponent()]);
		this.model.addEntity(entity);
	}
	,update: function(dt,now) {
		var _g = 0;
		var _g1 = this.registeredEntities;
		while(_g < _g1.length) {
			var entity = _g1[_g];
			++_g;
			var player = entity.get(ld31.model.PlayerComponent);
			if(player.recuperation > 0) player.recuperation -= 1;
			if(player.lives == 0) ld31.Main.gameover = true;
		}
	}
	,set_model: function(aModel) {
		this.model = aModel;
		this.model.onEntityAdded.add($bind(this,this.onEntityAdded));
		this.model.onEntityRemoved.add($bind(this,this.onEntityRemoved));
		var _g = 0;
		var _g1 = this.model.entities;
		while(_g < _g1.length) {
			var entity = _g1[_g];
			++_g;
			this.onEntityAdded(entity);
		}
		return this.model;
	}
	,onEntityAdded: function(entity) {
		if(!(this._entityRegistrar.h.__keys__[entity.__id__] != null)) {
			if(this.hasRequiredComponents(entity)) {
				this.registeredEntities.push(entity);
				this._entityRegistrar.set(entity,true);
				this.onEntityRegistered(entity);
			}
		}
	}
	,onEntityRemoved: function(entity) {
		if(this._entityRegistrar.h.__keys__[entity.__id__] != null) {
			HxOverrides.remove(this.registeredEntities,entity);
			this._entityRegistrar.remove(entity);
			this.onEntityUnregistered(entity);
		}
	}
	,hasRequiredComponents: function(entity) {
		var _g = 0;
		var _g1 = this._requiredEntityComponents;
		while(_g < _g1.length) {
			var requiredComponent = _g1[_g];
			++_g;
			if(entity.get(requiredComponent) == null) return false;
		}
		return true;
	}
	,attach: function(componentOwner) {
		this.owner = componentOwner;
		return ld31.model.PlayerSystem;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ld31.model.PlayerSystem
};
ld31.model.PlayerTypeComponent = function() {
	this.playable = 1;
};
$hxClasses["ld31.model.PlayerTypeComponent"] = ld31.model.PlayerTypeComponent;
ld31.model.PlayerTypeComponent.__name__ = ["ld31","model","PlayerTypeComponent"];
ld31.model.PlayerTypeComponent.__interfaces__ = [wax.system.EntityTypeComponent];
ld31.model.PlayerTypeComponent.prototype = {
	populateEntity: function(entityComponents) {
	}
	,initialise: function() {
	}
	,attach: function(componentOwner) {
		this.owner = componentOwner;
		return ld31.model.PlayerTypeComponent;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ld31.model.PlayerTypeComponent
};
ld31.model.PositionComponent = function(x,y,width,height,angle,gx,gy) {
	this.tpgy = 0;
	this.tpgx = 0;
	this.gy = 0;
	this.gx = 0;
	this.angle = 0;
	this.height = 0;
	this.width = 0;
	this.y = 0;
	this.x = 0;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.angle = angle;
	this.gx = gx;
	this.gy = gy;
};
$hxClasses["ld31.model.PositionComponent"] = ld31.model.PositionComponent;
ld31.model.PositionComponent.__name__ = ["ld31","model","PositionComponent"];
ld31.model.PositionComponent.__interfaces__ = [wax.system.EntityComponent];
ld31.model.PositionComponent.prototype = {
	initialise: function() {
	}
	,attachEntity: function(anEntity) {
		var missingComponents = [];
		if(missingComponents.length > 0) {
			haxe.Log.trace("" + Std.string(Type.getClass(this)) + " disabled as the entity type does not have these required components " + Std.string(missingComponents),{ fileName : "EntityComponent.hx", lineNumber : 11, className : "ld31.model.PositionComponent", methodName : "attachEntity"});
			return false;
		}
		this.entity = anEntity;
		return true;
	}
	,detachEntity: function() {
		this.entity = null;
	}
	,attach: function(componentOwner) {
		this.owner = componentOwner;
		return ld31.model.PositionComponent;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ld31.model.PositionComponent
};
ld31.model.SwitchComponent = function() {
};
$hxClasses["ld31.model.SwitchComponent"] = ld31.model.SwitchComponent;
ld31.model.SwitchComponent.__name__ = ["ld31","model","SwitchComponent"];
ld31.model.SwitchComponent.__interfaces__ = [wax.system.EntityComponent];
ld31.model.SwitchComponent.prototype = {
	initialise: function() {
	}
	,attachEntity: function(anEntity) {
		var missingComponents = [];
		if(missingComponents.length > 0) {
			haxe.Log.trace("" + Std.string(Type.getClass(this)) + " disabled as the entity type does not have these required components " + Std.string(missingComponents),{ fileName : "EntityComponent.hx", lineNumber : 11, className : "ld31.model.SwitchComponent", methodName : "attachEntity"});
			return false;
		}
		this.entity = anEntity;
		return true;
	}
	,detachEntity: function() {
		this.entity = null;
	}
	,attach: function(componentOwner) {
		this.owner = componentOwner;
		return ld31.model.SwitchComponent;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ld31.model.SwitchComponent
};
ld31.model.VelocityComponent = function() {
	this.vRotation = 0;
	this.vNorme = 0;
	this.vZ = 0;
	this.vY = 0;
	this.vX = 0;
	this.v = { x : 0, y : 0};
};
$hxClasses["ld31.model.VelocityComponent"] = ld31.model.VelocityComponent;
ld31.model.VelocityComponent.__name__ = ["ld31","model","VelocityComponent"];
ld31.model.VelocityComponent.__interfaces__ = [wax.system.EntityComponent];
ld31.model.VelocityComponent.prototype = {
	initialise: function() {
	}
	,attachEntity: function(anEntity) {
		var missingComponents = [];
		if(missingComponents.length > 0) {
			haxe.Log.trace("" + Std.string(Type.getClass(this)) + " disabled as the entity type does not have these required components " + Std.string(missingComponents),{ fileName : "EntityComponent.hx", lineNumber : 11, className : "ld31.model.VelocityComponent", methodName : "attachEntity"});
			return false;
		}
		this.entity = anEntity;
		return true;
	}
	,detachEntity: function() {
		this.entity = null;
	}
	,attach: function(componentOwner) {
		this.owner = componentOwner;
		return ld31.model.VelocityComponent;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ld31.model.VelocityComponent
};
ld31.view = {};
ld31.view.Presenter = function(window,spriteLibrary,gpu,image,normal,tiledmap) {
	this.entityUnderMouse = null;
	this.entitiesRegistered = [];
	this.gpu = gpu;
	this.image = image;
	this._texture = glow.GPUTexture.upload(gpu,image);
	this._normalTexture = glow.GPUTexture.upload(gpu,normal);
	this.spriteLibrary = spriteLibrary;
	this.window = window;
	this.context = new korrigan.TransformationContext();
	this.program = korrigan.NormalTexturedProgram.upload(gpu);
	this.buffer = new glow.buffer.Buffer_texCoordsVec_28Float_2C2_29positionVec_28Float_2C3_29alphaFloat(gpu,35048);
	this.tiledmap = tiledmap;
	ld31.view.Presenter.screenwidth = Std["int"](window.get_width());
	ld31.view.Presenter.screenheight = Std["int"](window.get_height());
	ld31.view.Presenter.mapwidth = tiledmap[0].length * ld31.Main.WIDTH;
	ld31.view.Presenter.mapheight = tiledmap[0][0].length * ld31.Main.HEIGHT;
};
$hxClasses["ld31.view.Presenter"] = ld31.view.Presenter;
ld31.view.Presenter.__name__ = ["ld31","view","Presenter"];
ld31.view.Presenter.__interfaces__ = [wax.system.Updatable];
ld31.view.Presenter.prototype = {
	present: function(model) {
		model.onEntityAdded.add($bind(this,this.entityAdded));
		model.onEntityRemoved.add($bind(this,this.entityRemoved));
		var _g = 0;
		var _g1 = model.entities;
		while(_g < _g1.length) {
			var entity = _g1[_g];
			++_g;
			this.entityAdded(entity);
		}
	}
	,entityAdded: function(entity) {
		if(entity.get(ld31.model.PositionComponent) != null) this.entitiesRegistered.push(entity);
	}
	,entityRemoved: function(entity) {
		if(entity.get(ld31.model.PositionComponent) != null) HxOverrides.remove(this.entitiesRegistered,entity);
	}
	,update: function(dt,now) {
		var playerX = 0.0;
		var playerY = 0.0;
		var player = null;
		var levels = new haxe.ds.IntMap();
		var _g = 0;
		var _g1 = this.entitiesRegistered;
		while(_g < _g1.length) {
			var entity = _g1[_g];
			++_g;
			if(entity.get(ld31.model.PlayerComponent) != null) {
				var placementComponent = entity.get(ld31.model.PositionComponent);
				player = entity.get(ld31.model.PlayerComponent);
				var offsetwidth = 0.01 * player.level;
				var perspecwidth = 1 - 0.02 * player.level;
				var offsetheight = -0.02 * player.level;
				var perspecheight = 1 - 0 * player.level;
				var xpos = (placementComponent.x + placementComponent.width / 2) * perspecwidth + ld31.view.Presenter.screenwidth * offsetwidth;
				var ypos = (placementComponent.y + placementComponent.height / 2) * perspecheight + ld31.view.Presenter.screenheight * offsetheight;
				playerX = xpos;
				playerY = ypos;
				var entities = null;
				if(!levels.exists(player.level)) {
					entities = [];
					levels.set(player.level,entities);
					entities;
				} else entities = levels.get(player.level);
				entities.push(entity);
			} else if(entity.get(ld31.model.AIComponent) != null) {
				var ai = entity.get(ld31.model.AIComponent);
				var entities1 = null;
				if(!levels.exists(ai.level)) {
					entities1 = [];
					levels.set(ai.level,entities1);
					entities1;
				} else entities1 = levels.get(ai.level);
				entities1.push(entity);
			} else if(entity.get(ld31.model.ExitComponent) != null) {
				var exit = entity.get(ld31.model.ExitComponent);
				var entities2 = null;
				if(!levels.exists(exit.level)) {
					entities2 = [];
					levels.set(exit.level,entities2);
					entities2;
				} else entities2 = levels.get(exit.level);
				entities2.push(entity);
			} else if(entity.get(ld31.model.DoorComponent) != null) {
				var door = entity.get(ld31.model.DoorComponent);
				var entities3 = null;
				if(!levels.exists(door.level)) {
					entities3 = [];
					levels.set(door.level,entities3);
					entities3;
				} else entities3 = levels.get(door.level);
				entities3.push(entity);
			} else if(entity.get(ld31.model.ButtonComponent) != null) {
				var button = entity.get(ld31.model.ButtonComponent);
				var entities4 = null;
				if(!levels.exists(button.level)) {
					entities4 = [];
					levels.set(button.level,entities4);
					entities4;
				} else entities4 = levels.get(button.level);
				entities4.push(entity);
			}
		}
		this.window.gl.enable(3042);
		this.window.gl.blendFunc(1,771);
		this.context.save();
		this.context.setAlpha(1);
		this.window.resize();
		var width = Std["int"](this.window.get_width());
		var height = Std["int"](this.window.get_height());
		this.window.gl.viewport(0,0,width,height);
		this.context.ortho(0,width,height,0,-1,1);
		this.gpu.clearWith(0,0,0,1.0);
		this.buffer.rewind();
		if(ld31.Main.gameover == true) {
			this.context.setAlpha(1);
			this.spriteLibrary.draw(this.buffer,this.context,"gameover","idle",1,3 * ld31.view.Presenter.screenwidth / 4,ld31.view.Presenter.screenheight / 2,0,120,120);
			this.spriteLibrary.draw(this.buffer,this.context,"end","idle",1,ld31.view.Presenter.screenwidth / 2,ld31.view.Presenter.screenheight / 2,0,240,240);
			this.program.set_ambientColor(1,1,1,1);
		} else {
			var cX = ld31.model.CameraSystem.cameraX;
			var cY = ld31.model.CameraSystem.cameraY;
			var hll1 = ld31.model.GestionLevelSystem.hll1;
			var hll2 = ld31.model.GestionLevelSystem.hll2;
			var hll3 = ld31.model.GestionLevelSystem.hll3;
			var imagechoise;
			this.context.setAlpha(0.2);
			var _g11 = cX;
			var _g2 = (width / ld31.Main.WIDTH | 0) + cX;
			while(_g11 < _g2) {
				var i = _g11++;
				var _g3 = 0;
				var _g21 = this.tiledmap[2][i].length;
				while(_g3 < _g21) {
					var j = _g3++;
					if(this.tiledmap[2][i][j] == 1) this.spriteLibrary.draw(this.buffer,this.context,"3","idle",1,((i - cX) * ld31.Main.WIDTH + ld31.Main.WIDTH / 2) * 0.96 + ld31.view.Presenter.screenwidth * 0.02,(j - cY) * ld31.Main.HEIGHT + ld31.Main.HEIGHT / 2 + ld31.view.Presenter.screenheight * -0.04,0,ld31.Main.WIDTH * 0.96,ld31.Main.HEIGHT,false); else if(this.tiledmap[2][i][j] == 2) this.spriteLibrary.draw(this.buffer,this.context,"1","idle",1,((i - cX) * ld31.Main.WIDTH + ld31.Main.WIDTH / 2) * 0.96 + ld31.view.Presenter.screenwidth * 0.02,(j - cY) * ld31.Main.HEIGHT + ld31.Main.HEIGHT / 2 + ld31.view.Presenter.screenheight * -0.04,0,ld31.Main.WIDTH * 0.96,ld31.Main.HEIGHT,false); else if(this.tiledmap[2][i][j] == 3) this.spriteLibrary.draw(this.buffer,this.context,"2","idle",1,((i - cX) * ld31.Main.WIDTH + ld31.Main.WIDTH / 2) * 0.96 + ld31.view.Presenter.screenwidth * 0.02,(j - cY) * ld31.Main.HEIGHT + ld31.Main.HEIGHT / 2 + ld31.view.Presenter.screenheight * -0.04,0,ld31.Main.WIDTH * 0.96,ld31.Main.HEIGHT,false);
				}
			}
			this.drawInLevel(levels,2);
			this.context.setAlpha(0.5);
			var _g12 = cX;
			var _g4 = (width / ld31.Main.WIDTH | 0) + cX;
			while(_g12 < _g4) {
				var i1 = _g12++;
				var _g31 = 0;
				var _g22 = this.tiledmap[1][i1].length;
				while(_g31 < _g22) {
					var j1 = _g31++;
					if(this.tiledmap[1][i1][j1] == 1) this.spriteLibrary.draw(this.buffer,this.context,"3","idle",1,((i1 - cX) * ld31.Main.WIDTH + ld31.Main.WIDTH / 2) * 0.98 + ld31.view.Presenter.screenwidth * 0.01,(j1 - cY) * ld31.Main.HEIGHT + ld31.Main.HEIGHT / 2 + ld31.view.Presenter.screenheight * -0.02,0,ld31.Main.WIDTH * 0.98,ld31.Main.HEIGHT,false); else if(this.tiledmap[1][i1][j1] == 2) this.spriteLibrary.draw(this.buffer,this.context,"1","idle",1,((i1 - cX) * ld31.Main.WIDTH + ld31.Main.WIDTH / 2) * 0.98 + ld31.view.Presenter.screenwidth * 0.01,(j1 - cY) * ld31.Main.HEIGHT + ld31.Main.HEIGHT / 2 + ld31.view.Presenter.screenheight * -0.02,0,ld31.Main.WIDTH * 0.98,ld31.Main.HEIGHT,false); else if(this.tiledmap[1][i1][j1] == 3) this.spriteLibrary.draw(this.buffer,this.context,"2","idle",1,((i1 - cX) * ld31.Main.WIDTH + ld31.Main.WIDTH / 2) * 0.98 + ld31.view.Presenter.screenwidth * 0.01,(j1 - cY) * ld31.Main.HEIGHT + ld31.Main.HEIGHT / 2 + ld31.view.Presenter.screenheight * -0.02,0,ld31.Main.WIDTH * 0.98,ld31.Main.HEIGHT,false);
				}
			}
			this.drawInLevel(levels,1);
			this.context.setAlpha(1);
			var _g13 = cX;
			var _g5 = (width / ld31.Main.WIDTH | 0) + cX;
			while(_g13 < _g5) {
				var i2 = _g13++;
				var _g32 = 0;
				var _g23 = this.tiledmap[0][i2].length;
				while(_g32 < _g23) {
					var j2 = _g32++;
					if(this.tiledmap[0][i2][j2] == 1) this.spriteLibrary.draw(this.buffer,this.context,"3","idle",1,(i2 - cX) * ld31.Main.WIDTH + ld31.Main.WIDTH / 2,(j2 - cY) * ld31.Main.HEIGHT + ld31.Main.HEIGHT / 2,0,ld31.Main.WIDTH,ld31.Main.HEIGHT,false); else if(this.tiledmap[0][i2][j2] == 2) this.spriteLibrary.draw(this.buffer,this.context,"1","idle",1,(i2 - cX) * ld31.Main.WIDTH + ld31.Main.WIDTH / 2,(j2 - cY) * ld31.Main.HEIGHT + ld31.Main.HEIGHT / 2,0,ld31.Main.WIDTH,ld31.Main.HEIGHT,false); else if(this.tiledmap[0][i2][j2] == 3) this.spriteLibrary.draw(this.buffer,this.context,"2","idle",1,(i2 - cX) * ld31.Main.WIDTH + ld31.Main.WIDTH / 2,(j2 - cY) * ld31.Main.HEIGHT + ld31.Main.HEIGHT / 2,0,ld31.Main.WIDTH,ld31.Main.HEIGHT,false);
				}
			}
			this.drawInLevel(levels,0);
			this.context.setAlpha(0.1);
			var test = ld31.model.GestionLevelSystem.showalertmovelevel;
			var tempo = ld31.model.GestionLevelSystem.alerttempo;
			if(tempo > 0) {
				var shgx = ld31.model.GestionLevelSystem.showalertpositionGx;
				var shgy = ld31.model.GestionLevelSystem.showalertpositionGy;
				var targetlevel = ld31.model.GestionLevelSystem.showalertleveltargeted;
				var offsetwidth1 = 0.01 * targetlevel;
				var perspecwidth1 = 1 - 0.02 * targetlevel;
				var offsetheight1 = -0.02 * targetlevel;
				var perspecheight1 = 1 - 0 * targetlevel;
				this.spriteLibrary.draw(this.buffer,this.context,"red","idle",1,(shgx * ld31.Main.WIDTH + ld31.Main.WIDTH / 2) * perspecwidth1 + ld31.view.Presenter.screenwidth * offsetwidth1,(shgy * ld31.Main.HEIGHT + ld31.Main.HEIGHT / 2) * perspecheight1 + ld31.view.Presenter.screenheight * offsetheight1,0,ld31.Main.WIDTH * perspecwidth1,ld31.Main.HEIGHT * perspecheight1,false);
			}
			if(ld31.Main.exitconditionfullfil == true) {
				this.context.setAlpha(1);
				this.spriteLibrary.draw(this.buffer,this.context,"welldone","idle",1,20 * ld31.Main.WIDTH,ld31.Main.HEIGHT * 10,0,120,120);
				this.spriteLibrary.draw(this.buffer,this.context,"end","idle",1,ld31.view.Presenter.screenwidth / 2,ld31.view.Presenter.screenheight / 2,0,240,240);
				this.program.set_ambientColor(1,1,1,1);
			} else this.program.set_ambientColor(1,0,0,0);
		}
		this.program.set_lightPos(playerX,playerY,0.1);
		this.program.set_lightColor(1,1,1,3);
		this.program.set_resolution(width,height);
		this.program.set_falloff(0,4,80);
		this.program.set_tex(this._texture);
		this.program.set_normal(this._normalTexture);
		this.program.draw(this.buffer);
		this.context.setAlpha(1);
		this.buffer.rewind();
		if(player.lives > 0) {
			var _g14 = 0;
			var _g6 = player.lives;
			while(_g14 < _g6) {
				var i3 = _g14++;
				this.spriteLibrary.draw(this.buffer,this.context,"blipt","idle",1,ld31.view.Presenter.screenwidth - (ld31.Main.WIDTH + ld31.Main.WIDTH * i3),ld31.Main.HEIGHT,0,ld31.Main.WIDTH / 2,ld31.Main.HEIGHT / 2);
			}
		}
		this.program.set_lightPos(playerX,playerY,0.1);
		this.program.set_lightColor(1,1,1,1);
		this.program.set_ambientColor(1,1,1,1);
		this.program.set_resolution(width,height);
		this.program.set_falloff(1,4,8);
		this.program.set_tex(this._texture);
		this.program.set_normal(this._normalTexture);
		this.program.draw(this.buffer);
		this.context.restore();
	}
	,drawInLevel: function(levels,level) {
		if(!levels.exists(level)) return;
		var entities = levels.get(level);
		var _g = 0;
		while(_g < entities.length) {
			var entity = entities[_g];
			++_g;
			var placementComponent = entity.get(ld31.model.PositionComponent);
			if(entity.get(ld31.model.PlayerComponent) != null) {
				this.context.save();
				this.context.setAlpha(1);
				var player = entity.get(ld31.model.PlayerComponent);
				var offsetwidth = 0.01 * player.level;
				var perspecwidth = 1 - 0.02 * player.level;
				var offsetheight = -0.02 * player.level;
				var perspecheight = 1 - 0 * player.level;
				var xpos = (placementComponent.x + placementComponent.width / 2) * perspecwidth + ld31.view.Presenter.screenwidth * offsetwidth;
				var ypos = (placementComponent.y + placementComponent.height / 2) * perspecheight + ld31.view.Presenter.screenheight * offsetheight;
				this.spriteLibrary.draw(this.buffer,this.context,"blipt","idle",1,xpos,ypos,0,ld31.Main.WIDTH * perspecwidth,ld31.Main.HEIGHT * perspecheight);
				if(player.lives > 0) {
					var _g2 = 0;
					var _g1 = player.lives;
					while(_g2 < _g1) {
						var i = _g2++;
						this.spriteLibrary.draw(this.buffer,this.context,"blipt","idle",1,ld31.view.Presenter.screenwidth - (ld31.Main.WIDTH + ld31.Main.WIDTH * i),ld31.Main.HEIGHT,0,ld31.Main.WIDTH / 2,ld31.Main.HEIGHT / 2);
					}
				}
				this.context.restore();
			} else if(entity.get(ld31.model.AIComponent) != null) {
				var ai = entity.get(ld31.model.AIComponent);
				var side = "clo1";
				if(ai.typeoffoe == 1) {
					side = "clo1";
					if(ai.velo < 0) side = "clo2";
				} else if(ai.typeoffoe == 2) side = "pieux";
				var offsetwidth1 = 0.01 * ai.level;
				var perspecwidth1 = 1 - 0.02 * ai.level;
				var offsetheight1 = -0.02 * ai.level;
				var perspecheight1 = 1 - 0 * ai.level;
				var xpos1 = (placementComponent.x + placementComponent.width / 2) * perspecwidth1 + ld31.view.Presenter.screenwidth * offsetwidth1;
				var ypos1 = (placementComponent.y + placementComponent.height / 2) * perspecheight1 + ld31.view.Presenter.screenheight * offsetheight1;
				this.spriteLibrary.draw(this.buffer,this.context,side,"idle",1,xpos1,ypos1,0,ld31.Main.WIDTH,ld31.Main.HEIGHT);
			} else if(entity.get(ld31.model.ExitComponent) != null) {
				var exit = entity.get(ld31.model.ExitComponent);
				var offsetwidth2 = 0.01 * exit.level;
				var perspecwidth2 = 1 - 0.02 * exit.level;
				var offsetheight2 = -0.02 * exit.level;
				var perspecheight2 = 1 - 0 * exit.level;
				var xpos2 = (placementComponent.x + placementComponent.width / 2) * perspecwidth2 + ld31.view.Presenter.screenwidth * offsetwidth2;
				var ypos2 = (placementComponent.y + placementComponent.height / 2) * perspecheight2 + ld31.view.Presenter.screenheight * offsetheight2;
				this.spriteLibrary.draw(this.buffer,this.context,"exit","idle",1,xpos2,ypos2,0,ld31.Main.WIDTH,ld31.Main.HEIGHT,false);
			} else if(entity.get(ld31.model.DoorComponent) != null) {
				var door = entity.get(ld31.model.DoorComponent);
				var offsetwidth3 = 0.01 * door.level;
				var perspecwidth3 = 1 - 0.02 * door.level;
				var offsetheight3 = -0.02 * door.level;
				var perspecheight3 = 1 - 0 * door.level;
				var xpos3 = (placementComponent.gx * ld31.Main.WIDTH + ld31.Main.WIDTH / 2) * perspecwidth3 + ld31.view.Presenter.screenwidth * offsetwidth3;
				var ypos3 = (placementComponent.y + ld31.Main.HEIGHT / 2) * perspecheight3 + ld31.view.Presenter.screenheight * offsetheight3;
				this.spriteLibrary.draw(this.buffer,this.context,door.wall,"idle",1,xpos3,ypos3,0,ld31.Main.WIDTH,ld31.Main.HEIGHT,false);
			} else if(entity.get(ld31.model.ButtonComponent) != null) {
				var button = entity.get(ld31.model.ButtonComponent);
				var offsetwidth4 = 0.01 * button.level;
				var perspecwidth4 = 1 - 0.02 * button.level;
				var offsetheight4 = -0.02 * button.level;
				var perspecheight4 = 1 - 0 * button.level;
				var side1 = "mauve";
				if(button.actif == 1) side1 = button.view; else if(button.actif == 0) side1 = "vide";
				var xpos4 = (placementComponent.x + placementComponent.width / 2) * perspecwidth4 + ld31.view.Presenter.screenwidth * offsetwidth4;
				var ypos4 = (placementComponent.y + placementComponent.height / 2) * perspecheight4 + ld31.view.Presenter.screenheight * offsetheight4;
				this.spriteLibrary.draw(this.buffer,this.context,side1,"idle",1,xpos4,ypos4,0,ld31.Main.WIDTH,ld31.Main.HEIGHT);
			}
		}
	}
	,__class__: ld31.view.Presenter
};
var mathtool = {};
mathtool.UF = function() { };
$hxClasses["mathtool.UF"] = mathtool.UF;
mathtool.UF.__name__ = ["mathtool","UF"];
mathtool.UF.InCircle = function(x,y,xc,yc,r) {
	return Math.pow(x - xc,2) + Math.pow(y - yc,2) <= Math.pow(r,2);
};
mathtool.UF.XYtoRADIUS = function(x,y) {
	return Math.sqrt(x * x + y * y);
};
mathtool.UF.ToRadian = function(angle) {
	return angle / 180 * Math.PI;
};
mathtool.UF.anglebetween = function(x1,y1,x2,y2) {
	return Math.atan2(y1,x1) - Math.atan2(y2,x2);
};
mathtool.UF.distance = function(x1,y1,x2,y2) {
	var x = x1 - x2;
	var y = y1 - y2;
	return Math.sqrt(x * x + y * y);
};
mathtool.V2DU = function() { };
$hxClasses["mathtool.V2DU"] = mathtool.V2DU;
mathtool.V2DU.__name__ = ["mathtool","V2DU"];
mathtool.V2DU.create = function(x,y) {
	return { x : x, y : y};
};
mathtool.V2DU.$length = function(v) {
	return Math.sqrt(v.x * v.x + v.y * v.y);
};
mathtool.V2DU.unit = function(v0,t) {
	if(t == null) t = 1.0;
	var m = t / Math.sqrt(v0.x * v0.x + v0.y * v0.y);
	return { x : v0.x * m, y : v0.y * m};
};
mathtool.V2DU.angle = function(v) {
	return Math.atan2(v.y,v.x);
};
mathtool.V2DU.anglebetween = function(v0,v1) {
	return Math.atan2(v0.y,v0.x) - Math.atan2(v1.y,v1.x);
};
mathtool.V2DU.distance = function(v0,v1) {
	var x = v0.x - v1.x;
	var y = v0.y - v1.y;
	return Math.sqrt(x * x + y * y);
};
mathtool.V2DU.dot = function(v0,v1) {
	return v0.x * v1.x + v0.y * v1.y;
};
mathtool.V2DU.cross = function(v0,v1) {
	return v0.x * v1.y - v0.y * v1.x;
};
mathtool.V2DU.add = function(v0,v1) {
	return { x : v0.x + v1.x, y : v0.y + v1.y};
};
mathtool.V2DU.adds = function(vectors) {
	var returner = { x : 0, y : 0};
	var _g = 0;
	while(_g < vectors.length) {
		var v = vectors[_g];
		++_g;
		returner.x += v.x;
		returner.y += v.y;
	}
	return returner;
};
mathtool.V2DU.sub = function(v0,v1) {
	return { x : v0.x - v1.x, y : v0.y - v1.y};
};
mathtool.V2DU.mul = function(v0,s) {
	return { x : v0.x * s, y : v0.y * s};
};
mathtool.V2DU.div = function(v0,s) {
	return { x : v0.x / s, y : v0.y / s};
};
mathtool.V2DU.opposite = function(v0) {
	return { x : -v0.x, y : -v0.y};
};
var msignal = {};
msignal.Signal = function(valueClasses) {
	if(valueClasses == null) valueClasses = [];
	this.valueClasses = valueClasses;
	this.slots = msignal.SlotList.NIL;
	this.priorityBased = false;
};
$hxClasses["msignal.Signal"] = msignal.Signal;
msignal.Signal.__name__ = ["msignal","Signal"];
msignal.Signal.prototype = {
	add: function(listener) {
		return this.registerListener(listener);
	}
	,addOnce: function(listener) {
		return this.registerListener(listener,true);
	}
	,addWithPriority: function(listener,priority) {
		if(priority == null) priority = 0;
		return this.registerListener(listener,false,priority);
	}
	,addOnceWithPriority: function(listener,priority) {
		if(priority == null) priority = 0;
		return this.registerListener(listener,true,priority);
	}
	,remove: function(listener) {
		var slot = this.slots.find(listener);
		if(slot == null) return null;
		this.slots = this.slots.filterNot(listener);
		return slot;
	}
	,removeAll: function() {
		this.slots = msignal.SlotList.NIL;
	}
	,registerListener: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		if(this.registrationPossible(listener,once)) {
			var newSlot = this.createSlot(listener,once,priority);
			if(!this.priorityBased && priority != 0) this.priorityBased = true;
			if(!this.priorityBased && priority == 0) this.slots = this.slots.prepend(newSlot); else this.slots = this.slots.insertWithPriority(newSlot);
			return newSlot;
		}
		return this.slots.find(listener);
	}
	,registrationPossible: function(listener,once) {
		if(!this.slots.nonEmpty) return true;
		var existingSlot = this.slots.find(listener);
		if(existingSlot == null) return true;
		if(existingSlot.once != once) throw "You cannot addOnce() then add() the same listener without removing the relationship first.";
		return false;
	}
	,createSlot: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		return null;
	}
	,get_numListeners: function() {
		return this.slots.get_length();
	}
	,__class__: msignal.Signal
};
msignal.Signal0 = function() {
	msignal.Signal.call(this);
};
$hxClasses["msignal.Signal0"] = msignal.Signal0;
msignal.Signal0.__name__ = ["msignal","Signal0"];
msignal.Signal0.__super__ = msignal.Signal;
msignal.Signal0.prototype = $extend(msignal.Signal.prototype,{
	dispatch: function() {
		var slotsToProcess = this.slots;
		while(slotsToProcess.nonEmpty) {
			slotsToProcess.head.execute();
			slotsToProcess = slotsToProcess.tail;
		}
	}
	,createSlot: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		return new msignal.Slot0(this,listener,once,priority);
	}
	,__class__: msignal.Signal0
});
msignal.Signal1 = function(type) {
	msignal.Signal.call(this,[type]);
};
$hxClasses["msignal.Signal1"] = msignal.Signal1;
msignal.Signal1.__name__ = ["msignal","Signal1"];
msignal.Signal1.__super__ = msignal.Signal;
msignal.Signal1.prototype = $extend(msignal.Signal.prototype,{
	dispatch: function(value) {
		var slotsToProcess = this.slots;
		while(slotsToProcess.nonEmpty) {
			slotsToProcess.head.execute(value);
			slotsToProcess = slotsToProcess.tail;
		}
	}
	,createSlot: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		return new msignal.Slot1(this,listener,once,priority);
	}
	,__class__: msignal.Signal1
});
msignal.Signal2 = function(type1,type2) {
	msignal.Signal.call(this,[type1,type2]);
};
$hxClasses["msignal.Signal2"] = msignal.Signal2;
msignal.Signal2.__name__ = ["msignal","Signal2"];
msignal.Signal2.__super__ = msignal.Signal;
msignal.Signal2.prototype = $extend(msignal.Signal.prototype,{
	dispatch: function(value1,value2) {
		var slotsToProcess = this.slots;
		while(slotsToProcess.nonEmpty) {
			slotsToProcess.head.execute(value1,value2);
			slotsToProcess = slotsToProcess.tail;
		}
	}
	,createSlot: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		return new msignal.Slot2(this,listener,once,priority);
	}
	,__class__: msignal.Signal2
});
msignal.Slot = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	this.signal = signal;
	this.set_listener(listener);
	this.once = once;
	this.priority = priority;
	this.enabled = true;
};
$hxClasses["msignal.Slot"] = msignal.Slot;
msignal.Slot.__name__ = ["msignal","Slot"];
msignal.Slot.prototype = {
	remove: function() {
		this.signal.remove(this.listener);
	}
	,set_listener: function(value) {
		if(value == null) throw "listener cannot be null";
		return this.listener = value;
	}
	,__class__: msignal.Slot
};
msignal.Slot0 = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	msignal.Slot.call(this,signal,listener,once,priority);
};
$hxClasses["msignal.Slot0"] = msignal.Slot0;
msignal.Slot0.__name__ = ["msignal","Slot0"];
msignal.Slot0.__super__ = msignal.Slot;
msignal.Slot0.prototype = $extend(msignal.Slot.prototype,{
	execute: function() {
		if(!this.enabled) return;
		if(this.once) this.remove();
		this.listener();
	}
	,__class__: msignal.Slot0
});
msignal.Slot1 = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	msignal.Slot.call(this,signal,listener,once,priority);
};
$hxClasses["msignal.Slot1"] = msignal.Slot1;
msignal.Slot1.__name__ = ["msignal","Slot1"];
msignal.Slot1.__super__ = msignal.Slot;
msignal.Slot1.prototype = $extend(msignal.Slot.prototype,{
	execute: function(value1) {
		if(!this.enabled) return;
		if(this.once) this.remove();
		if(this.param != null) value1 = this.param;
		this.listener(value1);
	}
	,__class__: msignal.Slot1
});
msignal.Slot2 = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	msignal.Slot.call(this,signal,listener,once,priority);
};
$hxClasses["msignal.Slot2"] = msignal.Slot2;
msignal.Slot2.__name__ = ["msignal","Slot2"];
msignal.Slot2.__super__ = msignal.Slot;
msignal.Slot2.prototype = $extend(msignal.Slot.prototype,{
	execute: function(value1,value2) {
		if(!this.enabled) return;
		if(this.once) this.remove();
		if(this.param1 != null) value1 = this.param1;
		if(this.param2 != null) value2 = this.param2;
		this.listener(value1,value2);
	}
	,__class__: msignal.Slot2
});
msignal.SlotList = function(head,tail) {
	this.nonEmpty = false;
	if(head == null && tail == null) {
		if(msignal.SlotList.NIL != null) throw "Parameters head and tail are null. Use the NIL element instead.";
		this.nonEmpty = false;
	} else if(head == null) throw "Parameter head cannot be null."; else {
		this.head = head;
		if(tail == null) this.tail = msignal.SlotList.NIL; else this.tail = tail;
		this.nonEmpty = true;
	}
};
$hxClasses["msignal.SlotList"] = msignal.SlotList;
msignal.SlotList.__name__ = ["msignal","SlotList"];
msignal.SlotList.prototype = {
	get_length: function() {
		if(!this.nonEmpty) return 0;
		if(this.tail == msignal.SlotList.NIL) return 1;
		var result = 0;
		var p = this;
		while(p.nonEmpty) {
			++result;
			p = p.tail;
		}
		return result;
	}
	,prepend: function(slot) {
		return new msignal.SlotList(slot,this);
	}
	,append: function(slot) {
		if(slot == null) return this;
		if(!this.nonEmpty) return new msignal.SlotList(slot);
		if(this.tail == msignal.SlotList.NIL) return new msignal.SlotList(slot).prepend(this.head);
		var wholeClone = new msignal.SlotList(this.head);
		var subClone = wholeClone;
		var current = this.tail;
		while(current.nonEmpty) {
			subClone = subClone.tail = new msignal.SlotList(current.head);
			current = current.tail;
		}
		subClone.tail = new msignal.SlotList(slot);
		return wholeClone;
	}
	,insertWithPriority: function(slot) {
		if(!this.nonEmpty) return new msignal.SlotList(slot);
		var priority = slot.priority;
		if(priority >= this.head.priority) return this.prepend(slot);
		var wholeClone = new msignal.SlotList(this.head);
		var subClone = wholeClone;
		var current = this.tail;
		while(current.nonEmpty) {
			if(priority > current.head.priority) {
				subClone.tail = current.prepend(slot);
				return wholeClone;
			}
			subClone = subClone.tail = new msignal.SlotList(current.head);
			current = current.tail;
		}
		subClone.tail = new msignal.SlotList(slot);
		return wholeClone;
	}
	,filterNot: function(listener) {
		if(!this.nonEmpty || listener == null) return this;
		if(Reflect.compareMethods(this.head.listener,listener)) return this.tail;
		var wholeClone = new msignal.SlotList(this.head);
		var subClone = wholeClone;
		var current = this.tail;
		while(current.nonEmpty) {
			if(Reflect.compareMethods(current.head.listener,listener)) {
				subClone.tail = current.tail;
				return wholeClone;
			}
			subClone = subClone.tail = new msignal.SlotList(current.head);
			current = current.tail;
		}
		return this;
	}
	,contains: function(listener) {
		if(!this.nonEmpty) return false;
		var p = this;
		while(p.nonEmpty) {
			if(Reflect.compareMethods(p.head.listener,listener)) return true;
			p = p.tail;
		}
		return false;
	}
	,find: function(listener) {
		if(!this.nonEmpty) return null;
		var p = this;
		while(p.nonEmpty) {
			if(Reflect.compareMethods(p.head.listener,listener)) return p.head;
			p = p.tail;
		}
		return null;
	}
	,__class__: msignal.SlotList
};
var num = {};
num._Matrix = {};
num._Matrix.Matrix_Impl_ = {};
$hxClasses["num._Matrix.Matrix_Impl_"] = num._Matrix.Matrix_Impl_;
num._Matrix.Matrix_Impl_.__name__ = ["num","_Matrix","Matrix_Impl_"];
num._Matrix.Matrix_Impl_._new = function() {
	var this1;
	var out = this1 = new Float32Array(16);
	out[0] = 1;
	out[1] = 0;
	out[2] = 0;
	out[3] = 0;
	out[4] = 0;
	out[5] = 1;
	out[6] = 0;
	out[7] = 0;
	out[8] = 0;
	out[9] = 0;
	out[10] = 1;
	out[11] = 0;
	out[12] = 0;
	out[13] = 0;
	out[14] = 0;
	out[15] = 1;
	return this1;
};
num._Matrix.Matrix_Impl_.get = function(this1,index) {
	return this1[index];
};
num._Matrix.Matrix_Impl_.arrayWrite = function(this1,index,v) {
	this1[index] = v;
	return v;
};
num._Matrix.Matrix_Impl_.copyFrom = function(out,a) {
	var v = a[0];
	out[0] = v;
	v;
	var v1 = a[1];
	out[1] = v1;
	v1;
	var v2 = a[2];
	out[2] = v2;
	v2;
	var v3 = a[3];
	out[3] = v3;
	v3;
	var v4 = a[4];
	out[4] = v4;
	v4;
	var v5 = a[5];
	out[5] = v5;
	v5;
	var v6 = a[6];
	out[6] = v6;
	v6;
	var v7 = a[7];
	out[7] = v7;
	v7;
	var v8 = a[8];
	out[8] = v8;
	v8;
	var v9 = a[9];
	out[9] = v9;
	v9;
	var v10 = a[10];
	out[10] = v10;
	v10;
	var v11 = a[11];
	out[11] = v11;
	v11;
	var v12 = a[12];
	out[12] = v12;
	v12;
	var v13 = a[13];
	out[13] = v13;
	v13;
	var v14 = a[14];
	out[14] = v14;
	v14;
	var v15 = a[15];
	out[15] = v15;
	v15;
	return out;
};
num._Matrix.Matrix_Impl_.translate = function(out,a,x,y,z) {
	var a00;
	var a01;
	var a02;
	var a03;
	var a10;
	var a11;
	var a12;
	var a13;
	var a20;
	var a21;
	var a22;
	var a23;
	if(a == out) {
		var v = a[0] * x + a[4] * y + a[8] * z + a[12];
		out[12] = v;
		v;
		var v1 = a[1] * x + a[5] * y + a[9] * z + a[13];
		out[13] = v1;
		v1;
		var v2 = a[2] * x + a[6] * y + a[10] * z + a[14];
		out[14] = v2;
		v2;
		var v3 = a[3] * x + a[7] * y + a[11] * z + a[15];
		out[15] = v3;
		v3;
	} else {
		a00 = a[0];
		a01 = a[1];
		a02 = a[2];
		a03 = a[3];
		a10 = a[4];
		a11 = a[5];
		a12 = a[6];
		a13 = a[7];
		a20 = a[8];
		a21 = a[9];
		a22 = a[10];
		a23 = a[11];
		out[0] = a00;
		a00;
		out[1] = a01;
		a01;
		out[2] = a02;
		a02;
		out[3] = a03;
		a03;
		out[4] = a10;
		a10;
		out[5] = a11;
		a11;
		out[6] = a12;
		a12;
		out[7] = a13;
		a13;
		out[8] = a20;
		a20;
		out[9] = a21;
		a21;
		out[10] = a22;
		a22;
		out[11] = a23;
		a23;
		var v4 = a00 * x + a10 * y + a20 * z + a[12];
		out[12] = v4;
		v4;
		var v5 = a01 * x + a11 * y + a21 * z + a[13];
		out[13] = v5;
		v5;
		var v6 = a02 * x + a12 * y + a22 * z + a[14];
		out[14] = v6;
		v6;
		var v7 = a03 * x + a13 * y + a23 * z + a[15];
		out[15] = v7;
		v7;
	}
	return out;
};
num._Matrix.Matrix_Impl_.scale = function(out,a,x,y,z) {
	var v = a[0] * x;
	out[0] = v;
	v;
	var v1 = a[1] * x;
	out[1] = v1;
	v1;
	var v2 = a[2] * x;
	out[2] = v2;
	v2;
	var v3 = a[3] * x;
	out[3] = v3;
	v3;
	var v4 = a[4] * y;
	out[4] = v4;
	v4;
	var v5 = a[5] * y;
	out[5] = v5;
	v5;
	var v6 = a[6] * y;
	out[6] = v6;
	v6;
	var v7 = a[7] * y;
	out[7] = v7;
	v7;
	var v8 = a[8] * z;
	out[8] = v8;
	v8;
	var v9 = a[9] * z;
	out[9] = v9;
	v9;
	var v10 = a[10] * z;
	out[10] = v10;
	v10;
	var v11 = a[11] * z;
	out[11] = v11;
	v11;
	var v12 = a[12];
	out[12] = v12;
	v12;
	var v13 = a[13];
	out[13] = v13;
	v13;
	var v14 = a[14];
	out[14] = v14;
	v14;
	var v15 = a[15];
	out[15] = v15;
	v15;
	return out;
};
num._Matrix.Matrix_Impl_.ortho = function(out,left,right,bottom,top,near,far) {
	var lr = 1 / (left - right);
	var bt = 1 / (bottom - top);
	var nf = 1 / (near - far);
	var v = -2 * lr;
	out[0] = v;
	v;
	out[1] = 0;
	0;
	out[2] = 0;
	0;
	out[3] = 0;
	0;
	out[4] = 0;
	0;
	var v1 = -2 * bt;
	out[5] = v1;
	v1;
	out[6] = 0;
	0;
	out[7] = 0;
	0;
	out[8] = 0;
	0;
	out[9] = 0;
	0;
	var v2 = 2 * nf;
	out[10] = v2;
	v2;
	out[11] = 0;
	0;
	var v3 = (left + right) * lr;
	out[12] = v3;
	v3;
	var v4 = (top + bottom) * bt;
	out[13] = v4;
	v4;
	var v5 = (far + near) * nf;
	out[14] = v5;
	v5;
	out[15] = 1;
	1;
	return out;
};
num._Vector = {};
num._Vector.Vector_Impl_ = {};
$hxClasses["num._Vector.Vector_Impl_"] = num._Vector.Vector_Impl_;
num._Vector.Vector_Impl_.__name__ = ["num","_Vector","Vector_Impl_"];
num._Vector.Vector_Impl_._new = function(x,y,z) {
	if(z == null) z = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	var this1;
	this1 = new Float32Array(4);
	this1[0] = x;
	this1[1] = y;
	this1[2] = z;
	this1[3] = 0;
	return this1;
};
num._Vector.Vector_Impl_.get_x = function(this1) {
	return this1[0];
};
num._Vector.Vector_Impl_.set_x = function(this1,v) {
	return this1[0] = v;
};
num._Vector.Vector_Impl_.get_y = function(this1) {
	return this1[1];
};
num._Vector.Vector_Impl_.set_y = function(this1,v) {
	return this1[1] = v;
};
num._Vector.Vector_Impl_.get_z = function(this1) {
	return this1[2];
};
num._Vector.Vector_Impl_.set_z = function(this1,v) {
	return this1[2] = v;
};
num._Vector.Vector_Impl_.get_w = function(this1) {
	return this1[3];
};
num._Vector.Vector_Impl_.set_w = function(this1,v) {
	return this1[3] = v;
};
num._Vector.Vector_Impl_.transformMat4 = function(this1,out,m) {
	out[0] = m[0] * this1[0] + m[4] * this1[1] + m[8] * this1[2] + m[12] * this1[3];
	out[1] = m[1] * this1[0] + m[5] * this1[1] + m[9] * this1[2] + m[13] * this1[3];
	out[2] = m[2] * this1[0] + m[6] * this1[1] + m[10] * this1[2] + m[14] * this1[3];
	out[3] = m[3] * this1[0] + m[7] * this1[1] + m[11] * this1[2] + m[15] * this1[3];
	return out;
};
var promhx = {};
promhx.base = {};
promhx.base.AsyncBase = function(d) {
	this.id = promhx.base.AsyncBase.id_ctr += 1;
	this._resolved = false;
	this._pending = false;
	this._fulfilled = false;
	this._update = [];
	this._error = [];
	this._errored = false;
	if(d != null) d.then($bind(this,this.handleResolve));
};
$hxClasses["promhx.base.AsyncBase"] = promhx.base.AsyncBase;
promhx.base.AsyncBase.__name__ = ["promhx","base","AsyncBase"];
promhx.base.AsyncBase.link = function(current,next,f) {
	current._update.push({ async : next, linkf : function(x) {
		next.handleResolve(f(x));
	}});
	promhx.base.AsyncBase.immediateLinkUpdate(current,next,f);
};
promhx.base.AsyncBase.immediateLinkUpdate = function(current,next,f) {
	if(current._errored) next.handleError(current._error);
	if(current._resolved && !current._pending) try {
		next.handleResolve(f(current._val));
	} catch( e ) {
		next.handleError(e);
	}
};
promhx.base.AsyncBase.linkAll = function(all,next) {
	var cthen = function(arr,current,v) {
		if(arr.length == 0 || promhx.base.AsyncBase.allFulfilled(arr)) {
			var vals;
			var _g = [];
			var $it0 = $iterator(all)();
			while( $it0.hasNext() ) {
				var a = $it0.next();
				_g.push(a == current?v:a._val);
			}
			vals = _g;
			next.handleResolve(vals);
		}
		null;
		return;
	};
	var $it1 = $iterator(all)();
	while( $it1.hasNext() ) {
		var a1 = $it1.next();
		a1._update.push({ async : next, linkf : (function(f,a11,a2) {
			return function(v1) {
				f(a11,a2,v1);
				return;
			};
		})(cthen,(function($this) {
			var $r;
			var _g1 = [];
			var $it2 = $iterator(all)();
			while( $it2.hasNext() ) {
				var a21 = $it2.next();
				if(a21 != a1) _g1.push(a21);
			}
			$r = _g1;
			return $r;
		}(this)),a1)});
	}
	if(promhx.base.AsyncBase.allFulfilled(all)) next.handleResolve((function($this) {
		var $r;
		var _g2 = [];
		var $it3 = $iterator(all)();
		while( $it3.hasNext() ) {
			var a3 = $it3.next();
			_g2.push(a3._val);
		}
		$r = _g2;
		return $r;
	}(this)));
};
promhx.base.AsyncBase.pipeLink = function(current,ret,f) {
	var linked = false;
	var linkf = function(x) {
		if(!linked) {
			linked = true;
			var pipe_ret = f(x);
			pipe_ret._update.push({ async : ret, linkf : $bind(ret,ret.handleResolve)});
			promhx.base.AsyncBase.immediateLinkUpdate(pipe_ret,ret,function(x1) {
				return x1;
			});
		}
	};
	current._update.push({ async : ret, linkf : linkf});
	if(current._resolved && !current._pending) try {
		linkf(current._val);
	} catch( e ) {
		ret.handleError(e);
	}
};
promhx.base.AsyncBase.allResolved = function($as) {
	var $it0 = $iterator($as)();
	while( $it0.hasNext() ) {
		var a = $it0.next();
		if(!a._resolved) return false;
	}
	return true;
};
promhx.base.AsyncBase.allFulfilled = function($as) {
	var $it0 = $iterator($as)();
	while( $it0.hasNext() ) {
		var a = $it0.next();
		if(!a._fulfilled) return false;
	}
	return true;
};
promhx.base.AsyncBase.prototype = {
	catchError: function(f) {
		this._error.push(f);
		return this;
	}
	,errorThen: function(f) {
		this._errorMap = f;
		return this;
	}
	,isResolved: function() {
		return this._resolved;
	}
	,isErrored: function() {
		return this._errored;
	}
	,isFulfilled: function() {
		return this._fulfilled;
	}
	,isPending: function() {
		return this._pending;
	}
	,handleResolve: function(val) {
		this._resolve(val);
	}
	,_resolve: function(val) {
		var _g = this;
		if(this._pending) promhx.base.EventLoop.enqueue((function(f,a1) {
			return function() {
				f(a1);
			};
		})($bind(this,this._resolve),val)); else {
			this._resolved = true;
			this._pending = true;
			promhx.base.EventLoop.queue.add(function() {
				_g._val = val;
				var _g1 = 0;
				var _g2 = _g._update;
				while(_g1 < _g2.length) {
					var up = _g2[_g1];
					++_g1;
					try {
						up.linkf(val);
					} catch( e ) {
						up.async.handleError(e);
					}
				}
				_g._fulfilled = true;
				_g._pending = false;
			});
			promhx.base.EventLoop.continueOnNextLoop();
		}
	}
	,handleError: function(error) {
		this._handleError(error);
	}
	,_handleError: function(error) {
		var _g = this;
		var update_errors = function(e) {
			if(_g._error.length > 0) {
				var _g1 = 0;
				var _g2 = _g._error;
				while(_g1 < _g2.length) {
					var ef = _g2[_g1];
					++_g1;
					ef(e);
				}
			} else if(_g._update.length > 0) {
				var _g11 = 0;
				var _g21 = _g._update;
				while(_g11 < _g21.length) {
					var up = _g21[_g11];
					++_g11;
					up.async.handleError(e);
				}
			} else throw e;
		};
		promhx.base.EventLoop.queue.add(function() {
			if(_g._errorMap != null) try {
				_g._resolve(_g._errorMap(error));
			} catch( e1 ) {
				update_errors(e1);
			} else update_errors(error);
		});
		promhx.base.EventLoop.continueOnNextLoop();
	}
	,then: function(f) {
		var ret = new promhx.base.AsyncBase();
		promhx.base.AsyncBase.link(this,ret,f);
		return ret;
	}
	,unlink: function(to) {
		var _g = this;
		promhx.base.EventLoop.queue.add(function() {
			_g._update = _g._update.filter(function(x) {
				return x.async != to;
			});
		});
		promhx.base.EventLoop.continueOnNextLoop();
	}
	,isLinked: function(to) {
		var updated = false;
		var _g = 0;
		var _g1 = this._update;
		while(_g < _g1.length) {
			var u = _g1[_g];
			++_g;
			if(u.async == to) return true;
		}
		return updated;
	}
	,__class__: promhx.base.AsyncBase
};
promhx.Deferred = $hx_exports.promhx.Deferred = function() {
	promhx.base.AsyncBase.call(this);
};
$hxClasses["promhx.Deferred"] = promhx.Deferred;
promhx.Deferred.__name__ = ["promhx","Deferred"];
promhx.Deferred.__super__ = promhx.base.AsyncBase;
promhx.Deferred.prototype = $extend(promhx.base.AsyncBase.prototype,{
	resolve: function(val) {
		this.handleResolve(val);
	}
	,throwError: function(e) {
		this.handleError(e);
	}
	,promise: function() {
		return new promhx.Promise(this);
	}
	,stream: function() {
		return new promhx.Stream(this);
	}
	,publicStream: function() {
		return new promhx.PublicStream(this);
	}
	,__class__: promhx.Deferred
});
promhx.Promise = $hx_exports.promhx.Promise = function(d) {
	promhx.base.AsyncBase.call(this,d);
	this._rejected = false;
};
$hxClasses["promhx.Promise"] = promhx.Promise;
promhx.Promise.__name__ = ["promhx","Promise"];
promhx.Promise.whenAll = function(itb) {
	var ret = new promhx.Promise();
	promhx.base.AsyncBase.linkAll(itb,ret);
	return ret;
};
promhx.Promise.promise = function(_val) {
	var ret = new promhx.Promise();
	ret.handleResolve(_val);
	return ret;
};
promhx.Promise.__super__ = promhx.base.AsyncBase;
promhx.Promise.prototype = $extend(promhx.base.AsyncBase.prototype,{
	isRejected: function() {
		return this._rejected;
	}
	,reject: function(e) {
		this._rejected = true;
		this.handleError(e);
	}
	,handleResolve: function(val) {
		if(this._resolved) {
			var msg = "Promise has already been resolved";
			throw promhx.error.PromiseError.AlreadyResolved(msg);
		}
		this._resolve(val);
	}
	,then: function(f) {
		var ret = new promhx.Promise();
		promhx.base.AsyncBase.link(this,ret,f);
		return ret;
	}
	,unlink: function(to) {
		var _g = this;
		promhx.base.EventLoop.queue.add(function() {
			if(!_g._fulfilled) {
				var msg = "Downstream Promise is not fullfilled";
				_g.handleError(promhx.error.PromiseError.DownstreamNotFullfilled(msg));
			} else _g._update = _g._update.filter(function(x) {
				return x.async != to;
			});
		});
		promhx.base.EventLoop.continueOnNextLoop();
	}
	,handleError: function(error) {
		this._rejected = true;
		this._handleError(error);
	}
	,pipe: function(f) {
		var ret = new promhx.Promise();
		promhx.base.AsyncBase.pipeLink(this,ret,f);
		return ret;
	}
	,errorPipe: function(f) {
		var ret = new promhx.Promise();
		this.catchError(function(e) {
			var piped = f(e);
			piped.then($bind(ret,ret._resolve));
		});
		this.then($bind(ret,ret._resolve));
		return ret;
	}
	,__class__: promhx.Promise
});
promhx.Stream = $hx_exports.promhx.Stream = function(d) {
	promhx.base.AsyncBase.call(this,d);
	this._end_deferred = new promhx.Deferred();
	this._end_promise = this._end_deferred.promise();
};
$hxClasses["promhx.Stream"] = promhx.Stream;
promhx.Stream.__name__ = ["promhx","Stream"];
promhx.Stream.foreach = function(itb) {
	var s = new promhx.Stream();
	var $it0 = $iterator(itb)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		s.handleResolve(i);
	}
	s.end();
	return s;
};
promhx.Stream.wheneverAll = function(itb) {
	var ret = new promhx.Stream();
	promhx.base.AsyncBase.linkAll(itb,ret);
	return ret;
};
promhx.Stream.concatAll = function(itb) {
	var ret = new promhx.Stream();
	var $it0 = $iterator(itb)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		ret.concat(i);
	}
	return ret;
};
promhx.Stream.mergeAll = function(itb) {
	var ret = new promhx.Stream();
	var $it0 = $iterator(itb)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		ret.merge(i);
	}
	return ret;
};
promhx.Stream.stream = function(_val) {
	var ret = new promhx.Stream();
	ret.handleResolve(_val);
	return ret;
};
promhx.Stream.__super__ = promhx.base.AsyncBase;
promhx.Stream.prototype = $extend(promhx.base.AsyncBase.prototype,{
	then: function(f) {
		var ret = new promhx.Stream();
		promhx.base.AsyncBase.link(this,ret,f);
		this._end_promise.then(function(x) {
			ret.end();
		});
		return ret;
	}
	,detachStream: function(str) {
		var filtered = [];
		var removed = false;
		var _g = 0;
		var _g1 = this._update;
		while(_g < _g1.length) {
			var u = _g1[_g];
			++_g;
			if(u.async == str) removed = true; else filtered.push(u);
		}
		this._update = filtered;
		return removed;
	}
	,first: function() {
		var s = new promhx.Promise();
		this.then(function(x) {
			if(!s._resolved) s.handleResolve(x);
		});
		return s;
	}
	,handleResolve: function(val) {
		if(!this._end && !this._pause) this._resolve(val);
	}
	,pause: function(set) {
		if(set == null) set = !this._pause;
		this._pause = set;
	}
	,pipe: function(f) {
		var ret = new promhx.Stream();
		promhx.base.AsyncBase.pipeLink(this,ret,f);
		this._end_promise.then(function(x) {
			ret.end();
		});
		return ret;
	}
	,errorPipe: function(f) {
		var ret = new promhx.Stream();
		this.catchError(function(e) {
			var piped = f(e);
			piped.then($bind(ret,ret._resolve));
			piped._end_promise.then(($_=ret._end_promise,$bind($_,$_._resolve)));
		});
		this.then($bind(ret,ret._resolve));
		this._end_promise.then(function(x) {
			ret.end();
		});
		return ret;
	}
	,handleEnd: function() {
		if(this._pending) {
			promhx.base.EventLoop.queue.add($bind(this,this.handleEnd));
			promhx.base.EventLoop.continueOnNextLoop();
		} else if(this._end_promise._resolved) return; else {
			this._end = true;
			var o;
			if(this._resolved) o = haxe.ds.Option.Some(this._val); else o = haxe.ds.Option.None;
			this._end_promise.handleResolve(o);
			this._update = [];
			this._error = [];
		}
	}
	,end: function() {
		promhx.base.EventLoop.queue.add($bind(this,this.handleEnd));
		promhx.base.EventLoop.continueOnNextLoop();
		return this;
	}
	,endThen: function(f) {
		return this._end_promise.then(f);
	}
	,filter: function(f) {
		var ret = new promhx.Stream();
		this._update.push({ async : ret, linkf : function(x) {
			if(f(x)) ret.handleResolve(x);
		}});
		promhx.base.AsyncBase.immediateLinkUpdate(this,ret,function(x1) {
			return x1;
		});
		return ret;
	}
	,concat: function(s) {
		var ret = new promhx.Stream();
		this._update.push({ async : ret, linkf : $bind(ret,ret.handleResolve)});
		promhx.base.AsyncBase.immediateLinkUpdate(this,ret,function(x) {
			return x;
		});
		this._end_promise.then(function(_) {
			s.pipe(function(x1) {
				ret.handleResolve(x1);
				return ret;
			});
			s._end_promise.then(function(_1) {
				ret.end();
			});
		});
		return ret;
	}
	,merge: function(s) {
		var ret = new promhx.Stream();
		this._update.push({ async : ret, linkf : $bind(ret,ret.handleResolve)});
		s._update.push({ async : ret, linkf : $bind(ret,ret.handleResolve)});
		promhx.base.AsyncBase.immediateLinkUpdate(this,ret,function(x) {
			return x;
		});
		promhx.base.AsyncBase.immediateLinkUpdate(s,ret,function(x1) {
			return x1;
		});
		return ret;
	}
	,__class__: promhx.Stream
});
promhx.PublicStream = $hx_exports.promhx.PublicStream = function(def) {
	promhx.Stream.call(this,def);
};
$hxClasses["promhx.PublicStream"] = promhx.PublicStream;
promhx.PublicStream.__name__ = ["promhx","PublicStream"];
promhx.PublicStream.publicstream = function(val) {
	var ps = new promhx.PublicStream();
	ps.handleResolve(val);
	return ps;
};
promhx.PublicStream.__super__ = promhx.Stream;
promhx.PublicStream.prototype = $extend(promhx.Stream.prototype,{
	resolve: function(val) {
		this.handleResolve(val);
	}
	,throwError: function(e) {
		this.handleError(e);
	}
	,update: function(val) {
		this.handleResolve(val);
	}
	,__class__: promhx.PublicStream
});
promhx.base.EventLoop = function() { };
$hxClasses["promhx.base.EventLoop"] = promhx.base.EventLoop;
promhx.base.EventLoop.__name__ = ["promhx","base","EventLoop"];
promhx.base.EventLoop.enqueue = function(eqf) {
	promhx.base.EventLoop.queue.add(eqf);
	promhx.base.EventLoop.continueOnNextLoop();
};
promhx.base.EventLoop.set_nextLoop = function(f) {
	if(promhx.base.EventLoop.nextLoop != null) throw "nextLoop has already been set"; else promhx.base.EventLoop.nextLoop = f;
	return promhx.base.EventLoop.nextLoop;
};
promhx.base.EventLoop.queueEmpty = function() {
	return promhx.base.EventLoop.queue.isEmpty();
};
promhx.base.EventLoop.finish = function(max_iterations) {
	if(max_iterations == null) max_iterations = 1000;
	var fn = null;
	while(max_iterations-- > 0 && (fn = promhx.base.EventLoop.queue.pop()) != null) fn();
	return promhx.base.EventLoop.queue.isEmpty();
};
promhx.base.EventLoop.clear = function() {
	promhx.base.EventLoop.queue = new List();
};
promhx.base.EventLoop.f = function() {
	var fn = promhx.base.EventLoop.queue.pop();
	if(fn != null) fn();
	if(!promhx.base.EventLoop.queue.isEmpty()) promhx.base.EventLoop.continueOnNextLoop();
};
promhx.base.EventLoop.continueOnNextLoop = function() {
	if(promhx.base.EventLoop.nextLoop != null) promhx.base.EventLoop.nextLoop(promhx.base.EventLoop.f); else setImmediate(promhx.base.EventLoop.f);
};
promhx.error = {};
promhx.error.PromiseError = $hxClasses["promhx.error.PromiseError"] = { __ename__ : ["promhx","error","PromiseError"], __constructs__ : ["AlreadyResolved","DownstreamNotFullfilled"] };
promhx.error.PromiseError.AlreadyResolved = function(message) { var $x = ["AlreadyResolved",0,message]; $x.__enum__ = promhx.error.PromiseError; $x.toString = $estr; return $x; };
promhx.error.PromiseError.DownstreamNotFullfilled = function(message) { var $x = ["DownstreamNotFullfilled",1,message]; $x.__enum__ = promhx.error.PromiseError; $x.toString = $estr; return $x; };
var run = {};
run.Runnable = function() { };
$hxClasses["run.Runnable"] = run.Runnable;
run.Runnable.__name__ = ["run","Runnable"];
run.Runnable.prototype = {
	__class__: run.Runnable
};
run.Runner = function(runnable) {
	this.runnable = runnable;
};
$hxClasses["run.Runner"] = run.Runner;
run.Runner.__name__ = ["run","Runner"];
run.Runner.prototype = {
	start: function(fps) {
		if(fps == null) fps = 30;
		this.lastNow = haxe.Timer.stamp();
		this.runnable.start(this.lastNow);
		this.timer = new haxe.Timer(1000 / fps | 0);
		this.timer.run = $bind(this,this.update);
	}
	,update: function() {
		var now = haxe.Timer.stamp();
		var delta = now - this.lastNow;
		this.lastNow = now;
		this.runnable.update(now,delta);
	}
	,__class__: run.Runner
};
snail.Shell = function(data,screens) {
	this.currentIndex = 0;
	this.data = data;
	this.screens = screens;
};
$hxClasses["snail.Shell"] = snail.Shell;
snail.Shell.__name__ = ["snail","Shell"];
snail.Shell.__interfaces__ = [run.Runnable];
snail.Shell.prototype = {
	start: function(now) {
		this.currentIndex = 0;
		this.enterScreen(now);
	}
	,enterScreen: function(now) {
		this.currentScreen = this.screens[this.currentIndex];
		this.currentScreen.enter(this,now);
	}
	,update: function(now,dt) {
		var done = this.currentScreen.update(now,dt);
		if(done) {
			this.currentScreen.quit(now);
			this.currentIndex++;
			if(this.currentIndex >= this.screens.length) this.currentIndex = 0;
			this.enterScreen(now);
		}
	}
	,__class__: snail.Shell
};
var tink = {};
tink.core = {};
tink.core._Callback = {};
tink.core._Callback.Callback_Impl_ = {};
$hxClasses["tink.core._Callback.Callback_Impl_"] = tink.core._Callback.Callback_Impl_;
tink.core._Callback.Callback_Impl_.__name__ = ["tink","core","_Callback","Callback_Impl_"];
tink.core._Callback.Callback_Impl_._new = function(f) {
	return f;
};
tink.core._Callback.Callback_Impl_.invoke = function(this1,data) {
	this1(data);
};
tink.core._Callback.Callback_Impl_.fromNiladic = function(f) {
	return function(r) {
		f();
	};
};
tink.core._Callback.Callback_Impl_.fromMany = function(callbacks) {
	return function(v) {
		var _g = 0;
		while(_g < callbacks.length) {
			var callback = callbacks[_g];
			++_g;
			callback(v);
		}
	};
};
tink.core._Callback.CallbackLink_Impl_ = {};
$hxClasses["tink.core._Callback.CallbackLink_Impl_"] = tink.core._Callback.CallbackLink_Impl_;
tink.core._Callback.CallbackLink_Impl_.__name__ = ["tink","core","_Callback","CallbackLink_Impl_"];
tink.core._Callback.CallbackLink_Impl_._new = function(link) {
	return link;
};
tink.core._Callback.CallbackLink_Impl_.dissolve = function(this1) {
	if(this1 != null) this1();
};
tink.core._Callback.CallbackLink_Impl_.toCallback = function(this1) {
	var f = this1;
	return function(r) {
		f();
	};
};
tink.core._Callback.CallbackLink_Impl_.fromFunction = function(f) {
	return f;
};
tink.core._Callback.CallbackLink_Impl_.fromMany = function(callbacks) {
	return function() {
		var _g = 0;
		while(_g < callbacks.length) {
			var cb = callbacks[_g];
			++_g;
			if(cb != null) cb();
		}
	};
};
tink.core._Callback.Cell = function() {
};
$hxClasses["tink.core._Callback.Cell"] = tink.core._Callback.Cell;
tink.core._Callback.Cell.__name__ = ["tink","core","_Callback","Cell"];
tink.core._Callback.Cell.get = function() {
	if(tink.core._Callback.Cell.pool.length > 0) return tink.core._Callback.Cell.pool.pop(); else return new tink.core._Callback.Cell();
};
tink.core._Callback.Cell.prototype = {
	free: function() {
		this.cb = null;
		tink.core._Callback.Cell.pool.push(this);
	}
	,__class__: tink.core._Callback.Cell
};
tink.core._Callback.CallbackList_Impl_ = {};
$hxClasses["tink.core._Callback.CallbackList_Impl_"] = tink.core._Callback.CallbackList_Impl_;
tink.core._Callback.CallbackList_Impl_.__name__ = ["tink","core","_Callback","CallbackList_Impl_"];
tink.core._Callback.CallbackList_Impl_._new = function() {
	return [];
};
tink.core._Callback.CallbackList_Impl_.get_length = function(this1) {
	return this1.length;
};
tink.core._Callback.CallbackList_Impl_.add = function(this1,cb) {
	var cell;
	if(tink.core._Callback.Cell.pool.length > 0) cell = tink.core._Callback.Cell.pool.pop(); else cell = new tink.core._Callback.Cell();
	cell.cb = cb;
	this1.push(cell);
	return function() {
		if(HxOverrides.remove(this1,cell)) {
			cell.cb = null;
			tink.core._Callback.Cell.pool.push(cell);
		}
		cell = null;
	};
};
tink.core._Callback.CallbackList_Impl_.invoke = function(this1,data) {
	var _g = 0;
	var _g1 = this1.slice();
	while(_g < _g1.length) {
		var cell = _g1[_g];
		++_g;
		if(cell.cb != null) cell.cb(data);
	}
};
tink.core._Callback.CallbackList_Impl_.clear = function(this1) {
	var _g = 0;
	var _g1 = this1.splice(0,this1.length);
	while(_g < _g1.length) {
		var cell = _g1[_g];
		++_g;
		cell.cb = null;
		tink.core._Callback.Cell.pool.push(cell);
	}
};
tink.core.Either = $hxClasses["tink.core.Either"] = { __ename__ : ["tink","core","Either"], __constructs__ : ["Left","Right"] };
tink.core.Either.Left = function(a) { var $x = ["Left",0,a]; $x.__enum__ = tink.core.Either; $x.toString = $estr; return $x; };
tink.core.Either.Right = function(b) { var $x = ["Right",1,b]; $x.__enum__ = tink.core.Either; $x.toString = $estr; return $x; };
tink.core.TypedError = function(code,message,pos) {
	if(code == null) code = 500;
	this.code = code;
	this.message = message;
	this.pos = pos;
};
$hxClasses["tink.core.TypedError"] = tink.core.TypedError;
tink.core.TypedError.__name__ = ["tink","core","TypedError"];
tink.core.TypedError.withData = function(code,message,data,pos) {
	if(code == null) code = 500;
	var ret = new tink.core.TypedError(code,message,pos);
	ret.data = data;
	return ret;
};
tink.core.TypedError.prototype = {
	printPos: function() {
		return this.pos.className + "." + this.pos.methodName + ":" + this.pos.lineNumber;
	}
	,toString: function() {
		var ret = "Error: " + this.message;
		if(this.pos != null) ret += " " + this.printPos();
		return ret;
	}
	,throwSelf: function() {
		throw this;
	}
	,__class__: tink.core.TypedError
};
tink.core._Future = {};
tink.core._Future.Future_Impl_ = {};
$hxClasses["tink.core._Future.Future_Impl_"] = tink.core._Future.Future_Impl_;
tink.core._Future.Future_Impl_.__name__ = ["tink","core","_Future","Future_Impl_"];
tink.core._Future.Future_Impl_._new = function(f) {
	return f;
};
tink.core._Future.Future_Impl_.handle = function(this1,callback) {
	return this1(callback);
};
tink.core._Future.Future_Impl_.gather = function(this1) {
	var op = new tink.core.FutureTrigger();
	var self = this1;
	return tink.core._Future.Future_Impl_._new(function(cb) {
		if(self != null) {
			this1($bind(op,op.trigger));
			self = null;
		}
		return op.future(cb);
	});
};
tink.core._Future.Future_Impl_.first = function(this1,other) {
	return tink.core._Future.Future_Impl_.async(function(cb) {
		this1(cb);
		other(cb);
	});
};
tink.core._Future.Future_Impl_.map = function(this1,f,gather) {
	if(gather == null) gather = true;
	var ret = tink.core._Future.Future_Impl_._new(function(callback) {
		return this1(function(result) {
			var data = f(result);
			callback(data);
		});
	});
	if(gather) return tink.core._Future.Future_Impl_.gather(ret); else return ret;
};
tink.core._Future.Future_Impl_.flatMap = function(this1,next,gather) {
	if(gather == null) gather = true;
	var ret = tink.core._Future.Future_Impl_.flatten(tink.core._Future.Future_Impl_.map(this1,next,gather));
	if(gather) return tink.core._Future.Future_Impl_.gather(ret); else return ret;
};
tink.core._Future.Future_Impl_.merge = function(this1,other,merger,gather) {
	if(gather == null) gather = true;
	return tink.core._Future.Future_Impl_.flatMap(this1,function(t) {
		return tink.core._Future.Future_Impl_.map(other,function(a) {
			return merger(t,a);
		},false);
	},gather);
};
tink.core._Future.Future_Impl_.flatten = function(f) {
	return tink.core._Future.Future_Impl_._new(function(callback) {
		var ret = null;
		ret = f(function(next) {
			ret = next(function(result) {
				callback(result);
			});
		});
		return ret;
	});
};
tink.core._Future.Future_Impl_.fromTrigger = function(trigger) {
	return trigger.future;
};
tink.core._Future.Future_Impl_.ofMany = function(futures,gather) {
	if(gather == null) gather = true;
	var ret = tink.core._Future.Future_Impl_.sync([]);
	var _g = 0;
	while(_g < futures.length) {
		var f = [futures[_g]];
		++_g;
		ret = tink.core._Future.Future_Impl_.flatMap(ret,(function(f) {
			return function(results) {
				return tink.core._Future.Future_Impl_.map(f[0],(function() {
					return function(result) {
						return results.concat([result]);
					};
				})(),false);
			};
		})(f),false);
	}
	if(gather) return tink.core._Future.Future_Impl_.gather(ret); else return ret;
};
tink.core._Future.Future_Impl_.fromMany = function(futures) {
	return tink.core._Future.Future_Impl_.ofMany(futures);
};
tink.core._Future.Future_Impl_.lazy = function(l) {
	return tink.core._Future.Future_Impl_._new(function(cb) {
		var data = l();
		cb(data);
		return null;
	});
};
tink.core._Future.Future_Impl_.sync = function(v) {
	return tink.core._Future.Future_Impl_._new(function(callback) {
		callback(v);
		return null;
	});
};
tink.core._Future.Future_Impl_.async = function(f,lazy) {
	if(lazy == null) lazy = false;
	if(lazy) return tink.core._Future.Future_Impl_.flatten(tink.core._Future.Future_Impl_.lazy(tink.core._Lazy.Lazy_Impl_.ofFunc((function(f1,f2,a1) {
		return function() {
			return f1(f2,a1);
		};
	})(tink.core._Future.Future_Impl_.async,f,false)))); else {
		var op = new tink.core.FutureTrigger();
		f($bind(op,op.trigger));
		return op.future;
	}
};
tink.core._Future.Future_Impl_.or = function(a,b) {
	return tink.core._Future.Future_Impl_.first(a,b);
};
tink.core._Future.Future_Impl_.either = function(a,b) {
	return tink.core._Future.Future_Impl_.first(tink.core._Future.Future_Impl_.map(a,tink.core.Either.Left,false),tink.core._Future.Future_Impl_.map(b,tink.core.Either.Right,false));
};
tink.core._Future.Future_Impl_.and = function(a,b) {
	return tink.core._Future.Future_Impl_.merge(a,b,function(a1,b1) {
		return { a : a1, b : b1};
	});
};
tink.core._Future.Future_Impl_._tryFailingFlatMap = function(f,map) {
	return tink.core._Future.Future_Impl_.flatMap(f,function(o) {
		switch(o[1]) {
		case 0:
			var d = o[2];
			return map(d);
		case 1:
			var f1 = o[2];
			return tink.core._Future.Future_Impl_.sync(tink.core.Outcome.Failure(f1));
		}
	});
};
tink.core._Future.Future_Impl_._tryFlatMap = function(f,map) {
	return tink.core._Future.Future_Impl_.flatMap(f,function(o) {
		switch(o[1]) {
		case 0:
			var d = o[2];
			return tink.core._Future.Future_Impl_.map(map(d),tink.core.Outcome.Success);
		case 1:
			var f1 = o[2];
			return tink.core._Future.Future_Impl_.sync(tink.core.Outcome.Failure(f1));
		}
	});
};
tink.core._Future.Future_Impl_._tryFailingMap = function(f,map) {
	return tink.core._Future.Future_Impl_.map(f,function(o) {
		return tink.core.OutcomeTools.flatMap(o,tink.core._Outcome.OutcomeMapper_Impl_.withSameError(map));
	});
};
tink.core._Future.Future_Impl_._tryMap = function(f,map) {
	return tink.core._Future.Future_Impl_.map(f,function(o) {
		return tink.core.OutcomeTools.map(o,map);
	});
};
tink.core._Future.Future_Impl_._flatMap = function(f,map) {
	return tink.core._Future.Future_Impl_.flatMap(f,map);
};
tink.core._Future.Future_Impl_._map = function(f,map) {
	return tink.core._Future.Future_Impl_.map(f,map);
};
tink.core._Future.Future_Impl_.trigger = function() {
	return new tink.core.FutureTrigger();
};
tink.core.FutureTrigger = function() {
	var _g = this;
	this.list = [];
	this.future = tink.core._Future.Future_Impl_._new(function(callback) {
		if(_g.list == null) {
			callback(_g.result);
			return null;
		} else return tink.core._Callback.CallbackList_Impl_.add(_g.list,callback);
	});
};
$hxClasses["tink.core.FutureTrigger"] = tink.core.FutureTrigger;
tink.core.FutureTrigger.__name__ = ["tink","core","FutureTrigger"];
tink.core.FutureTrigger.prototype = {
	asFuture: function() {
		return this.future;
	}
	,trigger: function(result) {
		if(this.list == null) return false; else {
			var list = this.list;
			this.list = null;
			this.result = result;
			tink.core._Callback.CallbackList_Impl_.invoke(list,result);
			tink.core._Callback.CallbackList_Impl_.clear(list);
			return true;
		}
	}
	,__class__: tink.core.FutureTrigger
};
tink.core._Lazy = {};
tink.core._Lazy.Lazy_Impl_ = {};
$hxClasses["tink.core._Lazy.Lazy_Impl_"] = tink.core._Lazy.Lazy_Impl_;
tink.core._Lazy.Lazy_Impl_.__name__ = ["tink","core","_Lazy","Lazy_Impl_"];
tink.core._Lazy.Lazy_Impl_._new = function(r) {
	return r;
};
tink.core._Lazy.Lazy_Impl_.get = function(this1) {
	return this1();
};
tink.core._Lazy.Lazy_Impl_.ofFunc = function(f) {
	var result = null;
	var busy = false;
	return function() {
		if(busy) throw new tink.core.TypedError(null,"circular lazyness",{ fileName : "Lazy.hx", lineNumber : 14, className : "tink.core._Lazy.Lazy_Impl_", methodName : "ofFunc"});
		if(f != null) {
			busy = true;
			result = f();
			f = null;
			busy = false;
		}
		return result;
	};
};
tink.core._Lazy.Lazy_Impl_.map = function(this1,f) {
	return tink.core._Lazy.Lazy_Impl_.ofFunc(function() {
		return f(this1());
	});
};
tink.core._Lazy.Lazy_Impl_.flatMap = function(this1,f) {
	return tink.core._Lazy.Lazy_Impl_.ofFunc(function() {
		var this2 = f(this1());
		return this2();
	});
};
tink.core._Lazy.Lazy_Impl_.ofConst = function(c) {
	return function() {
		return c;
	};
};
tink.core.Noise = $hxClasses["tink.core.Noise"] = { __ename__ : ["tink","core","Noise"], __constructs__ : ["Noise"] };
tink.core.Noise.Noise = ["Noise",0];
tink.core.Noise.Noise.toString = $estr;
tink.core.Noise.Noise.__enum__ = tink.core.Noise;
tink.core.Outcome = $hxClasses["tink.core.Outcome"] = { __ename__ : ["tink","core","Outcome"], __constructs__ : ["Success","Failure"] };
tink.core.Outcome.Success = function(data) { var $x = ["Success",0,data]; $x.__enum__ = tink.core.Outcome; $x.toString = $estr; return $x; };
tink.core.Outcome.Failure = function(failure) { var $x = ["Failure",1,failure]; $x.__enum__ = tink.core.Outcome; $x.toString = $estr; return $x; };
tink.core.OutcomeTools = function() { };
$hxClasses["tink.core.OutcomeTools"] = tink.core.OutcomeTools;
tink.core.OutcomeTools.__name__ = ["tink","core","OutcomeTools"];
tink.core.OutcomeTools.sure = function(outcome) {
	switch(outcome[1]) {
	case 0:
		var data = outcome[2];
		return data;
	case 1:
		var failure = outcome[2];
		if(js.Boot.__instanceof(failure,tink.core.TypedError)) return failure.throwSelf(); else throw failure;
		break;
	}
};
tink.core.OutcomeTools.toOption = function(outcome) {
	switch(outcome[1]) {
	case 0:
		var data = outcome[2];
		return haxe.ds.Option.Some(data);
	case 1:
		return haxe.ds.Option.None;
	}
};
tink.core.OutcomeTools.toOutcome = function(option,pos) {
	switch(option[1]) {
	case 0:
		var value = option[2];
		return tink.core.Outcome.Success(value);
	case 1:
		return tink.core.Outcome.Failure(new tink.core.TypedError(404,"Some value expected but none found in " + pos.fileName + "@line " + pos.lineNumber,{ fileName : "Outcome.hx", lineNumber : 37, className : "tink.core.OutcomeTools", methodName : "toOutcome"}));
	}
};
tink.core.OutcomeTools.orUse = function(outcome,fallback) {
	switch(outcome[1]) {
	case 0:
		var data = outcome[2];
		return data;
	case 1:
		return fallback();
	}
};
tink.core.OutcomeTools.orTry = function(outcome,fallback) {
	switch(outcome[1]) {
	case 0:
		return outcome;
	case 1:
		return fallback();
	}
};
tink.core.OutcomeTools.equals = function(outcome,to) {
	switch(outcome[1]) {
	case 0:
		var data = outcome[2];
		return data == to;
	case 1:
		return false;
	}
};
tink.core.OutcomeTools.map = function(outcome,transform) {
	switch(outcome[1]) {
	case 0:
		var a = outcome[2];
		return tink.core.Outcome.Success(transform(a));
	case 1:
		var f = outcome[2];
		return tink.core.Outcome.Failure(f);
	}
};
tink.core.OutcomeTools.isSuccess = function(outcome) {
	switch(outcome[1]) {
	case 0:
		return true;
	default:
		return false;
	}
};
tink.core.OutcomeTools.flatMap = function(o,mapper) {
	return tink.core._Outcome.OutcomeMapper_Impl_.apply(mapper,o);
};
tink.core._Outcome = {};
tink.core._Outcome.OutcomeMapper_Impl_ = {};
$hxClasses["tink.core._Outcome.OutcomeMapper_Impl_"] = tink.core._Outcome.OutcomeMapper_Impl_;
tink.core._Outcome.OutcomeMapper_Impl_.__name__ = ["tink","core","_Outcome","OutcomeMapper_Impl_"];
tink.core._Outcome.OutcomeMapper_Impl_._new = function(f) {
	return { f : f};
};
tink.core._Outcome.OutcomeMapper_Impl_.apply = function(this1,o) {
	return this1.f(o);
};
tink.core._Outcome.OutcomeMapper_Impl_.withSameError = function(f) {
	return tink.core._Outcome.OutcomeMapper_Impl_._new(function(o) {
		switch(o[1]) {
		case 0:
			var d = o[2];
			return f(d);
		case 1:
			var f1 = o[2];
			return tink.core.Outcome.Failure(f1);
		}
	});
};
tink.core._Outcome.OutcomeMapper_Impl_.withEitherError = function(f) {
	return tink.core._Outcome.OutcomeMapper_Impl_._new(function(o) {
		switch(o[1]) {
		case 0:
			var d = o[2];
			{
				var _g = f(d);
				switch(_g[1]) {
				case 0:
					var d1 = _g[2];
					return tink.core.Outcome.Success(d1);
				case 1:
					var f1 = _g[2];
					return tink.core.Outcome.Failure(tink.core.Either.Right(f1));
				}
			}
			break;
		case 1:
			var f2 = o[2];
			return tink.core.Outcome.Failure(tink.core.Either.Left(f2));
		}
	});
};
tink.core._Pair = {};
tink.core._Pair.Pair_Impl_ = {};
$hxClasses["tink.core._Pair.Pair_Impl_"] = tink.core._Pair.Pair_Impl_;
tink.core._Pair.Pair_Impl_.__name__ = ["tink","core","_Pair","Pair_Impl_"];
tink.core._Pair.Pair_Impl_._new = function(a,b) {
	return { a : a, b : b};
};
tink.core._Pair.Pair_Impl_.get_a = function(this1) {
	return this1.a;
};
tink.core._Pair.Pair_Impl_.get_b = function(this1) {
	return this1.b;
};
tink.core._Pair.Pair_Impl_.toBool = function(this1) {
	return this1 != null;
};
tink.core._Pair.Pair_Impl_.isNil = function(this1) {
	return this1 == null;
};
tink.core._Pair.Pair_Impl_.nil = function() {
	return null;
};
tink.core._Pair.MPair_Impl_ = {};
$hxClasses["tink.core._Pair.MPair_Impl_"] = tink.core._Pair.MPair_Impl_;
tink.core._Pair.MPair_Impl_.__name__ = ["tink","core","_Pair","MPair_Impl_"];
tink.core._Pair.MPair_Impl_._new = function(a,b) {
	return { a : a, b : b};
};
tink.core._Pair.MPair_Impl_.get_a = function(this1) {
	return this1.a;
};
tink.core._Pair.MPair_Impl_.get_b = function(this1) {
	return this1.b;
};
tink.core._Pair.MPair_Impl_.set_a = function(this1,v) {
	return this1.a = v;
};
tink.core._Pair.MPair_Impl_.set_b = function(this1,v) {
	return this1.b = v;
};
tink.core._Signal = {};
tink.core._Signal.Signal_Impl_ = {};
$hxClasses["tink.core._Signal.Signal_Impl_"] = tink.core._Signal.Signal_Impl_;
tink.core._Signal.Signal_Impl_.__name__ = ["tink","core","_Signal","Signal_Impl_"];
tink.core._Signal.Signal_Impl_._new = function(f) {
	return f;
};
tink.core._Signal.Signal_Impl_.handle = function(this1,handler) {
	return this1(handler);
};
tink.core._Signal.Signal_Impl_.map = function(this1,f,gather) {
	if(gather == null) gather = true;
	var ret = function(cb) {
		return this1(function(result) {
			var data = f(result);
			cb(data);
		});
	};
	if(gather) return tink.core._Signal.Signal_Impl_.gather(ret); else return ret;
};
tink.core._Signal.Signal_Impl_.flatMap = function(this1,f,gather) {
	if(gather == null) gather = true;
	var ret = function(cb) {
		return this1(function(result) {
			var this2 = f(result);
			this2(cb);
		});
	};
	if(gather) return tink.core._Signal.Signal_Impl_.gather(ret); else return ret;
};
tink.core._Signal.Signal_Impl_.filter = function(this1,f,gather) {
	if(gather == null) gather = true;
	var ret = function(cb) {
		return this1(function(result) {
			if(f(result)) cb(result);
		});
	};
	if(gather) return tink.core._Signal.Signal_Impl_.gather(ret); else return ret;
};
tink.core._Signal.Signal_Impl_.join = function(this1,other,gather) {
	if(gather == null) gather = true;
	var ret = function(cb) {
		return tink.core._Callback.CallbackLink_Impl_.fromMany([this1(cb),other(cb)]);
	};
	if(gather) return tink.core._Signal.Signal_Impl_.gather(ret); else return ret;
};
tink.core._Signal.Signal_Impl_.next = function(this1) {
	var ret = new tink.core.FutureTrigger();
	var handler = tink.core._Callback.CallbackLink_Impl_.toCallback(this1($bind(ret,ret.trigger)));
	this1(handler);
	return ret.future;
};
tink.core._Signal.Signal_Impl_.noise = function(this1) {
	return tink.core._Signal.Signal_Impl_.map(this1,function(_) {
		return tink.core.Noise.Noise;
	});
};
tink.core._Signal.Signal_Impl_.gather = function(this1) {
	var ret = tink.core._Signal.Signal_Impl_.trigger();
	this1(function(x) {
		tink.core._Callback.CallbackList_Impl_.invoke(ret,x);
	});
	return tink.core._Signal.SignalTrigger_Impl_.asSignal(ret);
};
tink.core._Signal.Signal_Impl_.trigger = function() {
	return [];
};
tink.core._Signal.Signal_Impl_.ofClassical = function(add,remove,gather) {
	if(gather == null) gather = true;
	var ret = function(cb) {
		var f = function(a) {
			cb(a);
		};
		add(f);
		var f2 = (function(f1,a1) {
			return function() {
				f1(a1);
			};
		})(remove,f);
		return f2;
	};
	if(gather) return tink.core._Signal.Signal_Impl_.gather(ret); else return ret;
};
tink.core._Signal.SignalTrigger_Impl_ = {};
$hxClasses["tink.core._Signal.SignalTrigger_Impl_"] = tink.core._Signal.SignalTrigger_Impl_;
tink.core._Signal.SignalTrigger_Impl_.__name__ = ["tink","core","_Signal","SignalTrigger_Impl_"];
tink.core._Signal.SignalTrigger_Impl_._new = function() {
	return [];
};
tink.core._Signal.SignalTrigger_Impl_.trigger = function(this1,event) {
	tink.core._Callback.CallbackList_Impl_.invoke(this1,event);
};
tink.core._Signal.SignalTrigger_Impl_.getLength = function(this1) {
	return this1.length;
};
tink.core._Signal.SignalTrigger_Impl_.asSignal = function(this1) {
	var f = (function(_e) {
		return function(cb) {
			return tink.core._Callback.CallbackList_Impl_.add(_e,cb);
		};
	})(this1);
	return f;
};
wax.asset = {};
wax.asset.load = {};
wax.asset.load.Asset = function() { };
$hxClasses["wax.asset.load.Asset"] = wax.asset.load.Asset;
wax.asset.load.Asset.__name__ = ["wax","asset","load","Asset"];
wax.asset.load.Asset.prototype = {
	__class__: wax.asset.load.Asset
};
wax.asset.Image = function(id,$native) {
	this._pixeldata = null;
	this._data = null;
	this.id = id;
	this["native"] = $native;
};
$hxClasses["wax.asset.Image"] = wax.asset.Image;
wax.asset.Image.__name__ = ["wax","asset","Image"];
wax.asset.Image.__interfaces__ = [wax.asset.load.Asset];
wax.asset.Image.prototype = {
	getData: function() {
		if(this._data == null) {
			var _this = window.document;
			this._canvas = _this.createElement("canvas");
			this._canvas.width = this["native"].width;
			this._canvas.height = this["native"].height;
			this._canvasCtx = this._canvas.getContext("2d");
			this._canvasCtx.drawImage(this["native"],0,0,this["native"].width,this["native"].height);
			var nativeImageData = this._canvasCtx.getImageData(0,0,this["native"].width,this["native"].height);
			this._data = new wax.asset.ImageData(nativeImageData);
		}
		return this._data;
	}
	,getOffset: function(x,y) {
		return y * (this["native"].width * 4) + x * 4;
	}
	,getRedAt: function(x,y) {
		return this.getData()["native"].data[this.getOffset(x,y)];
	}
	,getGreenAt: function(x,y) {
		return this.getData()["native"].data[this.getOffset(x,y) + 1];
	}
	,getBlueAt: function(x,y) {
		return this.getData()["native"].data[this.getOffset(x,y) + 2];
	}
	,getAlphaAt: function(x,y) {
		return this.getData()["native"].data[this.getOffset(x,y) + 3];
	}
	,getPixel: function(x,y) {
		var pixeldata = [];
		var data = this.getData()["native"].data;
		var offset = this.getOffset(x,y);
		pixeldata[0] = data[offset];
		pixeldata[1] = data[offset + 1];
		pixeldata[2] = data[offset + 2];
		pixeldata[3] = data[offset + 3];
		return pixeldata;
	}
	,__class__: wax.asset.Image
};
wax.asset.ImageData = function($native) {
	this["native"] = $native;
};
$hxClasses["wax.asset.ImageData"] = wax.asset.ImageData;
wax.asset.ImageData.__name__ = ["wax","asset","ImageData"];
wax.asset.ImageData.prototype = {
	__class__: wax.asset.ImageData
};
wax.asset.load.AssetLoader = function() { };
$hxClasses["wax.asset.load.AssetLoader"] = wax.asset.load.AssetLoader;
wax.asset.load.AssetLoader.__name__ = ["wax","asset","load","AssetLoader"];
wax.asset.load.AssetLoader.prototype = {
	__class__: wax.asset.load.AssetLoader
};
wax.report = {};
wax.report.Report = function() { };
$hxClasses["wax.report.Report"] = wax.report.Report;
wax.report.Report.__name__ = ["wax","report","Report"];
wax.system.Channels = function() { };
$hxClasses["wax.system.Channels"] = wax.system.Channels;
wax.system.Channels.__name__ = ["wax","system","Channels"];
wax.system.ComponentOwner = function() {
	this._components = new com.fermmtools.utils.ObjectHash();
};
$hxClasses["wax.system.ComponentOwner"] = wax.system.ComponentOwner;
wax.system.ComponentOwner.__name__ = ["wax","system","ComponentOwner"];
wax.system.ComponentOwner.prototype = {
	get: function(componentClass) {
		return this._components.get(componentClass);
	}
	,has: function(componentClasses) {
		var _g = 0;
		while(_g < componentClasses.length) {
			var componentClass = componentClasses[_g];
			++_g;
			if(this.get(componentClass) == null) return false;
		}
		return true;
	}
	,initialise: function(components) {
		components = components.slice();
		var componentWithMissingDependencies = null;
		var lengthAtThatpoint = 0;
		var componentsAdded = new com.fermmtools.utils.ObjectHash();
		var $it0 = this._components.iterator();
		while( $it0.hasNext() ) {
			var componentClass = $it0.next();
			componentsAdded.set(componentClass,true);
		}
		while(components.length > 0) {
			var component = components.shift();
			var dependenciesFound = true;
			if(component.requiredComponents != null) {
				var _g = 0;
				var _g1 = component.requiredComponents;
				while(_g < _g1.length) {
					var requiredComponent = _g1[_g];
					++_g;
					if(!componentsAdded.exists(requiredComponent)) {
						dependenciesFound = false;
						components.push(component);
						if(componentWithMissingDependencies == component && lengthAtThatpoint == components.length) {
							haxe.Log.trace("warn",{ fileName : "ComponentOwner.hx", lineNumber : 55, className : "wax.system.ComponentOwner", methodName : "initialise", customParams : [wax.system.Channels.SYSTEM,"Could not resolved dependencies for ",[components],null]});
							return components;
						}
						if(componentWithMissingDependencies == null) {
							componentWithMissingDependencies = component;
							lengthAtThatpoint = components.length;
						}
						break;
					}
				}
			}
			if(dependenciesFound) {
				componentWithMissingDependencies = null;
				var accessClass = this.add(component);
				component.initialise();
				componentsAdded.set(accessClass,true);
			}
		}
		return components;
	}
	,add: function(component) {
		var componentAccessClass = component.attach(this);
		if(componentAccessClass != null) this._components.set(componentAccessClass,component);
		return componentAccessClass;
	}
	,__class__: wax.system.ComponentOwner
};
wax.system.Entity = function() {
	wax.system.ComponentOwner.call(this);
};
$hxClasses["wax.system.Entity"] = wax.system.Entity;
wax.system.Entity.__name__ = ["wax","system","Entity"];
wax.system.Entity.__super__ = wax.system.ComponentOwner;
wax.system.Entity.prototype = $extend(wax.system.ComponentOwner.prototype,{
	setup: function(entityComponents,type) {
		if(type == null) type = new wax.system.EntityType();
		this.type = type;
		var components = [];
		var _g = 0;
		while(_g < entityComponents.length) {
			var component = entityComponents[_g];
			++_g;
			var success = component.attachEntity(this);
			if(success) components.push(component); else component.detachEntity();
		}
		this.initialise(components);
	}
	,__class__: wax.system.Entity
});
wax.system.EntityType = function(id) {
	if(id == null) id = "default";
	wax.system.ComponentOwner.call(this);
	this.id = id;
};
$hxClasses["wax.system.EntityType"] = wax.system.EntityType;
wax.system.EntityType.__name__ = ["wax","system","EntityType"];
wax.system.EntityType.__super__ = wax.system.ComponentOwner;
wax.system.EntityType.prototype = $extend(wax.system.ComponentOwner.prototype,{
	setup: function(typeComponents) {
		var components = [];
		var _g = 0;
		while(_g < typeComponents.length) {
			var component = typeComponents[_g];
			++_g;
			components.push(component);
		}
		this.initialise(components);
	}
	,createEntity: function(entityComponents) {
		entityComponents = entityComponents.slice();
		var $it0 = this._components.iterator();
		while( $it0.hasNext() ) {
			var componentKey = $it0.next();
			var component = this._components.get(componentKey);
			component.populateEntity(entityComponents);
		}
		var entity = new wax.system.Entity();
		entity.setup(entityComponents,this);
		return entity;
	}
	,__class__: wax.system.EntityType
});
wax.system.InGate = function() { };
$hxClasses["wax.system.InGate"] = wax.system.InGate;
wax.system.InGate.__name__ = ["wax","system","InGate"];
wax.system.InGate.prototype = {
	__class__: wax.system.InGate
};
wax.system.Model = function() {
	wax.system.ComponentOwner.call(this);
	this.entities = [];
	this.entitiesSet = new haxe.ds.ObjectMap();
	this.onEntityAdded = new msignal.Signal1();
	this.onEntityRemoved = new msignal.Signal1();
	this._updatableComponents = [];
	this._inGateComponents = [];
	this._outGateComponents = [];
};
$hxClasses["wax.system.Model"] = wax.system.Model;
wax.system.Model.__name__ = ["wax","system","Model"];
wax.system.Model.__super__ = wax.system.ComponentOwner;
wax.system.Model.prototype = $extend(wax.system.ComponentOwner.prototype,{
	setup: function(modelComponents) {
		var components = [];
		var _g = 0;
		while(_g < modelComponents.length) {
			var modelComponent = modelComponents[_g];
			++_g;
			if(js.Boot.__instanceof(modelComponent,wax.system.Updatable)) this._updatableComponents.push(modelComponent);
			if(js.Boot.__instanceof(modelComponent,wax.system.InGate)) this._inGateComponents.push(modelComponent);
			if(js.Boot.__instanceof(modelComponent,wax.system.OutGate)) this._outGateComponents.push(modelComponent);
			components.push(modelComponent);
			modelComponent.set_model(this);
		}
		var failedComponents = this.initialise(components);
		var _g1 = 0;
		while(_g1 < failedComponents.length) {
			var failedComponent = failedComponents[_g1];
			++_g1;
			haxe.Log.trace("warn",{ fileName : "Model.hx", lineNumber : 57, className : "wax.system.Model", methodName : "setup", customParams : [wax.system.Channels.SYSTEM,"systemComponent failed to find its dependencies, it is disabled ",failedComponent,null]});
			if(js.Boot.__instanceof(failedComponent,wax.system.Updatable)) HxOverrides.remove(this._updatableComponents,failedComponent);
			if(js.Boot.__instanceof(failedComponent,wax.system.InGate)) HxOverrides.remove(this._inGateComponents,failedComponent);
			if(js.Boot.__instanceof(failedComponent,wax.system.OutGate)) HxOverrides.remove(this._outGateComponents,failedComponent);
			(js.Boot.__cast(failedComponent , wax.system.ModelComponent)).set_model(null);
		}
	}
	,update: function(dt,now) {
		var _g = 0;
		var _g1 = this._updatableComponents;
		while(_g < _g1.length) {
			var component = _g1[_g];
			++_g;
			component.update(dt,now);
		}
	}
	,canAdd: function(entity) {
		var _g = 0;
		var _g1 = this._inGateComponents;
		while(_g < _g1.length) {
			var gate = _g1[_g];
			++_g;
			if(!gate.canAdd(entity)) return false;
		}
		return true;
	}
	,canRemove: function(entity) {
		var _g = 0;
		var _g1 = this._outGateComponents;
		while(_g < _g1.length) {
			var gate = _g1[_g];
			++_g;
			if(!gate.canRemove(entity)) return false;
		}
		return true;
	}
	,addEntity: function(entity,checkGate) {
		if(checkGate == null) checkGate = true;
		if(!checkGate || this.canAdd(entity)) {
			if(this.entitiesSet.h.__keys__[entity.__id__] != null) return false;
			this.entities.push(entity);
			this.entitiesSet.set(entity,true);
			this.onEntityAdded.dispatch(entity);
			return true;
		}
		return false;
	}
	,removeEntity: function(entity,checkGate) {
		if(checkGate == null) checkGate = true;
		if(!checkGate || this.canRemove(entity)) {
			var removed = HxOverrides.remove(this.entities,entity);
			if(removed) {
				this.entitiesSet.remove(entity);
				this.onEntityRemoved.dispatch(entity);
				return true;
			}
		}
		return false;
	}
	,__class__: wax.system.Model
});
wax.system.OutGate = function() { };
$hxClasses["wax.system.OutGate"] = wax.system.OutGate;
wax.system.OutGate.__name__ = ["wax","system","OutGate"];
wax.system.OutGate.prototype = {
	__class__: wax.system.OutGate
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
$hxClasses.Math = Math;
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
$hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
if(Array.prototype.filter == null) Array.prototype.filter = function(f1) {
	var a1 = [];
	var _g11 = 0;
	var _g2 = this.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		var e = this[i1];
		if(f1(e)) a1.push(e);
	}
	return a1;
};
var ArrayBuffer = typeof(window) != "undefined" && window.ArrayBuffer || js.html.compat.ArrayBuffer;
if(ArrayBuffer.prototype.slice == null) ArrayBuffer.prototype.slice = js.html.compat.ArrayBuffer.sliceImpl;
var Uint8Array = typeof(window) != "undefined" && window.Uint8Array || js.html.compat.Uint8Array._new;
msignal.SlotList.NIL = new msignal.SlotList(null,null);
var global = window;
(function (global, undefined) {
    "use strict";

    var tasks = (function () {
        function Task(handler, args) {
            this.handler = handler;
            this.args = args;
        }
        Task.prototype.run = function () {
            // See steps in section 5 of the spec.
            if (typeof this.handler === "function") {
                // Choice of `thisArg` is not in the setImmediate spec; `undefined` is in the setTimeout spec though:
                // http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html
                this.handler.apply(undefined, this.args);
            } else {
                var scriptSource = "" + this.handler;
                /*jshint evil: true */
                eval(scriptSource);
            }
        };

        var nextHandle = 1; // Spec says greater than zero
        var tasksByHandle = {};
        var currentlyRunningATask = false;

        return {
            addFromSetImmediateArguments: function (args) {
                var handler = args[0];
                var argsToHandle = Array.prototype.slice.call(args, 1);
                var task = new Task(handler, argsToHandle);

                var thisHandle = nextHandle++;
                tasksByHandle[thisHandle] = task;
                return thisHandle;
            },
            runIfPresent: function (handle) {
                // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
                // So if we're currently running a task, we'll need to delay this invocation.
                if (!currentlyRunningATask) {
                    var task = tasksByHandle[handle];
                    if (task) {
                        currentlyRunningATask = true;
                        try {
                            task.run();
                        } finally {
                            delete tasksByHandle[handle];
                            currentlyRunningATask = false;
                        }
                    }
                } else {
                    // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
                    // "too much recursion" error.
                    global.setTimeout(function () {
                        tasks.runIfPresent(handle);
                    }, 0);
                }
            },
            remove: function (handle) {
                delete tasksByHandle[handle];
            }
        };
    }());

    function canUseNextTick() {
        // Don't get fooled by e.g. browserify environments.
        return typeof process === "object" &&
               Object.prototype.toString.call(process) === "[object process]";
    }

    function canUseMessageChannel() {
        return !!global.MessageChannel;
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.

        if (!global.postMessage || global.importScripts) {
            return false;
        }

        var postMessageIsAsynchronous = true;
        var oldOnMessage = global.onmessage;
        global.onmessage = function () {
            postMessageIsAsynchronous = false;
        };
        global.postMessage("", "*");
        global.onmessage = oldOnMessage;

        return postMessageIsAsynchronous;
    }

    function canUseReadyStateChange() {
        return "document" in global && "onreadystatechange" in global.document.createElement("script");
    }

    function installNextTickImplementation(attachTo) {
        attachTo.setImmediate = function () {
            var handle = tasks.addFromSetImmediateArguments(arguments);

            process.nextTick(function () {
                tasks.runIfPresent(handle);
            });

            return handle;
        };
    }

    function installMessageChannelImplementation(attachTo) {
        var channel = new global.MessageChannel();
        channel.port1.onmessage = function (event) {
            var handle = event.data;
            tasks.runIfPresent(handle);
        };
        attachTo.setImmediate = function () {
            var handle = tasks.addFromSetImmediateArguments(arguments);

            channel.port2.postMessage(handle);

            return handle;
        };
    }

    function installPostMessageImplementation(attachTo) {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var MESSAGE_PREFIX = "com.bn.NobleJS.setImmediate" + Math.random();

        function isStringAndStartsWith(string, putativeStart) {
            return typeof string === "string" && string.substring(0, putativeStart.length) === putativeStart;
        }

        function onGlobalMessage(event) {
            // This will catch all incoming messages (even from other windows!), so we need to try reasonably hard to
            // avoid letting anyone else trick us into firing off. We test the origin is still this window, and that a
            // (randomly generated) unpredictable identifying prefix is present.
            if (event.source === global && isStringAndStartsWith(event.data, MESSAGE_PREFIX)) {
                var handle = event.data.substring(MESSAGE_PREFIX.length);
                tasks.runIfPresent(handle);
            }
        }
        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        attachTo.setImmediate = function () {
            var handle = tasks.addFromSetImmediateArguments(arguments);

            // Make `global` post a message to itself with the handle and identifying prefix, thus asynchronously
            // invoking our onGlobalMessage listener above.
            global.postMessage(MESSAGE_PREFIX + handle, "*");

            return handle;
        };
    }

    function installReadyStateChangeImplementation(attachTo) {
        attachTo.setImmediate = function () {
            var handle = tasks.addFromSetImmediateArguments(arguments);

            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var scriptEl = global.document.createElement("script");
            scriptEl.onreadystatechange = function () {
                tasks.runIfPresent(handle);

                scriptEl.onreadystatechange = null;
                scriptEl.parentNode.removeChild(scriptEl);
                scriptEl = null;
            };
            global.document.documentElement.appendChild(scriptEl);

            return handle;
        };
    }

    function installSetTimeoutImplementation(attachTo) {
        attachTo.setImmediate = function () {
            var handle = tasks.addFromSetImmediateArguments(arguments);

            global.setTimeout(function () {
                tasks.runIfPresent(handle);
            }, 0);

            return handle;
        };
    }

    if (!global.setImmediate) {
        // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
        var attachTo = typeof Object.getPrototypeOf === "function" && "setTimeout" in Object.getPrototypeOf(global) ?
                          Object.getPrototypeOf(global)
                        : global;

        if (canUseNextTick()) {
            // For Node.js before 0.9
            installNextTickImplementation(attachTo);
        } else if (canUsePostMessage()) {
            // For non-IE10 modern browsers
            installPostMessageImplementation(attachTo);
        } else if (canUseMessageChannel()) {
            // For web workers, where supported
            installMessageChannelImplementation(attachTo);
        } else if (canUseReadyStateChange()) {
            // For IE 6–8
            installReadyStateChangeImplementation(attachTo);
        } else {
            // For older browsers
            installSetTimeoutImplementation(attachTo);
        }

        attachTo.clearImmediate = tasks.remove;
    }
}(typeof global === "object" && global ? global : this));
;
com.fermmtools.utils.ObjectHash.SAFE_NUM = 2147483647;
com.fermmtools.utils.ObjectHash.clsId = 0;
egg.Assets.textLoader = new egg.TextLoader();
egg.Assets.imageLoader = new egg.ImageLoader();
haxe.Serializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.ds.ObjectMap.count = 0;
js.Boot.__toStr = {}.toString;
js.html.compat.Uint8Array.BYTES_PER_ELEMENT = 1;
jsbox.gl._GL.GL_Impl_.DEPTH_BUFFER_BIT = 256;
jsbox.gl._GL.GL_Impl_.STENCIL_BUFFER_BIT = 1024;
jsbox.gl._GL.GL_Impl_.COLOR_BUFFER_BIT = 16384;
jsbox.gl._GL.GL_Impl_.POINTS = 0;
jsbox.gl._GL.GL_Impl_.LINES = 1;
jsbox.gl._GL.GL_Impl_.LINE_LOOP = 2;
jsbox.gl._GL.GL_Impl_.LINE_STRIP = 3;
jsbox.gl._GL.GL_Impl_.TRIANGLES = 4;
jsbox.gl._GL.GL_Impl_.TRIANGLE_STRIP = 5;
jsbox.gl._GL.GL_Impl_.TRIANGLE_FAN = 6;
jsbox.gl._GL.GL_Impl_.ZERO = 0;
jsbox.gl._GL.GL_Impl_.ONE = 1;
jsbox.gl._GL.GL_Impl_.SRC_COLOR = 768;
jsbox.gl._GL.GL_Impl_.ONE_MINUS_SRC_COLOR = 769;
jsbox.gl._GL.GL_Impl_.SRC_ALPHA = 770;
jsbox.gl._GL.GL_Impl_.ONE_MINUS_SRC_ALPHA = 771;
jsbox.gl._GL.GL_Impl_.DST_ALPHA = 772;
jsbox.gl._GL.GL_Impl_.ONE_MINUS_DST_ALPHA = 773;
jsbox.gl._GL.GL_Impl_.DST_COLOR = 774;
jsbox.gl._GL.GL_Impl_.ONE_MINUS_DST_COLOR = 775;
jsbox.gl._GL.GL_Impl_.SRC_ALPHA_SATURATE = 776;
jsbox.gl._GL.GL_Impl_.FUNC_ADD = 32774;
jsbox.gl._GL.GL_Impl_.BLEND_EQUATION = 32777;
jsbox.gl._GL.GL_Impl_.BLEND_EQUATION_RGB = 32777;
jsbox.gl._GL.GL_Impl_.BLEND_EQUATION_ALPHA = 34877;
jsbox.gl._GL.GL_Impl_.FUNC_SUBTRACT = 32778;
jsbox.gl._GL.GL_Impl_.FUNC_REVERSE_SUBTRACT = 32779;
jsbox.gl._GL.GL_Impl_.BLEND_DST_RGB = 32968;
jsbox.gl._GL.GL_Impl_.BLEND_SRC_RGB = 32969;
jsbox.gl._GL.GL_Impl_.BLEND_DST_ALPHA = 32970;
jsbox.gl._GL.GL_Impl_.BLEND_SRC_ALPHA = 32971;
jsbox.gl._GL.GL_Impl_.CONSTANT_COLOR = 32769;
jsbox.gl._GL.GL_Impl_.ONE_MINUS_CONSTANT_COLOR = 32770;
jsbox.gl._GL.GL_Impl_.CONSTANT_ALPHA = 32771;
jsbox.gl._GL.GL_Impl_.ONE_MINUS_CONSTANT_ALPHA = 32772;
jsbox.gl._GL.GL_Impl_.BLEND_COLOR = 32773;
jsbox.gl._GL.GL_Impl_.ARRAY_BUFFER = 34962;
jsbox.gl._GL.GL_Impl_.ELEMENT_ARRAY_BUFFER = 34963;
jsbox.gl._GL.GL_Impl_.ARRAY_BUFFER_BINDING = 34964;
jsbox.gl._GL.GL_Impl_.ELEMENT_ARRAY_BUFFER_BINDING = 34965;
jsbox.gl._GL.GL_Impl_.STREAM_DRAW = 35040;
jsbox.gl._GL.GL_Impl_.STATIC_DRAW = 35044;
jsbox.gl._GL.GL_Impl_.DYNAMIC_DRAW = 35048;
jsbox.gl._GL.GL_Impl_.BUFFER_SIZE = 34660;
jsbox.gl._GL.GL_Impl_.BUFFER_USAGE = 34661;
jsbox.gl._GL.GL_Impl_.CURRENT_VERTEX_ATTRIB = 34342;
jsbox.gl._GL.GL_Impl_.FRONT = 1028;
jsbox.gl._GL.GL_Impl_.BACK = 1029;
jsbox.gl._GL.GL_Impl_.FRONT_AND_BACK = 1032;
jsbox.gl._GL.GL_Impl_.CULL_FACE = 2884;
jsbox.gl._GL.GL_Impl_.BLEND = 3042;
jsbox.gl._GL.GL_Impl_.DITHER = 3024;
jsbox.gl._GL.GL_Impl_.STENCIL_TEST = 2960;
jsbox.gl._GL.GL_Impl_.DEPTH_TEST = 2929;
jsbox.gl._GL.GL_Impl_.SCISSOR_TEST = 3089;
jsbox.gl._GL.GL_Impl_.POLYGON_OFFSET_FILL = 32823;
jsbox.gl._GL.GL_Impl_.SAMPLE_ALPHA_TO_COVERAGE = 32926;
jsbox.gl._GL.GL_Impl_.SAMPLE_COVERAGE = 32928;
jsbox.gl._GL.GL_Impl_.NO_ERROR = 0;
jsbox.gl._GL.GL_Impl_.INVALID_ENUM = 1280;
jsbox.gl._GL.GL_Impl_.INVALID_VALUE = 1281;
jsbox.gl._GL.GL_Impl_.INVALID_OPERATION = 1282;
jsbox.gl._GL.GL_Impl_.OUT_OF_MEMORY = 1285;
jsbox.gl._GL.GL_Impl_.CW = 2304;
jsbox.gl._GL.GL_Impl_.CCW = 2305;
jsbox.gl._GL.GL_Impl_.LINE_WIDTH = 2849;
jsbox.gl._GL.GL_Impl_.ALIASED_POINT_SIZE_RANGE = 33901;
jsbox.gl._GL.GL_Impl_.ALIASED_LINE_WIDTH_RANGE = 33902;
jsbox.gl._GL.GL_Impl_.CULL_FACE_MODE = 2885;
jsbox.gl._GL.GL_Impl_.FRONT_FACE = 2886;
jsbox.gl._GL.GL_Impl_.DEPTH_RANGE = 2928;
jsbox.gl._GL.GL_Impl_.DEPTH_WRITEMASK = 2930;
jsbox.gl._GL.GL_Impl_.DEPTH_CLEAR_VALUE = 2931;
jsbox.gl._GL.GL_Impl_.DEPTH_FUNC = 2932;
jsbox.gl._GL.GL_Impl_.STENCIL_CLEAR_VALUE = 2961;
jsbox.gl._GL.GL_Impl_.STENCIL_FUNC = 2962;
jsbox.gl._GL.GL_Impl_.STENCIL_FAIL = 2964;
jsbox.gl._GL.GL_Impl_.STENCIL_PASS_DEPTH_FAIL = 2965;
jsbox.gl._GL.GL_Impl_.STENCIL_PASS_DEPTH_PASS = 2966;
jsbox.gl._GL.GL_Impl_.STENCIL_REF = 2967;
jsbox.gl._GL.GL_Impl_.STENCIL_VALUE_MASK = 2963;
jsbox.gl._GL.GL_Impl_.STENCIL_WRITEMASK = 2968;
jsbox.gl._GL.GL_Impl_.STENCIL_BACK_FUNC = 34816;
jsbox.gl._GL.GL_Impl_.STENCIL_BACK_FAIL = 34817;
jsbox.gl._GL.GL_Impl_.STENCIL_BACK_PASS_DEPTH_FAIL = 34818;
jsbox.gl._GL.GL_Impl_.STENCIL_BACK_PASS_DEPTH_PASS = 34819;
jsbox.gl._GL.GL_Impl_.STENCIL_BACK_REF = 36003;
jsbox.gl._GL.GL_Impl_.STENCIL_BACK_VALUE_MASK = 36004;
jsbox.gl._GL.GL_Impl_.STENCIL_BACK_WRITEMASK = 36005;
jsbox.gl._GL.GL_Impl_.VIEWPORT = 2978;
jsbox.gl._GL.GL_Impl_.SCISSOR_BOX = 3088;
jsbox.gl._GL.GL_Impl_.COLOR_CLEAR_VALUE = 3106;
jsbox.gl._GL.GL_Impl_.COLOR_WRITEMASK = 3107;
jsbox.gl._GL.GL_Impl_.UNPACK_ALIGNMENT = 3317;
jsbox.gl._GL.GL_Impl_.PACK_ALIGNMENT = 3333;
jsbox.gl._GL.GL_Impl_.MAX_TEXTURE_SIZE = 3379;
jsbox.gl._GL.GL_Impl_.MAX_VIEWPORT_DIMS = 3386;
jsbox.gl._GL.GL_Impl_.SUBPIXEL_BITS = 3408;
jsbox.gl._GL.GL_Impl_.RED_BITS = 3410;
jsbox.gl._GL.GL_Impl_.GREEN_BITS = 3411;
jsbox.gl._GL.GL_Impl_.BLUE_BITS = 3412;
jsbox.gl._GL.GL_Impl_.ALPHA_BITS = 3413;
jsbox.gl._GL.GL_Impl_.DEPTH_BITS = 3414;
jsbox.gl._GL.GL_Impl_.STENCIL_BITS = 3415;
jsbox.gl._GL.GL_Impl_.POLYGON_OFFSET_UNITS = 10752;
jsbox.gl._GL.GL_Impl_.POLYGON_OFFSET_FACTOR = 32824;
jsbox.gl._GL.GL_Impl_.TEXTURE_BINDING_2D = 32873;
jsbox.gl._GL.GL_Impl_.SAMPLE_BUFFERS = 32936;
jsbox.gl._GL.GL_Impl_.SAMPLES = 32937;
jsbox.gl._GL.GL_Impl_.SAMPLE_COVERAGE_VALUE = 32938;
jsbox.gl._GL.GL_Impl_.SAMPLE_COVERAGE_INVERT = 32939;
jsbox.gl._GL.GL_Impl_.COMPRESSED_TEXTURE_FORMATS = 34467;
jsbox.gl._GL.GL_Impl_.DONT_CARE = 4352;
jsbox.gl._GL.GL_Impl_.FASTEST = 4353;
jsbox.gl._GL.GL_Impl_.NICEST = 4354;
jsbox.gl._GL.GL_Impl_.GENERATE_MIPMAP_HINT = 33170;
jsbox.gl._GL.GL_Impl_.BYTE = 5120;
jsbox.gl._GL.GL_Impl_.UNSIGNED_BYTE = 5121;
jsbox.gl._GL.GL_Impl_.SHORT = 5122;
jsbox.gl._GL.GL_Impl_.UNSIGNED_SHORT = 5123;
jsbox.gl._GL.GL_Impl_.INT = 5124;
jsbox.gl._GL.GL_Impl_.UNSIGNED_INT = 5125;
jsbox.gl._GL.GL_Impl_.FLOAT = 5126;
jsbox.gl._GL.GL_Impl_.DEPTH_COMPONENT = 6402;
jsbox.gl._GL.GL_Impl_.ALPHA = 6406;
jsbox.gl._GL.GL_Impl_.RGB = 6407;
jsbox.gl._GL.GL_Impl_.RGBA = 6408;
jsbox.gl._GL.GL_Impl_.LUMINANCE = 6409;
jsbox.gl._GL.GL_Impl_.LUMINANCE_ALPHA = 6410;
jsbox.gl._GL.GL_Impl_.UNSIGNED_SHORT_4_4_4_4 = 32819;
jsbox.gl._GL.GL_Impl_.UNSIGNED_SHORT_5_5_5_1 = 32820;
jsbox.gl._GL.GL_Impl_.UNSIGNED_SHORT_5_6_5 = 33635;
jsbox.gl._GL.GL_Impl_.FRAGMENT_SHADER = 35632;
jsbox.gl._GL.GL_Impl_.VERTEX_SHADER = 35633;
jsbox.gl._GL.GL_Impl_.MAX_VERTEX_ATTRIBS = 34921;
jsbox.gl._GL.GL_Impl_.MAX_VERTEX_UNIFORM_VECTORS = 36347;
jsbox.gl._GL.GL_Impl_.MAX_VARYING_VECTORS = 36348;
jsbox.gl._GL.GL_Impl_.MAX_COMBINED_TEXTURE_IMAGE_UNITS = 35661;
jsbox.gl._GL.GL_Impl_.MAX_VERTEX_TEXTURE_IMAGE_UNITS = 35660;
jsbox.gl._GL.GL_Impl_.MAX_TEXTURE_IMAGE_UNITS = 34930;
jsbox.gl._GL.GL_Impl_.MAX_FRAGMENT_UNIFORM_VECTORS = 36349;
jsbox.gl._GL.GL_Impl_.SHADER_TYPE = 35663;
jsbox.gl._GL.GL_Impl_.DELETE_STATUS = 35712;
jsbox.gl._GL.GL_Impl_.LINK_STATUS = 35714;
jsbox.gl._GL.GL_Impl_.VALIDATE_STATUS = 35715;
jsbox.gl._GL.GL_Impl_.ATTACHED_SHADERS = 35717;
jsbox.gl._GL.GL_Impl_.ACTIVE_UNIFORMS = 35718;
jsbox.gl._GL.GL_Impl_.ACTIVE_ATTRIBUTES = 35721;
jsbox.gl._GL.GL_Impl_.SHADING_LANGUAGE_VERSION = 35724;
jsbox.gl._GL.GL_Impl_.CURRENT_PROGRAM = 35725;
jsbox.gl._GL.GL_Impl_.NEVER = 512;
jsbox.gl._GL.GL_Impl_.LESS = 513;
jsbox.gl._GL.GL_Impl_.EQUAL = 514;
jsbox.gl._GL.GL_Impl_.LEQUAL = 515;
jsbox.gl._GL.GL_Impl_.GREATER = 516;
jsbox.gl._GL.GL_Impl_.NOTEQUAL = 517;
jsbox.gl._GL.GL_Impl_.GEQUAL = 518;
jsbox.gl._GL.GL_Impl_.ALWAYS = 519;
jsbox.gl._GL.GL_Impl_.KEEP = 7680;
jsbox.gl._GL.GL_Impl_.REPLACE = 7681;
jsbox.gl._GL.GL_Impl_.INCR = 7682;
jsbox.gl._GL.GL_Impl_.DECR = 7683;
jsbox.gl._GL.GL_Impl_.INVERT = 5386;
jsbox.gl._GL.GL_Impl_.INCR_WRAP = 34055;
jsbox.gl._GL.GL_Impl_.DECR_WRAP = 34056;
jsbox.gl._GL.GL_Impl_.VENDOR = 7936;
jsbox.gl._GL.GL_Impl_.RENDERER = 7937;
jsbox.gl._GL.GL_Impl_.VERSION = 7938;
jsbox.gl._GL.GL_Impl_.NEAREST = 9728;
jsbox.gl._GL.GL_Impl_.LINEAR = 9729;
jsbox.gl._GL.GL_Impl_.NEAREST_MIPMAP_NEAREST = 9984;
jsbox.gl._GL.GL_Impl_.LINEAR_MIPMAP_NEAREST = 9985;
jsbox.gl._GL.GL_Impl_.NEAREST_MIPMAP_LINEAR = 9986;
jsbox.gl._GL.GL_Impl_.LINEAR_MIPMAP_LINEAR = 9987;
jsbox.gl._GL.GL_Impl_.TEXTURE_MAG_FILTER = 10240;
jsbox.gl._GL.GL_Impl_.TEXTURE_MIN_FILTER = 10241;
jsbox.gl._GL.GL_Impl_.TEXTURE_WRAP_S = 10242;
jsbox.gl._GL.GL_Impl_.TEXTURE_WRAP_T = 10243;
jsbox.gl._GL.GL_Impl_.TEXTURE_2D = 3553;
jsbox.gl._GL.GL_Impl_.TEXTURE = 5890;
jsbox.gl._GL.GL_Impl_.TEXTURE_CUBE_MAP = 34067;
jsbox.gl._GL.GL_Impl_.TEXTURE_BINDING_CUBE_MAP = 34068;
jsbox.gl._GL.GL_Impl_.TEXTURE_CUBE_MAP_POSITIVE_X = 34069;
jsbox.gl._GL.GL_Impl_.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070;
jsbox.gl._GL.GL_Impl_.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071;
jsbox.gl._GL.GL_Impl_.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072;
jsbox.gl._GL.GL_Impl_.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073;
jsbox.gl._GL.GL_Impl_.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074;
jsbox.gl._GL.GL_Impl_.MAX_CUBE_MAP_TEXTURE_SIZE = 34076;
jsbox.gl._GL.GL_Impl_.TEXTURE0 = 33984;
jsbox.gl._GL.GL_Impl_.TEXTURE1 = 33985;
jsbox.gl._GL.GL_Impl_.TEXTURE2 = 33986;
jsbox.gl._GL.GL_Impl_.TEXTURE3 = 33987;
jsbox.gl._GL.GL_Impl_.TEXTURE4 = 33988;
jsbox.gl._GL.GL_Impl_.TEXTURE5 = 33989;
jsbox.gl._GL.GL_Impl_.TEXTURE6 = 33990;
jsbox.gl._GL.GL_Impl_.TEXTURE7 = 33991;
jsbox.gl._GL.GL_Impl_.TEXTURE8 = 33992;
jsbox.gl._GL.GL_Impl_.TEXTURE9 = 33993;
jsbox.gl._GL.GL_Impl_.TEXTURE10 = 33994;
jsbox.gl._GL.GL_Impl_.TEXTURE11 = 33995;
jsbox.gl._GL.GL_Impl_.TEXTURE12 = 33996;
jsbox.gl._GL.GL_Impl_.TEXTURE13 = 33997;
jsbox.gl._GL.GL_Impl_.TEXTURE14 = 33998;
jsbox.gl._GL.GL_Impl_.TEXTURE15 = 33999;
jsbox.gl._GL.GL_Impl_.TEXTURE16 = 34000;
jsbox.gl._GL.GL_Impl_.TEXTURE17 = 34001;
jsbox.gl._GL.GL_Impl_.TEXTURE18 = 34002;
jsbox.gl._GL.GL_Impl_.TEXTURE19 = 34003;
jsbox.gl._GL.GL_Impl_.TEXTURE20 = 34004;
jsbox.gl._GL.GL_Impl_.TEXTURE21 = 34005;
jsbox.gl._GL.GL_Impl_.TEXTURE22 = 34006;
jsbox.gl._GL.GL_Impl_.TEXTURE23 = 34007;
jsbox.gl._GL.GL_Impl_.TEXTURE24 = 34008;
jsbox.gl._GL.GL_Impl_.TEXTURE25 = 34009;
jsbox.gl._GL.GL_Impl_.TEXTURE26 = 34010;
jsbox.gl._GL.GL_Impl_.TEXTURE27 = 34011;
jsbox.gl._GL.GL_Impl_.TEXTURE28 = 34012;
jsbox.gl._GL.GL_Impl_.TEXTURE29 = 34013;
jsbox.gl._GL.GL_Impl_.TEXTURE30 = 34014;
jsbox.gl._GL.GL_Impl_.TEXTURE31 = 34015;
jsbox.gl._GL.GL_Impl_.ACTIVE_TEXTURE = 34016;
jsbox.gl._GL.GL_Impl_.REPEAT = 10497;
jsbox.gl._GL.GL_Impl_.CLAMP_TO_EDGE = 33071;
jsbox.gl._GL.GL_Impl_.MIRRORED_REPEAT = 33648;
jsbox.gl._GL.GL_Impl_.FLOAT_VEC2 = 35664;
jsbox.gl._GL.GL_Impl_.FLOAT_VEC3 = 35665;
jsbox.gl._GL.GL_Impl_.FLOAT_VEC4 = 35666;
jsbox.gl._GL.GL_Impl_.INT_VEC2 = 35667;
jsbox.gl._GL.GL_Impl_.INT_VEC3 = 35668;
jsbox.gl._GL.GL_Impl_.INT_VEC4 = 35669;
jsbox.gl._GL.GL_Impl_.BOOL = 35670;
jsbox.gl._GL.GL_Impl_.BOOL_VEC2 = 35671;
jsbox.gl._GL.GL_Impl_.BOOL_VEC3 = 35672;
jsbox.gl._GL.GL_Impl_.BOOL_VEC4 = 35673;
jsbox.gl._GL.GL_Impl_.FLOAT_MAT2 = 35674;
jsbox.gl._GL.GL_Impl_.FLOAT_MAT3 = 35675;
jsbox.gl._GL.GL_Impl_.FLOAT_MAT4 = 35676;
jsbox.gl._GL.GL_Impl_.SAMPLER_2D = 35678;
jsbox.gl._GL.GL_Impl_.SAMPLER_CUBE = 35680;
jsbox.gl._GL.GL_Impl_.VERTEX_ATTRIB_ARRAY_ENABLED = 34338;
jsbox.gl._GL.GL_Impl_.VERTEX_ATTRIB_ARRAY_SIZE = 34339;
jsbox.gl._GL.GL_Impl_.VERTEX_ATTRIB_ARRAY_STRIDE = 34340;
jsbox.gl._GL.GL_Impl_.VERTEX_ATTRIB_ARRAY_TYPE = 34341;
jsbox.gl._GL.GL_Impl_.VERTEX_ATTRIB_ARRAY_NORMALIZED = 34922;
jsbox.gl._GL.GL_Impl_.VERTEX_ATTRIB_ARRAY_POINTER = 34373;
jsbox.gl._GL.GL_Impl_.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING = 34975;
jsbox.gl._GL.GL_Impl_.VERTEX_PROGRAM_POINT_SIZE = 34370;
jsbox.gl._GL.GL_Impl_.POINT_SPRITE = 34913;
jsbox.gl._GL.GL_Impl_.COMPILE_STATUS = 35713;
jsbox.gl._GL.GL_Impl_.LOW_FLOAT = 36336;
jsbox.gl._GL.GL_Impl_.MEDIUM_FLOAT = 36337;
jsbox.gl._GL.GL_Impl_.HIGH_FLOAT = 36338;
jsbox.gl._GL.GL_Impl_.LOW_INT = 36339;
jsbox.gl._GL.GL_Impl_.MEDIUM_INT = 36340;
jsbox.gl._GL.GL_Impl_.HIGH_INT = 36341;
jsbox.gl._GL.GL_Impl_.FRAMEBUFFER = 36160;
jsbox.gl._GL.GL_Impl_.RENDERBUFFER = 36161;
jsbox.gl._GL.GL_Impl_.RGBA4 = 32854;
jsbox.gl._GL.GL_Impl_.RGB5_A1 = 32855;
jsbox.gl._GL.GL_Impl_.RGB565 = 36194;
jsbox.gl._GL.GL_Impl_.DEPTH_COMPONENT16 = 33189;
jsbox.gl._GL.GL_Impl_.STENCIL_INDEX = 6401;
jsbox.gl._GL.GL_Impl_.STENCIL_INDEX8 = 36168;
jsbox.gl._GL.GL_Impl_.DEPTH_STENCIL = 34041;
jsbox.gl._GL.GL_Impl_.RENDERBUFFER_WIDTH = 36162;
jsbox.gl._GL.GL_Impl_.RENDERBUFFER_HEIGHT = 36163;
jsbox.gl._GL.GL_Impl_.RENDERBUFFER_INTERNAL_FORMAT = 36164;
jsbox.gl._GL.GL_Impl_.RENDERBUFFER_RED_SIZE = 36176;
jsbox.gl._GL.GL_Impl_.RENDERBUFFER_GREEN_SIZE = 36177;
jsbox.gl._GL.GL_Impl_.RENDERBUFFER_BLUE_SIZE = 36178;
jsbox.gl._GL.GL_Impl_.RENDERBUFFER_ALPHA_SIZE = 36179;
jsbox.gl._GL.GL_Impl_.RENDERBUFFER_DEPTH_SIZE = 36180;
jsbox.gl._GL.GL_Impl_.RENDERBUFFER_STENCIL_SIZE = 36181;
jsbox.gl._GL.GL_Impl_.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE = 36048;
jsbox.gl._GL.GL_Impl_.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME = 36049;
jsbox.gl._GL.GL_Impl_.FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL = 36050;
jsbox.gl._GL.GL_Impl_.FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE = 36051;
jsbox.gl._GL.GL_Impl_.COLOR_ATTACHMENT0 = 36064;
jsbox.gl._GL.GL_Impl_.DEPTH_ATTACHMENT = 36096;
jsbox.gl._GL.GL_Impl_.STENCIL_ATTACHMENT = 36128;
jsbox.gl._GL.GL_Impl_.DEPTH_STENCIL_ATTACHMENT = 33306;
jsbox.gl._GL.GL_Impl_.NONE = 0;
jsbox.gl._GL.GL_Impl_.FRAMEBUFFER_COMPLETE = 36053;
jsbox.gl._GL.GL_Impl_.FRAMEBUFFER_INCOMPLETE_ATTACHMENT = 36054;
jsbox.gl._GL.GL_Impl_.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = 36055;
jsbox.gl._GL.GL_Impl_.FRAMEBUFFER_INCOMPLETE_DIMENSIONS = 36057;
jsbox.gl._GL.GL_Impl_.FRAMEBUFFER_UNSUPPORTED = 36061;
jsbox.gl._GL.GL_Impl_.FRAMEBUFFER_BINDING = 36006;
jsbox.gl._GL.GL_Impl_.RENDERBUFFER_BINDING = 36007;
jsbox.gl._GL.GL_Impl_.MAX_RENDERBUFFER_SIZE = 34024;
jsbox.gl._GL.GL_Impl_.INVALID_FRAMEBUFFER_OPERATION = 1286;
jsbox.gl._GL.GL_Impl_.UNPACK_FLIP_Y_WEBGL = 37440;
jsbox.gl._GL.GL_Impl_.UNPACK_PREMULTIPLY_ALPHA_WEBGL = 37441;
jsbox.gl._GL.GL_Impl_.CONTEXT_LOST_WEBGL = 37442;
jsbox.gl._GL.GL_Impl_.UNPACK_COLORSPACE_CONVERSION_WEBGL = 37443;
jsbox.gl._GL.GL_Impl_.BROWSER_DEFAULT_WEBGL = 37444;
korrigan.NormalTexturedProgram.__meta__ = { obj : { shaders : [{ vertex : "korrigan/shaders/vshader.glsl", fragment : "korrigan/shaders/normal_fshader.glsl"}]}};
korrigan.SimpleTexturedProgram.__meta__ = { obj : { shaders : [{ vertex : "korrigan/shaders/vshader.glsl", fragment : "korrigan/shaders/simple_fshader.glsl"}]}};
korrigan.TransformationContext._scratchMatrix3D = (function($this) {
	var $r;
	var this1;
	var out = this1 = new Float32Array(16);
	out[0] = 1;
	out[1] = 0;
	out[2] = 0;
	out[3] = 0;
	out[4] = 0;
	out[5] = 1;
	out[6] = 0;
	out[7] = 0;
	out[8] = 0;
	out[9] = 0;
	out[10] = 1;
	out[11] = 0;
	out[12] = 0;
	out[13] = 0;
	out[14] = 0;
	out[15] = 1;
	$r = this1;
	return $r;
}(this));
ld31.Main.exitconditionfullfil = false;
ld31.Main.gameover = false;
ld31.controller.ControllerKey.__meta__ = { obj : { entities : [["PlayerComponent"]]}};
ld31.model.AISystem.__meta__ = { obj : { entities : [["AIComponent"]]}};
ld31.model.CameraSystem.__meta__ = { obj : { entities : [["PlayerComponent","PositionComponent"]]}};
ld31.model.CameraSystem.cameraX = 0;
ld31.model.CameraSystem.cameraY = 0;
ld31.model.DoorSystem.__meta__ = { obj : { entities : [["SwitchComponent"]]}};
ld31.model.DoorSystem.doormap = new haxe.ds.IntMap();
ld31.model.DoorSystem.buttonmap = new haxe.ds.IntMap();
ld31.model.GestionDynamicSystem.__meta__ = { obj : { entities : [["VelocityComponent","PositionComponent"]]}};
ld31.model.GestionForceSystem.__meta__ = { obj : { entities : [["PlayerComponent"]]}};
ld31.model.GestionLevelSystem.__meta__ = { obj : { entities : [["PlayerComponent"]]}};
ld31.model.GestionLevelSystem.showalertmovelevel = false;
ld31.model.GestionLevelSystem.showalertpositionGx = 0;
ld31.model.GestionLevelSystem.showalertpositionGy = 0;
ld31.model.GestionLevelSystem.showalertleveltargeted = 0;
ld31.model.GestionLevelSystem.alerttempo = 0;
ld31.model.GestionLevelSystem.hll1 = 1;
ld31.model.GestionLevelSystem.hll2 = 0;
ld31.model.GestionLevelSystem.hll3 = 0;
ld31.model.GridSystem.__meta__ = { obj : { entities : [["PlayerComponent"]]}};
ld31.model.PlayerSystem.__meta__ = { obj : { entities : [["PlayerComponent"]]}};
ld31.view.Presenter.PLAYER_SPRITE = "blipt";
ld31.view.Presenter.BUTTON1_SPRITE = "mauve";
ld31.view.Presenter.BUTTON2_SPRITE = "bleu";
ld31.view.Presenter.BUTTON3_SPRITE = "orange";
ld31.view.Presenter.BUTTONNO_SPRITE = "vide";
ld31.view.Presenter.FOE1_SPRITE = "clo1";
ld31.view.Presenter.FOE2_SPRITE = "clo2";
ld31.view.Presenter.STATICFOE1_SPRITE = "pieux";
ld31.view.Presenter.EXIT_SPRITE = "exit";
ld31.view.Presenter.BACK_SPRITE = "fond";
ld31.view.Presenter.WELLDONE_SPRITE = "welldone";
ld31.view.Presenter.GAMEOVER_SPRITE = "gameover";
ld31.view.Presenter.END_SPRITE = "end";
ld31.view.Presenter.ONE_SPRITE = "3";
ld31.view.Presenter.TWO_SPRITE = "1";
ld31.view.Presenter.THREE_SPRITE = "2";
ld31.view.Presenter.FOUR_SPRITE = "red";
ld31.view.Presenter.DOORONE_SPRITE = "4";
ld31.view.Presenter.DOORTWO_SPRITE = "5";
ld31.view.Presenter.DOORTHREE_SPRITE = "6";
ld31.view.Presenter.screenwidth = 0;
ld31.view.Presenter.screenheight = 0;
ld31.view.Presenter.mapwidth = 0;
ld31.view.Presenter.mapheight = 0;
promhx.base.AsyncBase.id_ctr = 0;
promhx.base.EventLoop.queue = new List();
tink.core._Callback.Cell.pool = [];
wax.report.Report.DEBUG = "debug";
wax.report.Report.ERROR = "error";
wax.report.Report.WARNING = "warn";
wax.report.Report.INFO = "info";
wax.report.Report.LOG = "log";
wax.system.Channels.SYSTEM = "wax-system";
ld31.Main.main();
})(typeof window != "undefined" ? window : exports);

//# sourceMappingURL=Main.js.map