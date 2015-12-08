(function ($hx_exports) { "use strict";
$hx_exports.promhx = $hx_exports.promhx || {};
var $hxClasses = {},$estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.dateStr = function(date) {
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d < 10?"0" + d:"" + d) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
};
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
	,iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,__class__: List
};
var IMap = function() { };
$hxClasses["IMap"] = IMap;
IMap.__name__ = ["IMap"];
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
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
Type.getClassName = function(c) {
	var a = c.__name__;
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
		return f.apply(e,params);
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
		var c;
		if((v instanceof Array) && v.__enum__ == null) c = Array; else c = v.__class__;
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
var haxe = {};
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
					var $it0 = v3.iterator();
					while( $it0.hasNext() ) {
						var i1 = $it0.next();
						this.serialize(i1);
					}
					this.buf.b += "h";
					break;
				case Date:
					var d = v;
					this.buf.b += "v";
					this.buf.add(HxOverrides.dateStr(d));
					break;
				case haxe.ds.StringMap:
					this.buf.b += "b";
					var v4 = v;
					var $it1 = v4.keys();
					while( $it1.hasNext() ) {
						var k = $it1.next();
						this.serializeString(k);
						this.serialize(v4.get(k));
					}
					this.buf.b += "h";
					break;
				case haxe.ds.IntMap:
					this.buf.b += "q";
					var v5 = v;
					var $it2 = v5.keys();
					while( $it2.hasNext() ) {
						var k1 = $it2.next();
						this.buf.b += ":";
						if(k1 == null) this.buf.b += "null"; else this.buf.b += "" + k1;
						this.serialize(v5.get(k1));
					}
					this.buf.b += "h";
					break;
				case haxe.ds.ObjectMap:
					this.buf.b += "M";
					var v6 = v;
					var $it3 = v6.keys();
					while( $it3.hasNext() ) {
						var k2 = $it3.next();
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
haxe.Timer.delay = function(f,time_ms) {
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe.Timer.stamp = function() {
	return new Date().getTime() / 1000;
};
haxe.Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe.Timer
};
haxe.Unserializer = function() { };
$hxClasses["haxe.Unserializer"] = haxe.Unserializer;
haxe.Unserializer.__name__ = ["haxe","Unserializer"];
haxe.Unserializer.initCodes = function() {
	var codes = new Array();
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
		var args = new Array();
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
			var p1 = this.pos;
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
			}
			return Std.parseFloat(HxOverrides.substr(this.buf,p1,this.pos - p1));
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
			var a = new Array();
			this.cache.push(a);
			while(true) {
				var c1 = this.buf.charCodeAt(this.pos);
				if(c1 == 104) {
					this.pos++;
					break;
				}
				if(c1 == 117) {
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
			var c2 = this.get(this.pos++);
			while(c2 == 58) {
				var i = this.readDigits();
				h1.set(i,this.unserialize());
				c2 = this.get(this.pos++);
			}
			if(c2 != 104) throw "Invalid IntMap format";
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
			var s3 = HxOverrides.substr(this.buf,this.pos,19);
			d = HxOverrides.strDate(s3);
			this.cache.push(d);
			this.pos += 19;
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
				var c21 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c11 << 2 | c21 >> 4);
				var c3 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c21 << 4 | c3 >> 2);
				var c4 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c3 << 6 | c4);
			}
			if(rest >= 2) {
				var c12 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c22 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c12 << 2 | c22 >> 4);
				if(rest == 3) {
					var c31 = codes[StringTools.fastCodeAt(buf5,i1++)];
					bytes.set(bpos++,c22 << 4 | c31 >> 2);
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
haxe.ds.IntMap.__interfaces__ = [IMap];
haxe.ds.IntMap.prototype = {
	set: function(key,value) {
		this.h[key] = value;
	}
	,get: function(key) {
		return this.h[key];
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
haxe.ds.ObjectMap.__interfaces__ = [IMap];
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
haxe.ds.StringMap.__interfaces__ = [IMap];
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
	var a = new Array();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		a.push(0);
	}
	return new haxe.io.Bytes(length,a);
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
haxe.io.Eof = function() { };
$hxClasses["haxe.io.Eof"] = haxe.io.Eof;
haxe.io.Eof.__name__ = ["haxe","io","Eof"];
haxe.io.Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe.io.Eof
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
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
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
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
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
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
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
var ludumdare = {};
ludumdare.CoexistingWorlds = function() {
	this.renderer = new wighawag.renderer.CanvasRenderer();
	this.imageLoader = new wighawag.asset.load.ImageLoader();
	wighawag.asset.load.BatchLoader.loadBatch(this.imageLoader,["img/purpleapes.png"],null).then($bind(this,this.ldr_complete_forstart));
};
$hxClasses["ludumdare.CoexistingWorlds"] = ludumdare.CoexistingWorlds;
ludumdare.CoexistingWorlds.__name__ = ["ludumdare","CoexistingWorlds"];
ludumdare.CoexistingWorlds.main = function() {
	new ludumdare.CoexistingWorlds();
};
ludumdare.CoexistingWorlds.prototype = {
	ldr_complete_forstart: function(images_start) {
		this._images_start = images_start;
		var this1 = this.renderer.init();
		this1((function($this) {
			var $r;
			var f = $bind($this,$this.showLoadingScreen);
			$r = function(r) {
				f();
			};
			return $r;
		}(this)));
	}
	,showLoadingScreen: function() {
		this.startTime = haxe.Timer.stamp();
		var presentation = this._images_start.get("img/purpleapes.png");
		this.renderer.clear();
		this.renderer._canvasCtx.fillStyle = "rgb(0,0,0)";
		this.renderer.fillRect(0,0,this.renderer._canvas.width,this.renderer._canvas.height);
		this.renderer.drawImage(presentation,0,0,null,null);
		this.renderer._canvasCtx.fillStyle = "#880088";
		this.renderer._canvasCtx.textAlign = "center";
		this.renderer._canvasCtx.font = "bold 48px sans-serif";
		this.renderer._canvasCtx.fillText("Purple Apes",this.renderer._canvas.width / 2,this.renderer._canvas.height / 3);
		this.renderer._canvasCtx.fillStyle = "#DDFF55";
		this.renderer._canvasCtx.font = "bold 32px sans-serif";
		this.renderer._canvasCtx.fillText("presents",this.renderer._canvas.width / 2,this.renderer._canvas.height / 2);
		this.renderer._canvasCtx.font = "bold 48px sans-serif";
		this.renderer._canvasCtx.fillText("Coexisting Worlds",this.renderer._canvas.width / 2,this.renderer._canvas.height * 2 / 3);
		wighawag.asset.load.BatchLoader.loadBatch(this.imageLoader,["img/field.png","img/bird.png","img/fruit.png","img/mushroom.png","img/tree.png"],null).then($bind(this,this.ldr_complete));
	}
	,ldr_complete: function(images) {
		this.presenter = new ludumdare.view.Presenter(this.renderer,images);
		var timeSinceStart = haxe.Timer.stamp() - this.startTime;
		if(timeSinceStart > 2) this.start(); else haxe.Timer.delay($bind(this,this.start),(2 - timeSinceStart) * 1000 | 0);
	}
	,start: function() {
		var typetree = new wighawag.system.EntityType();
		var typemushroom = new wighawag.system.EntityType();
		var typebird = new wighawag.system.EntityType();
		var typefield = new wighawag.system.EntityType();
		var typecursor = new wighawag.system.EntityType();
		var typetarget = new wighawag.system.EntityType();
		typetree.setup([new ludumdare.model.TreeTypeComponent(),new ludumdare.model.AssetComponent("img/tree.png")]);
		typemushroom.setup([new ludumdare.model.MushroomTypeComponent(),new ludumdare.model.AssetComponent("img/mushroom.png")]);
		typebird.setup([new ludumdare.model.BirdTypeComponent(),new ludumdare.model.AssetComponent("img/bird.png")]);
		typecursor.setup([new ludumdare.model.CursorTypeComponent()]);
		typetarget.setup([new ludumdare.model.TargetTypeComponent()]);
		this.typelibrary = new haxe.ds.StringMap();
		this.typelibrary.set("tree",typetree);
		this.typelibrary.set("mushroom",typemushroom);
		this.typelibrary.set("bird",typebird);
		this.typelibrary.set("cursor",typecursor);
		this.typelibrary.set("target",typetarget);
		var systems = [new ludumdare.model.FieldPlacementSystem(this.typelibrary),new ludumdare.model.GestionDynamicSystem(this.typelibrary),new ludumdare.controller.ControllerKey(this.typelibrary,this.presenter),new ludumdare.model.CollisionSystem(this.typelibrary),new ludumdare.model.GestionTreeSystem(this.typelibrary),new ludumdare.model.GestionFruitSystem(this.typelibrary),new ludumdare.model.GestionMushroomSystem(this.typelibrary),new ludumdare.model.GestionConnectionSystem(this.typelibrary),new ludumdare.model.GestionBirdSystem(this.typelibrary),new ludumdare.model.GestionCursorSystem(this.typelibrary),new ludumdare.model.GestionTargetSystem(this.typelibrary),new ludumdare.model.GestionGameGoalSystem(this.typelibrary)];
		this.worldModel = new wighawag.system.Model();
		this.worldModel.setup(systems);
		this.presenter.present(this.worldModel);
		this.lastTime = haxe.Timer.stamp();
		this.timer = new haxe.Timer(33);
		this.timer.run = $bind(this,this.update);
	}
	,update: function() {
		var now = haxe.Timer.stamp();
		var dt = now - this.lastTime;
		if(this.worldModel != null) {
			this.worldModel.update(dt,now);
			this.presenter.update(dt,now);
		}
		if(this.worldModel.get(ludumdare.model.GestionGameGoalSystem).completed) {
			this.timer.stop();
			this.renderer.clear();
			this.renderer._canvasCtx.fillStyle = "rgb(0,0,0)";
			this.renderer.fillRect(0,0,this.renderer._canvas.width,this.renderer._canvas.height);
			this.renderer._canvasCtx.fillStyle = "#880088";
			this.renderer._canvasCtx.textAlign = "center";
			this.renderer._canvasCtx.font = "bold 48px sans-serif";
			this.renderer.fillText("Done your score is : " + Math.floor(this.worldModel.get(ludumdare.model.GestionGameGoalSystem).timeelapsed * 1000) + "",this.renderer._canvas.width / 2,this.renderer._canvas.height / 3);
			this.renderer._canvasCtx.fillText("Thank you For Playing",this.renderer._canvas.width / 2,this.renderer._canvas.height * 2 / 3);
		}
		this.lastTime = now;
	}
	,__class__: ludumdare.CoexistingWorlds
};
var wighawag = {};
wighawag.system = {};
wighawag.system.Updatable = function() { };
$hxClasses["wighawag.system.Updatable"] = wighawag.system.Updatable;
wighawag.system.Updatable.__name__ = ["wighawag","system","Updatable"];
wighawag.system.Updatable.prototype = {
	__class__: wighawag.system.Updatable
};
wighawag.system.Component = function() { };
$hxClasses["wighawag.system.Component"] = wighawag.system.Component;
wighawag.system.Component.__name__ = ["wighawag","system","Component"];
wighawag.system.Component.prototype = {
	__class__: wighawag.system.Component
};
wighawag.system.ModelComponent = function() { };
$hxClasses["wighawag.system.ModelComponent"] = wighawag.system.ModelComponent;
wighawag.system.ModelComponent.__name__ = ["wighawag","system","ModelComponent"];
wighawag.system.ModelComponent.__interfaces__ = [wighawag.system.Component];
wighawag.system.ModelComponent.prototype = {
	__class__: wighawag.system.ModelComponent
};
wighawag.system.SystemComponent = function() { };
$hxClasses["wighawag.system.SystemComponent"] = wighawag.system.SystemComponent;
wighawag.system.SystemComponent.__name__ = ["wighawag","system","SystemComponent"];
wighawag.system.SystemComponent.__interfaces__ = [wighawag.system.ModelComponent];
wighawag.system.SystemComponent.prototype = {
	__class__: wighawag.system.SystemComponent
};
ludumdare.controller = {};
ludumdare.controller.ControllerKey = function(typelibrary,presenter) {
	this.lastSelected = null;
	this._presenter = presenter;
	var this1 = this._presenter.get_onMouseClicked();
	this1($bind(this,this.mouseClicked));
	var this2 = this._presenter.get_onMouseDown();
	this2($bind(this,this.mouseDown));
	var this3 = this._presenter.get_onMouseUp();
	this3($bind(this,this.mouseUp));
	window.document.addEventListener("keydown",$bind(this,this.keyDownHandler),false);
	window.document.addEventListener("keyup",$bind(this,this.keyUpHandler),false);
	this.registeredEntities = new Array();
	this._entityRegistrar = new haxe.ds.ObjectMap();
	this._requiredEntityComponents = [ludumdare.model.CursorComponent];
};
$hxClasses["ludumdare.controller.ControllerKey"] = ludumdare.controller.ControllerKey;
ludumdare.controller.ControllerKey.__name__ = ["ludumdare","controller","ControllerKey"];
ludumdare.controller.ControllerKey.__interfaces__ = [wighawag.system.Updatable,wighawag.system.SystemComponent];
ludumdare.controller.ControllerKey.prototype = {
	keyDownHandler: function(event) {
		var keyPressed = event.keyCode;
		if(keyPressed == "38") this.velocitycomponent.vY = -2; else if(keyPressed == "40") this.velocitycomponent.vY = 2;
		if(keyPressed == "39") this.velocitycomponent.vX = 2; else if(keyPressed == "37") this.velocitycomponent.vX = -2;
		if(keyPressed == "32" && this.cursorcomponent.requiresubselection == false) this.cursorcomponent.trytoselect = true; else if(keyPressed == "32" && this.cursorcomponent.requiresubselection == true) this.cursorcomponent.trytosubselect = true;
		if(keyPressed == "69") {
			if(this.cursorcomponent.requiresubselection == false) this.cursorcomponent.action1 = true; else if(this.cursorcomponent.requiresubselection == true) this.cursorcomponent.desaction1 = true;
		} else if(keyPressed == "82") {
			if(this.cursorcomponent.requiresubselection == false) this.cursorcomponent.action2 = true; else if(this.cursorcomponent.requiresubselection == true) this.cursorcomponent.desaction2 = true;
		} else if(keyPressed == "84") {
			if(this.cursorcomponent.requiresubselection == false) this.cursorcomponent.action3 = true; else if(this.cursorcomponent.requiresubselection == true) this.cursorcomponent.desaction3 = true;
		} else if(keyPressed == "68") {
			this.cursorcomponent.trytosubselect = false;
			this.cursorcomponent.trytoselect = false;
			this.cursorcomponent.deselectall = true;
		}
	}
	,keyUpHandler: function(event) {
		var keyPressed = event.keyCode;
		if(keyPressed == "38" || keyPressed == "40") this.velocitycomponent.vY = 0;
		if(keyPressed == "37" || keyPressed == "39") this.velocitycomponent.vX = 0;
		if(keyPressed == "32") {
			this.cursorcomponent.trytoselect = false;
			this.cursorcomponent.trytosubselect = false;
		}
		if(keyPressed == "69" || keyPressed == "82" || keyPressed == "84" || keyPressed == "68") {
			this.cursorcomponent.action1 = false;
			this.cursorcomponent.desaction1 = false;
			this.cursorcomponent.action2 = false;
			this.cursorcomponent.desaction2 = false;
			this.cursorcomponent.action3 = false;
			this.cursorcomponent.desaction3 = false;
			this.cursorcomponent.deselectall = false;
		}
	}
	,onEntityRegistered: function(entity) {
		if(this.positioncomponent != null) haxe.Log.trace("error",{ fileName : "ControllerKey.hx", lineNumber : 172, className : "ludumdare.controller.ControllerKey", methodName : "onEntityRegistered", customParams : ["GameController","the controller support only one player action component","ignoring the new entity"]}); else {
			this.positioncomponent = entity.get(ludumdare.model.PositionComponent);
			this.velocitycomponent = entity.get(ludumdare.model.VelocityComponent);
			this.cursorcomponent = entity.get(ludumdare.model.CursorComponent);
		}
	}
	,onEntityUnregistered: function(entity) {
	}
	,initialise: function() {
	}
	,update: function(dt,now) {
		if(this.positioncomponent != null) {
			this.positioncomponent.x = this._presenter.get_mouseX();
			this.positioncomponent.y = this._presenter.get_mouseY();
		}
	}
	,mouseUp: function(evt) {
		if(this.cursorcomponent != null) {
			this.cursorcomponent.trytoselect = false;
			this.cursorcomponent.trytosubselect = false;
		}
	}
	,mouseDown: function(evt) {
		if(this.cursorcomponent.requiresubselection == false) this.cursorcomponent.trytoselect = true; else if(this.cursorcomponent.requiresubselection == true) this.cursorcomponent.trytosubselect = true;
	}
	,mouseClicked: function(evt) {
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
		return ludumdare.controller.ControllerKey;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ludumdare.controller.ControllerKey
};
wighawag.system.EntityTypeComponent = function() { };
$hxClasses["wighawag.system.EntityTypeComponent"] = wighawag.system.EntityTypeComponent;
wighawag.system.EntityTypeComponent.__name__ = ["wighawag","system","EntityTypeComponent"];
wighawag.system.EntityTypeComponent.__interfaces__ = [wighawag.system.Component];
wighawag.system.EntityTypeComponent.prototype = {
	__class__: wighawag.system.EntityTypeComponent
};
ludumdare.model = {};
ludumdare.model.AssetComponent = function(assetId) {
	this.assetId = assetId;
};
$hxClasses["ludumdare.model.AssetComponent"] = ludumdare.model.AssetComponent;
ludumdare.model.AssetComponent.__name__ = ["ludumdare","model","AssetComponent"];
ludumdare.model.AssetComponent.__interfaces__ = [wighawag.system.EntityTypeComponent];
ludumdare.model.AssetComponent.prototype = {
	populateEntity: function(entityComponents) {
	}
	,initialise: function() {
	}
	,attach: function(componentOwner) {
		this.owner = componentOwner;
		return ludumdare.model.AssetComponent;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ludumdare.model.AssetComponent
};
wighawag.system.EntityComponent = function() { };
$hxClasses["wighawag.system.EntityComponent"] = wighawag.system.EntityComponent;
wighawag.system.EntityComponent.__name__ = ["wighawag","system","EntityComponent"];
wighawag.system.EntityComponent.__interfaces__ = [wighawag.system.Component];
wighawag.system.EntityComponent.prototype = {
	__class__: wighawag.system.EntityComponent
};
ludumdare.model.BirdComponent = function(aimdistanceX,aimdistanceY) {
	if(aimdistanceY == null) aimdistanceY = 0;
	if(aimdistanceX == null) aimdistanceX = 0;
	this.maxenvol = 4;
	this.nombreenvol = 0;
	this.gotofruit = false;
	this.ishungry = true;
	this.hasseed = false;
	this.hastarget = 0;
	this.aimdistanceY = 0;
	this.aimdistanceX = 0;
	this.aimdistanceX = aimdistanceX;
	this.aimdistanceY = aimdistanceY;
};
$hxClasses["ludumdare.model.BirdComponent"] = ludumdare.model.BirdComponent;
ludumdare.model.BirdComponent.__name__ = ["ludumdare","model","BirdComponent"];
ludumdare.model.BirdComponent.__interfaces__ = [wighawag.system.EntityComponent];
ludumdare.model.BirdComponent.prototype = {
	initialise: function() {
	}
	,attachEntity: function(anEntity) {
		var missingComponents = new Array();
		if(missingComponents.length > 0) {
			haxe.Log.trace("" + Std.string(Type.getClass(this)) + " disabled as the entity type does not have these required components " + Std.string(missingComponents),{ fileName : "EntityComponent.hx", lineNumber : 11, className : "ludumdare.model.BirdComponent", methodName : "attachEntity"});
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
		return ludumdare.model.BirdComponent;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ludumdare.model.BirdComponent
};
ludumdare.model.BirdTypeComponent = function() {
	this.age = 1;
};
$hxClasses["ludumdare.model.BirdTypeComponent"] = ludumdare.model.BirdTypeComponent;
ludumdare.model.BirdTypeComponent.__name__ = ["ludumdare","model","BirdTypeComponent"];
ludumdare.model.BirdTypeComponent.__interfaces__ = [wighawag.system.EntityTypeComponent];
ludumdare.model.BirdTypeComponent.prototype = {
	populateEntity: function(entityComponents) {
	}
	,initialise: function() {
	}
	,attach: function(componentOwner) {
		this.owner = componentOwner;
		return ludumdare.model.BirdTypeComponent;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ludumdare.model.BirdTypeComponent
};
ludumdare.model.CollisionComponent = function() {
};
$hxClasses["ludumdare.model.CollisionComponent"] = ludumdare.model.CollisionComponent;
ludumdare.model.CollisionComponent.__name__ = ["ludumdare","model","CollisionComponent"];
ludumdare.model.CollisionComponent.__interfaces__ = [wighawag.system.EntityComponent];
ludumdare.model.CollisionComponent.prototype = {
	initialise: function() {
	}
	,attachEntity: function(anEntity) {
		var missingComponents = new Array();
		if(missingComponents.length > 0) {
			haxe.Log.trace("" + Std.string(Type.getClass(this)) + " disabled as the entity type does not have these required components " + Std.string(missingComponents),{ fileName : "EntityComponent.hx", lineNumber : 11, className : "ludumdare.model.CollisionComponent", methodName : "attachEntity"});
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
		return ludumdare.model.CollisionComponent;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ludumdare.model.CollisionComponent
};
ludumdare.model.CollisionSystem = function(typelibrary) {
	this.entityselected = null;
	this.typelibrary = typelibrary;
	this.registeredEntities = new Array();
	this._entityRegistrar = new haxe.ds.ObjectMap();
	this._requiredEntityComponents = [ludumdare.model.CollisionComponent];
};
$hxClasses["ludumdare.model.CollisionSystem"] = ludumdare.model.CollisionSystem;
ludumdare.model.CollisionSystem.__name__ = ["ludumdare","model","CollisionSystem"];
ludumdare.model.CollisionSystem.__interfaces__ = [wighawag.system.Updatable,wighawag.system.SystemComponent];
ludumdare.model.CollisionSystem.prototype = {
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
			var entityA = _g1[_g];
			++_g;
			var _g2 = 0;
			var _g3 = this.registeredEntities;
			while(_g2 < _g3.length) {
				var entityB = _g3[_g2];
				++_g2;
				if(entityA.has([ludumdare.model.FruitComponent]) && entityB.has([ludumdare.model.BirdComponent]) && entityB.get(ludumdare.model.BirdComponent).ishungry == true && entityB.get(ludumdare.model.BirdComponent).gotofruit == false) {
					var posfruit = entityA.get(ludumdare.model.PositionComponent);
					var posbird = entityB.get(ludumdare.model.PositionComponent);
					var distance = Math.sqrt(Math.pow(posfruit.x - posbird.x,2) + Math.pow(posfruit.y - posbird.y,2));
					if(distance < 3) {
						var fruit = entityA.get(ludumdare.model.FruitComponent);
						var bird = entityB.get(ludumdare.model.BirdComponent);
						var veloce = entityB.get(ludumdare.model.VelocityComponent);
						veloce.vX = 0;
						veloce.vY = 0;
						fruit.beingeaten += 1;
						if(fruit.beingeaten == fruit.eaten) {
							bird.ishungry = false;
							bird.hasseed = true;
							this.model.removeEntity(entityA);
						}
					}
				}
				if(entityA.has([ludumdare.model.CursorComponent]) && entityA.get(ludumdare.model.CursorComponent).trytoselect == true && entityB.has([ludumdare.model.SelectionComponent])) {
					var postor = entityA.get(ludumdare.model.PositionComponent);
					var selector = entityA.get(ludumdare.model.CursorComponent);
					var postable = entityB.get(ludumdare.model.PositionComponent);
					var selected = entityB.get(ludumdare.model.SelectionComponent);
					var distance1 = Math.sqrt(Math.pow(postor.x - postable.x,2) + Math.pow(postor.y - postable.y,2));
					if(distance1 < postable.radius / 2) {
						selector.selection = true;
						selected.selected = true;
						this.entityselected = entityB;
					} else if(selected.selected == true && distance1 > postable.radius / 2) {
						selector.selection = false;
						selected.selected = false;
						this.entityselected = null;
					}
				}
				if(entityA.has([ludumdare.model.CursorComponent]) && entityA.get(ludumdare.model.CursorComponent).trytosubselect == true && entityB.has([ludumdare.model.FruitComponent]) && entityB.get(ludumdare.model.FruitComponent).riped == true && this.entityselected.has([ludumdare.model.TreeComponent]) && this.entityselected.get(ludumdare.model.TreeComponent).callbird == true) {
					var postor1 = entityA.get(ludumdare.model.PositionComponent);
					var selector1 = entityA.get(ludumdare.model.CursorComponent);
					var postable1 = entityB.get(ludumdare.model.PositionComponent);
					var selected1 = entityB.get(ludumdare.model.SelectionComponent);
					var distance2 = Math.sqrt(Math.pow(postor1.x - postable1.x,2) + Math.pow(postor1.y - postable1.y,2));
					if(distance2 < postable1.radius / 2) {
						selector1.subselection = true;
						selector1.trytosubselect = false;
						selector1.requiresubselection = false;
						selected1.subselected = true;
						ludumdare.model.FieldPlacementSystem.coexistingenergie -= 3000;
						this.entityselected.get(ludumdare.model.TreeComponent).callbird = false;
					} else if(selected1.subselected == true && distance2 > postable1.radius / 2) {
						selector1.subselection = false;
						selected1.subselected = false;
						selector1.trytosubselect = false;
					}
				}
				if(entityA.has([ludumdare.model.CursorComponent]) && entityA.get(ludumdare.model.CursorComponent).trytosubselect == true && entityB.has([ludumdare.model.MushroomComponent]) && entityB.get(ludumdare.model.MushroomComponent).receiveenergie <= entityB.get(ludumdare.model.MushroomComponent).connections && this.entityselected.has([ludumdare.model.TreeComponent]) && this.entityselected.get(ludumdare.model.TreeComponent).trytogivesap == true) {
					var postor2 = entityA.get(ludumdare.model.PositionComponent);
					var selector2 = entityA.get(ludumdare.model.CursorComponent);
					var postable2 = entityB.get(ludumdare.model.PositionComponent);
					var selected2 = entityB.get(ludumdare.model.SelectionComponent);
					var distanceorigin = Math.sqrt(Math.pow(postor2.x - selector2.originseedingX,2) + Math.pow(postor2.y - selector2.originseedingY,2));
					var distance3 = Math.sqrt(Math.pow(postor2.x - postable2.x,2) + Math.pow(postor2.y - postable2.y,2));
					if(distance3 < postable2.radius / 2 && selected2.subselected == false) {
						selector2.subselection = true;
						selector2.trytosubselect = false;
						selector2.requiresubselection = false;
						selected2.subselected = false;
						entityB.get(ludumdare.model.MushroomComponent).receiveenergie += 1;
						this.entityselected.get(ludumdare.model.TreeComponent).sapaim = entityB.get(ludumdare.model.MushroomComponent).tempIDmushroom;
						this.entityselected.get(ludumdare.model.TreeComponent).givesap = true;
						this.entityselected.get(ludumdare.model.TreeComponent).trytogivesap = false;
					} else if(selected2.subselected == true && distance3 > postable2.radius / 2) {
						selector2.subselection = false;
						selected2.subselected = false;
						selector2.trytosubselect = false;
					}
				}
				if(entityA.has([ludumdare.model.CursorComponent]) && entityA.get(ludumdare.model.CursorComponent).trytosubselect == true && entityB.has([ludumdare.model.TreeComponent]) && this.entityselected.has([ludumdare.model.MushroomComponent])) {
					var postor3 = entityA.get(ludumdare.model.PositionComponent);
					var selector3 = entityA.get(ludumdare.model.CursorComponent);
					var postable3 = entityB.get(ludumdare.model.PositionComponent);
					var selected3 = entityB.get(ludumdare.model.SelectionComponent);
					var distanceorigin1 = Math.sqrt(Math.pow(postor3.x - selector3.originseedingX,2) + Math.pow(postor3.y - selector3.originseedingY,2));
					if(this.entityselected.get(ludumdare.model.MushroomComponent).connectioncreation == true && entityB.get(ludumdare.model.TreeComponent).isconnected == false) {
						var distance4 = Math.sqrt(Math.pow(postor3.x - postable3.x,2) + Math.pow(postor3.y - postable3.y,2));
						if(distance4 < postable3.radius / 2 && selected3.subselected == false) {
							selector3.subselection = true;
							selector3.trytosubselect = false;
							selector3.requiresubselection = false;
							selected3.subselected = false;
							entityB.get(ludumdare.model.TreeComponent).isconnected = true;
							this.entityselected.get(ludumdare.model.MushroomComponent).energie -= 500;
							this.entityselected.get(ludumdare.model.MushroomComponent).connections += 1;
							var positionmushroom = this.entityselected.get(ludumdare.model.PositionComponent);
							var connectiontype = this.typelibrary.get("mushroom");
							var entityconnection = connectiontype.createEntity([new ludumdare.model.PositionComponent(positionmushroom.x,positionmushroom.y,0,0,0,5),new ludumdare.model.PlayerComponent(),new ludumdare.model.ConnectionComponent(postable3.x,postable3.y),new ludumdare.model.CollisionComponent()]);
							this.model.addEntity(entityconnection);
							this.entityselected.get(ludumdare.model.MushroomComponent).connectioncreation = false;
						} else if(selected3.subselected == true && distance4 > postable3.radius / 2) {
							selector3.subselection = false;
							selected3.subselected = false;
							selector3.trytosubselect = false;
						}
					} else if(this.entityselected.get(ludumdare.model.MushroomComponent).trytosupportgrowth == true && entityB.get(ludumdare.model.TreeComponent).isconnected == true && entityB.get(ludumdare.model.TreeComponent).mature == false && entityB.get(ludumdare.model.TreeComponent).receiveageboost == false) {
						var distance5 = Math.sqrt(Math.pow(postor3.x - postable3.x,2) + Math.pow(postor3.y - postable3.y,2));
						if(distance5 < postable3.radius / 2 && selected3.subselected == false) {
							selector3.subselection = true;
							selector3.trytosubselect = false;
							selector3.requiresubselection = false;
							selected3.subselected = false;
							entityB.get(ludumdare.model.TreeComponent).receiveageboost = true;
							this.entityselected.get(ludumdare.model.MushroomComponent).supportgrowth += 1;
							this.entityselected.get(ludumdare.model.MushroomComponent).trytosupportgrowth = false;
						} else if(selected3.subselected == true && distance5 > postable3.radius / 2) {
							selector3.subselection = false;
							selected3.subselected = false;
							selector3.trytosubselect = false;
						}
					}
				}
				if(entityA.has([ludumdare.model.CursorComponent]) && entityA.get(ludumdare.model.CursorComponent).trytosubselect == true && this.entityselected.has([ludumdare.model.MushroomComponent]) && this.entityselected.get(ludumdare.model.MushroomComponent).createoffsprings == true && entityB.has([ludumdare.model.TreeComponent])) {
					var postor4 = entityA.get(ludumdare.model.PositionComponent);
					var selector4 = entityA.get(ludumdare.model.CursorComponent);
					var postable4 = entityB.get(ludumdare.model.PositionComponent);
					var distance6 = Math.sqrt(Math.pow(postor4.x - postable4.x,2) + Math.pow(postor4.y - postable4.y,2));
					var distanceorigin2 = Math.sqrt(Math.pow(postor4.x - selector4.originseedingX,2) + Math.pow(postor4.y - selector4.originseedingY,2));
					if(distance6 >= postable4.radius * 2 && distanceorigin2 <= 160 && distanceorigin2 > 80) {
						this.entityselected.get(ludumdare.model.MushroomComponent).createoffsprings = false;
						selector4.trytosubselect = false;
						selector4.requiresubselection = false;
						var mushroomtype = this.typelibrary.get("mushroom");
						var entitymushroom = mushroomtype.createEntity([new ludumdare.model.PositionComponent(postor4.x,postor4.y,10,30,0,15),new ludumdare.model.PlayerComponent(),new ludumdare.model.MushroomComponent(this.model.get(ludumdare.model.FieldPlacementSystem).tempIDmushroom),new ludumdare.model.SelectionComponent(),new ludumdare.model.CollisionComponent()]);
						this.model.addEntity(entitymushroom);
						this.model.get(ludumdare.model.FieldPlacementSystem).tempIDmushroom += 1;
						ludumdare.model.FieldPlacementSystem.coexistingenergie -= 15000;
					} else if(distance6 < postable4.radius * 2 || distanceorigin2 > 80) selector4.trytosubselect = false;
				}
				if(entityA.has([ludumdare.model.CursorComponent]) && entityA.get(ludumdare.model.CursorComponent).trytosubselect == true && entityA.get(ludumdare.model.CursorComponent).seedlookforarea > 0 && entityB.has([ludumdare.model.TreeComponent])) {
					var postor5 = entityA.get(ludumdare.model.PositionComponent);
					var selector5 = entityA.get(ludumdare.model.CursorComponent);
					var postable5 = entityB.get(ludumdare.model.PositionComponent);
					var positionbird = this.entityselected.get(ludumdare.model.PositionComponent);
					var distance7 = Math.sqrt(Math.pow(postor5.x - postable5.x,2) + Math.pow(postor5.y - postable5.y,2));
					var distanceorigin3 = Math.sqrt(Math.pow(postor5.x - positionbird.x,2) + Math.pow(postor5.y - positionbird.y,2));
					if((distance7 < postable5.radius * 2.5 || distanceorigin3 > 160) && selector5.seedlookforarea != 3) selector5.seedlookforarea = 3; else if(distance7 >= postable5.radius * 2.5 && distanceorigin3 <= 160 && selector5.seedlookforarea != 3) selector5.seedlookforarea = 2;
				}
				if(entityA.has([ludumdare.model.TargetComponent]) && entityA.get(ludumdare.model.TargetComponent).hasbeentargeted == true && entityB.has([ludumdare.model.BirdComponent]) && entityB.get(ludumdare.model.BirdComponent).hastarget == entityA.get(ludumdare.model.TargetComponent).tempIDtarget) {
					var postor6 = entityA.get(ludumdare.model.PositionComponent);
					var postable6 = entityB.get(ludumdare.model.PositionComponent);
					var distance8 = Math.sqrt(Math.pow(postor6.x - postable6.x,2) + Math.pow(postor6.y - postable6.y,2));
					if(distance8 < 3) {
						var target = entityA.get(ludumdare.model.TargetComponent);
						var bird1 = entityB.get(ludumdare.model.BirdComponent);
						var veloce1 = entityB.get(ludumdare.model.VelocityComponent);
						veloce1.vX += 1;
						veloce1.vY += 1;
						target.hasbeentargeted = false;
						target.hasbeenreached = true;
					}
				}
			}
		}
		var cursorentity = this.model.get(ludumdare.model.GestionCursorSystem).registeredEntities[0];
		var cursor = cursorentity.get(ludumdare.model.CursorComponent);
		if(cursor.seedlookforarea == 3) cursor.seedlookforarea = 1;
		if(cursor.deselectall == true && this.entityselected != null) {
			this.entityselected.get(ludumdare.model.SelectionComponent).selected = false;
			this.entityselected = null;
			cursor.deselectall = false;
			cursor.selection = false;
			cursor.requiresubselection = false;
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
		return ludumdare.model.CollisionSystem;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ludumdare.model.CollisionSystem
};
ludumdare.model.ConnectionComponent = function(connectedX,connectedY) {
	this.connectedY = 0;
	this.connectedX = 0;
	this.connectedX = connectedX;
	this.connectedY = connectedY;
};
$hxClasses["ludumdare.model.ConnectionComponent"] = ludumdare.model.ConnectionComponent;
ludumdare.model.ConnectionComponent.__name__ = ["ludumdare","model","ConnectionComponent"];
ludumdare.model.ConnectionComponent.__interfaces__ = [wighawag.system.EntityComponent];
ludumdare.model.ConnectionComponent.prototype = {
	initialise: function() {
	}
	,attachEntity: function(anEntity) {
		var missingComponents = new Array();
		if(missingComponents.length > 0) {
			haxe.Log.trace("" + Std.string(Type.getClass(this)) + " disabled as the entity type does not have these required components " + Std.string(missingComponents),{ fileName : "EntityComponent.hx", lineNumber : 11, className : "ludumdare.model.ConnectionComponent", methodName : "attachEntity"});
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
		return ludumdare.model.ConnectionComponent;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ludumdare.model.ConnectionComponent
};
ludumdare.model.CursorComponent = function() {
	this.deselectall = false;
	this.originseedingY = 0;
	this.originseedingX = 0;
	this.seedlookforarea = 0;
	this.requiresubselection = false;
	this.desaction3 = false;
	this.action3 = false;
	this.desaction2 = false;
	this.action2 = false;
	this.desaction1 = false;
	this.action1 = false;
	this.subselection = false;
	this.trytosubselect = false;
	this.selection = false;
	this.trytoselect = false;
	this.target = 0;
};
$hxClasses["ludumdare.model.CursorComponent"] = ludumdare.model.CursorComponent;
ludumdare.model.CursorComponent.__name__ = ["ludumdare","model","CursorComponent"];
ludumdare.model.CursorComponent.__interfaces__ = [wighawag.system.EntityComponent];
ludumdare.model.CursorComponent.prototype = {
	initialise: function() {
	}
	,attachEntity: function(anEntity) {
		var missingComponents = new Array();
		if(missingComponents.length > 0) {
			haxe.Log.trace("" + Std.string(Type.getClass(this)) + " disabled as the entity type does not have these required components " + Std.string(missingComponents),{ fileName : "EntityComponent.hx", lineNumber : 11, className : "ludumdare.model.CursorComponent", methodName : "attachEntity"});
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
		return ludumdare.model.CursorComponent;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ludumdare.model.CursorComponent
};
ludumdare.model.CursorTypeComponent = function() {
	this.lifeforce = 1;
};
$hxClasses["ludumdare.model.CursorTypeComponent"] = ludumdare.model.CursorTypeComponent;
ludumdare.model.CursorTypeComponent.__name__ = ["ludumdare","model","CursorTypeComponent"];
ludumdare.model.CursorTypeComponent.__interfaces__ = [wighawag.system.EntityTypeComponent];
ludumdare.model.CursorTypeComponent.prototype = {
	populateEntity: function(entityComponents) {
	}
	,initialise: function() {
	}
	,attach: function(componentOwner) {
		this.owner = componentOwner;
		return ludumdare.model.CursorTypeComponent;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ludumdare.model.CursorTypeComponent
};
ludumdare.model.ExternalForceComponent = function() {
	this.airdrag = { x : 0, y : 1};
};
$hxClasses["ludumdare.model.ExternalForceComponent"] = ludumdare.model.ExternalForceComponent;
ludumdare.model.ExternalForceComponent.__name__ = ["ludumdare","model","ExternalForceComponent"];
ludumdare.model.ExternalForceComponent.__interfaces__ = [wighawag.system.EntityComponent];
ludumdare.model.ExternalForceComponent.prototype = {
	initialise: function() {
	}
	,attachEntity: function(anEntity) {
		var missingComponents = new Array();
		if(missingComponents.length > 0) {
			haxe.Log.trace("" + Std.string(Type.getClass(this)) + " disabled as the entity type does not have these required components " + Std.string(missingComponents),{ fileName : "EntityComponent.hx", lineNumber : 11, className : "ludumdare.model.ExternalForceComponent", methodName : "attachEntity"});
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
		return ludumdare.model.ExternalForceComponent;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ludumdare.model.ExternalForceComponent
};
ludumdare.model.FieldPlacementSystem = function(typelibrary) {
	this.tempIDmushroom = 0;
	this.tempIDtree = 0;
	this.typelibrary = typelibrary;
	this.registeredEntities = new Array();
	this._entityRegistrar = new haxe.ds.ObjectMap();
	this._requiredEntityComponents = [];
};
$hxClasses["ludumdare.model.FieldPlacementSystem"] = ludumdare.model.FieldPlacementSystem;
ludumdare.model.FieldPlacementSystem.__name__ = ["ludumdare","model","FieldPlacementSystem"];
ludumdare.model.FieldPlacementSystem.__interfaces__ = [wighawag.system.Updatable,wighawag.system.SystemComponent];
ludumdare.model.FieldPlacementSystem.prototype = {
	onEntityRegistered: function(entity) {
		haxe.Log.trace("onEntityRegistered",{ fileName : "FieldPlacementSystem.hx", lineNumber : 36, className : "ludumdare.model.FieldPlacementSystem", methodName : "onEntityRegistered"});
	}
	,onEntityUnregistered: function(entity) {
	}
	,initialise: function() {
		var treetype = this.typelibrary.get("tree");
		var entitytree = treetype.createEntity([new ludumdare.model.PositionComponent(60,60,0,0,0,40),new ludumdare.model.PlayerComponent(),new ludumdare.model.TreeComponent(this.tempIDtree,2000,true,true,1000),new ludumdare.model.SelectionComponent(),new ludumdare.model.CollisionComponent()]);
		this.model.addEntity(entitytree);
		this.tempIDtree += 1;
		var mushroomtype = this.typelibrary.get("mushroom");
		var entitymushroom = mushroomtype.createEntity([new ludumdare.model.PositionComponent(100,100,10,30,0,15),new ludumdare.model.PlayerComponent(),new ludumdare.model.MushroomComponent(this.tempIDmushroom,1,510),new ludumdare.model.SelectionComponent(),new ludumdare.model.CollisionComponent()]);
		this.model.addEntity(entitymushroom);
		this.tempIDmushroom += 1;
		var connectiontype = this.typelibrary.get("mushroom");
		var entityconnection = connectiontype.createEntity([new ludumdare.model.PositionComponent(100,100,0,0,0,5),new ludumdare.model.PlayerComponent(),new ludumdare.model.ConnectionComponent(50,100),new ludumdare.model.CollisionComponent()]);
		this.model.addEntity(entityconnection);
		var cursortype = this.typelibrary.get("cursor");
		var entitycursor = cursortype.createEntity([new ludumdare.model.PositionComponent(100,100,50,40,0,10),new ludumdare.model.PlayerComponent(),new ludumdare.model.VelocityComponent(),new ludumdare.model.CursorComponent(),new ludumdare.model.CollisionComponent()]);
		this.model.addEntity(entitycursor);
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
		return ludumdare.model.FieldPlacementSystem;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ludumdare.model.FieldPlacementSystem
};
ludumdare.model.FruitComponent = function(tempIDtree,birdtarget) {
	if(birdtarget == null) birdtarget = false;
	this.tempIDtree = 0;
	this.seedtarget = false;
	this.eaten = 200;
	this.beingeaten = 0;
	this.birdtarget = false;
	this.riped = false;
	this.maxgrowing = 200;
	this.growingprocess = 0;
	this.birdtarget = birdtarget;
	this.tempIDtree = tempIDtree;
};
$hxClasses["ludumdare.model.FruitComponent"] = ludumdare.model.FruitComponent;
ludumdare.model.FruitComponent.__name__ = ["ludumdare","model","FruitComponent"];
ludumdare.model.FruitComponent.__interfaces__ = [wighawag.system.EntityComponent];
ludumdare.model.FruitComponent.prototype = {
	initialise: function() {
	}
	,attachEntity: function(anEntity) {
		var missingComponents = new Array();
		if(missingComponents.length > 0) {
			haxe.Log.trace("" + Std.string(Type.getClass(this)) + " disabled as the entity type does not have these required components " + Std.string(missingComponents),{ fileName : "EntityComponent.hx", lineNumber : 11, className : "ludumdare.model.FruitComponent", methodName : "attachEntity"});
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
		return ludumdare.model.FruitComponent;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ludumdare.model.FruitComponent
};
ludumdare.model.GestionBirdSystem = function(typelibrary) {
	this.typelibrary = typelibrary;
	this.registeredEntities = new Array();
	this._entityRegistrar = new haxe.ds.ObjectMap();
	this._requiredEntityComponents = [ludumdare.model.BirdComponent];
};
$hxClasses["ludumdare.model.GestionBirdSystem"] = ludumdare.model.GestionBirdSystem;
ludumdare.model.GestionBirdSystem.__name__ = ["ludumdare","model","GestionBirdSystem"];
ludumdare.model.GestionBirdSystem.__interfaces__ = [wighawag.system.Updatable,wighawag.system.SystemComponent];
ludumdare.model.GestionBirdSystem.prototype = {
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
			var bird = entity.get(ludumdare.model.BirdComponent);
			var position = entity.get(ludumdare.model.PositionComponent);
			var veloce = entity.get(ludumdare.model.VelocityComponent);
			var treesystem = this.model.get(ludumdare.model.GestionTreeSystem);
			var selected = entity.get(ludumdare.model.SelectionComponent);
			var poolenergie = ludumdare.model.FieldPlacementSystem.coexistingenergie;
			if(selected.selected == true) {
				var cursorentity = this.model.get(ludumdare.model.GestionCursorSystem).registeredEntities[0];
				var cursor = cursorentity.get(ludumdare.model.CursorComponent);
				var cursorpos = cursorentity.get(ludumdare.model.PositionComponent);
				if(bird.hasseed == true && cursor.action1 == true && poolenergie > 9000) {
					cursor.requiresubselection = true;
					cursor.seedlookforarea = 1;
					cursor.originseedingX = position.x;
					cursor.originseedingY = position.y;
				}
				if(cursor.seedlookforarea == 2) {
					var targetsystem = this.model.get(ludumdare.model.GestionTargetSystem);
					bird.hasseed = false;
					bird.hastarget = targetsystem.tempIDtarget;
					cursor.requiresubselection = false;
					cursor.seedlookforarea = 0;
					veloce.vX = (cursorpos.x - position.x) / Math.sqrt(Math.pow(position.x - cursorpos.x,2) + Math.pow(position.y - cursorpos.y,2));
					veloce.vY = (cursorpos.y - position.y) / Math.sqrt(Math.pow(position.x - cursorpos.x,2) + Math.pow(position.y - cursorpos.y,2));
					var targettype = this.typelibrary.get("target");
					var entitytarget = targettype.createEntity([new ludumdare.model.PositionComponent(cursorpos.x,cursorpos.y,50,40,0,15),new ludumdare.model.PlayerComponent(),new ludumdare.model.VelocityComponent(),new ludumdare.model.TargetComponent(targetsystem.tempIDtarget,true),new ludumdare.model.CollisionComponent()]);
					this.model.addEntity(entitytarget);
					targetsystem.tempIDtarget += 1;
					ludumdare.model.FieldPlacementSystem.coexistingenergie -= 9000;
				}
			}
			if(position.x < 0 || position.x > 600 || position.y < 0 || position.y > 400) this.model.removeEntity(entity);
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
		return ludumdare.model.GestionBirdSystem;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ludumdare.model.GestionBirdSystem
};
ludumdare.model.GestionConnectionSystem = function(typelibrary) {
	this.typelibrary = typelibrary;
	this.registeredEntities = new Array();
	this._entityRegistrar = new haxe.ds.ObjectMap();
	this._requiredEntityComponents = [ludumdare.model.ConnectionComponent];
};
$hxClasses["ludumdare.model.GestionConnectionSystem"] = ludumdare.model.GestionConnectionSystem;
ludumdare.model.GestionConnectionSystem.__name__ = ["ludumdare","model","GestionConnectionSystem"];
ludumdare.model.GestionConnectionSystem.__interfaces__ = [wighawag.system.Updatable,wighawag.system.SystemComponent];
ludumdare.model.GestionConnectionSystem.prototype = {
	onEntityRegistered: function(entity) {
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
		return ludumdare.model.GestionConnectionSystem;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ludumdare.model.GestionConnectionSystem
};
ludumdare.model.GestionCursorSystem = function(typelibrary) {
	this.typelibrary = typelibrary;
	this.registeredEntities = new Array();
	this._entityRegistrar = new haxe.ds.ObjectMap();
	this._requiredEntityComponents = [ludumdare.model.CursorComponent];
};
$hxClasses["ludumdare.model.GestionCursorSystem"] = ludumdare.model.GestionCursorSystem;
ludumdare.model.GestionCursorSystem.__name__ = ["ludumdare","model","GestionCursorSystem"];
ludumdare.model.GestionCursorSystem.__interfaces__ = [wighawag.system.Updatable,wighawag.system.SystemComponent];
ludumdare.model.GestionCursorSystem.prototype = {
	onEntityRegistered: function(entity) {
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
		return ludumdare.model.GestionCursorSystem;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ludumdare.model.GestionCursorSystem
};
ludumdare.model.GestionDynamicSystem = function(typelibrary) {
	this.typelibrary = typelibrary;
	this.registeredEntities = new Array();
	this._entityRegistrar = new haxe.ds.ObjectMap();
	this._requiredEntityComponents = [ludumdare.model.VelocityComponent,ludumdare.model.PositionComponent];
};
$hxClasses["ludumdare.model.GestionDynamicSystem"] = ludumdare.model.GestionDynamicSystem;
ludumdare.model.GestionDynamicSystem.__name__ = ["ludumdare","model","GestionDynamicSystem"];
ludumdare.model.GestionDynamicSystem.__interfaces__ = [wighawag.system.Updatable,wighawag.system.SystemComponent];
ludumdare.model.GestionDynamicSystem.prototype = {
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
			var placementcomponent = entity.get(ludumdare.model.PositionComponent);
			var velocitycomponent = entity.get(ludumdare.model.VelocityComponent);
			placementcomponent.x += velocitycomponent.vX;
			placementcomponent.y += velocitycomponent.vY;
			if(entity.has([ludumdare.model.CursorComponent])) {
				if(placementcomponent.x < 0) placementcomponent.x = 0; else if(placementcomponent.x > 600) placementcomponent.x = 600;
				if(placementcomponent.y < 0) placementcomponent.y = 0; else if(placementcomponent.y > 400) placementcomponent.y = 400;
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
		return ludumdare.model.GestionDynamicSystem;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ludumdare.model.GestionDynamicSystem
};
ludumdare.model.GestionFruitSystem = function(typelibrary) {
	this.typelibrary = typelibrary;
	this.registeredEntities = new Array();
	this._entityRegistrar = new haxe.ds.ObjectMap();
	this._requiredEntityComponents = [ludumdare.model.FruitComponent];
};
$hxClasses["ludumdare.model.GestionFruitSystem"] = ludumdare.model.GestionFruitSystem;
ludumdare.model.GestionFruitSystem.__name__ = ["ludumdare","model","GestionFruitSystem"];
ludumdare.model.GestionFruitSystem.__interfaces__ = [wighawag.system.Updatable,wighawag.system.SystemComponent];
ludumdare.model.GestionFruitSystem.prototype = {
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
			var fruit = entity.get(ludumdare.model.FruitComponent);
			var position = entity.get(ludumdare.model.PositionComponent);
			var selected = entity.get(ludumdare.model.SelectionComponent);
			if(fruit.growingprocess < fruit.maxgrowing) fruit.growingprocess += 1; else fruit.riped = true;
			if(selected.subselected == true) {
				var birdtype = this.typelibrary.get("bird");
				var entitytree = birdtype.createEntity([new ludumdare.model.PositionComponent(0,0,0,0,0,20),new ludumdare.model.PlayerComponent(),new ludumdare.model.VelocityComponent(0.5 * position.x / Math.sqrt(position.x * position.x + position.y * position.y),0.5 * position.y / Math.sqrt(position.x * position.x + position.y * position.y)),new ludumdare.model.BirdComponent(position.x,position.y),new ludumdare.model.CollisionComponent(),new ludumdare.model.SelectionComponent()]);
				this.model.addEntity(entitytree);
				selected.subselected = false;
				fruit.riped = false;
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
		return ludumdare.model.GestionFruitSystem;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ludumdare.model.GestionFruitSystem
};
ludumdare.model.GestionGameGoalSystem = function(typelibrary) {
	this.timeelapsed = 0;
	this.completed = false;
	this.typelibrary = typelibrary;
	this.registeredEntities = new Array();
	this._entityRegistrar = new haxe.ds.ObjectMap();
	this._requiredEntityComponents = [];
};
$hxClasses["ludumdare.model.GestionGameGoalSystem"] = ludumdare.model.GestionGameGoalSystem;
ludumdare.model.GestionGameGoalSystem.__name__ = ["ludumdare","model","GestionGameGoalSystem"];
ludumdare.model.GestionGameGoalSystem.__interfaces__ = [wighawag.system.Updatable,wighawag.system.SystemComponent];
ludumdare.model.GestionGameGoalSystem.prototype = {
	onEntityRegistered: function(entity) {
	}
	,onEntityUnregistered: function(entity) {
	}
	,initialise: function() {
	}
	,update: function(dt,now) {
		this.timeelapsed += dt;
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
		return ludumdare.model.GestionGameGoalSystem;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ludumdare.model.GestionGameGoalSystem
};
ludumdare.model.GestionMushroomSystem = function(typelibrary) {
	this.typelibrary = typelibrary;
	this.registeredEntities = new Array();
	this._entityRegistrar = new haxe.ds.ObjectMap();
	this._requiredEntityComponents = [ludumdare.model.MushroomComponent];
};
$hxClasses["ludumdare.model.GestionMushroomSystem"] = ludumdare.model.GestionMushroomSystem;
ludumdare.model.GestionMushroomSystem.__name__ = ["ludumdare","model","GestionMushroomSystem"];
ludumdare.model.GestionMushroomSystem.__interfaces__ = [wighawag.system.Updatable,wighawag.system.SystemComponent];
ludumdare.model.GestionMushroomSystem.prototype = {
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
			var mushroom = entity.get(ludumdare.model.MushroomComponent);
			var position = entity.get(ludumdare.model.PositionComponent);
			var selected = entity.get(ludumdare.model.SelectionComponent);
			ludumdare.model.FieldPlacementSystem.coexistingenergie += mushroom.connections * mushroom.connections;
			var poolenergie = ludumdare.model.FieldPlacementSystem.coexistingenergie;
			if(mushroom.supportgrowth < 0) mushroom.supportgrowth = 0;
			mushroom.energie -= mushroom.supportgrowth;
			if(mushroom.energie <= 0) mushroom.supportgrowth = 0;
			if(selected.selected == true) {
				var cursorentity = this.model.get(ludumdare.model.GestionCursorSystem).registeredEntities[0];
				var cursor = cursorentity.get(ludumdare.model.CursorComponent);
				if(cursor.action1 == true && cursor.action2 == false && cursor.action3 == false && mushroom.energie > 500 && mushroom.connections < 3) {
					cursor.requiresubselection = true;
					mushroom.connectioncreation = true;
				} else if(cursor.desaction1 == true && cursor.action2 == false && cursor.action3 == false && mushroom.connectioncreation == true) {
					cursor.requiresubselection = false;
					mushroom.connectioncreation = false;
				} else if(cursor.action1 == false && cursor.action2 == true && cursor.action3 == false && mushroom.energie > 10) {
					cursor.requiresubselection = true;
					mushroom.trytosupportgrowth = true;
				} else if(cursor.action1 == false && cursor.desaction2 == true && cursor.action3 == false && mushroom.trytosupportgrowth == true) {
					cursor.requiresubselection = false;
					mushroom.trytosupportgrowth = false;
				} else if(cursor.action1 == false && cursor.action2 == false && cursor.action3 == true && poolenergie > 15000) {
					cursor.requiresubselection = true;
					mushroom.createoffsprings = true;
				} else if(cursor.action1 == false && cursor.action2 == false && cursor.desaction3 == true && mushroom.createoffsprings == true) {
					cursor.requiresubselection = false;
					mushroom.createoffsprings = false;
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
		return ludumdare.model.GestionMushroomSystem;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ludumdare.model.GestionMushroomSystem
};
ludumdare.model.GestionTargetSystem = function(typelibrary) {
	this.tempIDtarget = 0;
	this.typelibrary = typelibrary;
	this.registeredEntities = new Array();
	this._entityRegistrar = new haxe.ds.ObjectMap();
	this._requiredEntityComponents = [ludumdare.model.TargetComponent];
};
$hxClasses["ludumdare.model.GestionTargetSystem"] = ludumdare.model.GestionTargetSystem;
ludumdare.model.GestionTargetSystem.__name__ = ["ludumdare","model","GestionTargetSystem"];
ludumdare.model.GestionTargetSystem.__interfaces__ = [wighawag.system.Updatable,wighawag.system.SystemComponent];
ludumdare.model.GestionTargetSystem.prototype = {
	onEntityRegistered: function(entity) {
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
		return ludumdare.model.GestionTargetSystem;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ludumdare.model.GestionTargetSystem
};
ludumdare.model.GestionTreeSystem = function(typelibrary) {
	this.typelibrary = typelibrary;
	this.registeredEntities = new Array();
	this._entityRegistrar = new haxe.ds.ObjectMap();
	this._requiredEntityComponents = [ludumdare.model.TreeComponent];
};
$hxClasses["ludumdare.model.GestionTreeSystem"] = ludumdare.model.GestionTreeSystem;
ludumdare.model.GestionTreeSystem.__name__ = ["ludumdare","model","GestionTreeSystem"];
ludumdare.model.GestionTreeSystem.__interfaces__ = [wighawag.system.Updatable,wighawag.system.SystemComponent];
ludumdare.model.GestionTreeSystem.prototype = {
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
			var tree = entity.get(ludumdare.model.TreeComponent);
			var position = entity.get(ludumdare.model.PositionComponent);
			if(position.x > 480 && position.y > 280) this.model.get(ludumdare.model.GestionGameGoalSystem).completed = true;
			tree.age += 1;
			if(tree.age > 8000) this.model.removeEntity(entity); else if(tree.age > 2000 && tree.mature == false) tree.mature = true;
			if(tree.receiveageboost) {
				var mushroomentities = this.model.get(ludumdare.model.GestionMushroomSystem).registeredEntities;
				var _g2 = 0;
				while(_g2 < mushroomentities.length) {
					var entitymushroom = mushroomentities[_g2];
					++_g2;
					var mushroom = entitymushroom.get(ludumdare.model.MushroomComponent);
					if(mushroom.tempIDmushroom == tree.mushroomsuporteer) {
						if(tree.mature == false) {
							if(mushroom.supportgrowth > 0) tree.age += 10; else tree.receiveageboost = false;
						} else {
							mushroom.supportgrowth -= 1;
							tree.receiveageboost = false;
						}
					}
				}
			}
			if(tree.isconnected) ludumdare.model.FieldPlacementSystem.coexistingenergie += 1;
			var poolenergie = ludumdare.model.FieldPlacementSystem.coexistingenergie;
			if(tree.givesap) {
				var mushroomentities1 = this.model.get(ludumdare.model.GestionMushroomSystem).registeredEntities;
				var _g21 = 0;
				while(_g21 < mushroomentities1.length) {
					var entitymushroom1 = mushroomentities1[_g21];
					++_g21;
					var mushroom1 = entitymushroom1.get(ludumdare.model.MushroomComponent);
					if(mushroom1.tempIDmushroom == tree.sapaim) mushroom1.energie += 1;
				}
			} else if(tree.energie < tree.maxenergie && tree.mature == true) tree.energie += 1;
			var selected = entity.get(ludumdare.model.SelectionComponent);
			if(tree.growcooldown > 0) tree.growcooldown -= 1;
			if(selected.selected == true && tree.mature == true) {
				var cursorentity = this.model.get(ludumdare.model.GestionCursorSystem).registeredEntities[0];
				var cursor = cursorentity.get(ludumdare.model.CursorComponent);
				if(cursor.action1 == true && cursor.action2 == false && cursor.action3 == false && cursor.requiresubselection == false && tree.energie >= 500 && tree.growcooldown < 1 && tree.growedfruit < tree.maxlifetimefruit) {
					tree.growedfruit += 1;
					tree.energie -= 500;
					tree.growcooldown = 500;
					var rayon = 2 * Math.PI * Math.random();
					var treetype = this.typelibrary.get("tree");
					var entitytree = treetype.createEntity([new ludumdare.model.PositionComponent(position.x + position.radius * Math.cos(rayon),position.y + position.radius * Math.sin(rayon),0,0,0,10),new ludumdare.model.PlayerComponent(),new ludumdare.model.FruitComponent(tree.tempIDtree),new ludumdare.model.CollisionComponent(),new ludumdare.model.SelectionComponent()]);
					this.model.addEntity(entitytree);
				}
				if(cursor.action1 == false && cursor.action2 == true && cursor.action3 == false && poolenergie >= 3000 && tree.isconnected == true) {
					cursor.requiresubselection = true;
					tree.callbird = true;
				} else if(cursor.action1 == false && cursor.desaction2 == true && cursor.action3 == false && tree.callbird == true) {
					cursor.requiresubselection = false;
					tree.callbird = false;
				} else if(cursor.action1 == false && cursor.action2 == false && cursor.action3 == true && tree.energie >= 0 && tree.givesap == false && tree.isconnected == true) {
					cursor.requiresubselection = true;
					tree.trytogivesap = true;
				} else if(cursor.action1 == false && cursor.action2 == false && cursor.desaction3 == true && tree.trytogivesap == true) {
					cursor.requiresubselection = false;
					tree.trytogivesap = false;
				} else if(cursor.action1 == false && cursor.action2 == false && cursor.action3 == true && tree.givesap == true) {
					tree.givesap = false;
					var mushroomentities2 = this.model.get(ludumdare.model.GestionMushroomSystem).registeredEntities;
					var _g22 = 0;
					while(_g22 < mushroomentities2.length) {
						var entitymushroom2 = mushroomentities2[_g22];
						++_g22;
						var mushroom2 = entitymushroom2.get(ludumdare.model.MushroomComponent);
						if(mushroom2.tempIDmushroom == tree.sapaim) mushroom2.receiveenergie -= 1;
					}
				}
			}
		}
		var targetentity = this.model.get(ludumdare.model.GestionTargetSystem);
		var _g3 = 0;
		var _g11 = targetentity.registeredEntities;
		while(_g3 < _g11.length) {
			var entitytarget = _g11[_g3];
			++_g3;
			if(entitytarget.get(ludumdare.model.TargetComponent).hasbeenreached == true) {
				var position1 = entitytarget.get(ludumdare.model.PositionComponent);
				var treetype1 = this.typelibrary.get("tree");
				var entitytree1 = treetype1.createEntity([new ludumdare.model.PositionComponent(position1.x,position1.y,0,0,0,40),new ludumdare.model.PlayerComponent(),new ludumdare.model.TreeComponent(this.model.get(ludumdare.model.FieldPlacementSystem).tempIDtree),new ludumdare.model.SelectionComponent(),new ludumdare.model.CollisionComponent()]);
				this.model.addEntity(entitytree1);
				this.model.get(ludumdare.model.FieldPlacementSystem).tempIDtree += 1;
				this.model.removeEntity(entitytarget);
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
		return ludumdare.model.GestionTreeSystem;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ludumdare.model.GestionTreeSystem
};
ludumdare.model.MushroomComponent = function(tempIDmushroom,connections,energie) {
	if(energie == null) energie = 0;
	if(connections == null) connections = 0;
	this.treegiver = 0;
	this.receiveenergie = 0;
	this.energie = 510;
	this.createoffsprings = false;
	this.supportgrowth = 0;
	this.trytosupportgrowth = false;
	this.connectioncreation = false;
	this.connections = 0;
	this.tempIDmushroom = 0;
	this.connections = connections;
	this.tempIDmushroom = tempIDmushroom;
	this.energie = energie;
};
$hxClasses["ludumdare.model.MushroomComponent"] = ludumdare.model.MushroomComponent;
ludumdare.model.MushroomComponent.__name__ = ["ludumdare","model","MushroomComponent"];
ludumdare.model.MushroomComponent.__interfaces__ = [wighawag.system.EntityComponent];
ludumdare.model.MushroomComponent.prototype = {
	initialise: function() {
	}
	,attachEntity: function(anEntity) {
		var missingComponents = new Array();
		if(missingComponents.length > 0) {
			haxe.Log.trace("" + Std.string(Type.getClass(this)) + " disabled as the entity type does not have these required components " + Std.string(missingComponents),{ fileName : "EntityComponent.hx", lineNumber : 11, className : "ludumdare.model.MushroomComponent", methodName : "attachEntity"});
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
		return ludumdare.model.MushroomComponent;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ludumdare.model.MushroomComponent
};
ludumdare.model.MushroomTypeComponent = function() {
	this.reserve = 1;
};
$hxClasses["ludumdare.model.MushroomTypeComponent"] = ludumdare.model.MushroomTypeComponent;
ludumdare.model.MushroomTypeComponent.__name__ = ["ludumdare","model","MushroomTypeComponent"];
ludumdare.model.MushroomTypeComponent.__interfaces__ = [wighawag.system.EntityTypeComponent];
ludumdare.model.MushroomTypeComponent.prototype = {
	populateEntity: function(entityComponents) {
	}
	,initialise: function() {
	}
	,attach: function(componentOwner) {
		this.owner = componentOwner;
		return ludumdare.model.MushroomTypeComponent;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ludumdare.model.MushroomTypeComponent
};
ludumdare.model.PlayerComponent = function() {
	this.motorpower = 1;
	this.facteuraerodynamic = 0.5;
	this.wheelsdirright = 0;
	this.wheelsdirleft = 0;
	this.gear = 1;
	this.handbreak = true;
	this.breakpressure = 1;
	this.pedalpressure = 1;
};
$hxClasses["ludumdare.model.PlayerComponent"] = ludumdare.model.PlayerComponent;
ludumdare.model.PlayerComponent.__name__ = ["ludumdare","model","PlayerComponent"];
ludumdare.model.PlayerComponent.__interfaces__ = [wighawag.system.EntityComponent];
ludumdare.model.PlayerComponent.prototype = {
	initialise: function() {
	}
	,attachEntity: function(anEntity) {
		var missingComponents = new Array();
		if(missingComponents.length > 0) {
			haxe.Log.trace("" + Std.string(Type.getClass(this)) + " disabled as the entity type does not have these required components " + Std.string(missingComponents),{ fileName : "EntityComponent.hx", lineNumber : 11, className : "ludumdare.model.PlayerComponent", methodName : "attachEntity"});
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
		return ludumdare.model.PlayerComponent;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ludumdare.model.PlayerComponent
};
ludumdare.model.PositionComponent = function(x,y,width,height,angle,radius) {
	this.radius = 0;
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
	this.radius = radius;
};
$hxClasses["ludumdare.model.PositionComponent"] = ludumdare.model.PositionComponent;
ludumdare.model.PositionComponent.__name__ = ["ludumdare","model","PositionComponent"];
ludumdare.model.PositionComponent.__interfaces__ = [wighawag.system.EntityComponent];
ludumdare.model.PositionComponent.prototype = {
	initialise: function() {
	}
	,attachEntity: function(anEntity) {
		var missingComponents = new Array();
		if(missingComponents.length > 0) {
			haxe.Log.trace("" + Std.string(Type.getClass(this)) + " disabled as the entity type does not have these required components " + Std.string(missingComponents),{ fileName : "EntityComponent.hx", lineNumber : 11, className : "ludumdare.model.PositionComponent", methodName : "attachEntity"});
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
		return ludumdare.model.PositionComponent;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ludumdare.model.PositionComponent
};
ludumdare.model.SelectionComponent = function() {
	this.subselected = false;
	this.selected = false;
};
$hxClasses["ludumdare.model.SelectionComponent"] = ludumdare.model.SelectionComponent;
ludumdare.model.SelectionComponent.__name__ = ["ludumdare","model","SelectionComponent"];
ludumdare.model.SelectionComponent.__interfaces__ = [wighawag.system.EntityComponent];
ludumdare.model.SelectionComponent.prototype = {
	initialise: function() {
	}
	,attachEntity: function(anEntity) {
		var missingComponents = new Array();
		if(missingComponents.length > 0) {
			haxe.Log.trace("" + Std.string(Type.getClass(this)) + " disabled as the entity type does not have these required components " + Std.string(missingComponents),{ fileName : "EntityComponent.hx", lineNumber : 11, className : "ludumdare.model.SelectionComponent", methodName : "attachEntity"});
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
		return ludumdare.model.SelectionComponent;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ludumdare.model.SelectionComponent
};
ludumdare.model.TargetComponent = function(tempIDtarget,hasbeentargeted) {
	this.tempIDtarget = 0;
	this.hasbeenreached = false;
	this.hasbeentargeted = false;
	this.targetY = 0;
	this.targetX = 0;
	this.tempIDtarget = tempIDtarget;
	this.hasbeentargeted = hasbeentargeted;
};
$hxClasses["ludumdare.model.TargetComponent"] = ludumdare.model.TargetComponent;
ludumdare.model.TargetComponent.__name__ = ["ludumdare","model","TargetComponent"];
ludumdare.model.TargetComponent.__interfaces__ = [wighawag.system.EntityComponent];
ludumdare.model.TargetComponent.prototype = {
	initialise: function() {
	}
	,attachEntity: function(anEntity) {
		var missingComponents = new Array();
		if(missingComponents.length > 0) {
			haxe.Log.trace("" + Std.string(Type.getClass(this)) + " disabled as the entity type does not have these required components " + Std.string(missingComponents),{ fileName : "EntityComponent.hx", lineNumber : 11, className : "ludumdare.model.TargetComponent", methodName : "attachEntity"});
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
		return ludumdare.model.TargetComponent;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ludumdare.model.TargetComponent
};
ludumdare.model.TargetTypeComponent = function() {
	this.lifeforce = 1;
};
$hxClasses["ludumdare.model.TargetTypeComponent"] = ludumdare.model.TargetTypeComponent;
ludumdare.model.TargetTypeComponent.__name__ = ["ludumdare","model","TargetTypeComponent"];
ludumdare.model.TargetTypeComponent.__interfaces__ = [wighawag.system.EntityTypeComponent];
ludumdare.model.TargetTypeComponent.prototype = {
	populateEntity: function(entityComponents) {
	}
	,initialise: function() {
	}
	,attach: function(componentOwner) {
		this.owner = componentOwner;
		return ludumdare.model.TargetTypeComponent;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ludumdare.model.TargetTypeComponent
};
ludumdare.model.TreeComponent = function(tempIDtree,age,isconnected,mature,energie) {
	if(energie == null) energie = 0;
	if(mature == null) mature = false;
	if(isconnected == null) isconnected = false;
	if(age == null) age = 0;
	this.poolenergie = 1;
	this.tempIDtree = 0;
	this.hasripedfruit = false;
	this.targetbirdY = 0;
	this.targetbirdX = 0;
	this.sendbird = false;
	this.callbird = false;
	this.maxmushroomconnected = 2;
	this.mushroomconnected = 0;
	this.maxsapenergie = 10;
	this.mushroomsuporteer = 0;
	this.ageboost = 0;
	this.receiveageboost = false;
	this.connectioncreation = false;
	this.isconnected = false;
	this.sapaim = 0;
	this.givesap = false;
	this.trytogivesap = false;
	this.maxlifetimefruit = 2;
	this.growcooldown = 0;
	this.growedfruit = 0;
	this.maxenergie = 1000;
	this.energie = 0;
	this.mature = false;
	this.age = 0;
	this.tempIDtree = tempIDtree;
	this.age = age;
	this.isconnected = isconnected;
	this.mature = mature;
	this.energie = energie;
};
$hxClasses["ludumdare.model.TreeComponent"] = ludumdare.model.TreeComponent;
ludumdare.model.TreeComponent.__name__ = ["ludumdare","model","TreeComponent"];
ludumdare.model.TreeComponent.__interfaces__ = [wighawag.system.EntityComponent];
ludumdare.model.TreeComponent.prototype = {
	initialise: function() {
	}
	,attachEntity: function(anEntity) {
		var missingComponents = new Array();
		if(missingComponents.length > 0) {
			haxe.Log.trace("" + Std.string(Type.getClass(this)) + " disabled as the entity type does not have these required components " + Std.string(missingComponents),{ fileName : "EntityComponent.hx", lineNumber : 11, className : "ludumdare.model.TreeComponent", methodName : "attachEntity"});
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
		return ludumdare.model.TreeComponent;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ludumdare.model.TreeComponent
};
ludumdare.model.TreeTypeComponent = function() {
	this.lifeforce = 1;
};
$hxClasses["ludumdare.model.TreeTypeComponent"] = ludumdare.model.TreeTypeComponent;
ludumdare.model.TreeTypeComponent.__name__ = ["ludumdare","model","TreeTypeComponent"];
ludumdare.model.TreeTypeComponent.__interfaces__ = [wighawag.system.EntityTypeComponent];
ludumdare.model.TreeTypeComponent.prototype = {
	populateEntity: function(entityComponents) {
	}
	,initialise: function() {
	}
	,attach: function(componentOwner) {
		this.owner = componentOwner;
		return ludumdare.model.TreeTypeComponent;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ludumdare.model.TreeTypeComponent
};
ludumdare.model.VelocityComponent = function(vX,vY) {
	if(vY == null) vY = 0;
	if(vX == null) vX = 0;
	this.vRotation = 0;
	this.vNorme = 0;
	this.vZ = 0;
	this.vY = 0;
	this.vX = 0;
	this.v = { x : 0, y : 0};
	this.vX = vX;
	this.vY = vY;
};
$hxClasses["ludumdare.model.VelocityComponent"] = ludumdare.model.VelocityComponent;
ludumdare.model.VelocityComponent.__name__ = ["ludumdare","model","VelocityComponent"];
ludumdare.model.VelocityComponent.__interfaces__ = [wighawag.system.EntityComponent];
ludumdare.model.VelocityComponent.prototype = {
	initialise: function() {
	}
	,attachEntity: function(anEntity) {
		var missingComponents = new Array();
		if(missingComponents.length > 0) {
			haxe.Log.trace("" + Std.string(Type.getClass(this)) + " disabled as the entity type does not have these required components " + Std.string(missingComponents),{ fileName : "EntityComponent.hx", lineNumber : 11, className : "ludumdare.model.VelocityComponent", methodName : "attachEntity"});
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
		return ludumdare.model.VelocityComponent;
	}
	,detach: function() {
		this.owner = null;
	}
	,__class__: ludumdare.model.VelocityComponent
};
ludumdare.view = {};
ludumdare.view.GameView = function(model,canvasCtx,fieldImage) {
	this.model = model;
	this.canvasCtx = canvasCtx;
	this.fieldImage = fieldImage;
};
$hxClasses["ludumdare.view.GameView"] = ludumdare.view.GameView;
ludumdare.view.GameView.__name__ = ["ludumdare","view","GameView"];
ludumdare.view.GameView.prototype = {
	render: function() {
		this.canvasCtx.clearRect(0,0,600,400);
		this.canvasCtx.drawImage(this.fieldImage["native"],0,0);
		var _g = 0;
		var _g1 = this.model.entities;
		while(_g < _g1.length) {
			var entity = _g1[_g];
			++_g;
			if(entity.has([ludumdare.model.TreeComponent])) {
				var placementComponent = entity.get(ludumdare.model.PositionComponent);
				var selected = entity.get(ludumdare.model.SelectionComponent);
				if(selected.selected == true) {
					this.canvasCtx.beginPath();
					this.canvasCtx.arc(placementComponent.x,placementComponent.y,placementComponent.radius,0,Math.PI * 2,true);
					this.canvasCtx.lineWidth = 2;
					this.canvasCtx.strokeStyle = "rgb(150,210,32)";
					this.canvasCtx.stroke();
					this.canvasCtx.closePath();
				}
				this.canvasCtx.fillStyle = "rgb(170,120,40)";
				this.canvasCtx.beginPath();
				this.canvasCtx.arc(placementComponent.x,placementComponent.y,placementComponent.radius,0,Math.PI * 2,true);
				this.canvasCtx.closePath();
				this.canvasCtx.fill();
			} else if(entity.has([ludumdare.model.FruitComponent])) {
				var selected1 = entity.get(ludumdare.model.SelectionComponent);
				var placementComponent1 = entity.get(ludumdare.model.PositionComponent);
				if(selected1.subselected == true) {
					this.canvasCtx.beginPath();
					this.canvasCtx.arc(placementComponent1.x,placementComponent1.y,placementComponent1.radius,0,Math.PI * 2,true);
					this.canvasCtx.lineWidth = 4;
					this.canvasCtx.strokeStyle = "rgb(210,60,52)";
					this.canvasCtx.stroke();
					this.canvasCtx.closePath();
				}
				this.canvasCtx.fillStyle = "rgb(112,0,0)";
				this.canvasCtx.beginPath();
				this.canvasCtx.arc(placementComponent1.x,placementComponent1.y,placementComponent1.radius,0,Math.PI * 2,true);
				this.canvasCtx.closePath();
				this.canvasCtx.fill();
			} else if(entity.has([ludumdare.model.BirdComponent])) {
				var selected2 = entity.get(ludumdare.model.SelectionComponent);
				var placementComponent2 = entity.get(ludumdare.model.PositionComponent);
				var birdComponent = entity.get(ludumdare.model.BirdComponent);
				if(selected2.selected == true) {
					this.canvasCtx.beginPath();
					this.canvasCtx.arc(placementComponent2.x,placementComponent2.y,placementComponent2.radius,0,Math.PI * 2,true);
					this.canvasCtx.lineWidth = 2;
					this.canvasCtx.strokeStyle = "rgb(150,210,32)";
					this.canvasCtx.stroke();
					this.canvasCtx.closePath();
					this.canvasCtx.beginPath();
					this.canvasCtx.arc(placementComponent2.x,placementComponent2.y,150,0,Math.PI * 2,true);
					this.canvasCtx.lineWidth = 10;
					this.canvasCtx.strokeStyle = "rgba(0,255,0,0.5)";
					this.canvasCtx.stroke();
					this.canvasCtx.closePath();
				}
				if(birdComponent.hasseed == true) this.canvasCtx.fillStyle = "rgb(240,230,40)"; else this.canvasCtx.fillStyle = "rgb(140,130,40)";
				this.canvasCtx.beginPath();
				this.canvasCtx.arc(placementComponent2.x,placementComponent2.y,placementComponent2.radius,0,Math.PI * 2,true);
				this.canvasCtx.closePath();
				this.canvasCtx.fill();
			} else if(entity.has([ludumdare.model.CursorComponent])) {
				this.canvasCtx.fillStyle = "rgba(255,255,255,0.7)";
				var placementComponent3 = entity.get(ludumdare.model.PositionComponent);
				this.canvasCtx.beginPath();
				this.canvasCtx.arc(placementComponent3.x,placementComponent3.y,placementComponent3.radius,0,Math.PI * 2,true);
				this.canvasCtx.closePath();
				this.canvasCtx.fill();
			} else if(entity.has([ludumdare.model.MushroomComponent])) {
				var placementComponent4 = entity.get(ludumdare.model.PositionComponent);
				var selected3 = entity.get(ludumdare.model.SelectionComponent);
				if(selected3.selected == true) {
					this.canvasCtx.beginPath();
					this.canvasCtx.arc(placementComponent4.x,placementComponent4.y,placementComponent4.radius,0,Math.PI * 2,true);
					this.canvasCtx.lineWidth = 2;
					this.canvasCtx.strokeStyle = "rgb(150,210,32)";
					this.canvasCtx.stroke();
					this.canvasCtx.closePath();
				}
				this.canvasCtx.fillStyle = "rgb(120,100,200)";
				this.canvasCtx.beginPath();
				this.canvasCtx.arc(placementComponent4.x,placementComponent4.y,placementComponent4.radius,0,Math.PI * 2,true);
				this.canvasCtx.closePath();
				this.canvasCtx.fill();
			} else if(entity.has([ludumdare.model.ConnectionComponent])) {
				var placementComponent5 = entity.get(ludumdare.model.PositionComponent);
				var connectionComponent = entity.get(ludumdare.model.ConnectionComponent);
				this.canvasCtx.fillStyle = "rgb(120,100,200)";
				this.canvasCtx.beginPath();
				this.canvasCtx.moveTo(placementComponent5.x,placementComponent5.y);
				this.canvasCtx.lineTo(connectionComponent.connectedX,connectionComponent.connectedY);
				this.canvasCtx.lineWidth = 2;
				this.canvasCtx.strokeStyle = "rgb(250,250,250)";
				this.canvasCtx.stroke();
				this.canvasCtx.closePath();
			}
		}
	}
	,__class__: ludumdare.view.GameView
};
ludumdare.view.Presenter = function(canvasRenderer,batch) {
	this.entityUnderMouse = null;
	this.entitiesRegistered = new Array();
	this._canvasRenderer = canvasRenderer;
	this._batch = batch;
	this.onMouseClicked = tink.core._Signal.SignalTrigger_Impl_.asSignal(this._onMouseClicked = tink.core._Signal.Signal_Impl_.trigger());
	this.onMouseDown = tink.core._Signal.SignalTrigger_Impl_.asSignal(this._onMouseDown = tink.core._Signal.Signal_Impl_.trigger());
	this.onMouseUp = tink.core._Signal.SignalTrigger_Impl_.asSignal(this._onMouseUp = tink.core._Signal.Signal_Impl_.trigger());
};
$hxClasses["ludumdare.view.Presenter"] = ludumdare.view.Presenter;
ludumdare.view.Presenter.__name__ = ["ludumdare","view","Presenter"];
ludumdare.view.Presenter.__interfaces__ = [wighawag.system.Updatable];
ludumdare.view.Presenter.prototype = {
	get_onMouseClicked: function() {
		return tink.core._Signal.SignalTrigger_Impl_.asSignal(this._onMouseClicked);
	}
	,get_onMouseUp: function() {
		return tink.core._Signal.SignalTrigger_Impl_.asSignal(this._onMouseUp);
	}
	,get_onMouseDown: function() {
		return tink.core._Signal.SignalTrigger_Impl_.asSignal(this._onMouseDown);
	}
	,get_mouseX: function() {
		return this._canvasRenderer.mouseX;
	}
	,get_mouseY: function() {
		return this._canvasRenderer.mouseY;
	}
	,present: function(model) {
		model.onEntityAdded.add($bind(this,this.entityAdded));
		model.onEntityRemoved.add($bind(this,this.entityRemoved));
		var _g = 0;
		var _g1 = model.entities;
		while(_g < _g1.length) {
			var entity = _g1[_g];
			++_g;
			this.entityAdded(entity);
		}
		var this1 = this._canvasRenderer.get_onMouseClicked();
		this1($bind(this,this.mouseClicked));
		var this2 = this._canvasRenderer.get_onMouseDown();
		this2($bind(this,this.mouseDown));
		var this3 = this._canvasRenderer.get_onMouseUp();
		this3($bind(this,this.mouseUp));
	}
	,mouseClicked: function(evt) {
		tink.core._Callback.CallbackList_Impl_.invoke(this._onMouseClicked,evt);
	}
	,mouseDown: function(evt) {
		tink.core._Callback.CallbackList_Impl_.invoke(this._onMouseDown,evt);
	}
	,mouseUp: function(evt) {
		tink.core._Callback.CallbackList_Impl_.invoke(this._onMouseUp,evt);
	}
	,entityAdded: function(entity) {
		if(entity.get(ludumdare.model.PositionComponent) != null) this.entitiesRegistered.push(entity);
	}
	,entityRemoved: function(entity) {
		if(entity.get(ludumdare.model.PositionComponent) != null) HxOverrides.remove(this.entitiesRegistered,entity);
	}
	,update: function(dt,now) {
		this._canvasRenderer.clear();
		var fieldImage = this._batch.get("img/field.png");
		this._canvasRenderer.drawImage(fieldImage,0,0,null,null);
		this.entityUnderMouse = null;
		var _g = 0;
		var _g1 = this.entitiesRegistered;
		while(_g < _g1.length) {
			var entity = _g1[_g];
			++_g;
			var placementComponent = entity.get(ludumdare.model.PositionComponent);
			this._canvasRenderer._canvasCtx.save();
			this._canvasRenderer._canvasCtx.beginPath();
			this._canvasRenderer._canvasCtx.arc(20,10,10,0,2 * Math.PI,false);
			this._canvasRenderer._canvasCtx.clip();
			this._canvasRenderer._canvasCtx.fillStyle = "#AADD55";
			var poolenergie = ludumdare.model.FieldPlacementSystem.coexistingenergie;
			this._canvasRenderer.fillRect(10,0,10,poolenergie / 30000 * 10);
			this._canvasRenderer._canvasCtx.restore();
			this._canvasRenderer._canvasCtx.beginPath();
			this._canvasRenderer._canvasCtx.arc(20,10,10,0,2 * Math.PI,false);
			this._canvasRenderer._canvasCtx.lineWidth = 2;
			this._canvasRenderer._canvasCtx.strokeStyle = "#ffffff";
			this._canvasRenderer._canvasCtx.stroke();
			this._canvasRenderer._canvasCtx.fillStyle = "#ffffff";
			this._canvasRenderer._canvasCtx.textAlign = "center";
			this._canvasRenderer._canvasCtx.font = "bold 12px sans-serif";
			this._canvasRenderer._canvasCtx.fillText("CoEnergie: birdaction & fungicreate ",160,10);
			this._canvasRenderer._canvasCtx.fillText("D: Cancel Selection ",350,385);
			if(entity.has([ludumdare.model.CursorComponent])) {
				if(entity.get(ludumdare.model.CursorComponent).requiresubselection == true) {
					this._canvasRenderer._canvasCtx.fillStyle = "#ffffff";
					this._canvasRenderer._canvasCtx.textAlign = "center";
					this._canvasRenderer._canvasCtx.font = "bold 12px sans-serif";
					this._canvasRenderer._canvasCtx.fillText("Select tree, fungi, zone...relative of action ",400,395);
				}
			}
			if(placementComponent.x - placementComponent.radius < this._canvasRenderer.mouseX && placementComponent.x + placementComponent.radius > this._canvasRenderer.mouseX) this.entityUnderMouse = entity;
			var selected = entity.get(ludumdare.model.SelectionComponent);
			if(selected != null && selected.selected == true) {
				this._canvasRenderer._canvasCtx.beginPath();
				this._canvasRenderer._canvasCtx.arc(placementComponent.x,placementComponent.y,placementComponent.radius,0,Math.PI * 2,true);
				this._canvasRenderer._canvasCtx.lineWidth = 2;
				this._canvasRenderer._canvasCtx.strokeStyle = "rgb(150,210,32)";
				this._canvasRenderer._canvasCtx.stroke();
				this._canvasRenderer._canvasCtx.closePath();
			}
			if(entity.has([ludumdare.model.TreeComponent])) {
				if(selected.selected) {
					var tree = entity.get(ludumdare.model.TreeComponent);
					this._canvasRenderer._canvasCtx.save();
					this._canvasRenderer._canvasCtx.beginPath();
					this._canvasRenderer._canvasCtx.arc(340,10,10,0,2 * Math.PI,false);
					this._canvasRenderer._canvasCtx.clip();
					this._canvasRenderer._canvasCtx.fillStyle = "#13a8a4";
					this._canvasRenderer.fillRect(330,0,10,tree.energie / tree.maxenergie * 10);
					this._canvasRenderer._canvasCtx.restore();
					this._canvasRenderer._canvasCtx.beginPath();
					this._canvasRenderer._canvasCtx.arc(340,10,10,0,2 * Math.PI,false);
					this._canvasRenderer._canvasCtx.lineWidth = 3;
					this._canvasRenderer._canvasCtx.strokeStyle = "#ffffff";
					this._canvasRenderer._canvasCtx.stroke();
					this._canvasRenderer._canvasCtx.fillStyle = "#ffffff";
					this._canvasRenderer._canvasCtx.textAlign = "center";
					this._canvasRenderer._canvasCtx.font = "bold 12px sans-serif";
					this._canvasRenderer._canvasCtx.fillText("Tree Energie: Grow Fruit, Feed Fungi ",480,10);
					this._canvasRenderer._canvasCtx.fillStyle = "#ffffff";
					this._canvasRenderer._canvasCtx.textAlign = "center";
					this._canvasRenderer._canvasCtx.font = "bold 12px sans-serif";
					this._canvasRenderer._canvasCtx.fillText("E: Grow Fruit ",50,390);
					this._canvasRenderer._canvasCtx.fillText("R: Call Bird ",140,390);
					this._canvasRenderer._canvasCtx.fillText("T: Feed Fungi ",230,390);
				}
				var assetComponent = entity.type.get(ludumdare.model.AssetComponent);
				this._canvasRenderer.drawImage(this._batch.get(assetComponent.assetId),placementComponent.x - placementComponent.radius,placementComponent.y - placementComponent.radius,placementComponent.radius * 2,placementComponent.radius * 2);
				var receiveageboost = entity.get(ludumdare.model.TreeComponent).receiveageboost;
				if(receiveageboost) {
					this._canvasRenderer._canvasCtx.beginPath();
					this._canvasRenderer._canvasCtx.arc(placementComponent.x,placementComponent.y,placementComponent.radius - 5,0,Math.PI * 2,true);
					this._canvasRenderer._canvasCtx.lineWidth = 2;
					this._canvasRenderer._canvasCtx.strokeStyle = "rgb(80,0,80)";
					this._canvasRenderer._canvasCtx.stroke();
					this._canvasRenderer._canvasCtx.closePath();
				}
			}
			if(entity.has([ludumdare.model.MushroomComponent])) {
				if(selected.selected) {
					var mushroom = entity.get(ludumdare.model.MushroomComponent);
					this._canvasRenderer._canvasCtx.save();
					this._canvasRenderer._canvasCtx.beginPath();
					this._canvasRenderer._canvasCtx.arc(330,10,10,0,2 * Math.PI,false);
					this._canvasRenderer._canvasCtx.clip();
					this._canvasRenderer._canvasCtx.fillStyle = "#DD5588";
					this._canvasRenderer.fillRect(320,0,10,mushroom.energie / 2000 * 10);
					this._canvasRenderer._canvasCtx.restore();
					this._canvasRenderer._canvasCtx.beginPath();
					this._canvasRenderer._canvasCtx.arc(330,10,10,0,2 * Math.PI,false);
					this._canvasRenderer._canvasCtx.lineWidth = 3;
					this._canvasRenderer._canvasCtx.strokeStyle = "#ffffff";
					this._canvasRenderer._canvasCtx.stroke();
					this._canvasRenderer._canvasCtx.fillStyle = "#ffffff";
					this._canvasRenderer._canvasCtx.textAlign = "center";
					this._canvasRenderer._canvasCtx.font = "bold 12px sans-serif";
					this._canvasRenderer._canvasCtx.fillText("Fungi Energie: Connect,Help Tree ",480,10);
					this._canvasRenderer._canvasCtx.fillStyle = "#ffffff";
					this._canvasRenderer._canvasCtx.textAlign = "center";
					this._canvasRenderer._canvasCtx.font = "bold 12px sans-serif";
					this._canvasRenderer._canvasCtx.fillText("E: Connect ",50,390);
					this._canvasRenderer._canvasCtx.fillText("R: Help Tree",140,390);
					this._canvasRenderer._canvasCtx.fillText("T: New Fungi ",230,390);
				}
				var assetComponent1 = entity.type.get(ludumdare.model.AssetComponent);
				this._canvasRenderer.drawImage(this._batch.get(assetComponent1.assetId),placementComponent.x - placementComponent.radius,placementComponent.y - placementComponent.radius,placementComponent.radius * 2,placementComponent.radius * 2);
			}
			if(entity.has([ludumdare.model.FruitComponent])) {
				if(selected.selected == true) {
					this._canvasRenderer._canvasCtx.shadowColor = "#00ff00";
					this._canvasRenderer._canvasCtx.shadowBlur = 4;
					this._canvasRenderer._canvasCtx.fillStyle = "#ffffff";
					this._canvasRenderer._canvasCtx.textAlign = "center";
					this._canvasRenderer._canvasCtx.font = "bold 12px sans-serif";
					if(entity.get(ludumdare.model.FruitComponent).riped == true) this._canvasRenderer._canvasCtx.fillText("Fruit is ready",50,390);
				}
				if(selected.subselected == true) {
				} else this._canvasRenderer._canvasCtx.shadowBlur = 0;
				this._canvasRenderer.drawImage(this._batch.get("img/fruit.png"),placementComponent.x - placementComponent.radius,placementComponent.y - placementComponent.radius,placementComponent.radius * 2,placementComponent.radius * 2);
			}
			if(entity.has([ludumdare.model.BirdComponent])) {
				if(selected.selected) {
					this._canvasRenderer._canvasCtx.fillStyle = "#ffffff";
					this._canvasRenderer._canvasCtx.textAlign = "center";
					this._canvasRenderer._canvasCtx.font = "bold 12px sans-serif";
					this._canvasRenderer._canvasCtx.fillText("E: Plant Tree",50,390);
				}
				var birdComponent = entity.get(ludumdare.model.BirdComponent);
				if(birdComponent.hasseed == true) this._canvasRenderer._canvasCtx.fillStyle = "rgb(240,230,40)"; else this._canvasRenderer._canvasCtx.fillStyle = "rgb(140,130,40)";
				this._canvasRenderer.drawImage(this._batch.get("img/bird.png"),placementComponent.x - 2 * placementComponent.radius,placementComponent.y - placementComponent.radius,placementComponent.radius * 4,placementComponent.radius * 2);
			}
			if(entity.has([ludumdare.model.ConnectionComponent])) {
				var connectionComponent = entity.get(ludumdare.model.ConnectionComponent);
				this._canvasRenderer._canvasCtx.beginPath();
				this._canvasRenderer._canvasCtx.moveTo(placementComponent.x,placementComponent.y);
				this._canvasRenderer._canvasCtx.lineTo(connectionComponent.connectedX,connectionComponent.connectedY);
				this._canvasRenderer._canvasCtx.lineWidth = 2;
				this._canvasRenderer._canvasCtx.strokeStyle = "rgba(250,0,0,0.5)";
				this._canvasRenderer._canvasCtx.stroke();
				this._canvasRenderer._canvasCtx.closePath();
			}
			this._canvasRenderer._canvasCtx.shadowBlur = 0;
		}
	}
	,__class__: ludumdare.view.Presenter
};
var mathtool = {};
mathtool.UF = function() { };
$hxClasses["mathtool.UF"] = mathtool.UF;
mathtool.UF.__name__ = ["mathtool","UF"];
mathtool.UF.XYtoRADIUS = function(x,y) {
	return Math.sqrt(x * x + y * y);
};
mathtool.UF.ToRadian = function(angle) {
	return angle / 180 * Math.PI;
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
var promhx = {};
promhx.Deferred = $hx_exports.promhx.Deferred = function() {
	this._update = [];
};
$hxClasses["promhx.Deferred"] = promhx.Deferred;
promhx.Deferred.__name__ = ["promhx","Deferred"];
promhx.Deferred.prototype = {
	resolve: function(val) {
		var _g = 0;
		var _g1 = this._update;
		while(_g < _g1.length) {
			var u = _g1[_g];
			++_g;
			if(u.error != null) try {
				u.func(val);
			} catch( e ) {
			} else u.func(val);
		}
	}
	,then: function(func,error) {
		this._update.push({ func : func, error : error});
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
};
promhx.base = {};
promhx.base.AsyncBase = function(d) {
	this.id = promhx.base.AsyncBase.id_ctr += 1;
	if(d != null) d.then($bind(this,this.handleResolve),$bind(this,this.handleError));
	this._resolved = false;
	this._pending = false;
	this._fulfilled = false;
	this._update = [];
	this._error = [];
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
		return null;
	};
	var $it1 = $iterator(all)();
	while( $it1.hasNext() ) {
		var a1 = $it1.next();
		a1._update.push({ async : next, linkf : (function(f,a11,a2) {
			return function(v1) {
				return f(a11,a2,v1);
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
	,pipe: function(f) {
		var ret = new promhx.Promise();
		promhx.base.AsyncBase.pipeLink(this,ret,f);
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
		if(set == null) set == !this._pause;
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
promhx.base.EventLoop.queueLength = function() {
	return promhx.base.EventLoop.queue.length;
};
promhx.base.EventLoop.finish = function(max_iterations) {
	if(max_iterations == null) max_iterations = 1000;
	while(promhx.base.EventLoop.queue.length > 0 && max_iterations-- > 0) (promhx.base.EventLoop.queue.pop())();
	return promhx.base.EventLoop.queue.length == 0;
};
promhx.base.EventLoop.clear = function() {
	promhx.base.EventLoop.queue = new List();
};
promhx.base.EventLoop.continueOnNextLoop = function() {
	var f = function() {
		if(promhx.base.EventLoop.queue.length > 0) {
			(promhx.base.EventLoop.queue.pop())();
			promhx.base.EventLoop.continueOnNextLoop();
		}
	};
	if(promhx.base.EventLoop.nextLoop != null) promhx.base.EventLoop.nextLoop(f); else setImmediate(f);
};
promhx.error = {};
promhx.error.PromiseError = $hxClasses["promhx.error.PromiseError"] = { __ename__ : ["promhx","error","PromiseError"], __constructs__ : ["AlreadyResolved","DownstreamNotFullfilled"] };
promhx.error.PromiseError.AlreadyResolved = function(message) { var $x = ["AlreadyResolved",0,message]; $x.__enum__ = promhx.error.PromiseError; $x.toString = $estr; return $x; };
promhx.error.PromiseError.DownstreamNotFullfilled = function(message) { var $x = ["DownstreamNotFullfilled",1,message]; $x.__enum__ = promhx.error.PromiseError; $x.toString = $estr; return $x; };
var tink = {};
tink.core = {};
tink.core._Callback = {};
tink.core._Callback.Callback_Impl_ = function() { };
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
tink.core._Callback.CallbackLink_Impl_ = function() { };
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
tink.core._Callback.CallbackList_Impl_ = function() { };
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
tink.core._Future.Future_Impl_ = function() { };
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
tink.core._Lazy.Lazy_Impl_ = function() { };
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
		return fallback;
	}
};
tink.core.OutcomeTools.orTry = function(outcome,fallback) {
	switch(outcome[1]) {
	case 0:
		return outcome;
	case 1:
		return fallback;
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
tink.core._Outcome.OutcomeMapper_Impl_ = function() { };
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
tink.core._Pair.Pair_Impl_ = function() { };
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
tink.core._Pair.MPair_Impl_ = function() { };
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
tink.core._Signal.Signal_Impl_ = function() { };
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
		var f1 = (function(f2,a1) {
			return function() {
				f2(a1);
			};
		})(remove,f);
		return f1;
	};
	if(gather) return tink.core._Signal.Signal_Impl_.gather(ret); else return ret;
};
tink.core._Signal.SignalTrigger_Impl_ = function() { };
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
wighawag.asset = {};
wighawag.asset.load = {};
wighawag.asset.load.Asset = function() { };
$hxClasses["wighawag.asset.load.Asset"] = wighawag.asset.load.Asset;
wighawag.asset.load.Asset.__name__ = ["wighawag","asset","load","Asset"];
wighawag.asset.load.Asset.prototype = {
	__class__: wighawag.asset.load.Asset
};
wighawag.asset.Image = function(id,$native) {
	this._data = null;
	this.id = id;
	this["native"] = $native;
};
$hxClasses["wighawag.asset.Image"] = wighawag.asset.Image;
wighawag.asset.Image.__name__ = ["wighawag","asset","Image"];
wighawag.asset.Image.__interfaces__ = [wighawag.asset.load.Asset];
wighawag.asset.Image.prototype = {
	getData: function() {
		if(this._data == null) {
			var _this = window.document;
			this._canvas = _this.createElement("canvas");
			this._canvas.width = this["native"].width;
			this._canvas.height = this["native"].height;
			this._canvasCtx = this._canvas.getContext("2d");
			this._canvasCtx.drawImage(this["native"],0,0,this["native"].width,this["native"].height);
			var nativeImageData = this._canvasCtx.getImageData(0,0,this["native"].width,this["native"].height);
			this._data = new wighawag.asset.ImageData(nativeImageData);
		}
		return this._data;
	}
	,__class__: wighawag.asset.Image
};
wighawag.asset.ImageData = function($native) {
	this["native"] = $native;
};
$hxClasses["wighawag.asset.ImageData"] = wighawag.asset.ImageData;
wighawag.asset.ImageData.__name__ = ["wighawag","asset","ImageData"];
wighawag.asset.ImageData.prototype = {
	__class__: wighawag.asset.ImageData
};
wighawag.asset.load.AssetLoader = function() { };
$hxClasses["wighawag.asset.load.AssetLoader"] = wighawag.asset.load.AssetLoader;
wighawag.asset.load.AssetLoader.__name__ = ["wighawag","asset","load","AssetLoader"];
wighawag.asset.load.AssetLoader.prototype = {
	__class__: wighawag.asset.load.AssetLoader
};
wighawag.asset.load.AssetStore = function() { };
$hxClasses["wighawag.asset.load.AssetStore"] = wighawag.asset.load.AssetStore;
wighawag.asset.load.AssetStore.__name__ = ["wighawag","asset","load","AssetStore"];
wighawag.asset.load.AssetStore.prototype = {
	__class__: wighawag.asset.load.AssetStore
};
wighawag.asset.load.Batch = function(items) {
	this.dict = new haxe.ds.StringMap();
	var _g = 0;
	while(_g < items.length) {
		var item = items[_g];
		++_g;
		this.dict.set(item.id,item);
	}
};
$hxClasses["wighawag.asset.load.Batch"] = wighawag.asset.load.Batch;
wighawag.asset.load.Batch.__name__ = ["wighawag","asset","load","Batch"];
wighawag.asset.load.Batch.__interfaces__ = [wighawag.asset.load.AssetStore];
wighawag.asset.load.Batch.prototype = {
	get: function(assetId) {
		return this.dict.get(assetId);
	}
	,all: function() {
		var allT = new Array();
		var $it0 = this.dict.iterator();
		while( $it0.hasNext() ) {
			var t = $it0.next();
			allT.push(t);
		}
		return allT;
	}
	,__class__: wighawag.asset.load.Batch
};
wighawag.asset.load.BatchLoader = function() { };
$hxClasses["wighawag.asset.load.BatchLoader"] = wighawag.asset.load.BatchLoader;
wighawag.asset.load.BatchLoader.__name__ = ["wighawag","asset","load","BatchLoader"];
wighawag.asset.load.BatchLoader.loadBatch = function(assetLoader,ids,paths) {
	if(paths == null) paths = ids;
	var deferred = new promhx.Deferred();
	var batchPromise = deferred.promise();
	var onError = function(error) {
		batchPromise.reject(error);
	};
	var assetPromises = new Array();
	var _g1 = 0;
	var _g = ids.length;
	while(_g1 < _g) {
		var i = _g1++;
		var p = assetLoader.load(ids[i],paths[i]);
		p.catchError(onError);
		assetPromises.push(p);
	}
	promhx.Promise.whenAll(assetPromises).then(function(assets) {
		deferred.resolve(new wighawag.asset.load.Batch(assets));
	}).catchError(onError);
	return batchPromise;
};
wighawag.asset.load.ImageLoader = function() {
	this.promises = new haxe.ds.StringMap();
};
$hxClasses["wighawag.asset.load.ImageLoader"] = wighawag.asset.load.ImageLoader;
wighawag.asset.load.ImageLoader.__name__ = ["wighawag","asset","load","ImageLoader"];
wighawag.asset.load.ImageLoader.__interfaces__ = [wighawag.asset.load.AssetLoader];
wighawag.asset.load.ImageLoader.prototype = {
	load: function(assetId,path) {
		if(path == null) path = assetId;
		var promise = this.promises.get(assetId);
		if(promise != null) return promise;
		var deferred = new promhx.Deferred();
		promise = deferred.promise();
		this.promises.set(assetId,promise);
		var image = new Image();
		image.onload = function(e) {
			deferred.resolve(new wighawag.asset.Image(assetId,image));
		};
		image.onerror = function(e1) {
			var errorMessage = "Error loading " + assetId + " at " + path;
			haxe.Log.trace("error",{ fileName : "ImageLoader.hx", lineNumber : 38, className : "wighawag.asset.load.ImageLoader", methodName : "load", customParams : ["AssetManager",errorMessage]});
			promise.reject(errorMessage);
		};
		image.src = path;
		return promise;
	}
	,__class__: wighawag.asset.load.ImageLoader
};
wighawag.remote = {};
wighawag.remote.service = {};
wighawag.remote.service.Score = function(value,time,proof,seed,version) {
	this.value = value;
	this.time = time;
	this.proof = proof;
	this.seed = seed;
	this.version = version;
};
$hxClasses["wighawag.remote.service.Score"] = wighawag.remote.service.Score;
wighawag.remote.service.Score.__name__ = ["wighawag","remote","service","Score"];
wighawag.remote.service.Score.prototype = {
	__class__: wighawag.remote.service.Score
};
wighawag.renderer = {};
wighawag.renderer.CanvasRenderer = function() {
	this.onMouseClicked = tink.core._Signal.SignalTrigger_Impl_.asSignal(this._onMouseClicked = tink.core._Signal.Signal_Impl_.trigger());
	this.onMouseDown = tink.core._Signal.SignalTrigger_Impl_.asSignal(this._onMouseDown = tink.core._Signal.Signal_Impl_.trigger());
	this.onMouseUp = tink.core._Signal.SignalTrigger_Impl_.asSignal(this._onMouseUp = tink.core._Signal.Signal_Impl_.trigger());
};
$hxClasses["wighawag.renderer.CanvasRenderer"] = wighawag.renderer.CanvasRenderer;
wighawag.renderer.CanvasRenderer.__name__ = ["wighawag","renderer","CanvasRenderer"];
wighawag.renderer.CanvasRenderer.prototype = {
	get_onMouseClicked: function() {
		return tink.core._Signal.SignalTrigger_Impl_.asSignal(this._onMouseClicked);
	}
	,get_onMouseDown: function() {
		return tink.core._Signal.SignalTrigger_Impl_.asSignal(this._onMouseDown);
	}
	,get_onMouseUp: function() {
		return tink.core._Signal.SignalTrigger_Impl_.asSignal(this._onMouseUp);
	}
	,init: function() {
		this._canvas = window.document.getElementById("canvas");
		this._canvas.width = 600;
		this._canvas.height = 400;
		this._canvasCtx = this._canvas.getContext("2d");
		this._canvas.addEventListener("mousemove",$bind(this,this.mouseMove),false);
		this._canvas.addEventListener("click",$bind(this,this.mouseClick),false);
		this._canvas.addEventListener("mouseup",$bind(this,this.mouseUp),false);
		this._canvas.addEventListener("mousedown",$bind(this,this.mouseDown),false);
		var f = new tink.core.FutureTrigger();
		f.trigger(tink.core.Outcome.Success(tink.core.Noise.Noise));
		return f.future;
	}
	,mouseMove: function(evt) {
		var rect = this._canvas.getBoundingClientRect();
		this.mouseX = evt.clientX - rect.left;
		this.mouseY = evt.clientY - rect.top;
	}
	,mouseClick: function(evt) {
		tink.core._Callback.CallbackList_Impl_.invoke(this._onMouseClicked,evt);
	}
	,mouseDown: function(evt) {
		tink.core._Callback.CallbackList_Impl_.invoke(this._onMouseDown,evt);
	}
	,mouseUp: function(evt) {
		tink.core._Callback.CallbackList_Impl_.invoke(this._onMouseUp,evt);
	}
	,get_width: function() {
		return this._canvas.width;
	}
	,get_height: function() {
		return this._canvas.height;
	}
	,clear: function() {
		this._canvasCtx.clearRect(0,0,this._canvas.width,this._canvas.height);
	}
	,save: function() {
		this._canvasCtx.save();
	}
	,clip: function() {
		this._canvasCtx.clip();
	}
	,restore: function() {
		this._canvasCtx.restore();
	}
	,drawImage: function(image,x,y,w,h) {
		if(h == null) h = 0;
		if(w == null) w = 0;
		if(w == 0) w = image["native"].width;
		if(h == 0) h = image["native"].height;
		this._canvasCtx.drawImage(image["native"],x,y,w,h);
	}
	,set_fillStyle: function(s) {
		return this._canvasCtx.fillStyle = s;
	}
	,get_fillStyle: function() {
		return this._canvasCtx.fillStyle;
	}
	,fillRect: function(x,y,witdh,height) {
		this._canvasCtx.fillRect(x,y,this._canvas.width,height);
	}
	,beginPath: function() {
		this._canvasCtx.beginPath();
	}
	,closePath: function() {
		this._canvasCtx.closePath();
	}
	,arc: function(x,y,radius,startAngle,endAngle,antiClockWise) {
		this._canvasCtx.arc(x,y,radius,startAngle,endAngle,antiClockWise);
	}
	,moveTo: function(x,y) {
		this._canvasCtx.moveTo(x,y);
	}
	,lineTo: function(x,y) {
		this._canvasCtx.lineTo(x,y);
	}
	,stroke: function() {
		this._canvasCtx.stroke();
	}
	,fill: function() {
		this._canvasCtx.fill();
	}
	,fillText: function(text,x,y) {
		this._canvasCtx.fillText(text,x,y);
	}
	,set_strokeStyle: function(s) {
		return this._canvasCtx.strokeStyle = s;
	}
	,get_strokeStyle: function() {
		return this._canvasCtx.strokeStyle;
	}
	,set_lineWidth: function(value) {
		return this._canvasCtx.lineWidth = value;
	}
	,get_lineWidth: function() {
		return this._canvasCtx.lineWidth;
	}
	,set_shadowBlur: function(value) {
		return this._canvasCtx.shadowBlur = value;
	}
	,get_shadowBlur: function() {
		return this._canvasCtx.shadowBlur;
	}
	,set_shadowColor: function(s) {
		return this._canvasCtx.shadowColor = s;
	}
	,get_shadowColor: function() {
		return this._canvasCtx.shadowColor;
	}
	,set_font: function(s) {
		return this._canvasCtx.font = s;
	}
	,get_font: function() {
		return this._canvasCtx.font;
	}
	,set_textAlign: function(s) {
		return this._canvasCtx.textAlign = s;
	}
	,get_textAlign: function() {
		return this._canvasCtx.textAlign;
	}
	,__class__: wighawag.renderer.CanvasRenderer
};
wighawag.report = {};
wighawag.report.Report = function() { };
$hxClasses["wighawag.report.Report"] = wighawag.report.Report;
wighawag.report.Report.__name__ = ["wighawag","report","Report"];
wighawag.system.Channels = function() { };
$hxClasses["wighawag.system.Channels"] = wighawag.system.Channels;
wighawag.system.Channels.__name__ = ["wighawag","system","Channels"];
wighawag.system.ComponentOwner = function() {
	this._components = new com.fermmtools.utils.ObjectHash();
};
$hxClasses["wighawag.system.ComponentOwner"] = wighawag.system.ComponentOwner;
wighawag.system.ComponentOwner.__name__ = ["wighawag","system","ComponentOwner"];
wighawag.system.ComponentOwner.prototype = {
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
							haxe.Log.trace("warn",{ fileName : "ComponentOwner.hx", lineNumber : 55, className : "wighawag.system.ComponentOwner", methodName : "initialise", customParams : [wighawag.system.Channels.SYSTEM,"Could not resolved dependencies for ",[components]]});
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
	,__class__: wighawag.system.ComponentOwner
};
wighawag.system.Entity = function() {
	wighawag.system.ComponentOwner.call(this);
};
$hxClasses["wighawag.system.Entity"] = wighawag.system.Entity;
wighawag.system.Entity.__name__ = ["wighawag","system","Entity"];
wighawag.system.Entity.__super__ = wighawag.system.ComponentOwner;
wighawag.system.Entity.prototype = $extend(wighawag.system.ComponentOwner.prototype,{
	setup: function(entityComponents,type) {
		if(type == null) type = new wighawag.system.EntityType();
		this.type = type;
		var components = new Array();
		var _g = 0;
		while(_g < entityComponents.length) {
			var component = entityComponents[_g];
			++_g;
			var success = component.attachEntity(this);
			if(success) components.push(component); else component.detachEntity();
		}
		this.initialise(components);
	}
	,__class__: wighawag.system.Entity
});
wighawag.system.EntityType = function(id) {
	if(id == null) id = "default";
	wighawag.system.ComponentOwner.call(this);
	this.id = id;
};
$hxClasses["wighawag.system.EntityType"] = wighawag.system.EntityType;
wighawag.system.EntityType.__name__ = ["wighawag","system","EntityType"];
wighawag.system.EntityType.__super__ = wighawag.system.ComponentOwner;
wighawag.system.EntityType.prototype = $extend(wighawag.system.ComponentOwner.prototype,{
	setup: function(typeComponents) {
		var components = new Array();
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
		var entity = new wighawag.system.Entity();
		entity.setup(entityComponents,this);
		return entity;
	}
	,__class__: wighawag.system.EntityType
});
wighawag.system.InGate = function() { };
$hxClasses["wighawag.system.InGate"] = wighawag.system.InGate;
wighawag.system.InGate.__name__ = ["wighawag","system","InGate"];
wighawag.system.InGate.prototype = {
	__class__: wighawag.system.InGate
};
wighawag.system.Model = function() {
	wighawag.system.ComponentOwner.call(this);
	this.entities = new Array();
	this.entitiesSet = new haxe.ds.ObjectMap();
	this.onEntityAdded = new msignal.Signal1();
	this.onEntityRemoved = new msignal.Signal1();
	this.onComplete = new msignal.Signal1();
	this._updatableComponents = new Array();
	this._inGateComponents = new Array();
	this._outGateComponents = new Array();
};
$hxClasses["wighawag.system.Model"] = wighawag.system.Model;
wighawag.system.Model.__name__ = ["wighawag","system","Model"];
wighawag.system.Model.__super__ = wighawag.system.ComponentOwner;
wighawag.system.Model.prototype = $extend(wighawag.system.ComponentOwner.prototype,{
	setup: function(modelComponents) {
		var components = new Array();
		var _g = 0;
		while(_g < modelComponents.length) {
			var modelComponent = modelComponents[_g];
			++_g;
			if(js.Boot.__instanceof(modelComponent,wighawag.system.Updatable)) this._updatableComponents.push(modelComponent);
			if(js.Boot.__instanceof(modelComponent,wighawag.system.InGate)) this._inGateComponents.push(modelComponent);
			if(js.Boot.__instanceof(modelComponent,wighawag.system.OutGate)) this._outGateComponents.push(modelComponent);
			components.push(modelComponent);
			modelComponent.set_model(this);
		}
		var failedComponents = this.initialise(components);
		var _g1 = 0;
		while(_g1 < failedComponents.length) {
			var failedComponent = failedComponents[_g1];
			++_g1;
			haxe.Log.trace("warn",{ fileName : "Model.hx", lineNumber : 61, className : "wighawag.system.Model", methodName : "setup", customParams : [wighawag.system.Channels.SYSTEM,"systemComponent failed to find its dependencies, it is disabled ",failedComponent]});
			if(js.Boot.__instanceof(failedComponent,wighawag.system.Updatable)) HxOverrides.remove(this._updatableComponents,failedComponent);
			if(js.Boot.__instanceof(failedComponent,wighawag.system.InGate)) HxOverrides.remove(this._inGateComponents,failedComponent);
			if(js.Boot.__instanceof(failedComponent,wighawag.system.OutGate)) HxOverrides.remove(this._outGateComponents,failedComponent);
			(js.Boot.__cast(failedComponent , wighawag.system.ModelComponent)).set_model(null);
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
	,__class__: wighawag.system.Model
});
wighawag.system.OutGate = function() { };
$hxClasses["wighawag.system.OutGate"] = wighawag.system.OutGate;
wighawag.system.OutGate.__name__ = ["wighawag","system","OutGate"];
wighawag.system.OutGate.prototype = {
	__class__: wighawag.system.OutGate
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
haxe.Serializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.ds.ObjectMap.count = 0;
ludumdare.CoexistingWorlds.minimuTimeOnSplashScreen = 2;
ludumdare.controller.ControllerKey.__meta__ = { obj : { entities : [["CursorComponent"]]}};
ludumdare.model.CollisionSystem.__meta__ = { obj : { entities : [["CollisionComponent"]]}};
ludumdare.model.FieldPlacementSystem.coexistingenergie = 20000;
ludumdare.model.GestionBirdSystem.__meta__ = { obj : { entities : [["BirdComponent"]]}};
ludumdare.model.GestionConnectionSystem.__meta__ = { obj : { entities : [["ConnectionComponent"]]}};
ludumdare.model.GestionCursorSystem.__meta__ = { obj : { entities : [["CursorComponent"]]}};
ludumdare.model.GestionDynamicSystem.__meta__ = { obj : { entities : [["VelocityComponent","PositionComponent"]]}};
ludumdare.model.GestionFruitSystem.__meta__ = { obj : { entities : [["FruitComponent"]]}};
ludumdare.model.GestionMushroomSystem.__meta__ = { obj : { entities : [["MushroomComponent"]]}};
ludumdare.model.GestionTargetSystem.__meta__ = { obj : { entities : [["TargetComponent"]]}};
ludumdare.model.GestionTreeSystem.__meta__ = { obj : { entities : [["TreeComponent"]]}};
ludumdare.view.Presenter.FIELD_URL = "img/field.png";
ludumdare.view.Presenter.BIRD_URL = "img/bird.png";
ludumdare.view.Presenter.FRUIT_URL = "img/fruit.png";
ludumdare.view.Presenter.MUSHROOM_URL = "img/mushroom.png";
ludumdare.view.Presenter.TREE_URL = "img/tree.png";
ludumdare.view.Presenter.START_URL = "img/purpleapes.png";
promhx.base.AsyncBase.id_ctr = 0;
promhx.base.EventLoop.queue = new List();
tink.core._Callback.Cell.pool = [];
wighawag.report.Report.DEBUG = "debug";
wighawag.report.Report.ERROR = "error";
wighawag.report.Report.WARNING = "warn";
wighawag.report.Report.INFO = "info";
wighawag.report.Report.LOG = "log";
wighawag.system.Channels.SYSTEM = "wighawag-system";
ludumdare.CoexistingWorlds.main();
})(typeof window != "undefined" ? window : exports);

//# sourceMappingURL=WighawagSample.js.map