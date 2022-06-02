!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(require("@firebase/app-compat"), require("@firebase/app"))
    : "function" == typeof define && define.amd
    ? define(["@firebase/app-compat", "@firebase/app"], t)
    : t(
        (e = "undefined" != typeof globalThis ? globalThis : e || self)
          .firebase,
        e.firebase.INTERNAL.modularAPIs
      );
})(this, function (Hf, Qf) {
  "use strict";
  try {
    !function () {
      function e(e) {
        return e && "object" == typeof e && "default" in e ? e : { default: e };
      }
      var l,
        t = e(Hf);
      function n(t) {
        const n = [];
        let r = 0;
        for (let s = 0; s < t.length; s++) {
          let e = t.charCodeAt(s);
          e < 128
            ? (n[r++] = e)
            : (e < 2048
                ? (n[r++] = (e >> 6) | 192)
                : (55296 == (64512 & e) &&
                  s + 1 < t.length &&
                  56320 == (64512 & t.charCodeAt(s + 1))
                    ? ((e =
                        65536 +
                        ((1023 & e) << 10) +
                        (1023 & t.charCodeAt(++s))),
                      (n[r++] = (e >> 18) | 240),
                      (n[r++] = ((e >> 12) & 63) | 128))
                    : (n[r++] = (e >> 12) | 224),
                  (n[r++] = ((e >> 6) & 63) | 128)),
              (n[r++] = (63 & e) | 128));
        }
        return n;
      }
      const r = {
          byteToCharMap_: null,
          charToByteMap_: null,
          byteToCharMapWebSafe_: null,
          charToByteMapWebSafe_: null,
          ENCODED_VALS_BASE:
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
          get ENCODED_VALS() {
            return this.ENCODED_VALS_BASE + "+/=";
          },
          get ENCODED_VALS_WEBSAFE() {
            return this.ENCODED_VALS_BASE + "-_.";
          },
          HAS_NATIVE_SUPPORT: "function" == typeof atob,
          encodeByteArray(n, e) {
            if (!Array.isArray(n))
              throw Error("encodeByteArray takes an array as a parameter");
            this.init_();
            var r = e ? this.byteToCharMapWebSafe_ : this.byteToCharMap_;
            const s = [];
            for (let c = 0; c < n.length; c += 3) {
              var i = n[c],
                a = c + 1 < n.length,
                o = a ? n[c + 1] : 0,
                u = c + 2 < n.length,
                h = u ? n[c + 2] : 0;
              let e = ((15 & o) << 2) | (h >> 6),
                t = 63 & h;
              u || ((t = 64), a || (e = 64)),
                s.push(r[i >> 2], r[((3 & i) << 4) | (o >> 4)], r[e], r[t]);
            }
            return s.join("");
          },
          encodeString(e, t) {
            return this.HAS_NATIVE_SUPPORT && !t
              ? btoa(e)
              : this.encodeByteArray(n(e), t);
          },
          decodeString(e, t) {
            return this.HAS_NATIVE_SUPPORT && !t
              ? atob(e)
              : (function (e) {
                  const t = [];
                  let n = 0,
                    r = 0;
                  for (; n < e.length; ) {
                    var s,
                      i,
                      a = e[n++];
                    a < 128
                      ? (t[r++] = String.fromCharCode(a))
                      : 191 < a && a < 224
                      ? ((s = e[n++]),
                        (t[r++] = String.fromCharCode(
                          ((31 & a) << 6) | (63 & s)
                        )))
                      : 239 < a && a < 365
                      ? ((i =
                          (((7 & a) << 18) |
                            ((63 & e[n++]) << 12) |
                            ((63 & e[n++]) << 6) |
                            (63 & e[n++])) -
                          65536),
                        (t[r++] = String.fromCharCode(55296 + (i >> 10))),
                        (t[r++] = String.fromCharCode(56320 + (1023 & i))))
                      : ((s = e[n++]),
                        (i = e[n++]),
                        (t[r++] = String.fromCharCode(
                          ((15 & a) << 12) | ((63 & s) << 6) | (63 & i)
                        )));
                  }
                  return t.join("");
                })(this.decodeStringToByteArray(e, t));
          },
          decodeStringToByteArray(e, t) {
            this.init_();
            var n = t ? this.charToByteMapWebSafe_ : this.charToByteMap_;
            const r = [];
            for (let u = 0; u < e.length; ) {
              var s = n[e.charAt(u++)],
                i = u < e.length ? n[e.charAt(u)] : 0;
              ++u;
              var a = u < e.length ? n[e.charAt(u)] : 64;
              ++u;
              var o = u < e.length ? n[e.charAt(u)] : 64;
              if ((++u, null == s || null == i || null == a || null == o))
                throw Error();
              r.push((s << 2) | (i >> 4)),
                64 !== a &&
                  (r.push(((i << 4) & 240) | (a >> 2)),
                  64 !== o && r.push(((a << 6) & 192) | o));
            }
            return r;
          },
          init_() {
            if (!this.byteToCharMap_) {
              (this.byteToCharMap_ = {}),
                (this.charToByteMap_ = {}),
                (this.byteToCharMapWebSafe_ = {}),
                (this.charToByteMapWebSafe_ = {});
              for (let e = 0; e < this.ENCODED_VALS.length; e++)
                (this.byteToCharMap_[e] = this.ENCODED_VALS.charAt(e)),
                  (this.charToByteMap_[this.byteToCharMap_[e]] = e),
                  (this.byteToCharMapWebSafe_[e] =
                    this.ENCODED_VALS_WEBSAFE.charAt(e)),
                  (this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]] =
                    e),
                  e >= this.ENCODED_VALS_BASE.length &&
                    ((this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)] =
                      e),
                    (this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)] =
                      e));
            }
          },
        },
        a = function (e) {
          return (
            (e = e), (t = n(e)), r.encodeByteArray(t, !0).replace(/\./g, "")
          );
          var t;
        };
      function f() {
        return "undefined" != typeof navigator &&
          "string" == typeof navigator.userAgent
          ? navigator.userAgent
          : "";
      }
      function s() {
        return (
          !(function () {
            try {
              return (
                "[object process]" ===
                Object.prototype.toString.call(global.process)
              );
            } catch (e) {
              return;
            }
          })() &&
          navigator.userAgent.includes("Safari") &&
          !navigator.userAgent.includes("Chrome")
        );
      }
      class o extends Error {
        constructor(e, t, n) {
          super(t),
            (this.code = e),
            (this.customData = n),
            (this.name = "FirebaseError"),
            Object.setPrototypeOf(this, o.prototype),
            Error.captureStackTrace &&
              Error.captureStackTrace(this, i.prototype.create);
        }
      }
      class i {
        constructor(e, t, n) {
          (this.service = e), (this.serviceName = t), (this.errors = n);
        }
        create(e, ...t) {
          var r,
            n = t[0] || {},
            s = `${this.service}/${e}`,
            i = this.errors[e],
            i = i
              ? ((r = n),
                i.replace(u, (e, t) => {
                  var n = r[t];
                  return null != n ? String(n) : `<${t}?>`;
                }))
              : "Error",
            i = `${this.serviceName}: ${i} (${s}).`;
          return new o(s, i, n);
        }
      }
      const u = /\{\$([^}]+)}/g;
      function m(e) {
        return e && e._delegate ? e._delegate : e;
      }
      class h {
        constructor(e, t, n) {
          (this.name = e),
            (this.instanceFactory = t),
            (this.type = n),
            (this.multipleInstances = !1),
            (this.serviceProps = {}),
            (this.instantiationMode = "LAZY"),
            (this.onInstanceCreated = null);
        }
        setInstantiationMode(e) {
          return (this.instantiationMode = e), this;
        }
        setMultipleInstances(e) {
          return (this.multipleInstances = e), this;
        }
        setServiceProps(e) {
          return (this.serviceProps = e), this;
        }
        setInstanceCreatedCallback(e) {
          return (this.onInstanceCreated = e), this;
        }
      }
      ((Xl = l = l || {})[(Xl.DEBUG = 0)] = "DEBUG"),
        (Xl[(Xl.VERBOSE = 1)] = "VERBOSE"),
        (Xl[(Xl.INFO = 2)] = "INFO"),
        (Xl[(Xl.WARN = 3)] = "WARN"),
        (Xl[(Xl.ERROR = 4)] = "ERROR"),
        (Xl[(Xl.SILENT = 5)] = "SILENT");
      const c = {
          debug: l.DEBUG,
          verbose: l.VERBOSE,
          info: l.INFO,
          warn: l.WARN,
          error: l.ERROR,
          silent: l.SILENT,
        },
        d = l.INFO,
        g = {
          [l.DEBUG]: "log",
          [l.VERBOSE]: "log",
          [l.INFO]: "info",
          [l.WARN]: "warn",
          [l.ERROR]: "error",
        },
        p = (e, t, ...n) => {
          if (!(t < e.logLevel)) {
            var r = new Date().toISOString(),
              s = g[t];
            if (!s)
              throw new Error(
                `Attempted to log a message with an invalid logType (value: ${t})`
              );
            console[s](`[${r}]  ${e.name}:`, ...n);
          }
        };
      var y,
        v =
          "undefined" != typeof globalThis
            ? globalThis
            : "undefined" != typeof window
            ? window
            : "undefined" != typeof global
            ? global
            : "undefined" != typeof self
            ? self
            : {},
        w = {},
        b = v || self;
      function I() {}
      function E(e) {
        var t = typeof e;
        return (
          "array" ==
            (t =
              "object" != t
                ? t
                : e
                ? Array.isArray(e)
                  ? "array"
                  : t
                : "null") ||
          ("object" == t && "number" == typeof e.length)
        );
      }
      function T(e) {
        var t = typeof e;
        return ("object" == t && null != e) || "function" == t;
      }
      var _ = "closure_uid_" + ((1e9 * Math.random()) >>> 0),
        S = 0;
      function A(e, t, n) {
        return e.call.apply(e.bind, arguments);
      }
      function D(t, n, e) {
        if (!t) throw Error();
        if (2 < arguments.length) {
          var r = Array.prototype.slice.call(arguments, 2);
          return function () {
            var e = Array.prototype.slice.call(arguments);
            return Array.prototype.unshift.apply(e, r), t.apply(n, e);
          };
        }
        return function () {
          return t.apply(n, arguments);
        };
      }
      function x(e, t, n) {
        return (x =
          Function.prototype.bind &&
          -1 != Function.prototype.bind.toString().indexOf("native code")
            ? A
            : D).apply(null, arguments);
      }
      function N(t) {
        var n = Array.prototype.slice.call(arguments, 1);
        return function () {
          var e = n.slice();
          return e.push.apply(e, arguments), t.apply(this, e);
        };
      }
      function C(e, i) {
        function t() {}
        (t.prototype = i.prototype),
          (e.Z = i.prototype),
          (e.prototype = new t()),
          ((e.prototype.constructor = e).Vb = function (e, t, n) {
            for (
              var r = Array(arguments.length - 2), s = 2;
              s < arguments.length;
              s++
            )
              r[s - 2] = arguments[s];
            return i.prototype[t].apply(e, r);
          });
      }
      function k() {
        (this.s = this.s), (this.o = this.o);
      }
      var R = {};
      (k.prototype.s = !1),
        (k.prototype.na = function () {
          var e, t;
          !this.s &&
            ((this.s = !0), this.M(), 0) &&
            ((t = this),
            (e =
              (Object.prototype.hasOwnProperty.call(t, _) && t[_]) ||
              (t[_] = ++S)),
            delete R[e]);
        }),
        (k.prototype.M = function () {
          if (this.o) for (; this.o.length; ) this.o.shift()();
        });
      const O = Array.prototype.indexOf
          ? function (e, t) {
              return Array.prototype.indexOf.call(e, t, void 0);
            }
          : function (e, t) {
              if ("string" == typeof e)
                return "string" != typeof t || 1 != t.length
                  ? -1
                  : e.indexOf(t, 0);
              for (let n = 0; n < e.length; n++)
                if (n in e && e[n] === t) return n;
              return -1;
            },
        L = Array.prototype.forEach
          ? function (e, t, n) {
              Array.prototype.forEach.call(e, t, n);
            }
          : function (e, t, n) {
              var r = e.length,
                s = "string" == typeof e ? e.split("") : e;
              for (let i = 0; i < r; i++) i in s && t.call(n, s[i], i, e);
            };
      function V() {
        return Array.prototype.concat.apply([], arguments);
      }
      function M(t) {
        var n = t.length;
        if (0 < n) {
          const r = Array(n);
          for (let e = 0; e < n; e++) r[e] = t[e];
          return r;
        }
        return [];
      }
      function F(e) {
        return /^[\s\xa0]*$/.test(e);
      }
      var P,
        U = String.prototype.trim
          ? function (e) {
              return e.trim();
            }
          : function (e) {
              return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(e)[1];
            };
      function B(e, t) {
        return -1 != e.indexOf(t);
      }
      function q(e, t) {
        return e < t ? -1 : t < e ? 1 : 0;
      }
      e: {
        var j = b.navigator;
        if (j) {
          j = j.userAgent;
          if (j) {
            P = j;
            break e;
          }
        }
        P = "";
      }
      function K(e, t, n) {
        for (const r in e) t.call(n, e[r], r, e);
      }
      function G(e) {
        const t = {};
        for (const n in e) t[n] = e[n];
        return t;
      }
      var $ =
        "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(
          " "
        );
      function z(t) {
        let n, r;
        for (let s = 1; s < arguments.length; s++) {
          for (n in (r = arguments[s])) t[n] = r[n];
          for (let e = 0; e < $.length; e++)
            (n = $[e]),
              Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
        }
      }
      function W(e) {
        return W[" "](e), e;
      }
      W[" "] = I;
      var H,
        Q = B(P, "Opera"),
        Y = B(P, "Trident") || B(P, "MSIE"),
        X = B(P, "Edge"),
        J = X || Y,
        Z =
          B(P, "Gecko") &&
          !(B(P.toLowerCase(), "webkit") && !B(P, "Edge")) &&
          !(B(P, "Trident") || B(P, "MSIE")) &&
          !B(P, "Edge"),
        ee = B(P.toLowerCase(), "webkit") && !B(P, "Edge");
      function te() {
        var e = b.document;
        return e ? e.documentMode : void 0;
      }
      e: {
        var ne = "",
          re =
            ((re = P),
            Z
              ? /rv:([^\);]+)(\)|;)/.exec(re)
              : X
              ? /Edge\/([\d\.]+)/.exec(re)
              : Y
              ? /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(re)
              : ee
              ? /WebKit\/(\S+)/.exec(re)
              : Q
              ? /(?:Version)[ \/]?(\S+)/.exec(re)
              : void 0);
        if ((re && (ne = re ? re[1] : ""), Y)) {
          re = te();
          if (null != re && re > parseFloat(ne)) {
            H = String(re);
            break e;
          }
        }
        H = ne;
      }
      var se = {};
      function ie() {
        return (
          (e = function () {
            let e = 0;
            var t = U(String(H)).split("."),
              n = U("9").split("."),
              r = Math.max(t.length, n.length);
            for (let a = 0; 0 == e && a < r; a++)
              for (
                var s = t[a] || "", i = n[a] || "";
                (s = /(\d*)(\D*)(.*)/.exec(s) || ["", "", "", ""]),
                  (i = /(\d*)(\D*)(.*)/.exec(i) || ["", "", "", ""]),
                  (0 != s[0].length || 0 != i[0].length) &&
                    ((e =
                      q(
                        0 == s[1].length ? 0 : parseInt(s[1], 10),
                        0 == i[1].length ? 0 : parseInt(i[1], 10)
                      ) ||
                      q(0 == s[2].length, 0 == i[2].length) ||
                      q(s[2], i[2])),
                    (s = s[3]),
                    (i = i[3]),
                    0 == e);

              );
            return 0 <= e;
          }),
          (t = se),
          Object.prototype.hasOwnProperty.call(t, 9) ? t[9] : (t[9] = e(9))
        );
        var e, t;
      }
      var ae = (b.document && Y && (te() || parseInt(H, 10))) || void 0,
        oe = (function () {
          if (!b.addEventListener || !Object.defineProperty) return !1;
          var e = !1,
            t = Object.defineProperty({}, "passive", {
              get: function () {
                e = !0;
              },
            });
          try {
            b.addEventListener("test", I, t),
              b.removeEventListener("test", I, t);
          } catch (e) {}
          return e;
        })();
      function ue(e, t) {
        (this.type = e),
          (this.g = this.target = t),
          (this.defaultPrevented = !1);
      }
      function he(e, t) {
        if (
          (ue.call(this, e ? e.type : ""),
          (this.relatedTarget = this.g = this.target = null),
          (this.button =
            this.screenY =
            this.screenX =
            this.clientY =
            this.clientX =
              0),
          (this.key = ""),
          (this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1),
          (this.state = null),
          (this.pointerId = 0),
          (this.pointerType = ""),
          (this.i = null),
          e)
        ) {
          var n = (this.type = e.type),
            r =
              e.changedTouches && e.changedTouches.length
                ? e.changedTouches[0]
                : null;
          if (
            ((this.target = e.target || e.srcElement),
            (this.g = t),
            (t = e.relatedTarget))
          ) {
            if (Z) {
              e: {
                try {
                  W(t.nodeName);
                  var s = !0;
                  break e;
                } catch (e) {}
                s = !1;
              }
              s || (t = null);
            }
          } else
            "mouseover" == n
              ? (t = e.fromElement)
              : "mouseout" == n && (t = e.toElement);
          (this.relatedTarget = t),
            r
              ? ((this.clientX = void 0 !== r.clientX ? r.clientX : r.pageX),
                (this.clientY = void 0 !== r.clientY ? r.clientY : r.pageY),
                (this.screenX = r.screenX || 0),
                (this.screenY = r.screenY || 0))
              : ((this.clientX = void 0 !== e.clientX ? e.clientX : e.pageX),
                (this.clientY = void 0 !== e.clientY ? e.clientY : e.pageY),
                (this.screenX = e.screenX || 0),
                (this.screenY = e.screenY || 0)),
            (this.button = e.button),
            (this.key = e.key || ""),
            (this.ctrlKey = e.ctrlKey),
            (this.altKey = e.altKey),
            (this.shiftKey = e.shiftKey),
            (this.metaKey = e.metaKey),
            (this.pointerId = e.pointerId || 0),
            (this.pointerType =
              "string" == typeof e.pointerType
                ? e.pointerType
                : ce[e.pointerType] || ""),
            (this.state = e.state),
            (this.i = e).defaultPrevented && he.Z.h.call(this);
        }
      }
      (ue.prototype.h = function () {
        this.defaultPrevented = !0;
      }),
        C(he, ue);
      var ce = { 2: "touch", 3: "pen", 4: "mouse" };
      he.prototype.h = function () {
        he.Z.h.call(this);
        var e = this.i;
        e.preventDefault ? e.preventDefault() : (e.returnValue = !1);
      };
      var le = "closure_listenable_" + ((1e6 * Math.random()) | 0),
        de = 0;
      function fe(e, t, n, r, s) {
        (this.listener = e),
          (this.proxy = null),
          (this.src = t),
          (this.type = n),
          (this.capture = !!r),
          (this.ia = s),
          (this.key = ++de),
          (this.ca = this.fa = !1);
      }
      function ge(e) {
        (e.ca = !0),
          (e.listener = null),
          (e.proxy = null),
          (e.src = null),
          (e.ia = null);
      }
      function me(e) {
        (this.src = e), (this.g = {}), (this.h = 0);
      }
      function pe(e, t) {
        var n,
          r,
          s,
          i = t.type;
        i in e.g &&
          ((n = e.g[i]),
          (s = 0 <= (r = O(n, t))) && Array.prototype.splice.call(n, r, 1),
          s && (ge(t), 0 == e.g[i].length && (delete e.g[i], e.h--)));
      }
      function ye(e, t, n, r) {
        for (var s = 0; s < e.length; ++s) {
          var i = e[s];
          if (!i.ca && i.listener == t && i.capture == !!n && i.ia == r)
            return s;
        }
        return -1;
      }
      me.prototype.add = function (e, t, n, r, s) {
        var i = e.toString();
        (e = this.g[i]) || ((e = this.g[i] = []), this.h++);
        var a = ye(e, t, r, s);
        return (
          -1 < a
            ? ((t = e[a]), n || (t.fa = !1))
            : (((t = new fe(t, this.src, i, !!r, s)).fa = n), e.push(t)),
          t
        );
      };
      var ve = "closure_lm_" + ((1e6 * Math.random()) | 0),
        we = {};
      function be(e, t, n, r, s) {
        if (r && r.once)
          return (function e(t, n, r, s, i) {
            if (Array.isArray(n)) {
              for (var a = 0; a < n.length; a++) e(t, n[a], r, s, i);
              return null;
            }
            r = De(r);
            return t && t[le]
              ? t.O(n, r, T(s) ? !!s.capture : !!s, i)
              : Ie(t, n, r, !0, s, i);
          })(e, t, n, r, s);
        if (Array.isArray(t)) {
          for (var i = 0; i < t.length; i++) be(e, t[i], n, r, s);
          return null;
        }
        return (
          (n = De(n)),
          e && e[le]
            ? e.N(t, n, T(r) ? !!r.capture : !!r, s)
            : Ie(e, t, n, !1, r, s)
        );
      }
      function Ie(e, t, n, r, s, i) {
        if (!t) throw Error("Invalid event type");
        var a,
          o = T(s) ? !!s.capture : !!s,
          u = Se(e);
        if ((u || (e[ve] = u = new me(e)), (n = u.add(t, n, r, o, i)).proxy))
          return n;
        if (
          ((a = _e),
          (r = function e(t) {
            return a.call(e.src, e.listener, t);
          }),
          ((n.proxy = r).src = e),
          (r.listener = n),
          e.addEventListener)
        )
          void 0 === (s = !oe ? o : s) && (s = !1),
            e.addEventListener(t.toString(), r, s);
        else if (e.attachEvent) e.attachEvent(Te(t.toString()), r);
        else {
          if (!e.addListener || !e.removeListener)
            throw Error("addEventListener and attachEvent are unavailable.");
          e.addListener(r);
        }
        return n;
      }
      function Ee(e) {
        var t, n, r;
        "number" != typeof e &&
          e &&
          !e.ca &&
          ((t = e.src) && t[le]
            ? pe(t.i, e)
            : ((n = e.type),
              (r = e.proxy),
              t.removeEventListener
                ? t.removeEventListener(n, r, e.capture)
                : t.detachEvent
                ? t.detachEvent(Te(n), r)
                : t.addListener && t.removeListener && t.removeListener(r),
              (n = Se(t))
                ? (pe(n, e), 0 == n.h && ((n.src = null), (t[ve] = null)))
                : ge(e)));
      }
      function Te(e) {
        return e in we ? we[e] : (we[e] = "on" + e);
      }
      function _e(e, t) {
        var n, r;
        return (e =
          !!e.ca ||
          ((t = new he(t, this)),
          (n = e.listener),
          (r = e.ia || e.src),
          e.fa && Ee(e),
          n.call(r, t)));
      }
      function Se(e) {
        return (e = e[ve]) instanceof me ? e : null;
      }
      var Ae = "__closure_events_fn_" + ((1e9 * Math.random()) >>> 0);
      function De(t) {
        return "function" == typeof t
          ? t
          : (t[Ae] ||
              (t[Ae] = function (e) {
                return t.handleEvent(e);
              }),
            t[Ae]);
      }
      function xe() {
        k.call(this), (this.i = new me(this)), ((this.P = this).I = null);
      }
      function Ne(e, t) {
        var n,
          r = e.I;
        if (r) for (n = []; r; r = r.I) n.push(r);
        if (
          ((e = e.P),
          (r = t.type || t),
          "string" == typeof t
            ? (t = new ue(t, e))
            : t instanceof ue
            ? (t.target = t.target || e)
            : ((a = t), z((t = new ue(r, e)), a)),
          (a = !0),
          n)
        )
          for (var s = n.length - 1; 0 <= s; s--)
            var i = (t.g = n[s]), a = Ce(i, r, !0, t) && a;
        if (
          ((a = Ce((i = t.g = e), r, !0, t) && a),
          (a = Ce(i, r, !1, t) && a),
          n)
        )
          for (s = 0; s < n.length; s++)
            a = Ce((i = t.g = n[s]), r, !1, t) && a;
      }
      function Ce(e, t, n, r) {
        if (!(t = e.i.g[String(t)])) return !0;
        t = t.concat();
        for (var s = !0, i = 0; i < t.length; ++i) {
          var a,
            o,
            u = t[i];
          u &&
            !u.ca &&
            u.capture == n &&
            ((a = u.listener),
            (o = u.ia || u.src),
            u.fa && pe(e.i, u),
            (s = !1 !== a.call(o, r) && s));
        }
        return s && !r.defaultPrevented;
      }
      C(xe, k),
        (xe.prototype[le] = !0),
        (xe.prototype.removeEventListener = function (e, t, n, r) {
          !(function e(t, n, r, s, i) {
            if (Array.isArray(n))
              for (var a = 0; a < n.length; a++) e(t, n[a], r, s, i);
            else
              (s = T(s) ? !!s.capture : !!s),
                (r = De(r)),
                t && t[le]
                  ? ((t = t.i),
                    (n = String(n).toString()) in t.g &&
                      -1 < (r = ye((a = t.g[n]), r, s, i)) &&
                      (ge(a[r]),
                      Array.prototype.splice.call(a, r, 1),
                      0 == a.length && (delete t.g[n], t.h--)))
                  : (t = t && Se(t)) &&
                    ((n = t.g[n.toString()]),
                    (r =
                      (t = -1) < (t = n ? ye(n, r, s, i) : t) ? n[t] : null) &&
                      Ee(r));
          })(this, e, t, n, r);
        }),
        (xe.prototype.M = function () {
          if ((xe.Z.M.call(this), this.i)) {
            var e,
              t = this.i;
            for (e in t.g) {
              for (var n = t.g[e], r = 0; r < n.length; r++) ge(n[r]);
              delete t.g[e], t.h--;
            }
          }
          this.I = null;
        }),
        (xe.prototype.N = function (e, t, n, r) {
          return this.i.add(String(e), t, !1, n, r);
        }),
        (xe.prototype.O = function (e, t, n, r) {
          return this.i.add(String(e), t, !0, n, r);
        });
      var ke = b.JSON.stringify;
      var Re,
        Oe = new (class {
          constructor(e, t) {
            (this.i = e), (this.j = t), (this.h = 0), (this.g = null);
          }
          get() {
            let e;
            return (
              0 < this.h
                ? (this.h--, (e = this.g), (this.g = e.next), (e.next = null))
                : (e = this.i()),
              e
            );
          }
        })(
          () => new Le(),
          (e) => e.reset()
        );
      class Le {
        constructor() {
          this.next = this.g = this.h = null;
        }
        set(e, t) {
          (this.h = e), (this.g = t), (this.next = null);
        }
        reset() {
          this.next = this.g = this.h = null;
        }
      }
      function Ve(e, t) {
        var n;
        Re ||
          ((n = b.Promise.resolve(void 0)),
          (Re = function () {
            n.then(Pe);
          })),
          Me || (Re(), (Me = !0)),
          Fe.add(e, t);
      }
      var Me = !1,
        Fe = new (class {
          constructor() {
            this.h = this.g = null;
          }
          add(e, t) {
            const n = Oe.get();
            n.set(e, t),
              this.h ? (this.h.next = n) : (this.g = n),
              (this.h = n);
          }
        })();
      function Pe() {
        for (
          var e;
          (e = (function () {
            var e = Fe;
            let t = null;
            return (
              e.g &&
                ((t = e.g),
                (e.g = e.g.next),
                e.g || (e.h = null),
                (t.next = null)),
              t
            );
          })());

        ) {
          try {
            e.h.call(e.g);
          } catch (e) {
            !(function (e) {
              b.setTimeout(() => {
                throw e;
              }, 0);
            })(e);
          }
          var t = Oe;
          t.j(e), t.h < 100 && (t.h++, (e.next = t.g), (t.g = e));
        }
        Me = !1;
      }
      function Ue(e, t) {
        xe.call(this),
          (this.h = e || 1),
          (this.g = t || b),
          (this.j = x(this.kb, this)),
          (this.l = Date.now());
      }
      function Be(e) {
        (e.da = !1), e.S && (e.g.clearTimeout(e.S), (e.S = null));
      }
      function qe(e, t, n) {
        if ("function" == typeof e) n && (e = x(e, n));
        else {
          if (!e || "function" != typeof e.handleEvent)
            throw Error("Invalid listener argument");
          e = x(e.handleEvent, e);
        }
        return 2147483647 < Number(t) ? -1 : b.setTimeout(e, t || 0);
      }
      C(Ue, xe),
        ((y = Ue.prototype).da = !1),
        (y.S = null),
        (y.kb = function () {
          var e;
          this.da &&
            (0 < (e = Date.now() - this.l) && e < 0.8 * this.h
              ? (this.S = this.g.setTimeout(this.j, this.h - e))
              : (this.S && (this.g.clearTimeout(this.S), (this.S = null)),
                Ne(this, "tick"),
                this.da && (Be(this), this.start())));
        }),
        (y.start = function () {
          (this.da = !0),
            this.S ||
              ((this.S = this.g.setTimeout(this.j, this.h)),
              (this.l = Date.now()));
        }),
        (y.M = function () {
          Ue.Z.M.call(this), Be(this), delete this.g;
        });
      class je extends k {
        constructor(e, t) {
          super(),
            (this.m = e),
            (this.j = t),
            (this.h = null),
            (this.i = !1),
            (this.g = null);
        }
        l(e) {
          (this.h = arguments),
            this.g
              ? (this.i = !0)
              : (function e(t) {
                  t.g = qe(() => {
                    (t.g = null), t.i && ((t.i = !1), e(t));
                  }, t.j);
                  var n = t.h;
                  (t.h = null), t.m.apply(null, n);
                })(this);
        }
        M() {
          super.M(),
            this.g &&
              (b.clearTimeout(this.g),
              (this.g = null),
              (this.i = !1),
              (this.h = null));
        }
      }
      function Ke(e) {
        k.call(this), (this.h = e), (this.g = {});
      }
      C(Ke, k);
      var Ge = [];
      function $e(e, t, n, r) {
        Array.isArray(n) || (n && (Ge[0] = n.toString()), (n = Ge));
        for (var s = 0; s < n.length; s++) {
          var i = be(t, n[s], r || e.handleEvent, !1, e.h || e);
          if (!i) break;
          e.g[i.key] = i;
        }
      }
      function ze(e) {
        K(
          e.g,
          function (e, t) {
            this.g.hasOwnProperty(t) && Ee(e);
          },
          e
        ),
          (e.g = {});
      }
      function We() {
        this.g = !0;
      }
      function He(e, t, n, r) {
        e.info(function () {
          return (
            "XMLHTTP TEXT (" +
            t +
            "): " +
            (function (e, t) {
              if (!e.g) return t;
              if (!t) return null;
              try {
                var n = JSON.parse(t);
                if (n)
                  for (e = 0; e < n.length; e++)
                    if (Array.isArray(n[e])) {
                      var r = n[e];
                      if (!(r.length < 2)) {
                        var s = r[1];
                        if (Array.isArray(s) && !(s.length < 1)) {
                          var i = s[0];
                          if ("noop" != i && "stop" != i && "close" != i)
                            for (var a = 1; a < s.length; a++) s[a] = "";
                        }
                      }
                    }
                return ke(n);
              } catch (e) {
                return t;
              }
            })(e, n) +
            (r ? " " + r : "")
          );
        });
      }
      (Ke.prototype.M = function () {
        Ke.Z.M.call(this), ze(this);
      }),
        (Ke.prototype.handleEvent = function () {
          throw Error("EventHandler.handleEvent not implemented");
        }),
        (We.prototype.Aa = function () {
          this.g = !1;
        }),
        (We.prototype.info = function () {});
      var Qe = {},
        Ye = null;
      function Xe() {
        return (Ye = Ye || new xe());
      }
      function Je(e) {
        ue.call(this, Qe.Ma, e);
      }
      function Ze() {
        var e = Xe();
        Ne(e, new Je(e));
      }
      function et(e, t) {
        ue.call(this, Qe.STAT_EVENT, e), (this.stat = t);
      }
      function tt(e) {
        var t = Xe();
        Ne(t, new et(t, e));
      }
      function nt(e, t) {
        ue.call(this, Qe.Na, e), (this.size = t);
      }
      function rt(e, t) {
        if ("function" != typeof e)
          throw Error("Fn must not be null and must be a function");
        return b.setTimeout(function () {
          e();
        }, t);
      }
      (Qe.Ma = "serverreachability"),
        C(Je, ue),
        (Qe.STAT_EVENT = "statevent"),
        C(et, ue),
        (Qe.Na = "timingevent"),
        C(nt, ue);
      var st = {
          NO_ERROR: 0,
          lb: 1,
          yb: 2,
          xb: 3,
          sb: 4,
          wb: 5,
          zb: 6,
          Ja: 7,
          TIMEOUT: 8,
          Cb: 9,
        },
        it = {
          qb: "complete",
          Mb: "success",
          Ka: "error",
          Ja: "abort",
          Eb: "ready",
          Fb: "readystatechange",
          TIMEOUT: "timeout",
          Ab: "incrementaldata",
          Db: "progress",
          tb: "downloadprogress",
          Ub: "uploadprogress",
        };
      function at() {}
      function ot(e) {
        return e.h || (e.h = e.i());
      }
      function ut() {}
      at.prototype.h = null;
      v = { OPEN: "a", pb: "b", Ka: "c", Bb: "d" };
      function ht() {
        ue.call(this, "d");
      }
      function ct() {
        ue.call(this, "c");
      }
      function lt() {}
      function dt(e, t, n, r) {
        (this.l = e),
          (this.j = t),
          (this.m = n),
          (this.X = r || 1),
          (this.V = new Ke(this)),
          (this.P = mt),
          (this.W = new Ue((e = J ? 125 : void 0))),
          (this.H = null),
          (this.i = !1),
          (this.s = this.A = this.v = this.K = this.F = this.Y = this.B = null),
          (this.D = []),
          (this.g = null),
          (this.C = 0),
          (this.o = this.u = null),
          (this.N = -1),
          (this.I = !1),
          (this.O = 0),
          (this.L = null),
          (this.aa = this.J = this.$ = this.U = !1),
          (this.h = new ft());
      }
      function ft() {
        (this.i = null), (this.g = ""), (this.h = !1);
      }
      C(ht, ue),
        C(ct, ue),
        C(lt, at),
        (lt.prototype.g = function () {
          return new XMLHttpRequest();
        }),
        (lt.prototype.i = function () {
          return {};
        });
      var gt = new lt(),
        mt = 45e3,
        pt = {},
        yt = {};
      function vt(e, t, n) {
        (e.K = 1), (e.v = Bt(Lt(t))), (e.s = n), (e.U = !0), wt(e, null);
      }
      function wt(e, t) {
        (e.F = Date.now()), Et(e), (e.A = Lt(e.v));
        var a,
          o,
          u,
          h,
          c,
          l,
          n = e.A,
          r = e.X;
        Array.isArray(r) || (r = [String(r)]),
          Zt(n.h, "t", r),
          (e.C = 0),
          (n = e.l.H),
          (e.h = new ft()),
          (e.g = er(e.l, n ? t : null, !e.s)),
          0 < e.O && (e.L = new je(x(e.Ia, e, e.g), e.O)),
          $e(e.V, e.g, "readystatechange", e.gb),
          (t = e.H ? G(e.H) : {}),
          e.s
            ? (e.u || (e.u = "POST"),
              (t["Content-Type"] = "application/x-www-form-urlencoded"),
              e.g.ea(e.A, e.u, e.s, t))
            : ((e.u = "GET"), e.g.ea(e.A, e.u, null, t)),
          Ze(),
          (a = e.j),
          (o = e.u),
          (u = e.A),
          (h = e.m),
          (c = e.X),
          (l = e.s),
          a.info(function () {
            if (a.g)
              if (l)
                for (var e = "", t = l.split("&"), n = 0; n < t.length; n++) {
                  var r,
                    s,
                    i = t[n].split("=");
                  1 < i.length &&
                    ((r = i[0]),
                    (i = i[1]),
                    (e =
                      2 <= (s = r.split("_")).length && "type" == s[1]
                        ? e + (r + "=") + i + "&"
                        : e + (r + "=redacted&")));
                }
              else e = null;
            else e = l;
            return (
              "XMLHTTP REQ (" +
              h +
              ") [attempt " +
              c +
              "]: " +
              o +
              "\n" +
              u +
              "\n" +
              e
            );
          });
      }
      function bt(e) {
        return e.g && "GET" == e.u && 2 != e.K && e.l.Ba;
      }
      function It(e, t, n) {
        let r = !0,
          s;
        for (; !e.I && e.C < n.length; ) {
          if (
            ((s =
              ((a = n),
              (u = o = void 0),
              (o = (i = e).C),
              -1 == (u = a.indexOf("\n", o))
                ? yt
                : ((o = Number(a.substring(o, u))),
                  isNaN(o)
                    ? pt
                    : (u += 1) + o > a.length
                    ? yt
                    : ((a = a.substr(u, o)), (i.C = u + o), a)))),
            s == yt)
          ) {
            4 == t && ((e.o = 4), tt(14), (r = !1)),
              He(e.j, e.m, null, "[Incomplete Response]");
            break;
          }
          if (s == pt) {
            (e.o = 4), tt(15), He(e.j, e.m, n, "[Invalid Chunk]"), (r = !1);
            break;
          }
          He(e.j, e.m, s, null), Dt(e, s);
        }
        var i, a, o, u;
        bt(e) && s != yt && s != pt && ((e.h.g = ""), (e.C = 0)),
          4 != t || 0 != n.length || e.h.h || ((e.o = 1), tt(16), (r = !1)),
          (e.i = e.i && r),
          r
            ? 0 < n.length &&
              !e.aa &&
              ((e.aa = !0),
              (t = e.l).g == e &&
                t.$ &&
                !t.L &&
                (t.h.info(
                  "Great, no buffering proxy detected. Bytes received: " +
                    n.length
                ),
                zn(t),
                (t.L = !0),
                tt(11)))
            : (He(e.j, e.m, n, "[Invalid Chunked Response]"), At(e), St(e));
      }
      function Et(e) {
        (e.Y = Date.now() + e.P), Tt(e, e.P);
      }
      function Tt(e, t) {
        if (null != e.B) throw Error("WatchDog timer not null");
        e.B = rt(x(e.eb, e), t);
      }
      function _t(e) {
        e.B && (b.clearTimeout(e.B), (e.B = null));
      }
      function St(e) {
        0 == e.l.G || e.I || Qn(e.l, e);
      }
      function At(e) {
        _t(e);
        var t = e.L;
        t && "function" == typeof t.na && t.na(),
          (e.L = null),
          Be(e.W),
          ze(e.V),
          e.g && ((t = e.g), (e.g = null), t.abort(), t.na());
      }
      function Dt(e, t) {
        try {
          var n = e.l;
          if (0 != n.G && (n.g == e || on(n.i, e)))
            if (((n.I = e.N), !e.J && on(n.i, e) && 3 == n.G)) {
              try {
                var r = n.Ca.g.parse(t);
              } catch (e) {
                r = null;
              }
              if (Array.isArray(r) && 3 == r.length) {
                var s = r;
                if (0 == s[0]) {
                  e: if (!n.u) {
                    if (n.g) {
                      if (!(n.g.F + 3e3 < e.F)) break e;
                      Hn(n), Fn(n);
                    }
                    $n(n), tt(18);
                  }
                } else
                  (n.ta = s[1]),
                    0 < n.ta - n.U &&
                      s[2] < 37500 &&
                      n.N &&
                      0 == n.A &&
                      !n.v &&
                      (n.v = rt(x(n.ab, n), 6e3));
                if (an(n.i) <= 1 && n.ka) {
                  try {
                    n.ka();
                  } catch (e) {}
                  n.ka = void 0;
                }
              } else Xn(n, 11);
            } else if (((!e.J && n.g != e) || Hn(n), !F(t)))
              for (s = n.Ca.g.parse(t), t = 0; t < s.length; t++) {
                var i = s[t];
                if (((n.U = i[0]), (i = i[1]), 2 == n.G))
                  if ("c" == i[0]) {
                    (n.J = i[1]), (n.la = i[2]);
                    var a = i[3];
                    null != a && ((n.ma = a), n.h.info("VER=" + n.ma));
                    var o = i[4];
                    null != o && ((n.za = o), n.h.info("SVER=" + n.za));
                    var u,
                      h,
                      c,
                      l = i[5];
                    null != l &&
                      "number" == typeof l &&
                      0 < l &&
                      ((r = 1.5 * l),
                      (n.K = r),
                      n.h.info("backChannelRequestTimeoutMs_=" + r)),
                      (r = n);
                    const m = e.g;
                    m &&
                      (!(u = m.g
                        ? m.g.getResponseHeader("X-Client-Wire-Protocol")
                        : null) ||
                        (!(h = r.i).g &&
                          (B(u, "spdy") || B(u, "quic") || B(u, "h2")) &&
                          ((h.j = h.l),
                          (h.g = new Set()),
                          h.h && (un(h, h.h), (h.h = null)))),
                      !r.D ||
                        ((c = m.g
                          ? m.g.getResponseHeader("X-HTTP-Session-Id")
                          : null) &&
                          ((r.sa = c), Ut(r.F, r.D, c)))),
                      (n.G = 3),
                      n.j && n.j.xa(),
                      n.$ &&
                        ((n.O = Date.now() - e.F),
                        n.h.info("Handshake RTT: " + n.O + "ms"));
                    var d,
                      f,
                      g = e;
                    ((r = n).oa = Zn(r, r.H ? r.la : null, r.W)),
                      g.J
                        ? (hn(r.i, g),
                          (d = g),
                          (f = r.K) && d.setTimeout(f),
                          d.B && (_t(d), Et(d)),
                          (r.g = g))
                        : Gn(r),
                      0 < n.l.length && Bn(n);
                  } else ("stop" != i[0] && "close" != i[0]) || Xn(n, 7);
                else
                  3 == n.G &&
                    ("stop" == i[0] || "close" == i[0]
                      ? "stop" == i[0]
                        ? Xn(n, 7)
                        : Mn(n)
                      : "noop" != i[0] && n.j && n.j.wa(i),
                    (n.A = 0));
              }
          Ze();
        } catch (e) {}
      }
      function xt(e, t) {
        if (e.forEach && "function" == typeof e.forEach) e.forEach(t, void 0);
        else if (E(e) || "string" == typeof e) L(e, t, void 0);
        else {
          if (e.T && "function" == typeof e.T) var n = e.T();
          else if (e.R && "function" == typeof e.R) n = void 0;
          else if (E(e) || "string" == typeof e)
            for (var n = [], r = e.length, s = 0; s < r; s++) n.push(s);
          else for (s in ((n = []), (r = 0), e)) n[r++] = s;
          for (
            var s = (r = (function (e) {
                if (e.R && "function" == typeof e.R) return e.R();
                if ("string" == typeof e) return e.split("");
                if (E(e)) {
                  for (var t = [], n = e.length, r = 0; r < n; r++)
                    t.push(e[r]);
                  return t;
                }
                for (r in ((t = []), (n = 0), e)) t[n++] = e[r];
                return t;
              })(e)).length,
              i = 0;
            i < s;
            i++
          )
            t.call(void 0, r[i], n && n[i], e);
        }
      }
      function Nt(e, t) {
        (this.h = {}), (this.g = []), (this.i = 0);
        var n = arguments.length;
        if (1 < n) {
          if (n % 2) throw Error("Uneven number of arguments");
          for (var r = 0; r < n; r += 2)
            this.set(arguments[r], arguments[r + 1]);
        } else if (e)
          if (e instanceof Nt)
            for (n = e.T(), r = 0; r < n.length; r++)
              this.set(n[r], e.get(n[r]));
          else for (r in e) this.set(r, e[r]);
      }
      function Ct(e) {
        if (e.i != e.g.length) {
          for (var t = 0, n = 0; t < e.g.length; ) {
            var r = e.g[t];
            kt(e.h, r) && (e.g[n++] = r), t++;
          }
          e.g.length = n;
        }
        if (e.i != e.g.length) {
          for (var s = {}, n = (t = 0); t < e.g.length; )
            kt(s, (r = e.g[t])) || (s[(e.g[n++] = r)] = 1), t++;
          e.g.length = n;
        }
      }
      function kt(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }
      ((y = dt.prototype).setTimeout = function (e) {
        this.P = e;
      }),
        (y.gb = function (e) {
          e = e.target;
          const t = this.L;
          t && 3 == kn(e) ? t.l() : this.Ia(e);
        }),
        (y.Ia = function (e) {
          try {
            if (e == this.g)
              e: {
                var t = kn(this.g),
                  n = this.g.Da();
                this.g.ba();
                if (
                  !(t < 3) &&
                  (3 != t ||
                    J ||
                    (this.g && (this.h.h || this.g.ga() || Rn(this.g))))
                ) {
                  this.I || 4 != t || 7 == n || Ze(), _t(this);
                  var r = this.g.ba();
                  this.N = r;
                  t: if (bt(this)) {
                    var s = Rn(this.g);
                    e = "";
                    var i = s.length,
                      a = 4 == kn(this.g);
                    if (!this.h.i) {
                      if ("undefined" == typeof TextDecoder) {
                        At(this), St(this);
                        var o = "";
                        break t;
                      }
                      this.h.i = new b.TextDecoder();
                    }
                    for (n = 0; n < i; n++)
                      (this.h.h = !0),
                        (e += this.h.i.decode(s[n], {
                          stream: a && n == i - 1,
                        }));
                    s.splice(0, i),
                      (this.h.g += e),
                      (this.C = 0),
                      (o = this.h.g);
                  } else o = this.g.ga();
                  if (
                    ((this.i = 200 == r),
                    (l = this.j),
                    (d = this.u),
                    (f = this.A),
                    (g = this.m),
                    (m = this.X),
                    (p = t),
                    (y = r),
                    l.info(function () {
                      return (
                        "XMLHTTP RESP (" +
                        g +
                        ") [ attempt " +
                        m +
                        "]: " +
                        d +
                        "\n" +
                        f +
                        "\n" +
                        p +
                        " " +
                        y
                      );
                    }),
                    this.i)
                  ) {
                    if (this.$ && !this.J) {
                      t: {
                        if (this.g) {
                          var u,
                            h = this.g;
                          if (
                            (u = h.g
                              ? h.g.getResponseHeader("X-HTTP-Initial-Response")
                              : null) &&
                            !F(u)
                          ) {
                            var c = u;
                            break t;
                          }
                        }
                        c = null;
                      }
                      if (!(r = c)) {
                        (this.i = !1), (this.o = 3), tt(12), At(this), St(this);
                        break e;
                      }
                      He(
                        this.j,
                        this.m,
                        r,
                        "Initial handshake response via X-HTTP-Initial-Response"
                      ),
                        (this.J = !0),
                        Dt(this, r);
                    }
                    this.U
                      ? (It(this, t, o),
                        J &&
                          this.i &&
                          3 == t &&
                          ($e(this.V, this.W, "tick", this.fb), this.W.start()))
                      : (He(this.j, this.m, o, null), Dt(this, o)),
                      4 == t && At(this),
                      this.i &&
                        !this.I &&
                        (4 == t ? Qn(this.l, this) : ((this.i = !1), Et(this)));
                  } else
                    400 == r && 0 < o.indexOf("Unknown SID")
                      ? ((this.o = 3), tt(12))
                      : ((this.o = 0), tt(13)),
                      At(this),
                      St(this);
                }
              }
          } catch (e) {}
          var l, d, f, g, m, p, y;
        }),
        (y.fb = function () {
          var e, t;
          this.g &&
            ((e = kn(this.g)),
            (t = this.g.ga()),
            this.C < t.length &&
              (_t(this), It(this, e, t), this.i && 4 != e && Et(this)));
        }),
        (y.cancel = function () {
          (this.I = !0), At(this);
        }),
        (y.eb = function () {
          this.B = null;
          var e,
            t,
            n = Date.now();
          0 <= n - this.Y
            ? ((e = this.j),
              (t = this.A),
              e.info(function () {
                return "TIMEOUT: " + t;
              }),
              2 != this.K && (Ze(), tt(17)),
              At(this),
              (this.o = 2),
              St(this))
            : Tt(this, this.Y - n);
        }),
        ((y = Nt.prototype).R = function () {
          Ct(this);
          for (var e = [], t = 0; t < this.g.length; t++)
            e.push(this.h[this.g[t]]);
          return e;
        }),
        (y.T = function () {
          return Ct(this), this.g.concat();
        }),
        (y.get = function (e, t) {
          return kt(this.h, e) ? this.h[e] : t;
        }),
        (y.set = function (e, t) {
          kt(this.h, e) || (this.i++, this.g.push(e)), (this.h[e] = t);
        }),
        (y.forEach = function (e, t) {
          for (var n = this.T(), r = 0; r < n.length; r++) {
            var s = n[r],
              i = this.get(s);
            e.call(t, i, s, this);
          }
        });
      var Rt =
        /^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;
      function Ot(e, t) {
        var n;
        (this.i = this.s = this.j = ""),
          (this.m = null),
          (this.o = this.l = ""),
          (this.g = !1),
          e instanceof Ot
            ? ((this.g = void 0 !== t ? t : e.g),
              Vt(this, e.j),
              (this.s = e.s),
              Mt(this, e.i),
              Ft(this, e.m),
              (this.l = e.l),
              (t = e.h),
              ((n = new Qt()).i = t.i),
              t.g && ((n.g = new Nt(t.g)), (n.h = t.h)),
              Pt(this, n),
              (this.o = e.o))
            : e && (n = String(e).match(Rt))
            ? ((this.g = !!t),
              Vt(this, n[1] || "", !0),
              (this.s = qt(n[2] || "")),
              Mt(this, n[3] || "", !0),
              Ft(this, n[4]),
              (this.l = qt(n[5] || "", !0)),
              Pt(this, n[6] || "", !0),
              (this.o = qt(n[7] || "")))
            : ((this.g = !!t), (this.h = new Qt(null, this.g)));
      }
      function Lt(e) {
        return new Ot(e);
      }
      function Vt(e, t, n) {
        (e.j = n ? qt(t, !0) : t), e.j && (e.j = e.j.replace(/:$/, ""));
      }
      function Mt(e, t, n) {
        e.i = n ? qt(t, !0) : t;
      }
      function Ft(e, t) {
        if (t) {
          if (((t = Number(t)), isNaN(t) || t < 0))
            throw Error("Bad port number " + t);
          e.m = t;
        } else e.m = null;
      }
      function Pt(e, t, n) {
        var r, s;
        t instanceof Qt
          ? ((e.h = t),
            (r = e.h),
            (s = e.g) &&
              !r.j &&
              (Yt(r),
              (r.i = null),
              r.g.forEach(function (e, t) {
                var n = t.toLowerCase();
                t != n && (Xt(this, t), Zt(this, n, e));
              }, r)),
            (r.j = s))
          : (n || (t = jt(t, Wt)), (e.h = new Qt(t, e.g)));
      }
      function Ut(e, t, n) {
        e.h.set(t, n);
      }
      function Bt(e) {
        return (
          Ut(
            e,
            "zx",
            Math.floor(2147483648 * Math.random()).toString(36) +
              Math.abs(
                Math.floor(2147483648 * Math.random()) ^ Date.now()
              ).toString(36)
          ),
          e
        );
      }
      function qt(e, t) {
        return e
          ? t
            ? decodeURI(e.replace(/%25/g, "%2525"))
            : decodeURIComponent(e)
          : "";
      }
      function jt(e, t, n) {
        return "string" == typeof e
          ? ((e = encodeURI(e).replace(t, Kt)),
            (e = n ? e.replace(/%25([0-9a-fA-F]{2})/g, "%$1") : e))
          : null;
      }
      function Kt(e) {
        return (
          "%" +
          (((e = e.charCodeAt(0)) >> 4) & 15).toString(16) +
          (15 & e).toString(16)
        );
      }
      Ot.prototype.toString = function () {
        var e = [],
          t = this.j;
        t && e.push(jt(t, Gt, !0), ":");
        var n = this.i;
        return (
          (!n && "file" != t) ||
            (e.push("//"),
            (t = this.s) && e.push(jt(t, Gt, !0), "@"),
            e.push(
              encodeURIComponent(String(n)).replace(
                /%25([0-9a-fA-F]{2})/g,
                "%$1"
              )
            ),
            null != (n = this.m) && e.push(":", String(n))),
          (n = this.l) &&
            (this.i && "/" != n.charAt(0) && e.push("/"),
            e.push(jt(n, "/" == n.charAt(0) ? zt : $t, !0))),
          (n = this.h.toString()) && e.push("?", n),
          (n = this.o) && e.push("#", jt(n, Ht)),
          e.join("")
        );
      };
      var Gt = /[#\/\?@]/g,
        $t = /[#\?:]/g,
        zt = /[#\?]/g,
        Wt = /[#\?@]/g,
        Ht = /#/g;
      function Qt(e, t) {
        (this.h = this.g = null), (this.i = e || null), (this.j = !!t);
      }
      function Yt(n) {
        n.g ||
          ((n.g = new Nt()),
          (n.h = 0),
          n.i &&
            (function (e, t) {
              if (e) {
                e = e.split("&");
                for (var n = 0; n < e.length; n++) {
                  var r,
                    s = e[n].indexOf("="),
                    i = null;
                  0 <= s
                    ? ((r = e[n].substring(0, s)), (i = e[n].substring(s + 1)))
                    : (r = e[n]),
                    t(r, i ? decodeURIComponent(i.replace(/\+/g, " ")) : "");
                }
              }
            })(n.i, function (e, t) {
              n.add(decodeURIComponent(e.replace(/\+/g, " ")), t);
            }));
      }
      function Xt(e, t) {
        Yt(e),
          (t = en(e, t)),
          kt(e.g.h, t) &&
            ((e.i = null),
            (e.h -= e.g.get(t).length),
            kt((e = e.g).h, t) &&
              (delete e.h[t], e.i--, e.g.length > 2 * e.i && Ct(e)));
      }
      function Jt(e, t) {
        return Yt(e), (t = en(e, t)), kt(e.g.h, t);
      }
      function Zt(e, t, n) {
        Xt(e, t),
          0 < n.length &&
            ((e.i = null), e.g.set(en(e, t), M(n)), (e.h += n.length));
      }
      function en(e, t) {
        return (t = String(t)), (t = e.j ? t.toLowerCase() : t);
      }
      ((y = Qt.prototype).add = function (e, t) {
        Yt(this), (this.i = null), (e = en(this, e));
        var n = this.g.get(e);
        return n || this.g.set(e, (n = [])), n.push(t), (this.h += 1), this;
      }),
        (y.forEach = function (n, r) {
          Yt(this),
            this.g.forEach(function (e, t) {
              L(
                e,
                function (e) {
                  n.call(r, e, t, this);
                },
                this
              );
            }, this);
        }),
        (y.T = function () {
          Yt(this);
          for (
            var e = this.g.R(), t = this.g.T(), n = [], r = 0;
            r < t.length;
            r++
          )
            for (var s = e[r], i = 0; i < s.length; i++) n.push(t[r]);
          return n;
        }),
        (y.R = function (e) {
          Yt(this);
          var t = [];
          if ("string" == typeof e)
            Jt(this, e) && (t = V(t, this.g.get(en(this, e))));
          else {
            e = this.g.R();
            for (var n = 0; n < e.length; n++) t = V(t, e[n]);
          }
          return t;
        }),
        (y.set = function (e, t) {
          return (
            Yt(this),
            (this.i = null),
            Jt(this, (e = en(this, e))) && (this.h -= this.g.get(e).length),
            this.g.set(e, [t]),
            (this.h += 1),
            this
          );
        }),
        (y.get = function (e, t) {
          return e && 0 < (e = this.R(e)).length ? String(e[0]) : t;
        }),
        (y.toString = function () {
          if (this.i) return this.i;
          if (!this.g) return "";
          for (var e = [], t = this.g.T(), n = 0; n < t.length; n++)
            for (
              var r = t[n],
                s = encodeURIComponent(String(r)),
                r = this.R(r),
                i = 0;
              i < r.length;
              i++
            ) {
              var a = s;
              "" !== r[i] && (a += "=" + encodeURIComponent(String(r[i]))),
                e.push(a);
            }
          return (this.i = e.join("&"));
        });
      var tn = class {
        constructor(e, t) {
          (this.h = e), (this.g = t);
        }
      };
      function nn(e) {
        (this.l = e || 10),
          (e = b.PerformanceNavigationTiming
            ? 0 < (e = b.performance.getEntriesByType("navigation")).length &&
              ("hq" == e[0].nextHopProtocol || "h2" == e[0].nextHopProtocol)
            : !!(b.g && b.g.Ea && b.g.Ea() && b.g.Ea().Zb)),
          (this.j = e ? this.l : 1),
          (this.g = null),
          1 < this.j && (this.g = new Set()),
          (this.h = null),
          (this.i = []);
      }
      var rn;
      function sn(e) {
        return e.h || (e.g && e.g.size >= e.j);
      }
      function an(e) {
        return e.h ? 1 : e.g ? e.g.size : 0;
      }
      function on(e, t) {
        return e.h ? e.h == t : e.g && e.g.has(t);
      }
      function un(e, t) {
        e.g ? e.g.add(t) : (e.h = t);
      }
      function hn(e, t) {
        e.h && e.h == t ? (e.h = null) : e.g && e.g.has(t) && e.g.delete(t);
      }
      function cn(t) {
        if (null != t.h) return t.i.concat(t.h.D);
        if (null == t.g || 0 === t.g.size) return M(t.i);
        {
          let e = t.i;
          for (const n of t.g.values()) e = e.concat(n.D);
          return e;
        }
      }
      function ln() {}
      function dn() {
        this.g = new ln();
      }
      function fn(e, t, n, r, s) {
        try {
          (t.onload = null),
            (t.onerror = null),
            (t.onabort = null),
            (t.ontimeout = null),
            s(r);
        } catch (e) {}
      }
      function gn(e) {
        (this.l = e.$b || null), (this.j = e.ib || !1);
      }
      function mn(e, t) {
        xe.call(this),
          (this.D = e),
          (this.u = t),
          (this.m = void 0),
          (this.readyState = pn),
          (this.status = 0),
          (this.responseType =
            this.responseText =
            this.response =
            this.statusText =
              ""),
          (this.onreadystatechange = null),
          (this.v = new Headers()),
          (this.h = null),
          (this.C = "GET"),
          (this.B = ""),
          (this.g = !1),
          (this.A = this.j = this.l = null);
      }
      (nn.prototype.cancel = function () {
        if (((this.i = cn(this)), this.h)) this.h.cancel(), (this.h = null);
        else if (this.g && 0 !== this.g.size) {
          for (const e of this.g.values()) e.cancel();
          this.g.clear();
        }
      }),
        (ln.prototype.stringify = function (e) {
          return b.JSON.stringify(e, void 0);
        }),
        (ln.prototype.parse = function (e) {
          return b.JSON.parse(e, void 0);
        }),
        C(gn, at),
        (gn.prototype.g = function () {
          return new mn(this.l, this.j);
        }),
        (gn.prototype.i =
          ((rn = {}),
          function () {
            return rn;
          })),
        C(mn, xe);
      var pn = 0;
      function yn(e) {
        e.j.read().then(e.Sa.bind(e)).catch(e.ha.bind(e));
      }
      function vn(e) {
        (e.readyState = 4), (e.l = null), (e.j = null), (e.A = null), wn(e);
      }
      function wn(e) {
        e.onreadystatechange && e.onreadystatechange.call(e);
      }
      ((y = mn.prototype).open = function (e, t) {
        if (this.readyState != pn)
          throw (this.abort(), Error("Error reopening a connection"));
        (this.C = e), (this.B = t), (this.readyState = 1), wn(this);
      }),
        (y.send = function (e) {
          if (1 != this.readyState)
            throw (this.abort(), Error("need to call open() first. "));
          this.g = !0;
          const t = {
            headers: this.v,
            method: this.C,
            credentials: this.m,
            cache: void 0,
          };
          e && (t.body = e),
            (this.D || b)
              .fetch(new Request(this.B, t))
              .then(this.Va.bind(this), this.ha.bind(this));
        }),
        (y.abort = function () {
          (this.response = this.responseText = ""),
            (this.v = new Headers()),
            (this.status = 0),
            this.j && this.j.cancel("Request was aborted."),
            1 <= this.readyState &&
              this.g &&
              4 != this.readyState &&
              ((this.g = !1), vn(this)),
            (this.readyState = pn);
        }),
        (y.Va = function (e) {
          if (
            this.g &&
            ((this.l = e),
            this.h ||
              ((this.status = this.l.status),
              (this.statusText = this.l.statusText),
              (this.h = e.headers),
              (this.readyState = 2),
              wn(this)),
            this.g && ((this.readyState = 3), wn(this), this.g))
          )
            if ("arraybuffer" === this.responseType)
              e.arrayBuffer().then(this.Ta.bind(this), this.ha.bind(this));
            else if (void 0 !== b.ReadableStream && "body" in e) {
              if (((this.j = e.body.getReader()), this.u)) {
                if (this.responseType)
                  throw Error(
                    'responseType must be empty for "streamBinaryChunks" mode responses.'
                  );
                this.response = [];
              } else
                (this.response = this.responseText = ""),
                  (this.A = new TextDecoder());
              yn(this);
            } else e.text().then(this.Ua.bind(this), this.ha.bind(this));
        }),
        (y.Sa = function (e) {
          var t;
          this.g &&
            (this.u && e.value
              ? this.response.push(e.value)
              : this.u ||
                ((t = e.value || new Uint8Array(0)),
                (t = this.A.decode(t, { stream: !e.done })) &&
                  (this.response = this.responseText += t)),
            (e.done ? vn : wn)(this),
            3 == this.readyState && yn(this));
        }),
        (y.Ua = function (e) {
          this.g && ((this.response = this.responseText = e), vn(this));
        }),
        (y.Ta = function (e) {
          this.g && ((this.response = e), vn(this));
        }),
        (y.ha = function () {
          this.g && vn(this);
        }),
        (y.setRequestHeader = function (e, t) {
          this.v.append(e, t);
        }),
        (y.getResponseHeader = function (e) {
          return (this.h && this.h.get(e.toLowerCase())) || "";
        }),
        (y.getAllResponseHeaders = function () {
          if (!this.h) return "";
          const e = [],
            t = this.h.entries();
          for (var n = t.next(); !n.done; )
            (n = n.value), e.push(n[0] + ": " + n[1]), (n = t.next());
          return e.join("\r\n");
        }),
        Object.defineProperty(mn.prototype, "withCredentials", {
          get: function () {
            return "include" === this.m;
          },
          set: function (e) {
            this.m = e ? "include" : "same-origin";
          },
        });
      var bn = b.JSON.parse;
      function In(e) {
        xe.call(this),
          (this.headers = new Nt()),
          (this.u = e || null),
          (this.h = !1),
          (this.C = this.g = null),
          (this.H = ""),
          (this.m = 0),
          (this.j = ""),
          (this.l = this.F = this.v = this.D = !1),
          (this.B = 0),
          (this.A = null),
          (this.J = En),
          (this.K = this.L = !1);
      }
      C(In, xe);
      var En = "",
        Tn = /^https?$/i,
        _n = ["POST", "PUT"];
      function Sn(e) {
        return "content-type" == e.toLowerCase();
      }
      function An(e, t) {
        (e.h = !1),
          e.g && ((e.l = !0), e.g.abort(), (e.l = !1)),
          (e.j = t),
          (e.m = 5),
          Dn(e),
          Nn(e);
      }
      function Dn(e) {
        e.D || ((e.D = !0), Ne(e, "complete"), Ne(e, "error"));
      }
      function xn(e) {
        if (e.h && void 0 !== w && (!e.C[1] || 4 != kn(e) || 2 != e.ba()))
          if (e.v && 4 == kn(e)) qe(e.Fa, 0, e);
          else if ((Ne(e, "readystatechange"), 4 == kn(e))) {
            e.h = !1;
            try {
              var t,
                n,
                r,
                s,
                i = e.ba();
              e: switch (i) {
                case 200:
                case 201:
                case 202:
                case 204:
                case 206:
                case 304:
                case 1223:
                  var a = !0;
                  break e;
                default:
                  a = !1;
              }
              if (
                ((t = a) ||
                  ((n = 0 === i) &&
                    (!(s = String(e.H).match(Rt)[1] || null) &&
                      b.self &&
                      b.self.location &&
                      (s = (r = b.self.location.protocol).substr(
                        0,
                        r.length - 1
                      )),
                    (n = !Tn.test(s ? s.toLowerCase() : ""))),
                  (t = n)),
                t)
              )
                Ne(e, "complete"), Ne(e, "success");
              else {
                e.m = 6;
                try {
                  var o = 2 < kn(e) ? e.g.statusText : "";
                } catch (e) {
                  o = "";
                }
                (e.j = o + " [" + e.ba() + "]"), Dn(e);
              }
            } finally {
              Nn(e);
            }
          }
      }
      function Nn(e, t) {
        if (e.g) {
          Cn(e);
          const n = e.g,
            r = e.C[0] ? I : null;
          (e.g = null), (e.C = null), t || Ne(e, "ready");
          try {
            n.onreadystatechange = r;
          } catch (e) {}
        }
      }
      function Cn(e) {
        e.g && e.K && (e.g.ontimeout = null),
          e.A && (b.clearTimeout(e.A), (e.A = null));
      }
      function kn(e) {
        return e.g ? e.g.readyState : 0;
      }
      function Rn(e) {
        try {
          if (!e.g) return null;
          if ("response" in e.g) return e.g.response;
          switch (e.J) {
            case En:
            case "text":
              return e.g.responseText;
            case "arraybuffer":
              if ("mozResponseArrayBuffer" in e.g)
                return e.g.mozResponseArrayBuffer;
          }
          return null;
        } catch (e) {
          return null;
        }
      }
      function On(e, t, n) {
        e: {
          for (r in n) {
            var r = !1;
            break e;
          }
          r = !0;
        }
        r ||
          ((n = (function (e) {
            let n = "";
            return (
              K(e, function (e, t) {
                (n += t), (n += ":"), (n += e), (n += "\r\n");
              }),
              n
            );
          })(n)),
          "string" == typeof e
            ? null != n && encodeURIComponent(String(n))
            : Ut(e, t, n));
      }
      function Ln(e, t, n) {
        return (
          (n && n.internalChannelParams && n.internalChannelParams[e]) || t
        );
      }
      function Vn(e) {
        (this.za = 0),
          (this.l = []),
          (this.h = new We()),
          (this.la =
            this.oa =
            this.F =
            this.W =
            this.g =
            this.sa =
            this.D =
            this.aa =
            this.o =
            this.P =
            this.s =
              null),
          (this.Za = this.V = 0),
          (this.Xa = Ln("failFast", !1, e)),
          (this.N = this.v = this.u = this.m = this.j = null),
          (this.X = !0),
          (this.I = this.ta = this.U = -1),
          (this.Y = this.A = this.C = 0),
          (this.Pa = Ln("baseRetryDelayMs", 5e3, e)),
          (this.$a = Ln("retryDelaySeedMs", 1e4, e)),
          (this.Ya = Ln("forwardChannelMaxRetries", 2, e)),
          (this.ra = Ln("forwardChannelRequestTimeoutMs", 2e4, e)),
          (this.qa = (e && e.xmlHttpFactory) || void 0),
          (this.Ba = (e && e.Yb) || !1),
          (this.K = void 0),
          (this.H = (e && e.supportsCrossDomainXhr) || !1),
          (this.J = ""),
          (this.i = new nn(e && e.concurrentRequestLimit)),
          (this.Ca = new dn()),
          (this.ja = (e && e.fastHandshake) || !1),
          (this.Ra = (e && e.Wb) || !1),
          e && e.Aa && this.h.Aa(),
          e && e.forceLongPolling && (this.X = !1),
          (this.$ = (!this.ja && this.X && e && e.detectBufferingProxy) || !1),
          (this.ka = void 0),
          (this.O = 0),
          (this.L = !1),
          (this.B = null),
          (this.Wa = !e || !1 !== e.Xb);
      }
      function Mn(e) {
        var t, n;
        Pn(e),
          3 == e.G &&
            ((t = e.V++),
            Ut((n = Lt(e.F)), "SID", e.J),
            Ut(n, "RID", t),
            Ut(n, "TYPE", "terminate"),
            jn(e, n),
            ((t = new dt(e, e.h, t, void 0)).K = 2),
            (t.v = Bt(Lt(n))),
            (n = !1),
            !(n =
              b.navigator && b.navigator.sendBeacon
                ? b.navigator.sendBeacon(t.v.toString(), "")
                : n) &&
              b.Image &&
              ((new Image().src = t.v), (n = !0)),
            n || ((t.g = er(t.l, null)), t.g.ea(t.v)),
            (t.F = Date.now()),
            Et(t)),
          Jn(e);
      }
      function Fn(e) {
        e.g && (zn(e), e.g.cancel(), (e.g = null));
      }
      function Pn(e) {
        Fn(e),
          e.u && (b.clearTimeout(e.u), (e.u = null)),
          Hn(e),
          e.i.cancel(),
          e.m && ("number" == typeof e.m && b.clearTimeout(e.m), (e.m = null));
      }
      function Un(e, t) {
        e.l.push(new tn(e.Za++, t)), 3 == e.G && Bn(e);
      }
      function Bn(e) {
        sn(e.i) || e.m || ((e.m = !0), Ve(e.Ha, e), (e.C = 0));
      }
      function qn(e, t) {
        var n = t ? t.m : e.V++,
          r = Lt(e.F);
        Ut(r, "SID", e.J),
          Ut(r, "RID", n),
          Ut(r, "AID", e.U),
          jn(e, r),
          e.o && e.s && On(r, e.o, e.s),
          (n = new dt(e, e.h, n, e.C + 1)),
          null === e.o && (n.H = e.s),
          t && (e.l = t.D.concat(e.l)),
          (t = Kn(e, n, 1e3)),
          n.setTimeout(
            Math.round(0.5 * e.ra) + Math.round(0.5 * e.ra * Math.random())
          ),
          un(e.i, n),
          vt(n, r, t);
      }
      function jn(e, n) {
        e.j &&
          xt({}, function (e, t) {
            Ut(n, t, e);
          });
      }
      function Kn(e, t, r) {
        r = Math.min(e.l.length, r);
        var s = e.j ? x(e.j.Oa, e.j, e) : null;
        e: {
          var i = e.l;
          let n = -1;
          for (;;) {
            const u = ["count=" + r];
            -1 == n
              ? 0 < r
                ? ((n = i[0].h), u.push("ofs=" + n))
                : (n = 0)
              : u.push("ofs=" + n);
            let e = !0;
            for (let t = 0; t < r; t++) {
              var a = i[t].h,
                o = i[t].g;
              if ((a -= n) < 0) (n = Math.max(0, i[t].h - 100)), (e = !1);
              else
                try {
                  !(function (e, r, t) {
                    const s = t || "";
                    try {
                      xt(e, function (e, t) {
                        let n = e;
                        T(e) && (n = ke(e)),
                          r.push(s + t + "=" + encodeURIComponent(n));
                      });
                    } catch (e) {
                      throw (
                        (r.push(s + "type=" + encodeURIComponent("_badmap")), e)
                      );
                    }
                  })(o, u, "req" + a + "_");
                } catch (e) {
                  s && s(o);
                }
            }
            if (e) {
              s = u.join("&");
              break e;
            }
          }
        }
        return (e = e.l.splice(0, r)), (t.D = e), s;
      }
      function Gn(e) {
        e.g || e.u || ((e.Y = 1), Ve(e.Ga, e), (e.A = 0));
      }
      function $n(e) {
        return (
          !(e.g || e.u || 3 <= e.A) &&
          (e.Y++, (e.u = rt(x(e.Ga, e), Yn(e, e.A))), e.A++, 1)
        );
      }
      function zn(e) {
        null != e.B && (b.clearTimeout(e.B), (e.B = null));
      }
      function Wn(e) {
        (e.g = new dt(e, e.h, "rpc", e.Y)),
          null === e.o && (e.g.H = e.s),
          (e.g.O = 0);
        var t = Lt(e.oa);
        Ut(t, "RID", "rpc"),
          Ut(t, "SID", e.J),
          Ut(t, "CI", e.N ? "0" : "1"),
          Ut(t, "AID", e.U),
          jn(e, t),
          Ut(t, "TYPE", "xmlhttp"),
          e.o && e.s && On(t, e.o, e.s),
          e.K && e.g.setTimeout(e.K);
        var n = e.g;
        (e = e.la),
          (n.K = 1),
          (n.v = Bt(Lt(t))),
          (n.s = null),
          (n.U = !0),
          wt(n, e);
      }
      function Hn(e) {
        null != e.v && (b.clearTimeout(e.v), (e.v = null));
      }
      function Qn(e, t) {
        var n,
          r,
          s,
          i = null;
        if (e.g == t) {
          Hn(e), zn(e), (e.g = null);
          var a = 2;
        } else {
          if (!on(e.i, t)) return;
          (i = t.D), hn(e.i, t), (a = 1);
        }
        if (((e.I = t.N), 0 != e.G))
          if (t.i)
            1 == a
              ? ((i = t.s ? t.s.length : 0),
                (t = Date.now() - t.F),
                (n = e.C),
                Ne((a = Xe()), new nt(a, i)),
                Bn(e))
              : Gn(e);
          else if (
            3 == (n = t.o) ||
            (0 == n && 0 < e.I) ||
            ((1 != a ||
              ((s = t),
              an((r = e).i) >= r.i.j - (r.m ? 1 : 0) ||
                (r.m
                  ? ((r.l = s.D.concat(r.l)), 0)
                  : 1 == r.G ||
                    2 == r.G ||
                    r.C >= (r.Xa ? 0 : r.Ya) ||
                    ((r.m = rt(x(r.Ha, r, s), Yn(r, r.C))), r.C++, 0)))) &&
              (2 != a || !$n(e)))
          )
            switch (
              (i && 0 < i.length && ((t = e.i), (t.i = t.i.concat(i))), n)
            ) {
              case 1:
                Xn(e, 5);
                break;
              case 4:
                Xn(e, 10);
                break;
              case 3:
                Xn(e, 6);
                break;
              default:
                Xn(e, 2);
            }
      }
      function Yn(e, t) {
        let n = e.Pa + Math.floor(Math.random() * e.$a);
        return e.j || (n *= 2), n * t;
      }
      function Xn(e, t) {
        var n, r;
        e.h.info("Error code " + t),
          2 == t
            ? ((n = null),
              e.j && (n = null),
              (r = x(e.jb, e)),
              n ||
                ((n = new Ot("//www.google.com/images/cleardot.gif")),
                (b.location && "http" == b.location.protocol) || Vt(n, "https"),
                Bt(n)),
              (function (e, t) {
                var n = new We();
                if (b.Image) {
                  const r = new Image();
                  (r.onload = N(fn, n, r, "TestLoadImage: loaded", !0, t)),
                    (r.onerror = N(fn, n, r, "TestLoadImage: error", !1, t)),
                    (r.onabort = N(fn, n, r, "TestLoadImage: abort", !1, t)),
                    (r.ontimeout = N(
                      fn,
                      n,
                      r,
                      "TestLoadImage: timeout",
                      !1,
                      t
                    )),
                    b.setTimeout(function () {
                      r.ontimeout && r.ontimeout();
                    }, 1e4),
                    (r.src = e);
                } else t(!1);
              })(n.toString(), r))
            : tt(2),
          (e.G = 0),
          e.j && e.j.va(t),
          Jn(e),
          Pn(e);
      }
      function Jn(e) {
        (e.G = 0),
          (e.I = -1),
          e.j &&
            ((0 == cn(e.i).length && 0 == e.l.length) ||
              ((e.i.i.length = 0), M(e.l), (e.l.length = 0)),
            e.j.ua());
      }
      function Zn(e, t, n) {
        let r = (o = n) instanceof Ot ? Lt(o) : new Ot(o, void 0);
        var s, i, a, o, u;
        return (
          "" != r.i
            ? (t && Mt(r, t + "." + r.i), Ft(r, r.m))
            : ((u = b.location),
              (r =
                ((s = u.protocol),
                (i = t ? t + "." + u.hostname : u.hostname),
                (a = +u.port),
                (o = n),
                (u = new Ot(null, void 0)),
                s && Vt(u, s),
                i && Mt(u, i),
                a && Ft(u, a),
                o && (u.l = o),
                u))),
          e.aa &&
            K(e.aa, function (e, t) {
              Ut(r, t, e);
            }),
          (t = e.D),
          (n = e.sa),
          t && n && Ut(r, t, n),
          Ut(r, "VER", e.ma),
          jn(e, r),
          r
        );
      }
      function er(e, t, n) {
        if (t && !e.H)
          throw Error("Can't create secondary domain capable XhrIo object.");
        return (
          ((t =
            n && e.Ba && !e.qa ? new In(new gn({ ib: !0 })) : new In(e.qa)).L =
            e.H),
          t
        );
      }
      function tr() {}
      function nr() {
        if (Y && !(10 <= Number(ae)))
          throw Error("Environmental error: no available transport.");
      }
      function rr(e, t) {
        xe.call(this),
          (this.g = new Vn(t)),
          (this.l = e),
          (this.h = (t && t.messageUrlParams) || null),
          (e = (t && t.messageHeaders) || null),
          t &&
            t.clientProtocolHeaderRequired &&
            (e
              ? (e["X-Client-Protocol"] = "webchannel")
              : (e = { "X-Client-Protocol": "webchannel" })),
          (this.g.s = e),
          (e = (t && t.initMessageHeaders) || null),
          t &&
            t.messageContentType &&
            (e
              ? (e["X-WebChannel-Content-Type"] = t.messageContentType)
              : (e = { "X-WebChannel-Content-Type": t.messageContentType })),
          t &&
            t.ya &&
            (e
              ? (e["X-WebChannel-Client-Profile"] = t.ya)
              : (e = { "X-WebChannel-Client-Profile": t.ya })),
          (this.g.P = e),
          (e = t && t.httpHeadersOverwriteParam) && !F(e) && (this.g.o = e),
          (this.A = (t && t.supportsCrossDomainXhr) || !1),
          (this.v = (t && t.sendRawJson) || !1),
          (t = t && t.httpSessionIdParam) &&
            !F(t) &&
            ((this.g.D = t),
            null !== (e = this.h) &&
              t in e &&
              t in (e = this.h) &&
              delete e[t]),
          (this.j = new ar(this));
      }
      function sr(e) {
        ht.call(this);
        var t = e.__sm__;
        if (t) {
          e: {
            for (const n in t) {
              e = n;
              break e;
            }
            e = void 0;
          }
          (this.i = e) &&
            ((e = this.i), (t = null !== t && e in t ? t[e] : void 0)),
            (this.data = t);
        } else this.data = e;
      }
      function ir() {
        ct.call(this), (this.status = 1);
      }
      function ar(e) {
        this.g = e;
      }
      ((y = In.prototype).ea = function (e, t, n, r) {
        if (this.g)
          throw Error(
            "[goog.net.XhrIo] Object is active with another request=" +
              this.H +
              "; newUri=" +
              e
          );
        (t = t ? t.toUpperCase() : "GET"),
          (this.H = e),
          (this.j = ""),
          (this.m = 0),
          (this.D = !1),
          (this.h = !0),
          (this.g = (this.u || gt).g()),
          (this.C = this.u ? ot(this.u) : ot(gt)),
          (this.g.onreadystatechange = x(this.Fa, this));
        try {
          (this.F = !0), this.g.open(t, String(e), !0), (this.F = !1);
        } catch (e) {
          return void An(this, e);
        }
        e = n || "";
        const s = new Nt(this.headers);
        r &&
          xt(r, function (e, t) {
            s.set(t, e);
          }),
          (r = (function (t) {
            e: {
              var n = Sn,
                r = t.length,
                s = "string" == typeof t ? t.split("") : t;
              for (let e = 0; e < r; e++)
                if (e in s && n.call(void 0, s[e], e, t)) {
                  n = e;
                  break e;
                }
              n = -1;
            }
            return n < 0 ? null : "string" == typeof t ? t.charAt(n) : t[n];
          })(s.T())),
          (n = b.FormData && e instanceof b.FormData),
          0 <= O(_n, t) &&
            !r &&
            !n &&
            s.set(
              "Content-Type",
              "application/x-www-form-urlencoded;charset=utf-8"
            ),
          s.forEach(function (e, t) {
            this.g.setRequestHeader(t, e);
          }, this),
          this.J && (this.g.responseType = this.J),
          "withCredentials" in this.g &&
            this.g.withCredentials !== this.L &&
            (this.g.withCredentials = this.L);
        try {
          Cn(this),
            0 < this.B &&
              ((this.K =
                ((i = this.g),
                Y &&
                  ie() &&
                  "number" == typeof i.timeout &&
                  void 0 !== i.ontimeout))
                ? ((this.g.timeout = this.B),
                  (this.g.ontimeout = x(this.pa, this)))
                : (this.A = qe(this.pa, this.B, this))),
            (this.v = !0),
            this.g.send(e),
            (this.v = !1);
        } catch (e) {
          An(this, e);
        }
        var i;
      }),
        (y.pa = function () {
          void 0 !== w &&
            this.g &&
            ((this.j = "Timed out after " + this.B + "ms, aborting"),
            (this.m = 8),
            Ne(this, "timeout"),
            this.abort(8));
        }),
        (y.abort = function (e) {
          this.g &&
            this.h &&
            ((this.h = !1),
            (this.l = !0),
            this.g.abort(),
            (this.l = !1),
            (this.m = e || 7),
            Ne(this, "complete"),
            Ne(this, "abort"),
            Nn(this));
        }),
        (y.M = function () {
          this.g &&
            (this.h &&
              ((this.h = !1), (this.l = !0), this.g.abort(), (this.l = !1)),
            Nn(this, !0)),
            In.Z.M.call(this);
        }),
        (y.Fa = function () {
          this.s || (this.F || this.v || this.l ? xn(this) : this.cb());
        }),
        (y.cb = function () {
          xn(this);
        }),
        (y.ba = function () {
          try {
            return 2 < kn(this) ? this.g.status : -1;
          } catch (e) {
            return -1;
          }
        }),
        (y.ga = function () {
          try {
            return this.g ? this.g.responseText : "";
          } catch (e) {
            return "";
          }
        }),
        (y.Qa = function (e) {
          if (this.g) {
            var t = this.g.responseText;
            return e && 0 == t.indexOf(e) && (t = t.substring(e.length)), bn(t);
          }
        }),
        (y.Da = function () {
          return this.m;
        }),
        (y.La = function () {
          return "string" == typeof this.j ? this.j : String(this.j);
        }),
        ((y = Vn.prototype).ma = 8),
        (y.G = 1),
        (y.hb = function (e) {
          try {
            this.h.info("Origin Trials invoked: " + e);
          } catch (e) {}
        }),
        (y.Ha = function (t) {
          if (this.m)
            if (((this.m = null), 1 == this.G)) {
              if (!t) {
                (this.V = Math.floor(1e5 * Math.random())), (t = this.V++);
                const i = new dt(this, this.h, t, void 0);
                let e = this.s;
                if (
                  (this.P && (e ? ((e = G(e)), z(e, this.P)) : (e = this.P)),
                  null === this.o && (i.H = e),
                  this.ja)
                )
                  e: {
                    for (var n = 0, r = 0; r < this.l.length; r++) {
                      var s = this.l[r];
                      if (
                        ("__data__" in s.g &&
                        "string" == typeof (s = s.g.__data__)
                          ? (s = s.length)
                          : (s = void 0),
                        void 0 === s)
                      )
                        break;
                      if (4096 < (n += s)) {
                        n = r;
                        break e;
                      }
                      if (4096 === n || r === this.l.length - 1) {
                        n = r + 1;
                        break e;
                      }
                    }
                    n = 1e3;
                  }
                else n = 1e3;
                (n = Kn(this, i, n)),
                  Ut((r = Lt(this.F)), "RID", t),
                  Ut(r, "CVER", 22),
                  this.D && Ut(r, "X-HTTP-Session-Id", this.D),
                  jn(this, r),
                  this.o && e && On(r, this.o, e),
                  un(this.i, i),
                  this.Ra && Ut(r, "TYPE", "init"),
                  this.ja
                    ? (Ut(r, "$req", n),
                      Ut(r, "SID", "null"),
                      (i.$ = !0),
                      vt(i, r, null))
                    : vt(i, r, n),
                  (this.G = 2);
              }
            } else
              3 == this.G &&
                (t
                  ? qn(this, t)
                  : 0 == this.l.length || sn(this.i) || qn(this));
        }),
        (y.Ga = function () {
          var e;
          (this.u = null),
            Wn(this),
            this.$ &&
              !(this.L || null == this.g || this.O <= 0) &&
              ((e = 2 * this.O),
              this.h.info("BP detection timer enabled: " + e),
              (this.B = rt(x(this.bb, this), e)));
        }),
        (y.bb = function () {
          this.B &&
            ((this.B = null),
            this.h.info("BP detection timeout reached."),
            this.h.info("Buffering proxy detected and switch to long-polling!"),
            (this.N = !1),
            (this.L = !0),
            tt(10),
            Fn(this),
            Wn(this));
        }),
        (y.ab = function () {
          null != this.v && ((this.v = null), Fn(this), $n(this), tt(19));
        }),
        (y.jb = function (e) {
          e
            ? (this.h.info("Successfully pinged google.com"), tt(2))
            : (this.h.info("Failed to ping google.com"), tt(1));
        }),
        ((y = tr.prototype).xa = function () {}),
        (y.wa = function () {}),
        (y.va = function () {}),
        (y.ua = function () {}),
        (y.Oa = function () {}),
        (nr.prototype.g = function (e, t) {
          return new rr(e, t);
        }),
        C(rr, xe),
        (rr.prototype.m = function () {
          (this.g.j = this.j), this.A && (this.g.H = !0);
          var e = this.g,
            t = this.l,
            n = this.h || void 0;
          e.Wa && (e.h.info("Origin Trials enabled."), Ve(x(e.hb, e, t))),
            tt(0),
            (e.W = t),
            (e.aa = n || {}),
            (e.N = e.X),
            (e.F = Zn(e, null, e.W)),
            Bn(e);
        }),
        (rr.prototype.close = function () {
          Mn(this.g);
        }),
        (rr.prototype.u = function (e) {
          var t;
          "string" == typeof e
            ? (((t = {}).__data__ = e), Un(this.g, t))
            : this.v
            ? (((t = {}).__data__ = ke(e)), Un(this.g, t))
            : Un(this.g, e);
        }),
        (rr.prototype.M = function () {
          (this.g.j = null),
            delete this.j,
            Mn(this.g),
            delete this.g,
            rr.Z.M.call(this);
        }),
        C(sr, ht),
        C(ir, ct),
        C(ar, tr),
        (ar.prototype.xa = function () {
          Ne(this.g, "a");
        }),
        (ar.prototype.wa = function (e) {
          Ne(this.g, new sr(e));
        }),
        (ar.prototype.va = function (e) {
          Ne(this.g, new ir());
        }),
        (ar.prototype.ua = function () {
          Ne(this.g, "b");
        }),
        (nr.prototype.createWebChannel = nr.prototype.g),
        (rr.prototype.send = rr.prototype.u),
        (rr.prototype.open = rr.prototype.m),
        (st.NO_ERROR = 0),
        (st.TIMEOUT = 8),
        (st.HTTP_ERROR = 6),
        (it.COMPLETE = "complete"),
        ((ut.EventType = v).OPEN = "a"),
        (v.CLOSE = "b"),
        (v.ERROR = "c"),
        (v.MESSAGE = "d"),
        (xe.prototype.listen = xe.prototype.N),
        (In.prototype.listenOnce = In.prototype.O),
        (In.prototype.getLastError = In.prototype.La),
        (In.prototype.getLastErrorCode = In.prototype.Da),
        (In.prototype.getStatus = In.prototype.ba),
        (In.prototype.getResponseJson = In.prototype.Qa),
        (In.prototype.getResponseText = In.prototype.ga),
        (In.prototype.send = In.prototype.ea);
      var or,
        ur = Xe,
        hr = st,
        cr = it,
        lr = Qe,
        dr = 10,
        fr = 11,
        gr = gn,
        mr = ut,
        pr = In;
      const yr = "@firebase/firestore";
      class vr {
        constructor(e) {
          this.uid = e;
        }
        isAuthenticated() {
          return null != this.uid;
        }
        toKey() {
          return this.isAuthenticated() ? "uid:" + this.uid : "anonymous-user";
        }
        isEqual(e) {
          return e.uid === this.uid;
        }
      }
      (vr.UNAUTHENTICATED = new vr(null)),
        (vr.GOOGLE_CREDENTIALS = new vr("google-credentials-uid")),
        (vr.FIRST_PARTY = new vr("first-party-uid")),
        (vr.MOCK_USER = new vr("mock-user"));
      let wr = "9.8.2";
      const br = new (class {
        constructor(e) {
          (this.name = e),
            (this._logLevel = d),
            (this._logHandler = p),
            (this._userLogHandler = null);
        }
        get logLevel() {
          return this._logLevel;
        }
        set logLevel(e) {
          if (!(e in l))
            throw new TypeError(
              `Invalid value "${e}" assigned to \`logLevel\``
            );
          this._logLevel = e;
        }
        setLogLevel(e) {
          this._logLevel = "string" == typeof e ? c[e] : e;
        }
        get logHandler() {
          return this._logHandler;
        }
        set logHandler(e) {
          if ("function" != typeof e)
            throw new TypeError(
              "Value assigned to `logHandler` must be a function"
            );
          this._logHandler = e;
        }
        get userLogHandler() {
          return this._userLogHandler;
        }
        set userLogHandler(e) {
          this._userLogHandler = e;
        }
        debug(...e) {
          this._userLogHandler && this._userLogHandler(this, l.DEBUG, ...e),
            this._logHandler(this, l.DEBUG, ...e);
        }
        log(...e) {
          this._userLogHandler && this._userLogHandler(this, l.VERBOSE, ...e),
            this._logHandler(this, l.VERBOSE, ...e);
        }
        info(...e) {
          this._userLogHandler && this._userLogHandler(this, l.INFO, ...e),
            this._logHandler(this, l.INFO, ...e);
        }
        warn(...e) {
          this._userLogHandler && this._userLogHandler(this, l.WARN, ...e),
            this._logHandler(this, l.WARN, ...e);
        }
        error(...e) {
          this._userLogHandler && this._userLogHandler(this, l.ERROR, ...e),
            this._logHandler(this, l.ERROR, ...e);
        }
      })("@firebase/firestore");
      function Ir() {
        return br.logLevel;
      }
      function Er(e, ...t) {
        var n;
        br.logLevel <= l.DEBUG &&
          ((n = t.map(Sr)), br.debug(`Firestore (${wr}): ${e}`, ...n));
      }
      function Tr(e, ...t) {
        var n;
        br.logLevel <= l.ERROR &&
          ((n = t.map(Sr)), br.error(`Firestore (${wr}): ${e}`, ...n));
      }
      function _r(e, ...t) {
        var n;
        br.logLevel <= l.WARN &&
          ((n = t.map(Sr)), br.warn(`Firestore (${wr}): ${e}`, ...n));
      }
      function Sr(t) {
        if ("string" == typeof t) return t;
        try {
          return JSON.stringify(t);
        } catch (e) {
          return t;
        }
      }
      function Ar(e = "Unexpected state") {
        var t = `FIRESTORE (${wr}) INTERNAL ASSERTION FAILED: ` + e;
        throw (Tr(t), new Error(t));
      }
      function Dr(e) {
        e || Ar();
      }
      const xr = {
        OK: "ok",
        CANCELLED: "cancelled",
        UNKNOWN: "unknown",
        INVALID_ARGUMENT: "invalid-argument",
        DEADLINE_EXCEEDED: "deadline-exceeded",
        NOT_FOUND: "not-found",
        ALREADY_EXISTS: "already-exists",
        PERMISSION_DENIED: "permission-denied",
        UNAUTHENTICATED: "unauthenticated",
        RESOURCE_EXHAUSTED: "resource-exhausted",
        FAILED_PRECONDITION: "failed-precondition",
        ABORTED: "aborted",
        OUT_OF_RANGE: "out-of-range",
        UNIMPLEMENTED: "unimplemented",
        INTERNAL: "internal",
        UNAVAILABLE: "unavailable",
        DATA_LOSS: "data-loss",
      };
      class Nr extends o {
        constructor(e, t) {
          super(e, t),
            (this.code = e),
            (this.message = t),
            (this.toString = () =>
              `${this.name}: [code=${this.code}]: ${this.message}`);
        }
      }
      class Cr {
        constructor() {
          this.promise = new Promise((e, t) => {
            (this.resolve = e), (this.reject = t);
          });
        }
      }
      class kr {
        constructor(e, t) {
          (this.user = t),
            (this.type = "OAuth"),
            (this.headers = new Map()),
            this.headers.set("Authorization", `Bearer ${e}`);
        }
      }
      class Rr {
        getToken() {
          return Promise.resolve(null);
        }
        invalidateToken() {}
        start(e, t) {
          e.enqueueRetryable(() => t(vr.UNAUTHENTICATED));
        }
        shutdown() {}
      }
      class Or {
        constructor(e) {
          (this.token = e), (this.changeListener = null);
        }
        getToken() {
          return Promise.resolve(this.token);
        }
        invalidateToken() {}
        start(e, t) {
          (this.changeListener = t),
            e.enqueueRetryable(() => t(this.token.user));
        }
        shutdown() {
          this.changeListener = null;
        }
      }
      class Lr {
        constructor(e) {
          (this.t = e),
            (this.currentUser = vr.UNAUTHENTICATED),
            (this.i = 0),
            (this.forceRefresh = !1),
            (this.auth = null);
        }
        start(t, n) {
          let r = this.i;
          const s = (e) =>
            this.i !== r ? ((r = this.i), n(e)) : Promise.resolve();
          let i = new Cr();
          this.o = () => {
            this.i++,
              (this.currentUser = this.u()),
              i.resolve(),
              (i = new Cr()),
              t.enqueueRetryable(() => s(this.currentUser));
          };
          const a = () => {
              const e = i;
              t.enqueueRetryable(async () => {
                await e.promise, await s(this.currentUser);
              });
            },
            o = (e) => {
              Er("FirebaseAuthCredentialsProvider", "Auth detected"),
                (this.auth = e),
                this.auth.addAuthTokenListener(this.o),
                a();
            };
          this.t.onInit((e) => o(e)),
            setTimeout(() => {
              var e;
              this.auth ||
                ((e = this.t.getImmediate({ optional: !0 }))
                  ? o(e)
                  : (Er(
                      "FirebaseAuthCredentialsProvider",
                      "Auth not yet detected"
                    ),
                    i.resolve(),
                    (i = new Cr())));
            }, 0),
            a();
        }
        getToken() {
          const t = this.i,
            e = this.forceRefresh;
          return (
            (this.forceRefresh = !1),
            this.auth
              ? this.auth
                  .getToken(e)
                  .then((e) =>
                    this.i !== t
                      ? (Er(
                          "FirebaseAuthCredentialsProvider",
                          "getToken aborted due to token change."
                        ),
                        this.getToken())
                      : e
                      ? (Dr("string" == typeof e.accessToken),
                        new kr(e.accessToken, this.currentUser))
                      : null
                  )
              : Promise.resolve(null)
          );
        }
        invalidateToken() {
          this.forceRefresh = !0;
        }
        shutdown() {
          this.auth && this.auth.removeAuthTokenListener(this.o);
        }
        u() {
          var e = this.auth && this.auth.getUid();
          return Dr(null === e || "string" == typeof e), new vr(e);
        }
      }
      class Vr {
        constructor(e, t, n) {
          (this.type = "FirstParty"),
            (this.user = vr.FIRST_PARTY),
            (this.headers = new Map()),
            this.headers.set("X-Goog-AuthUser", t);
          var r = e.auth.getAuthHeaderValueForFirstParty([]);
          r && this.headers.set("Authorization", r),
            n && this.headers.set("X-Goog-Iam-Authorization-Token", n);
        }
      }
      class Mr {
        constructor(e, t, n) {
          (this.h = e), (this.l = t), (this.m = n);
        }
        getToken() {
          return Promise.resolve(new Vr(this.h, this.l, this.m));
        }
        start(e, t) {
          e.enqueueRetryable(() => t(vr.FIRST_PARTY));
        }
        shutdown() {}
        invalidateToken() {}
      }
      class Fr {
        constructor(e) {
          (this.value = e),
            (this.type = "AppCheck"),
            (this.headers = new Map()),
            e &&
              0 < e.length &&
              this.headers.set("x-firebase-appcheck", this.value);
        }
      }
      class Pr {
        constructor(e) {
          (this.g = e),
            (this.forceRefresh = !1),
            (this.appCheck = null),
            (this.p = null);
        }
        start(t, n) {
          const r = (e) => {
            null != e.error &&
              Er(
                "FirebaseAppCheckTokenProvider",
                `Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`
              );
            var t = e.token !== this.p;
            return (
              (this.p = e.token),
              Er(
                "FirebaseAppCheckTokenProvider",
                `Received ${t ? "new" : "existing"} token.`
              ),
              t ? n(e.token) : Promise.resolve()
            );
          };
          this.o = (e) => {
            t.enqueueRetryable(() => r(e));
          };
          const s = (e) => {
            Er("FirebaseAppCheckTokenProvider", "AppCheck detected"),
              (this.appCheck = e),
              this.appCheck.addTokenListener(this.o);
          };
          this.g.onInit((e) => s(e)),
            setTimeout(() => {
              var e;
              this.appCheck ||
                ((e = this.g.getImmediate({ optional: !0 }))
                  ? s(e)
                  : Er(
                      "FirebaseAppCheckTokenProvider",
                      "AppCheck not yet detected"
                    ));
            }, 0);
        }
        getToken() {
          var e = this.forceRefresh;
          return (
            (this.forceRefresh = !1),
            this.appCheck
              ? this.appCheck
                  .getToken(e)
                  .then((e) =>
                    e
                      ? (Dr("string" == typeof e.token),
                        (this.p = e.token),
                        new Fr(e.token))
                      : null
                  )
              : Promise.resolve(null)
          );
        }
        invalidateToken() {
          this.forceRefresh = !0;
        }
        shutdown() {
          this.appCheck && this.appCheck.removeTokenListener(this.o);
        }
      }
      class Ur {
        constructor(e, t) {
          (this.previousValue = e),
            t &&
              ((t.sequenceNumberHandler = (e) => this.I(e)),
              (this.T = (e) => t.writeSequenceNumber(e)));
        }
        I(e) {
          return (
            (this.previousValue = Math.max(e, this.previousValue)),
            this.previousValue
          );
        }
        next() {
          var e = ++this.previousValue;
          return this.T && this.T(e), e;
        }
      }
      Ur.A = -1;
      class Br {
        static R() {
          var t =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
            n = Math.floor(256 / t.length) * t.length;
          let r = "";
          for (; r.length < 20; ) {
            var s = (function (t) {
              const n =
                  "undefined" != typeof self && (self.crypto || self.msCrypto),
                r = new Uint8Array(t);
              if (n && "function" == typeof n.getRandomValues)
                n.getRandomValues(r);
              else
                for (let e = 0; e < t; e++)
                  r[e] = Math.floor(256 * Math.random());
              return r;
            })(40);
            for (let e = 0; e < s.length; ++e)
              r.length < 20 && s[e] < n && (r += t.charAt(s[e] % t.length));
          }
          return r;
        }
      }
      function qr(e, t) {
        return e < t ? -1 : t < e ? 1 : 0;
      }
      function jr(e, n, r) {
        return e.length === n.length && e.every((e, t) => r(e, n[t]));
      }
      function Kr(e) {
        return e + "\0";
      }
      class Gr {
        constructor(e, t) {
          if (((this.seconds = e), (this.nanoseconds = t) < 0))
            throw new Nr(
              xr.INVALID_ARGUMENT,
              "Timestamp nanoseconds out of range: " + t
            );
          if (1e9 <= t)
            throw new Nr(
              xr.INVALID_ARGUMENT,
              "Timestamp nanoseconds out of range: " + t
            );
          if (e < -62135596800)
            throw new Nr(
              xr.INVALID_ARGUMENT,
              "Timestamp seconds out of range: " + e
            );
          if (253402300800 <= e)
            throw new Nr(
              xr.INVALID_ARGUMENT,
              "Timestamp seconds out of range: " + e
            );
        }
        static now() {
          return Gr.fromMillis(Date.now());
        }
        static fromDate(e) {
          return Gr.fromMillis(e.getTime());
        }
        static fromMillis(e) {
          var t = Math.floor(e / 1e3),
            n = Math.floor(1e6 * (e - 1e3 * t));
          return new Gr(t, n);
        }
        toDate() {
          return new Date(this.toMillis());
        }
        toMillis() {
          return 1e3 * this.seconds + this.nanoseconds / 1e6;
        }
        _compareTo(e) {
          return this.seconds === e.seconds
            ? qr(this.nanoseconds, e.nanoseconds)
            : qr(this.seconds, e.seconds);
        }
        isEqual(e) {
          return (
            e.seconds === this.seconds && e.nanoseconds === this.nanoseconds
          );
        }
        toString() {
          return (
            "Timestamp(seconds=" +
            this.seconds +
            ", nanoseconds=" +
            this.nanoseconds +
            ")"
          );
        }
        toJSON() {
          return { seconds: this.seconds, nanoseconds: this.nanoseconds };
        }
        valueOf() {
          var e = this.seconds - -62135596800;
          return (
            String(e).padStart(12, "0") +
            "." +
            String(this.nanoseconds).padStart(9, "0")
          );
        }
      }
      class $r {
        constructor(e) {
          this.timestamp = e;
        }
        static fromTimestamp(e) {
          return new $r(e);
        }
        static min() {
          return new $r(new Gr(0, 0));
        }
        static max() {
          return new $r(new Gr(253402300799, 999999999));
        }
        compareTo(e) {
          return this.timestamp._compareTo(e.timestamp);
        }
        isEqual(e) {
          return this.timestamp.isEqual(e.timestamp);
        }
        toMicroseconds() {
          return (
            1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3
          );
        }
        toString() {
          return "SnapshotVersion(" + this.timestamp.toString() + ")";
        }
        toTimestamp() {
          return this.timestamp;
        }
      }
      function zr(e) {
        let t = 0;
        for (const n in e) Object.prototype.hasOwnProperty.call(e, n) && t++;
        return t;
      }
      function Wr(e, t) {
        for (const n in e)
          Object.prototype.hasOwnProperty.call(e, n) && t(n, e[n]);
      }
      function Hr(e) {
        for (const t in e)
          if (Object.prototype.hasOwnProperty.call(e, t)) return !1;
        return !0;
      }
      class Qr {
        constructor(e, t) {
          (this.comparator = e), (this.root = t || Xr.EMPTY);
        }
        insert(e, t) {
          return new Qr(
            this.comparator,
            this.root
              .insert(e, t, this.comparator)
              .copy(null, null, Xr.BLACK, null, null)
          );
        }
        remove(e) {
          return new Qr(
            this.comparator,
            this.root
              .remove(e, this.comparator)
              .copy(null, null, Xr.BLACK, null, null)
          );
        }
        get(e) {
          let t = this.root;
          for (; !t.isEmpty(); ) {
            var n = this.comparator(e, t.key);
            if (0 === n) return t.value;
            n < 0 ? (t = t.left) : 0 < n && (t = t.right);
          }
          return null;
        }
        indexOf(e) {
          let t = 0,
            n = this.root;
          for (; !n.isEmpty(); ) {
            var r = this.comparator(e, n.key);
            if (0 === r) return t + n.left.size;
            n = r < 0 ? n.left : ((t += n.left.size + 1), n.right);
          }
          return -1;
        }
        isEmpty() {
          return this.root.isEmpty();
        }
        get size() {
          return this.root.size;
        }
        minKey() {
          return this.root.minKey();
        }
        maxKey() {
          return this.root.maxKey();
        }
        inorderTraversal(e) {
          return this.root.inorderTraversal(e);
        }
        forEach(n) {
          this.inorderTraversal((e, t) => (n(e, t), !1));
        }
        toString() {
          const n = [];
          return (
            this.inorderTraversal((e, t) => (n.push(`${e}:${t}`), !1)),
            `{${n.join(", ")}}`
          );
        }
        reverseTraversal(e) {
          return this.root.reverseTraversal(e);
        }
        getIterator() {
          return new Yr(this.root, null, this.comparator, !1);
        }
        getIteratorFrom(e) {
          return new Yr(this.root, e, this.comparator, !1);
        }
        getReverseIterator() {
          return new Yr(this.root, null, this.comparator, !0);
        }
        getReverseIteratorFrom(e) {
          return new Yr(this.root, e, this.comparator, !0);
        }
      }
      class Yr {
        constructor(e, t, n, r) {
          (this.isReverse = r), (this.nodeStack = []);
          let s = 1;
          for (; !e.isEmpty(); )
            if (((s = t ? n(e.key, t) : 1), t && r && (s *= -1), s < 0))
              e = this.isReverse ? e.left : e.right;
            else {
              if (0 === s) {
                this.nodeStack.push(e);
                break;
              }
              this.nodeStack.push(e), (e = this.isReverse ? e.right : e.left);
            }
        }
        getNext() {
          let e = this.nodeStack.pop();
          var t = { key: e.key, value: e.value };
          if (this.isReverse)
            for (e = e.left; !e.isEmpty(); )
              this.nodeStack.push(e), (e = e.right);
          else
            for (e = e.right; !e.isEmpty(); )
              this.nodeStack.push(e), (e = e.left);
          return t;
        }
        hasNext() {
          return 0 < this.nodeStack.length;
        }
        peek() {
          if (0 === this.nodeStack.length) return null;
          var e = this.nodeStack[this.nodeStack.length - 1];
          return { key: e.key, value: e.value };
        }
      }
      class Xr {
        constructor(e, t, n, r, s) {
          (this.key = e),
            (this.value = t),
            (this.color = null != n ? n : Xr.RED),
            (this.left = null != r ? r : Xr.EMPTY),
            (this.right = null != s ? s : Xr.EMPTY),
            (this.size = this.left.size + 1 + this.right.size);
        }
        copy(e, t, n, r, s) {
          return new Xr(
            null != e ? e : this.key,
            null != t ? t : this.value,
            null != n ? n : this.color,
            null != r ? r : this.left,
            null != s ? s : this.right
          );
        }
        isEmpty() {
          return !1;
        }
        inorderTraversal(e) {
          return (
            this.left.inorderTraversal(e) ||
            e(this.key, this.value) ||
            this.right.inorderTraversal(e)
          );
        }
        reverseTraversal(e) {
          return (
            this.right.reverseTraversal(e) ||
            e(this.key, this.value) ||
            this.left.reverseTraversal(e)
          );
        }
        min() {
          return this.left.isEmpty() ? this : this.left.min();
        }
        minKey() {
          return this.min().key;
        }
        maxKey() {
          return this.right.isEmpty() ? this.key : this.right.maxKey();
        }
        insert(e, t, n) {
          let r = this;
          var s = n(e, r.key);
          return (
            (r =
              s < 0
                ? r.copy(null, null, null, r.left.insert(e, t, n), null)
                : 0 === s
                ? r.copy(null, t, null, null, null)
                : r.copy(null, null, null, null, r.right.insert(e, t, n))),
            r.fixUp()
          );
        }
        removeMin() {
          if (this.left.isEmpty()) return Xr.EMPTY;
          let e = this;
          return (
            e.left.isRed() || e.left.left.isRed() || (e = e.moveRedLeft()),
            (e = e.copy(null, null, null, e.left.removeMin(), null)),
            e.fixUp()
          );
        }
        remove(e, t) {
          let n,
            r = this;
          if (t(e, r.key) < 0)
            r.left.isEmpty() ||
              r.left.isRed() ||
              r.left.left.isRed() ||
              (r = r.moveRedLeft()),
              (r = r.copy(null, null, null, r.left.remove(e, t), null));
          else {
            if (
              (r.left.isRed() && (r = r.rotateRight()),
              r.right.isEmpty() ||
                r.right.isRed() ||
                r.right.left.isRed() ||
                (r = r.moveRedRight()),
              0 === t(e, r.key))
            ) {
              if (r.right.isEmpty()) return Xr.EMPTY;
              (n = r.right.min()),
                (r = r.copy(n.key, n.value, null, null, r.right.removeMin()));
            }
            r = r.copy(null, null, null, null, r.right.remove(e, t));
          }
          return r.fixUp();
        }
        isRed() {
          return this.color;
        }
        fixUp() {
          let e = this;
          return (
            e.right.isRed() && !e.left.isRed() && (e = e.rotateLeft()),
            e.left.isRed() && e.left.left.isRed() && (e = e.rotateRight()),
            e.left.isRed() && e.right.isRed() && (e = e.colorFlip()),
            e
          );
        }
        moveRedLeft() {
          let e = this.colorFlip();
          return (
            e.right.left.isRed() &&
              ((e = e.copy(null, null, null, null, e.right.rotateRight())),
              (e = e.rotateLeft()),
              (e = e.colorFlip())),
            e
          );
        }
        moveRedRight() {
          let e = this.colorFlip();
          return (
            e.left.left.isRed() && ((e = e.rotateRight()), (e = e.colorFlip())),
            e
          );
        }
        rotateLeft() {
          var e = this.copy(null, null, Xr.RED, null, this.right.left);
          return this.right.copy(null, null, this.color, e, null);
        }
        rotateRight() {
          var e = this.copy(null, null, Xr.RED, this.left.right, null);
          return this.left.copy(null, null, this.color, null, e);
        }
        colorFlip() {
          var e = this.left.copy(null, null, !this.left.color, null, null),
            t = this.right.copy(null, null, !this.right.color, null, null);
          return this.copy(null, null, !this.color, e, t);
        }
        checkMaxDepth() {
          var e = this.check();
          return Math.pow(2, e) <= this.size + 1;
        }
        check() {
          if (this.isRed() && this.left.isRed()) throw Ar();
          if (this.right.isRed()) throw Ar();
          var e = this.left.check();
          if (e !== this.right.check()) throw Ar();
          return e + (this.isRed() ? 0 : 1);
        }
      }
      (Xr.EMPTY = null),
        (Xr.RED = !0),
        (Xr.BLACK = !1),
        (Xr.EMPTY = new (class {
          constructor() {
            this.size = 0;
          }
          get key() {
            throw Ar();
          }
          get value() {
            throw Ar();
          }
          get color() {
            throw Ar();
          }
          get left() {
            throw Ar();
          }
          get right() {
            throw Ar();
          }
          copy(e, t, n, r, s) {
            return this;
          }
          insert(e, t, n) {
            return new Xr(e, t);
          }
          remove(e, t) {
            return this;
          }
          isEmpty() {
            return !0;
          }
          inorderTraversal(e) {
            return !1;
          }
          reverseTraversal(e) {
            return !1;
          }
          minKey() {
            return null;
          }
          maxKey() {
            return null;
          }
          isRed() {
            return !1;
          }
          checkMaxDepth() {
            return !0;
          }
          check() {
            return 0;
          }
        })());
      class Jr {
        constructor(e) {
          (this.comparator = e), (this.data = new Qr(this.comparator));
        }
        has(e) {
          return null !== this.data.get(e);
        }
        first() {
          return this.data.minKey();
        }
        last() {
          return this.data.maxKey();
        }
        get size() {
          return this.data.size;
        }
        indexOf(e) {
          return this.data.indexOf(e);
        }
        forEach(n) {
          this.data.inorderTraversal((e, t) => (n(e), !1));
        }
        forEachInRange(e, t) {
          const n = this.data.getIteratorFrom(e[0]);
          for (; n.hasNext(); ) {
            var r = n.getNext();
            if (0 <= this.comparator(r.key, e[1])) return;
            t(r.key);
          }
        }
        forEachWhile(e, t) {
          let n;
          for (
            n =
              void 0 !== t
                ? this.data.getIteratorFrom(t)
                : this.data.getIterator();
            n.hasNext();

          )
            if (!e(n.getNext().key)) return;
        }
        firstAfterOrEqual(e) {
          const t = this.data.getIteratorFrom(e);
          return t.hasNext() ? t.getNext().key : null;
        }
        getIterator() {
          return new Zr(this.data.getIterator());
        }
        getIteratorFrom(e) {
          return new Zr(this.data.getIteratorFrom(e));
        }
        add(e) {
          return this.copy(this.data.remove(e).insert(e, !0));
        }
        delete(e) {
          return this.has(e) ? this.copy(this.data.remove(e)) : this;
        }
        isEmpty() {
          return this.data.isEmpty();
        }
        unionWith(e) {
          let t = this;
          return (
            t.size < e.size && ((t = e), (e = this)),
            e.forEach((e) => {
              t = t.add(e);
            }),
            t
          );
        }
        isEqual(e) {
          if (!(e instanceof Jr)) return !1;
          if (this.size !== e.size) return !1;
          const t = this.data.getIterator(),
            n = e.data.getIterator();
          for (; t.hasNext(); ) {
            const e = t.getNext().key,
              r = n.getNext().key;
            if (0 !== this.comparator(e, r)) return !1;
          }
          return !0;
        }
        toArray() {
          const t = [];
          return (
            this.forEach((e) => {
              t.push(e);
            }),
            t
          );
        }
        toString() {
          const t = [];
          return (
            this.forEach((e) => t.push(e)), "SortedSet(" + t.toString() + ")"
          );
        }
        copy(e) {
          const t = new Jr(this.comparator);
          return (t.data = e), t;
        }
      }
      class Zr {
        constructor(e) {
          this.iter = e;
        }
        getNext() {
          return this.iter.getNext().key;
        }
        hasNext() {
          return this.iter.hasNext();
        }
      }
      function es(e) {
        return e.hasNext() ? e.getNext() : void 0;
      }
      class ts {
        constructor(e, t, n) {
          void 0 === t ? (t = 0) : t > e.length && Ar(),
            void 0 === n ? (n = e.length - t) : n > e.length - t && Ar(),
            (this.segments = e),
            (this.offset = t),
            (this.len = n);
        }
        get length() {
          return this.len;
        }
        isEqual(e) {
          return 0 === ts.comparator(this, e);
        }
        child(e) {
          const t = this.segments.slice(this.offset, this.limit());
          return (
            e instanceof ts
              ? e.forEach((e) => {
                  t.push(e);
                })
              : t.push(e),
            this.construct(t)
          );
        }
        limit() {
          return this.offset + this.length;
        }
        popFirst(e) {
          return this.construct(
            this.segments,
            this.offset + (e = void 0 === e ? 1 : e),
            this.length - e
          );
        }
        popLast() {
          return this.construct(this.segments, this.offset, this.length - 1);
        }
        firstSegment() {
          return this.segments[this.offset];
        }
        lastSegment() {
          return this.get(this.length - 1);
        }
        get(e) {
          return this.segments[this.offset + e];
        }
        isEmpty() {
          return 0 === this.length;
        }
        isPrefixOf(e) {
          if (e.length < this.length) return !1;
          for (let t = 0; t < this.length; t++)
            if (this.get(t) !== e.get(t)) return !1;
          return !0;
        }
        isImmediateParentOf(e) {
          if (this.length + 1 !== e.length) return !1;
          for (let t = 0; t < this.length; t++)
            if (this.get(t) !== e.get(t)) return !1;
          return !0;
        }
        forEach(e) {
          for (let t = this.offset, n = this.limit(); t < n; t++)
            e(this.segments[t]);
        }
        toArray() {
          return this.segments.slice(this.offset, this.limit());
        }
        static comparator(e, t) {
          const n = Math.min(e.length, t.length);
          for (let r = 0; r < n; r++) {
            const n = e.get(r),
              s = t.get(r);
            if (n < s) return -1;
            if (n > s) return 1;
          }
          return e.length < t.length ? -1 : e.length > t.length ? 1 : 0;
        }
      }
      class ns extends ts {
        construct(e, t, n) {
          return new ns(e, t, n);
        }
        canonicalString() {
          return this.toArray().join("/");
        }
        toString() {
          return this.canonicalString();
        }
        static fromString(...e) {
          const t = [];
          for (const n of e) {
            if (0 <= n.indexOf("//"))
              throw new Nr(
                xr.INVALID_ARGUMENT,
                `Invalid segment (${n}). Paths must not contain // in them.`
              );
            t.push(...n.split("/").filter((e) => 0 < e.length));
          }
          return new ns(t);
        }
        static emptyPath() {
          return new ns([]);
        }
      }
      const rs = /^[_a-zA-Z][_a-zA-Z0-9]*$/;
      class ss extends ts {
        construct(e, t, n) {
          return new ss(e, t, n);
        }
        static isValidIdentifier(e) {
          return rs.test(e);
        }
        canonicalString() {
          return this.toArray()
            .map(
              (e) => (
                (e = e.replace(/\\/g, "\\\\").replace(/`/g, "\\`")),
                (e = !ss.isValidIdentifier(e) ? "`" + e + "`" : e)
              )
            )
            .join(".");
        }
        toString() {
          return this.canonicalString();
        }
        isKeyField() {
          return 1 === this.length && "__name__" === this.get(0);
        }
        static keyField() {
          return new ss(["__name__"]);
        }
        static fromServerFormat(e) {
          const t = [];
          let n = "",
            r = 0;
          var s = () => {
            if (0 === n.length)
              throw new Nr(
                xr.INVALID_ARGUMENT,
                `Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`
              );
            t.push(n), (n = "");
          };
          let i = !1;
          for (; r < e.length; ) {
            const t = e[r];
            if ("\\" === t) {
              if (r + 1 === e.length)
                throw new Nr(
                  xr.INVALID_ARGUMENT,
                  "Path has trailing escape character: " + e
                );
              const t = e[r + 1];
              if ("\\" !== t && "." !== t && "`" !== t)
                throw new Nr(
                  xr.INVALID_ARGUMENT,
                  "Path has invalid escape sequence: " + e
                );
              (n += t), (r += 2);
            } else "`" === t ? (i = !i) : "." !== t || i ? (n += t) : s(), r++;
          }
          if ((s(), i))
            throw new Nr(xr.INVALID_ARGUMENT, "Unterminated ` in path: " + e);
          return new ss(t);
        }
        static emptyPath() {
          return new ss([]);
        }
      }
      class is {
        constructor(e) {
          (this.fields = e).sort(ss.comparator);
        }
        static empty() {
          return new is([]);
        }
        unionWith(e) {
          let t = new Jr(ss.comparator);
          for (const e of this.fields) t = t.add(e);
          for (const n of e) t = t.add(n);
          return new is(t.toArray());
        }
        covers(e) {
          for (const t of this.fields) if (t.isPrefixOf(e)) return !0;
          return !1;
        }
        isEqual(e) {
          return jr(this.fields, e.fields, (e, t) => e.isEqual(t));
        }
      }
      class as {
        constructor(e) {
          this.binaryString = e;
        }
        static fromBase64String(e) {
          var t = atob(e);
          return new as(t);
        }
        static fromUint8Array(e) {
          var t = (function (e) {
            let t = "";
            for (let n = 0; n < e.length; ++n) t += String.fromCharCode(e[n]);
            return t;
          })(e);
          return new as(t);
        }
        [Symbol.iterator]() {
          let e = 0;
          return {
            next: () =>
              e < this.binaryString.length
                ? { value: this.binaryString.charCodeAt(e++), done: !1 }
                : { value: void 0, done: !0 },
          };
        }
        toBase64() {
          return (e = this.binaryString), btoa(e);
          var e;
        }
        toUint8Array() {
          return (function (e) {
            const t = new Uint8Array(e.length);
            for (let n = 0; n < e.length; n++) t[n] = e.charCodeAt(n);
            return t;
          })(this.binaryString);
        }
        approximateByteSize() {
          return 2 * this.binaryString.length;
        }
        compareTo(e) {
          return qr(this.binaryString, e.binaryString);
        }
        isEqual(e) {
          return this.binaryString === e.binaryString;
        }
      }
      as.EMPTY_BYTE_STRING = new as("");
      const os = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);
      function us(t) {
        if ((Dr(!!t), "string" != typeof t))
          return { seconds: hs(t.seconds), nanos: hs(t.nanos) };
        {
          let e = 0;
          var n = os.exec(t);
          Dr(!!n),
            n[1] &&
              ((n = ((n = n[1]) + "000000000").substr(0, 9)), (e = Number(n)));
          const r = new Date(t);
          return { seconds: Math.floor(r.getTime() / 1e3), nanos: e };
        }
      }
      function hs(e) {
        return "number" == typeof e ? e : "string" == typeof e ? Number(e) : 0;
      }
      function cs(e) {
        return "string" == typeof e
          ? as.fromBase64String(e)
          : as.fromUint8Array(e);
      }
      function ls(e) {
        var t;
        return (
          "server_timestamp" ===
          (null ===
            (t = (
              (null === (t = null == e ? void 0 : e.mapValue) || void 0 === t
                ? void 0
                : t.fields) || {}
            ).__type__) || void 0 === t
            ? void 0
            : t.stringValue)
        );
      }
      function ds(e) {
        var t = us(e.mapValue.fields.__local_write_time__.timestampValue);
        return new Gr(t.seconds, t.nanos);
      }
      class fs {
        constructor(e, t, n, r, s, i, a, o) {
          (this.databaseId = e),
            (this.appId = t),
            (this.persistenceKey = n),
            (this.host = r),
            (this.ssl = s),
            (this.forceLongPolling = i),
            (this.autoDetectLongPolling = a),
            (this.useFetchStreams = o);
        }
      }
      class gs {
        constructor(e, t) {
          (this.projectId = e), (this.database = t || "(default)");
        }
        static empty() {
          return new gs("", "");
        }
        get isDefaultDatabase() {
          return "(default)" === this.database;
        }
        isEqual(e) {
          return (
            e instanceof gs &&
            e.projectId === this.projectId &&
            e.database === this.database
          );
        }
      }
      function ms(e) {
        return null == e;
      }
      function ps(e) {
        return 0 === e && 1 / e == -1 / 0;
      }
      function ys(e) {
        return (
          "number" == typeof e &&
          Number.isInteger(e) &&
          !ps(e) &&
          e <= Number.MAX_SAFE_INTEGER &&
          e >= Number.MIN_SAFE_INTEGER
        );
      }
      class vs {
        constructor(e) {
          this.path = e;
        }
        static fromPath(e) {
          return new vs(ns.fromString(e));
        }
        static fromName(e) {
          return new vs(ns.fromString(e).popFirst(5));
        }
        static empty() {
          return new vs(ns.emptyPath());
        }
        get collectionGroup() {
          return this.path.popLast().lastSegment();
        }
        hasCollectionId(e) {
          return (
            2 <= this.path.length && this.path.get(this.path.length - 2) === e
          );
        }
        getCollectionGroup() {
          return this.path.get(this.path.length - 2);
        }
        getCollectionPath() {
          return this.path.popLast();
        }
        isEqual(e) {
          return null !== e && 0 === ns.comparator(this.path, e.path);
        }
        toString() {
          return this.path.toString();
        }
        static comparator(e, t) {
          return ns.comparator(e.path, t.path);
        }
        static isDocumentKey(e) {
          return e.length % 2 == 0;
        }
        static fromSegments(e) {
          return new vs(new ns(e.slice()));
        }
      }
      const ws = {
          mapValue: { fields: { __type__: { stringValue: "__max__" } } },
        },
        bs = { nullValue: "NULL_VALUE" };
      function Is(e) {
        return "nullValue" in e
          ? 0
          : "booleanValue" in e
          ? 1
          : "integerValue" in e || "doubleValue" in e
          ? 2
          : "timestampValue" in e
          ? 3
          : "stringValue" in e
          ? 5
          : "bytesValue" in e
          ? 6
          : "referenceValue" in e
          ? 7
          : "geoPointValue" in e
          ? 8
          : "arrayValue" in e
          ? 9
          : "mapValue" in e
          ? ls(e)
            ? 4
            : Ls(e)
            ? 9007199254740991
            : 10
          : Ar();
      }
      function Es(r, s) {
        if (r === s) return !0;
        var e,
          t,
          n = Is(r);
        if (n !== Is(s)) return !1;
        switch (n) {
          case 0:
          case 9007199254740991:
            return !0;
          case 1:
            return r.booleanValue === s.booleanValue;
          case 4:
            return ds(r).isEqual(ds(s));
          case 3:
            return (function (e) {
              if (
                "string" == typeof r.timestampValue &&
                "string" == typeof e.timestampValue &&
                r.timestampValue.length === e.timestampValue.length
              )
                return r.timestampValue === e.timestampValue;
              var t = us(r.timestampValue),
                n = us(e.timestampValue);
              return t.seconds === n.seconds && t.nanos === n.nanos;
            })(s);
          case 5:
            return r.stringValue === s.stringValue;
          case 6:
            return (t = s), cs(r.bytesValue).isEqual(cs(t.bytesValue));
          case 7:
            return r.referenceValue === s.referenceValue;
          case 8:
            return (
              (e = s),
              hs((t = r).geoPointValue.latitude) ===
                hs(e.geoPointValue.latitude) &&
                hs(t.geoPointValue.longitude) === hs(e.geoPointValue.longitude)
            );
          case 2:
            return (function (e, t) {
              if ("integerValue" in e && "integerValue" in t)
                return hs(e.integerValue) === hs(t.integerValue);
              if ("doubleValue" in e && "doubleValue" in t) {
                var n = hs(e.doubleValue),
                  r = hs(t.doubleValue);
                return n === r ? ps(n) === ps(r) : isNaN(n) && isNaN(r);
              }
              return !1;
            })(r, s);
          case 9:
            return jr(r.arrayValue.values || [], s.arrayValue.values || [], Es);
          case 10:
            return (function (e) {
              const t = e.mapValue.fields || {},
                n = s.mapValue.fields || {};
              if (zr(t) !== zr(n)) return !1;
              for (const e in t)
                if (t.hasOwnProperty(e) && (void 0 === n[e] || !Es(t[e], n[e])))
                  return !1;
              return !0;
            })(r);
          default:
            return Ar();
        }
      }
      function Ts(e, t) {
        return void 0 !== (e.values || []).find((e) => Es(e, t));
      }
      function _s(e, t) {
        if (e === t) return 0;
        var n,
          r,
          s,
          i,
          a = Is(e),
          o = Is(t);
        if (a !== o) return qr(a, o);
        switch (a) {
          case 0:
          case 9007199254740991:
            return 0;
          case 1:
            return qr(e.booleanValue, t.booleanValue);
          case 2:
            return (
              (r = t),
              (s = hs(e.integerValue || e.doubleValue)),
              (i = hs(r.integerValue || r.doubleValue)),
              s < i
                ? -1
                : i < s
                ? 1
                : s === i
                ? 0
                : isNaN(s)
                ? isNaN(i)
                  ? 0
                  : -1
                : 1
            );
          case 3:
            return Ss(e.timestampValue, t.timestampValue);
          case 4:
            return Ss(ds(e), ds(t));
          case 5:
            return qr(e.stringValue, t.stringValue);
          case 6:
            return (function (e, t) {
              const n = cs(e),
                r = cs(t);
              return n.compareTo(r);
            })(e.bytesValue, t.bytesValue);
          case 7:
            return (function (e, t) {
              var n = e.split("/"),
                r = t.split("/");
              for (let s = 0; s < n.length && s < r.length; s++) {
                const t = qr(n[s], r[s]);
                if (0 !== t) return t;
              }
              return qr(n.length, r.length);
            })(e.referenceValue, t.referenceValue);
          case 8:
            return (
              (n = e.geoPointValue),
              (r = t.geoPointValue),
              0 !== (i = qr(hs(n.latitude), hs(r.latitude)))
                ? i
                : qr(hs(n.longitude), hs(r.longitude))
            );
          case 9:
            return (function (e, t) {
              var n = e.values || [],
                r = t.values || [];
              for (let s = 0; s < n.length && s < r.length; ++s) {
                const t = _s(n[s], r[s]);
                if (t) return t;
              }
              return qr(n.length, r.length);
            })(e.arrayValue, t.arrayValue);
          case 10:
            return (function (e, t) {
              if (e === ws.mapValue && t === ws.mapValue) return 0;
              if (e === ws.mapValue) return 1;
              if (t === ws.mapValue) return -1;
              const n = e.fields || {},
                r = Object.keys(n),
                s = t.fields || {},
                i = Object.keys(s);
              r.sort(), i.sort();
              for (let o = 0; o < r.length && o < i.length; ++o) {
                const t = qr(r[o], i[o]);
                if (0 !== t) return t;
                var a = _s(n[r[o]], s[i[o]]);
                if (0 !== a) return a;
              }
              return qr(r.length, i.length);
            })(e.mapValue, t.mapValue);
          default:
            throw Ar();
        }
      }
      function Ss(e, t) {
        if (
          "string" == typeof e &&
          "string" == typeof t &&
          e.length === t.length
        )
          return qr(e, t);
        var n = us(e),
          r = us(t),
          s = qr(n.seconds, r.seconds);
        return 0 !== s ? s : qr(n.nanos, r.nanos);
      }
      function As(e) {
        return (function i(e) {
          return "nullValue" in e
            ? "null"
            : "booleanValue" in e
            ? "" + e.booleanValue
            : "integerValue" in e
            ? "" + e.integerValue
            : "doubleValue" in e
            ? "" + e.doubleValue
            : "timestampValue" in e
            ? (function (e) {
                const t = us(e);
                return `time(${t.seconds},${t.nanos})`;
              })(e.timestampValue)
            : "stringValue" in e
            ? e.stringValue
            : "bytesValue" in e
            ? cs(e.bytesValue).toBase64()
            : "referenceValue" in e
            ? ((t = e.referenceValue), vs.fromName(t).toString())
            : "geoPointValue" in e
            ? `geo(${(t = e.geoPointValue).latitude},${t.longitude})`
            : "arrayValue" in e
            ? (function (e) {
                let t = "[",
                  n = !0;
                for (const r of e.values || [])
                  n ? (n = !1) : (t += ","), (t += i(r));
                return t + "]";
              })(e.arrayValue)
            : "mapValue" in e
            ? (function (e) {
                const t = Object.keys(e.fields || {}).sort();
                let n = "{",
                  r = !0;
                for (const s of t)
                  r ? (r = !1) : (n += ","), (n += `${s}:${i(e.fields[s])}`);
                return n + "}";
              })(e.mapValue)
            : Ar();
          var t;
        })(e);
      }
      function Ds(e, t) {
        return {
          referenceValue: `projects/${e.projectId}/databases/${
            e.database
          }/documents/${t.path.canonicalString()}`,
        };
      }
      function xs(e) {
        return e && "integerValue" in e;
      }
      function Ns(e) {
        return !!e && "arrayValue" in e;
      }
      function Cs(e) {
        return e && "nullValue" in e;
      }
      function ks(e) {
        return e && "doubleValue" in e && isNaN(Number(e.doubleValue));
      }
      function Rs(e) {
        return e && "mapValue" in e;
      }
      function Os(t) {
        if (t.geoPointValue)
          return { geoPointValue: Object.assign({}, t.geoPointValue) };
        if (t.timestampValue && "object" == typeof t.timestampValue)
          return { timestampValue: Object.assign({}, t.timestampValue) };
        if (t.mapValue) {
          const n = { mapValue: { fields: {} } };
          return (
            Wr(t.mapValue.fields, (e, t) => (n.mapValue.fields[e] = Os(t))), n
          );
        }
        if (t.arrayValue) {
          const r = { arrayValue: { values: [] } };
          for (let e = 0; e < (t.arrayValue.values || []).length; ++e)
            r.arrayValue.values[e] = Os(t.arrayValue.values[e]);
          return r;
        }
        return Object.assign({}, t);
      }
      function Ls(e) {
        return (
          "__max__" ===
          (((e.mapValue || {}).fields || {}).__type__ || {}).stringValue
        );
      }
      function Vs(e, t) {
        var n = _s(e.value, t.value);
        return 0 !== n
          ? n
          : e.inclusive && !t.inclusive
          ? -1
          : !e.inclusive && t.inclusive
          ? 1
          : 0;
      }
      function Ms(e, t) {
        var n = _s(e.value, t.value);
        return 0 !== n
          ? n
          : e.inclusive && !t.inclusive
          ? 1
          : !e.inclusive && t.inclusive
          ? -1
          : 0;
      }
      class Fs {
        constructor(e) {
          this.value = e;
        }
        static empty() {
          return new Fs({ mapValue: {} });
        }
        field(n) {
          if (n.isEmpty()) return this.value;
          {
            let e = this.value;
            for (let t = 0; t < n.length - 1; ++t)
              if (((e = (e.mapValue.fields || {})[n.get(t)]), !Rs(e)))
                return null;
            return (e = (e.mapValue.fields || {})[n.lastSegment()]), e || null;
          }
        }
        set(e, t) {
          this.getFieldsMap(e.popLast())[e.lastSegment()] = Os(t);
        }
        setAll(e) {
          let n = ss.emptyPath(),
            r = {},
            s = [];
          e.forEach((e, t) => {
            if (!n.isImmediateParentOf(t)) {
              const e = this.getFieldsMap(n);
              this.applyChanges(e, r, s), (r = {}), (s = []), (n = t.popLast());
            }
            e ? (r[t.lastSegment()] = Os(e)) : s.push(t.lastSegment());
          });
          var t = this.getFieldsMap(n);
          this.applyChanges(t, r, s);
        }
        delete(e) {
          const t = this.field(e.popLast());
          Rs(t) &&
            t.mapValue.fields &&
            delete t.mapValue.fields[e.lastSegment()];
        }
        isEqual(e) {
          return Es(this.value, e.value);
        }
        getFieldsMap(t) {
          let n = this.value;
          n.mapValue.fields || (n.mapValue = { fields: {} });
          for (let r = 0; r < t.length; ++r) {
            let e = n.mapValue.fields[t.get(r)];
            (Rs(e) && e.mapValue.fields) ||
              ((e = { mapValue: { fields: {} } }),
              (n.mapValue.fields[t.get(r)] = e)),
              (n = e);
          }
          return n.mapValue.fields;
        }
        applyChanges(n, e, t) {
          Wr(e, (e, t) => (n[e] = t));
          for (const e of t) delete n[e];
        }
        clone() {
          return new Fs(Os(this.value));
        }
      }
      class Ps {
        constructor(e, t, n, r, s, i) {
          (this.key = e),
            (this.documentType = t),
            (this.version = n),
            (this.readTime = r),
            (this.data = s),
            (this.documentState = i);
        }
        static newInvalidDocument(e) {
          return new Ps(e, 0, $r.min(), $r.min(), Fs.empty(), 0);
        }
        static newFoundDocument(e, t, n) {
          return new Ps(e, 1, t, $r.min(), n, 0);
        }
        static newNoDocument(e, t) {
          return new Ps(e, 2, t, $r.min(), Fs.empty(), 0);
        }
        static newUnknownDocument(e, t) {
          return new Ps(e, 3, t, $r.min(), Fs.empty(), 2);
        }
        convertToFoundDocument(e, t) {
          return (
            (this.version = e),
            (this.documentType = 1),
            (this.data = t),
            (this.documentState = 0),
            this
          );
        }
        convertToNoDocument(e) {
          return (
            (this.version = e),
            (this.documentType = 2),
            (this.data = Fs.empty()),
            (this.documentState = 0),
            this
          );
        }
        convertToUnknownDocument(e) {
          return (
            (this.version = e),
            (this.documentType = 3),
            (this.data = Fs.empty()),
            (this.documentState = 2),
            this
          );
        }
        setHasCommittedMutations() {
          return (this.documentState = 2), this;
        }
        setHasLocalMutations() {
          return (this.documentState = 1), (this.version = $r.min()), this;
        }
        setReadTime(e) {
          return (this.readTime = e), this;
        }
        get hasLocalMutations() {
          return 1 === this.documentState;
        }
        get hasCommittedMutations() {
          return 2 === this.documentState;
        }
        get hasPendingWrites() {
          return this.hasLocalMutations || this.hasCommittedMutations;
        }
        isValidDocument() {
          return 0 !== this.documentType;
        }
        isFoundDocument() {
          return 1 === this.documentType;
        }
        isNoDocument() {
          return 2 === this.documentType;
        }
        isUnknownDocument() {
          return 3 === this.documentType;
        }
        isEqual(e) {
          return (
            e instanceof Ps &&
            this.key.isEqual(e.key) &&
            this.version.isEqual(e.version) &&
            this.documentType === e.documentType &&
            this.documentState === e.documentState &&
            this.data.isEqual(e.data)
          );
        }
        mutableCopy() {
          return new Ps(
            this.key,
            this.documentType,
            this.version,
            this.readTime,
            this.data.clone(),
            this.documentState
          );
        }
        toString() {
          return `Document(${this.key}, ${this.version}, ${JSON.stringify(
            this.data.value
          )}, {documentType: ${this.documentType}}), {documentState: ${
            this.documentState
          }})`;
        }
      }
      class Us {
        constructor(e, t, n, r) {
          (this.indexId = e),
            (this.collectionGroup = t),
            (this.fields = n),
            (this.indexState = r);
        }
      }
      function Bs(e) {
        return e.fields.find((e) => 2 === e.kind);
      }
      function qs(e) {
        return e.fields.filter((e) => 2 !== e.kind);
      }
      Us.UNKNOWN_ID = -1;
      class js {
        constructor(e, t) {
          (this.fieldPath = e), (this.kind = t);
        }
      }
      class Ks {
        constructor(e, t) {
          (this.sequenceNumber = e), (this.offset = t);
        }
        static empty() {
          return new Ks(0, $s.min());
        }
      }
      function Gs(e, t) {
        var n = e.toTimestamp().seconds,
          r = e.toTimestamp().nanoseconds + 1,
          r = $r.fromTimestamp(1e9 === r ? new Gr(n + 1, 0) : new Gr(n, r));
        return new $s(r, vs.empty(), t);
      }
      class $s {
        constructor(e, t, n) {
          (this.readTime = e),
            (this.documentKey = t),
            (this.largestBatchId = n);
        }
        static min() {
          return new $s($r.min(), vs.empty(), -1);
        }
        static max() {
          return new $s($r.max(), vs.empty(), -1);
        }
      }
      function zs(e, t) {
        let n = e.readTime.compareTo(t.readTime);
        return 0 !== n
          ? n
          : ((n = vs.comparator(e.documentKey, t.documentKey)),
            0 !== n ? n : qr(e.largestBatchId, t.largestBatchId));
      }
      class Ws {
        constructor(e, t = null, n = [], r = [], s = null, i = null, a = null) {
          (this.path = e),
            (this.collectionGroup = t),
            (this.orderBy = n),
            (this.filters = r),
            (this.limit = s),
            (this.startAt = i),
            (this.endAt = a),
            (this.P = null);
        }
      }
      function Hs(e, t = null, n = [], r = [], s = null, i = null, a = null) {
        return new Ws(e, t, n, r, s, i, a);
      }
      function Qs(e) {
        const t = e;
        if (null === t.P) {
          let e = t.path.canonicalString();
          null !== t.collectionGroup && (e += "|cg:" + t.collectionGroup),
            (e += "|f:"),
            (e += t.filters
              .map((e) => {
                return (
                  (t = e).field.canonicalString() +
                  t.op.toString() +
                  As(t.value)
                );
                var t;
              })
              .join(",")),
            (e += "|ob:"),
            (e += t.orderBy
              .map((e) =>
                (function (e) {
                  return e.field.canonicalString() + e.dir;
                })(e)
              )
              .join(",")),
            ms(t.limit) || ((e += "|l:"), (e += t.limit)),
            t.startAt &&
              ((e += "|lb:"),
              (e += t.startAt.inclusive ? "b:" : "a:"),
              (e += t.startAt.position.map((e) => As(e)).join(","))),
            t.endAt &&
              ((e += "|ub:"),
              (e += t.endAt.inclusive ? "a:" : "b:"),
              (e += t.endAt.position.map((e) => As(e)).join(","))),
            (t.P = e);
        }
        return t.P;
      }
      function Ys(e, t) {
        if (e.limit !== t.limit) return !1;
        if (e.orderBy.length !== t.orderBy.length) return !1;
        for (let a = 0; a < e.orderBy.length; a++)
          if (
            ((n = e.orderBy[a]),
            (r = t.orderBy[a]),
            n.dir !== r.dir || !n.field.isEqual(r.field))
          )
            return !1;
        var n, r, s, i;
        if (e.filters.length !== t.filters.length) return !1;
        for (let o = 0; o < e.filters.length; o++)
          if (
            ((s = e.filters[o]),
            (i = t.filters[o]),
            s.op !== i.op || !s.field.isEqual(i.field) || !Es(s.value, i.value))
          )
            return !1;
        return (
          e.collectionGroup === t.collectionGroup &&
          !!e.path.isEqual(t.path) &&
          !!fi(e.startAt, t.startAt) &&
          fi(e.endAt, t.endAt)
        );
      }
      function Xs(e) {
        return (
          vs.isDocumentKey(e.path) &&
          null === e.collectionGroup &&
          0 === e.filters.length
        );
      }
      function Js(e, t) {
        return e.filters.filter((e) => e instanceof ti && e.field.isEqual(t));
      }
      function Zs(t, n, r) {
        let s = bs,
          i = !0;
        for (const r of Js(t, n)) {
          let e = bs,
            t = !0;
          switch (r.op) {
            case "<":
            case "<=":
              e =
                "nullValue" in (a = r.value)
                  ? bs
                  : "booleanValue" in a
                  ? { booleanValue: !1 }
                  : "integerValue" in a || "doubleValue" in a
                  ? { doubleValue: NaN }
                  : "timestampValue" in a
                  ? { timestampValue: { seconds: Number.MIN_SAFE_INTEGER } }
                  : "stringValue" in a
                  ? { stringValue: "" }
                  : "bytesValue" in a
                  ? { bytesValue: "" }
                  : "referenceValue" in a
                  ? Ds(gs.empty(), vs.empty())
                  : "geoPointValue" in a
                  ? { geoPointValue: { latitude: -90, longitude: -180 } }
                  : "arrayValue" in a
                  ? { arrayValue: {} }
                  : "mapValue" in a
                  ? { mapValue: {} }
                  : Ar();
              break;
            case "==":
            case "in":
            case ">=":
              e = r.value;
              break;
            case ">":
              (e = r.value), (t = !1);
              break;
            case "!=":
            case "not-in":
              e = bs;
          }
          Vs({ value: s, inclusive: i }, { value: e, inclusive: t }) < 0 &&
            ((s = e), (i = t));
        }
        var a;
        if (null !== r)
          for (let e = 0; e < t.orderBy.length; ++e)
            if (t.orderBy[e].field.isEqual(n)) {
              const t = r.position[e];
              Vs(
                { value: s, inclusive: i },
                { value: t, inclusive: r.inclusive }
              ) < 0 && ((s = t), (i = r.inclusive));
              break;
            }
        return { value: s, inclusive: i };
      }
      function ei(t, n, r) {
        let s = ws,
          i = !0;
        for (const r of Js(t, n)) {
          let e = ws,
            t = !0;
          switch (r.op) {
            case ">=":
            case ">":
              (e =
                "nullValue" in (a = r.value)
                  ? { booleanValue: !1 }
                  : "booleanValue" in a
                  ? { doubleValue: NaN }
                  : "integerValue" in a || "doubleValue" in a
                  ? { timestampValue: { seconds: Number.MIN_SAFE_INTEGER } }
                  : "timestampValue" in a
                  ? { stringValue: "" }
                  : "stringValue" in a
                  ? { bytesValue: "" }
                  : "bytesValue" in a
                  ? Ds(gs.empty(), vs.empty())
                  : "referenceValue" in a
                  ? { geoPointValue: { latitude: -90, longitude: -180 } }
                  : "geoPointValue" in a
                  ? { arrayValue: {} }
                  : "arrayValue" in a
                  ? { mapValue: {} }
                  : "mapValue" in a
                  ? ws
                  : Ar()),
                (t = !1);
              break;
            case "==":
            case "in":
            case "<=":
              e = r.value;
              break;
            case "<":
              (e = r.value), (t = !1);
              break;
            case "!=":
            case "not-in":
              e = ws;
          }
          0 < Ms({ value: s, inclusive: i }, { value: e, inclusive: t }) &&
            ((s = e), (i = t));
        }
        var a;
        if (null !== r)
          for (let e = 0; e < t.orderBy.length; ++e)
            if (t.orderBy[e].field.isEqual(n)) {
              const t = r.position[e];
              0 <
                Ms(
                  { value: s, inclusive: i },
                  { value: t, inclusive: r.inclusive }
                ) && ((s = t), (i = r.inclusive));
              break;
            }
        return { value: s, inclusive: i };
      }
      class ti extends class {} {
        constructor(e, t, n) {
          super(), (this.field = e), (this.op = t), (this.value = n);
        }
        static create(e, t, n) {
          return e.isKeyField()
            ? "in" === t || "not-in" === t
              ? this.V(e, t, n)
              : new ni(e, t, n)
            : "array-contains" === t
            ? new ai(e, n)
            : "in" === t
            ? new oi(e, n)
            : "not-in" === t
            ? new ui(e, n)
            : "array-contains-any" === t
            ? new hi(e, n)
            : new ti(e, t, n);
        }
        static V(e, t, n) {
          return new ("in" === t ? ri : si)(e, n);
        }
        matches(e) {
          var t = e.data.field(this.field);
          return "!=" === this.op
            ? null !== t && this.v(_s(t, this.value))
            : null !== t &&
                Is(this.value) === Is(t) &&
                this.v(_s(t, this.value));
        }
        v(e) {
          switch (this.op) {
            case "<":
              return e < 0;
            case "<=":
              return e <= 0;
            case "==":
              return 0 === e;
            case "!=":
              return 0 !== e;
            case ">":
              return 0 < e;
            case ">=":
              return 0 <= e;
            default:
              return Ar();
          }
        }
        S() {
          return 0 <= ["<", "<=", ">", ">=", "!=", "not-in"].indexOf(this.op);
        }
      }
      class ni extends ti {
        constructor(e, t, n) {
          super(e, t, n), (this.key = vs.fromName(n.referenceValue));
        }
        matches(e) {
          var t = vs.comparator(e.key, this.key);
          return this.v(t);
        }
      }
      class ri extends ti {
        constructor(e, t) {
          super(e, "in", t), (this.keys = ii(0, t));
        }
        matches(t) {
          return this.keys.some((e) => e.isEqual(t.key));
        }
      }
      class si extends ti {
        constructor(e, t) {
          super(e, "not-in", t), (this.keys = ii(0, t));
        }
        matches(t) {
          return !this.keys.some((e) => e.isEqual(t.key));
        }
      }
      function ii(e, t) {
        var n;
        return (
          (null === (n = t.arrayValue) || void 0 === n ? void 0 : n.values) ||
          []
        ).map((e) => vs.fromName(e.referenceValue));
      }
      class ai extends ti {
        constructor(e, t) {
          super(e, "array-contains", t);
        }
        matches(e) {
          var t = e.data.field(this.field);
          return Ns(t) && Ts(t.arrayValue, this.value);
        }
      }
      class oi extends ti {
        constructor(e, t) {
          super(e, "in", t);
        }
        matches(e) {
          var t = e.data.field(this.field);
          return null !== t && Ts(this.value.arrayValue, t);
        }
      }
      class ui extends ti {
        constructor(e, t) {
          super(e, "not-in", t);
        }
        matches(e) {
          if (Ts(this.value.arrayValue, { nullValue: "NULL_VALUE" })) return !1;
          var t = e.data.field(this.field);
          return null !== t && !Ts(this.value.arrayValue, t);
        }
      }
      class hi extends ti {
        constructor(e, t) {
          super(e, "array-contains-any", t);
        }
        matches(e) {
          const t = e.data.field(this.field);
          return (
            !(!Ns(t) || !t.arrayValue.values) &&
            t.arrayValue.values.some((e) => Ts(this.value.arrayValue, e))
          );
        }
      }
      class ci {
        constructor(e, t) {
          (this.position = e), (this.inclusive = t);
        }
      }
      class li {
        constructor(e, t = "asc") {
          (this.field = e), (this.dir = t);
        }
      }
      function di(e, t, n) {
        let r = 0;
        for (let s = 0; s < e.position.length; s++) {
          const i = t[s],
            a = e.position[s];
          if (
            ((r = i.field.isKeyField()
              ? vs.comparator(vs.fromName(a.referenceValue), n.key)
              : _s(a, n.data.field(i.field))),
            "desc" === i.dir && (r *= -1),
            0 !== r)
          )
            break;
        }
        return r;
      }
      function fi(e, t) {
        if (null === e) return null === t;
        if (null === t) return !1;
        if (
          e.inclusive !== t.inclusive ||
          e.position.length !== t.position.length
        )
          return !1;
        for (let n = 0; n < e.position.length; n++)
          if (!Es(e.position[n], t.position[n])) return !1;
        return !0;
      }
      class gi {
        constructor(
          e,
          t = null,
          n = [],
          r = [],
          s = null,
          i = "F",
          a = null,
          o = null
        ) {
          (this.path = e),
            (this.collectionGroup = t),
            (this.explicitOrderBy = n),
            (this.filters = r),
            (this.limit = s),
            (this.limitType = i),
            (this.startAt = a),
            (this.endAt = o),
            (this.D = null),
            (this.C = null),
            this.startAt,
            this.endAt;
        }
      }
      function mi(e, t, n, r, s, i, a, o) {
        return new gi(e, t, n, r, s, i, a, o);
      }
      function pi(e) {
        return new gi(e);
      }
      function yi(e) {
        return 0 < e.explicitOrderBy.length ? e.explicitOrderBy[0].field : null;
      }
      function vi(e) {
        for (const t of e.filters) if (t.S()) return t.field;
        return null;
      }
      function wi(e) {
        return null !== e.collectionGroup;
      }
      function bi(t) {
        const n = t;
        if (null === n.D) {
          n.D = [];
          const t = vi(n),
            e = yi(n);
          if (null !== t && null === e)
            t.isKeyField() || n.D.push(new li(t)),
              n.D.push(new li(ss.keyField(), "asc"));
          else {
            let e = !1;
            for (const r of n.explicitOrderBy)
              n.D.push(r), r.field.isKeyField() && (e = !0);
            if (!e) {
              const t =
                0 < n.explicitOrderBy.length
                  ? n.explicitOrderBy[n.explicitOrderBy.length - 1].dir
                  : "asc";
              n.D.push(new li(ss.keyField(), t));
            }
          }
        }
        return n.D;
      }
      function Ii(e) {
        const t = e;
        if (!t.C)
          if ("F" === t.limitType)
            t.C = Hs(
              t.path,
              t.collectionGroup,
              bi(t),
              t.filters,
              t.limit,
              t.startAt,
              t.endAt
            );
          else {
            const e = [];
            for (const s of bi(t)) {
              const t = "desc" === s.dir ? "asc" : "desc";
              e.push(new li(s.field, t));
            }
            var n = t.endAt
                ? new ci(t.endAt.position, t.endAt.inclusive)
                : null,
              r = t.startAt
                ? new ci(t.startAt.position, t.startAt.inclusive)
                : null;
            t.C = Hs(t.path, t.collectionGroup, e, t.filters, t.limit, n, r);
          }
        return t.C;
      }
      function Ei(e, t, n) {
        return new gi(
          e.path,
          e.collectionGroup,
          e.explicitOrderBy.slice(),
          e.filters.slice(),
          t,
          n,
          e.startAt,
          e.endAt
        );
      }
      function Ti(e, t) {
        return Ys(Ii(e), Ii(t)) && e.limitType === t.limitType;
      }
      function _i(e) {
        return `${Qs(Ii(e))}|lt:${e.limitType}`;
      }
      function Si(e) {
        return `Query(target=${(function (e) {
          let t = e.path.canonicalString();
          return (
            null !== e.collectionGroup &&
              (t += " collectionGroup=" + e.collectionGroup),
            0 < e.filters.length &&
              (t += `, filters: [${e.filters
                .map((e) => {
                  return `${(t = e).field.canonicalString()} ${t.op} ${As(
                    t.value
                  )}`;
                  var t;
                })
                .join(", ")}]`),
            ms(e.limit) || (t += ", limit: " + e.limit),
            0 < e.orderBy.length &&
              (t += `, orderBy: [${e.orderBy
                .map((e) =>
                  (function (e) {
                    return `${e.field.canonicalString()} (${e.dir})`;
                  })(e)
                )
                .join(", ")}]`),
            e.startAt &&
              ((t += ", startAt: "),
              (t += e.startAt.inclusive ? "b:" : "a:"),
              (t += e.startAt.position.map((e) => As(e)).join(","))),
            e.endAt &&
              ((t += ", endAt: "),
              (t += e.endAt.inclusive ? "a:" : "b:"),
              (t += e.endAt.position.map((e) => As(e)).join(","))),
            `Target(${t})`
          );
        })(Ii(e))}; limitType=${e.limitType})`;
      }
      function Ai(n, e) {
        return (
          e.isFoundDocument() &&
          ((s = n),
          (a = (i = e).key.path),
          null !== s.collectionGroup
            ? i.key.hasCollectionId(s.collectionGroup) && s.path.isPrefixOf(a)
            : vs.isDocumentKey(s.path)
            ? s.path.isEqual(a)
            : s.path.isImmediateParentOf(a)) &&
          (function (e) {
            for (const t of n.explicitOrderBy)
              if (!t.field.isKeyField() && null === e.data.field(t.field))
                return;
            return 1;
          })(e) &&
          (function (e) {
            for (const t of n.filters) if (!t.matches(e)) return;
            return 1;
          })(e) &&
          ((s = e),
          (!(e = n).startAt ||
            ((t = e.startAt),
            (r = di(t, bi(e), s)),
            t.inclusive ? r <= 0 : r < 0)) &&
            (!e.endAt ||
              ((t = e.endAt),
              (r = di(t, bi(e), s)),
              t.inclusive ? 0 <= r : 0 < r)))
        );
        var t, r, s, i, a;
      }
      function Di(e) {
        return (
          e.collectionGroup ||
          (e.path.length % 2 == 1
            ? e.path.lastSegment()
            : e.path.get(e.path.length - 2))
        );
      }
      function xi(s) {
        return (e, t) => {
          let n = !1;
          for (const r of bi(s)) {
            const s = (function (e, s, t) {
              var n = e.field.isKeyField()
                ? vs.comparator(s.key, t.key)
                : (function (e, t) {
                    var n = s.data.field(e),
                      r = t.data.field(e);
                    return null !== n && null !== r ? _s(n, r) : Ar();
                  })(e.field, t);
              switch (e.dir) {
                case "asc":
                  return n;
                case "desc":
                  return -1 * n;
                default:
                  return Ar();
              }
            })(r, e, t);
            if (0 !== s) return s;
            n = n || r.field.isKeyField();
          }
          return 0;
        };
      }
      function Ni(e, t) {
        if (e.N) {
          if (isNaN(t)) return { doubleValue: "NaN" };
          if (t === 1 / 0) return { doubleValue: "Infinity" };
          if (t === -1 / 0) return { doubleValue: "-Infinity" };
        }
        return { doubleValue: ps(t) ? "-0" : t };
      }
      function Ci(e) {
        return { integerValue: "" + e };
      }
      function ki(e, t) {
        return ys(t) ? Ci(t) : Ni(e, t);
      }
      class Ri {
        constructor() {
          this._ = void 0;
        }
      }
      function Oi(e, t) {
        return e instanceof Ui
          ? xs((n = t)) || (n && "doubleValue" in n)
            ? t
            : { integerValue: 0 }
          : null;
        var n;
      }
      class Li extends Ri {}
      class Vi extends Ri {
        constructor(e) {
          super(), (this.elements = e);
        }
      }
      function Mi(e, t) {
        const n = qi(t);
        for (const t of e.elements) n.some((e) => Es(e, t)) || n.push(t);
        return { arrayValue: { values: n } };
      }
      class Fi extends Ri {
        constructor(e) {
          super(), (this.elements = e);
        }
      }
      function Pi(e, t) {
        let n = qi(t);
        for (const t of e.elements) n = n.filter((e) => !Es(e, t));
        return { arrayValue: { values: n } };
      }
      class Ui extends Ri {
        constructor(e, t) {
          super(), (this.O = e), (this.k = t);
        }
      }
      function Bi(e) {
        return hs(e.integerValue || e.doubleValue);
      }
      function qi(e) {
        return Ns(e) && e.arrayValue.values ? e.arrayValue.values.slice() : [];
      }
      class ji {
        constructor(e, t) {
          (this.field = e), (this.transform = t);
        }
      }
      class Ki {
        constructor(e, t) {
          (this.version = e), (this.transformResults = t);
        }
      }
      class Gi {
        constructor(e, t) {
          (this.updateTime = e), (this.exists = t);
        }
        static none() {
          return new Gi();
        }
        static exists(e) {
          return new Gi(void 0, e);
        }
        static updateTime(e) {
          return new Gi(e);
        }
        get isNone() {
          return void 0 === this.updateTime && void 0 === this.exists;
        }
        isEqual(e) {
          return (
            this.exists === e.exists &&
            (this.updateTime
              ? !!e.updateTime && this.updateTime.isEqual(e.updateTime)
              : !e.updateTime)
          );
        }
      }
      function $i(e, t) {
        return void 0 !== e.updateTime
          ? t.isFoundDocument() && t.version.isEqual(e.updateTime)
          : void 0 === e.exists || e.exists === t.isFoundDocument();
      }
      class zi {}
      function Wi(e, n) {
        if (!e.hasLocalMutations || (n && 0 === n.fields.length)) return null;
        if (null === n)
          return e.isNoDocument()
            ? new na(e.key, Gi.none())
            : new Xi(e.key, e.data, Gi.none());
        {
          const s = e.data,
            i = Fs.empty();
          let t = new Jr(ss.comparator);
          for (var r of n.fields)
            if (!t.has(r)) {
              let e = s.field(r);
              null === e &&
                1 < r.length &&
                ((r = r.popLast()), (e = s.field(r))),
                null === e ? i.delete(r) : i.set(r, e),
                (t = t.add(r));
            }
          return new Ji(e.key, i, new is(t.toArray()), Gi.none());
        }
      }
      function Hi(e, t, n) {
        e instanceof Xi
          ? (function (e, t, n) {
              const r = e.value.clone(),
                s = ea(e.fieldTransforms, t, n.transformResults);
              r.setAll(s),
                t
                  .convertToFoundDocument(n.version, r)
                  .setHasCommittedMutations();
            })(e, t, n)
          : e instanceof Ji
          ? (function (e, t, n) {
              if (!$i(e.precondition, t))
                return t.convertToUnknownDocument(n.version);
              const r = ea(e.fieldTransforms, t, n.transformResults),
                s = t.data;
              s.setAll(Zi(e)),
                s.setAll(r),
                t
                  .convertToFoundDocument(n.version, s)
                  .setHasCommittedMutations();
            })(e, t, n)
          : t.convertToNoDocument(n.version).setHasCommittedMutations();
      }
      function Qi(e, t, n, r) {
        return e instanceof Xi
          ? (function (e, t, n, r) {
              if (!$i(e.precondition, t)) return n;
              const s = e.value.clone(),
                i = ta(e.fieldTransforms, r, t);
              return (
                s.setAll(i),
                t.convertToFoundDocument(t.version, s).setHasLocalMutations(),
                null
              );
            })(e, t, n, r)
          : e instanceof Ji
          ? (function (e, t, n, r) {
              if (!$i(e.precondition, t)) return n;
              const s = ta(e.fieldTransforms, r, t),
                i = t.data;
              return (
                i.setAll(Zi(e)),
                i.setAll(s),
                t.convertToFoundDocument(t.version, i).setHasLocalMutations(),
                null === n
                  ? null
                  : n
                      .unionWith(e.fieldMask.fields)
                      .unionWith(e.fieldTransforms.map((e) => e.field))
              );
            })(e, t, n, r)
          : ((t = t),
            (n = n),
            $i(e.precondition, t)
              ? (t.convertToNoDocument(t.version).setHasLocalMutations(), null)
              : n);
      }
      function Yi(e, t) {
        return (
          e.type === t.type &&
          !!e.key.isEqual(t.key) &&
          !!e.precondition.isEqual(t.precondition) &&
          ((n = e.fieldTransforms),
          (r = t.fieldTransforms),
          !!(
            (void 0 === n && void 0 === r) ||
            (n &&
              r &&
              jr(n, r, (e, t) =>
                (function (e, t) {
                  return (
                    e.field.isEqual(t.field) &&
                    ((e = e.transform),
                    (t = t.transform),
                    (e instanceof Vi && t instanceof Vi) ||
                    (e instanceof Fi && t instanceof Fi)
                      ? jr(e.elements, t.elements, Es)
                      : e instanceof Ui && t instanceof Ui
                      ? Es(e.k, t.k)
                      : e instanceof Li && t instanceof Li)
                  );
                })(e, t)
              ))
          ) &&
            (0 === e.type
              ? e.value.isEqual(t.value)
              : 1 !== e.type ||
                (e.data.isEqual(t.data) && e.fieldMask.isEqual(t.fieldMask))))
        );
        var n, r;
      }
      class Xi extends zi {
        constructor(e, t, n, r = []) {
          super(),
            (this.key = e),
            (this.value = t),
            (this.precondition = n),
            (this.fieldTransforms = r),
            (this.type = 0);
        }
        getFieldMask() {
          return null;
        }
      }
      class Ji extends zi {
        constructor(e, t, n, r, s = []) {
          super(),
            (this.key = e),
            (this.data = t),
            (this.fieldMask = n),
            (this.precondition = r),
            (this.fieldTransforms = s),
            (this.type = 1);
        }
        getFieldMask() {
          return this.fieldMask;
        }
      }
      function Zi(n) {
        const r = new Map();
        return (
          n.fieldMask.fields.forEach((e) => {
            var t;
            e.isEmpty() || ((t = n.data.field(e)), r.set(e, t));
          }),
          r
        );
      }
      function ea(e, t, n) {
        const r = new Map();
        Dr(e.length === n.length);
        for (let c = 0; c < n.length; c++) {
          var s = e[c],
            i = s.transform,
            a = t.data.field(s.field);
          r.set(
            s.field,
            ((o = i),
            (u = a),
            (h = n[c]),
            o instanceof Vi ? Mi(o, u) : o instanceof Fi ? Pi(o, u) : h)
          );
        }
        var o, u, h;
        return r;
      }
      function ta(e, t, n) {
        const r = new Map();
        for (const h of e) {
          const e = h.transform,
            c = n.data.field(h.field);
          r.set(
            h.field,
            ((s = e),
            (i = c),
            (a = t),
            (u = o = void 0),
            s instanceof Li
              ? (function () {
                  const e = {
                    fields: {
                      __type__: { stringValue: "server_timestamp" },
                      __local_write_time__: {
                        timestampValue: {
                          seconds: a.seconds,
                          nanos: a.nanoseconds,
                        },
                      },
                    },
                  };
                  return (
                    i && (e.fields.__previous_value__ = i), { mapValue: e }
                  );
                })()
              : s instanceof Vi
              ? Mi(s, i)
              : s instanceof Fi
              ? Pi(s, i)
              : ((o = Oi((s = s), i)),
                (u = Bi(o) + Bi(s.k)),
                xs(o) && xs(s.k) ? Ci(u) : Ni(s.O, u)))
          );
        }
        var s, i, a, o, u;
        return r;
      }
      class na extends zi {
        constructor(e, t) {
          super(),
            (this.key = e),
            (this.precondition = t),
            (this.type = 2),
            (this.fieldTransforms = []);
        }
        getFieldMask() {
          return null;
        }
      }
      class ra extends zi {
        constructor(e, t) {
          super(),
            (this.key = e),
            (this.precondition = t),
            (this.type = 3),
            (this.fieldTransforms = []);
        }
        getFieldMask() {
          return null;
        }
      }
      class sa {
        constructor(e) {
          this.count = e;
        }
      }
      function ia(e) {
        switch (e) {
          default:
            return Ar(), 0;
          case xr.CANCELLED:
          case xr.UNKNOWN:
          case xr.DEADLINE_EXCEEDED:
          case xr.RESOURCE_EXHAUSTED:
          case xr.INTERNAL:
          case xr.UNAVAILABLE:
          case xr.UNAUTHENTICATED:
            return;
          case xr.INVALID_ARGUMENT:
          case xr.NOT_FOUND:
          case xr.ALREADY_EXISTS:
          case xr.PERMISSION_DENIED:
          case xr.FAILED_PRECONDITION:
          case xr.ABORTED:
          case xr.OUT_OF_RANGE:
          case xr.UNIMPLEMENTED:
          case xr.DATA_LOSS:
            return 1;
        }
      }
      function aa(e) {
        if (void 0 === e) return Tr("GRPC error has no .code"), xr.UNKNOWN;
        switch (e) {
          case or.OK:
            return xr.OK;
          case or.CANCELLED:
            return xr.CANCELLED;
          case or.UNKNOWN:
            return xr.UNKNOWN;
          case or.DEADLINE_EXCEEDED:
            return xr.DEADLINE_EXCEEDED;
          case or.RESOURCE_EXHAUSTED:
            return xr.RESOURCE_EXHAUSTED;
          case or.INTERNAL:
            return xr.INTERNAL;
          case or.UNAVAILABLE:
            return xr.UNAVAILABLE;
          case or.UNAUTHENTICATED:
            return xr.UNAUTHENTICATED;
          case or.INVALID_ARGUMENT:
            return xr.INVALID_ARGUMENT;
          case or.NOT_FOUND:
            return xr.NOT_FOUND;
          case or.ALREADY_EXISTS:
            return xr.ALREADY_EXISTS;
          case or.PERMISSION_DENIED:
            return xr.PERMISSION_DENIED;
          case or.FAILED_PRECONDITION:
            return xr.FAILED_PRECONDITION;
          case or.ABORTED:
            return xr.ABORTED;
          case or.OUT_OF_RANGE:
            return xr.OUT_OF_RANGE;
          case or.UNIMPLEMENTED:
            return xr.UNIMPLEMENTED;
          case or.DATA_LOSS:
            return xr.DATA_LOSS;
          default:
            return Ar();
        }
      }
      ((it = or = or || {})[(it.OK = 0)] = "OK"),
        (it[(it.CANCELLED = 1)] = "CANCELLED"),
        (it[(it.UNKNOWN = 2)] = "UNKNOWN"),
        (it[(it.INVALID_ARGUMENT = 3)] = "INVALID_ARGUMENT"),
        (it[(it.DEADLINE_EXCEEDED = 4)] = "DEADLINE_EXCEEDED"),
        (it[(it.NOT_FOUND = 5)] = "NOT_FOUND"),
        (it[(it.ALREADY_EXISTS = 6)] = "ALREADY_EXISTS"),
        (it[(it.PERMISSION_DENIED = 7)] = "PERMISSION_DENIED"),
        (it[(it.UNAUTHENTICATED = 16)] = "UNAUTHENTICATED"),
        (it[(it.RESOURCE_EXHAUSTED = 8)] = "RESOURCE_EXHAUSTED"),
        (it[(it.FAILED_PRECONDITION = 9)] = "FAILED_PRECONDITION"),
        (it[(it.ABORTED = 10)] = "ABORTED"),
        (it[(it.OUT_OF_RANGE = 11)] = "OUT_OF_RANGE"),
        (it[(it.UNIMPLEMENTED = 12)] = "UNIMPLEMENTED"),
        (it[(it.INTERNAL = 13)] = "INTERNAL"),
        (it[(it.UNAVAILABLE = 14)] = "UNAVAILABLE"),
        (it[(it.DATA_LOSS = 15)] = "DATA_LOSS");
      class oa {
        constructor(e, t) {
          (this.mapKeyFn = e),
            (this.equalsFn = t),
            (this.inner = {}),
            (this.innerSize = 0);
        }
        get(e) {
          const t = this.mapKeyFn(e),
            n = this.inner[t];
          if (void 0 !== n)
            for (const [t, r] of n) if (this.equalsFn(t, e)) return r;
        }
        has(e) {
          return void 0 !== this.get(e);
        }
        set(e, t) {
          const n = this.mapKeyFn(e),
            r = this.inner[n];
          if (void 0 === r)
            return (this.inner[n] = [[e, t]]), void this.innerSize++;
          for (let s = 0; s < r.length; s++)
            if (this.equalsFn(r[s][0], e)) return void (r[s] = [e, t]);
          r.push([e, t]), this.innerSize++;
        }
        delete(e) {
          const t = this.mapKeyFn(e),
            n = this.inner[t];
          if (void 0 === n) return !1;
          for (let r = 0; r < n.length; r++)
            if (this.equalsFn(n[r][0], e))
              return (
                1 === n.length ? delete this.inner[t] : n.splice(r, 1),
                this.innerSize--,
                !0
              );
          return !1;
        }
        forEach(r) {
          Wr(this.inner, (e, t) => {
            for (const [e, n] of t) r(e, n);
          });
        }
        isEmpty() {
          return Hr(this.inner);
        }
        size() {
          return this.innerSize;
        }
      }
      const ua = new Qr(vs.comparator);
      const ha = new Qr(vs.comparator);
      function ca(...e) {
        let t = ha;
        for (const n of e) t = t.insert(n.key, n);
        return t;
      }
      function la() {
        return new oa(
          (e) => e.toString(),
          (e, t) => e.isEqual(t)
        );
      }
      function da() {
        return new oa(
          (e) => e.toString(),
          (e, t) => e.isEqual(t)
        );
      }
      function fa() {
        return new oa(
          (e) => e.toString(),
          (e, t) => e.isEqual(t)
        );
      }
      const ga = new Qr(vs.comparator),
        ma = new Jr(vs.comparator);
      function pa(...e) {
        let t = ma;
        for (const n of e) t = t.add(n);
        return t;
      }
      const ya = new Jr(qr);
      class va {
        constructor(e, t, n, r, s) {
          (this.snapshotVersion = e),
            (this.targetChanges = t),
            (this.targetMismatches = n),
            (this.documentUpdates = r),
            (this.resolvedLimboDocuments = s);
        }
        static createSynthesizedRemoteEventForCurrentChange(e, t) {
          const n = new Map();
          return (
            n.set(e, wa.createSynthesizedTargetChangeForCurrentChange(e, t)),
            new va($r.min(), n, ya, ua, pa())
          );
        }
      }
      class wa {
        constructor(e, t, n, r, s) {
          (this.resumeToken = e),
            (this.current = t),
            (this.addedDocuments = n),
            (this.modifiedDocuments = r),
            (this.removedDocuments = s);
        }
        static createSynthesizedTargetChangeForCurrentChange(e, t) {
          return new wa(as.EMPTY_BYTE_STRING, t, pa(), pa(), pa());
        }
      }
      class ba {
        constructor(e, t, n, r) {
          (this.M = e),
            (this.removedTargetIds = t),
            (this.key = n),
            (this.F = r);
        }
      }
      class Ia {
        constructor(e, t) {
          (this.targetId = e), (this.$ = t);
        }
      }
      class Ea {
        constructor(e, t, n = as.EMPTY_BYTE_STRING, r = null) {
          (this.state = e),
            (this.targetIds = t),
            (this.resumeToken = n),
            (this.cause = r);
        }
      }
      class Ta {
        constructor() {
          (this.B = 0),
            (this.L = Aa()),
            (this.U = as.EMPTY_BYTE_STRING),
            (this.q = !1),
            (this.K = !0);
        }
        get current() {
          return this.q;
        }
        get resumeToken() {
          return this.U;
        }
        get G() {
          return 0 !== this.B;
        }
        get j() {
          return this.K;
        }
        W(e) {
          0 < e.approximateByteSize() && ((this.K = !0), (this.U = e));
        }
        H() {
          let n = pa(),
            r = pa(),
            s = pa();
          return (
            this.L.forEach((e, t) => {
              switch (t) {
                case 0:
                  n = n.add(e);
                  break;
                case 2:
                  r = r.add(e);
                  break;
                case 1:
                  s = s.add(e);
                  break;
                default:
                  Ar();
              }
            }),
            new wa(this.U, this.q, n, r, s)
          );
        }
        J() {
          (this.K = !1), (this.L = Aa());
        }
        Y(e, t) {
          (this.K = !0), (this.L = this.L.insert(e, t));
        }
        X(e) {
          (this.K = !0), (this.L = this.L.remove(e));
        }
        Z() {
          this.B += 1;
        }
        tt() {
          --this.B;
        }
        et() {
          (this.K = !0), (this.q = !0);
        }
      }
      class _a {
        constructor(e) {
          (this.nt = e),
            (this.st = new Map()),
            (this.it = ua),
            (this.rt = Sa()),
            (this.ot = new Jr(qr));
        }
        ut(e) {
          for (const t of e.M)
            e.F && e.F.isFoundDocument()
              ? this.at(t, e.F)
              : this.ct(t, e.key, e.F);
          for (const n of e.removedTargetIds) this.ct(n, e.key, e.F);
        }
        ht(n) {
          this.forEachTarget(n, (e) => {
            const t = this.lt(e);
            switch (n.state) {
              case 0:
                this.ft(e) && t.W(n.resumeToken);
                break;
              case 1:
                t.tt(), t.G || t.J(), t.W(n.resumeToken);
                break;
              case 2:
                t.tt(), t.G || this.removeTarget(e);
                break;
              case 3:
                this.ft(e) && (t.et(), t.W(n.resumeToken));
                break;
              case 4:
                this.ft(e) && (this.dt(e), t.W(n.resumeToken));
                break;
              default:
                Ar();
            }
          });
        }
        forEachTarget(e, n) {
          0 < e.targetIds.length
            ? e.targetIds.forEach(n)
            : this.st.forEach((e, t) => {
                this.ft(t) && n(t);
              });
        }
        _t(e) {
          const t = e.targetId,
            n = e.$.count,
            r = this.wt(t);
          if (r) {
            const e = r.target;
            if (Xs(e))
              if (0 === n) {
                const n = new vs(e.path);
                this.ct(t, n, Ps.newNoDocument(n, $r.min()));
              } else Dr(1 === n);
            else this.gt(t) !== n && (this.dt(t), (this.ot = this.ot.add(t)));
          }
        }
        yt(r) {
          const s = new Map();
          this.st.forEach((e, t) => {
            var n = this.wt(t);
            if (n) {
              if (e.current && Xs(n.target)) {
                const s = new vs(n.target.path);
                null !== this.it.get(s) ||
                  this.It(t, s) ||
                  this.ct(t, s, Ps.newNoDocument(s, r));
              }
              e.j && (s.set(t, e.H()), e.J());
            }
          });
          let i = pa();
          this.rt.forEach((e, t) => {
            let n = !0;
            t.forEachWhile((e) => {
              var t = this.wt(e);
              return !t || 2 === t.purpose || (n = !1);
            }),
              n && (i = i.add(e));
          }),
            this.it.forEach((e, t) => t.setReadTime(r));
          var e = new va(r, s, this.ot, this.it, i);
          return (this.it = ua), (this.rt = Sa()), (this.ot = new Jr(qr)), e;
        }
        at(e, t) {
          var n;
          this.ft(e) &&
            ((n = this.It(e, t.key) ? 2 : 0),
            this.lt(e).Y(t.key, n),
            (this.it = this.it.insert(t.key, t)),
            (this.rt = this.rt.insert(t.key, this.Tt(t.key).add(e))));
        }
        ct(e, t, n) {
          if (this.ft(e)) {
            const r = this.lt(e);
            this.It(e, t) ? r.Y(t, 1) : r.X(t),
              (this.rt = this.rt.insert(t, this.Tt(t).delete(e))),
              n && (this.it = this.it.insert(t, n));
          }
        }
        removeTarget(e) {
          this.st.delete(e);
        }
        gt(e) {
          var t = this.lt(e).H();
          return (
            this.nt.getRemoteKeysForTarget(e).size +
            t.addedDocuments.size -
            t.removedDocuments.size
          );
        }
        Z(e) {
          this.lt(e).Z();
        }
        lt(e) {
          let t = this.st.get(e);
          return t || ((t = new Ta()), this.st.set(e, t)), t;
        }
        Tt(e) {
          let t = this.rt.get(e);
          return t || ((t = new Jr(qr)), (this.rt = this.rt.insert(e, t))), t;
        }
        ft(e) {
          var t = null !== this.wt(e);
          return (
            t || Er("WatchChangeAggregator", "Detected inactive target", e), t
          );
        }
        wt(e) {
          var t = this.st.get(e);
          return t && t.G ? null : this.nt.Et(e);
        }
        dt(t) {
          this.st.set(t, new Ta()),
            this.nt.getRemoteKeysForTarget(t).forEach((e) => {
              this.ct(t, e, null);
            });
        }
        It(e, t) {
          return this.nt.getRemoteKeysForTarget(e).has(t);
        }
      }
      function Sa() {
        return new Qr(vs.comparator);
      }
      function Aa() {
        return new Qr(vs.comparator);
      }
      const Da = { asc: "ASCENDING", desc: "DESCENDING" },
        xa = {
          "<": "LESS_THAN",
          "<=": "LESS_THAN_OR_EQUAL",
          ">": "GREATER_THAN",
          ">=": "GREATER_THAN_OR_EQUAL",
          "==": "EQUAL",
          "!=": "NOT_EQUAL",
          "array-contains": "ARRAY_CONTAINS",
          in: "IN",
          "not-in": "NOT_IN",
          "array-contains-any": "ARRAY_CONTAINS_ANY",
        };
      class Na {
        constructor(e, t) {
          (this.databaseId = e), (this.N = t);
        }
      }
      function Ca(e, t) {
        return e.N
          ? `${new Date(1e3 * t.seconds)
              .toISOString()
              .replace(/\.\d*/, "")
              .replace("Z", "")}.${("000000000" + t.nanoseconds).slice(-9)}Z`
          : { seconds: "" + t.seconds, nanos: t.nanoseconds };
      }
      function ka(e, t) {
        return e.N ? t.toBase64() : t.toUint8Array();
      }
      function Ra(e) {
        return (
          Dr(!!e), $r.fromTimestamp(((t = us(e)), new Gr(t.seconds, t.nanos)))
        );
        var t;
      }
      function Oa(e, t) {
        return (
          (e = e),
          new ns(["projects", e.projectId, "databases", e.database])
            .child("documents")
            .child(t)
            .canonicalString()
        );
      }
      function La(e) {
        var t = ns.fromString(e);
        return Dr(Ja(t)), t;
      }
      function Va(e, t) {
        return Oa(e.databaseId, t.path);
      }
      function Ma(e, t) {
        const n = La(t);
        if (n.get(1) !== e.databaseId.projectId)
          throw new Nr(
            xr.INVALID_ARGUMENT,
            "Tried to deserialize key from different project: " +
              n.get(1) +
              " vs " +
              e.databaseId.projectId
          );
        if (n.get(3) !== e.databaseId.database)
          throw new Nr(
            xr.INVALID_ARGUMENT,
            "Tried to deserialize key from different database: " +
              n.get(3) +
              " vs " +
              e.databaseId.database
          );
        return new vs(Ba(n));
      }
      function Fa(e, t) {
        return Oa(e.databaseId, t);
      }
      function Pa(e) {
        var t = La(e);
        return 4 === t.length ? ns.emptyPath() : Ba(t);
      }
      function Ua(e) {
        return new ns([
          "projects",
          e.databaseId.projectId,
          "databases",
          e.databaseId.database,
        ]).canonicalString();
      }
      function Ba(e) {
        return Dr(4 < e.length && "documents" === e.get(4)), e.popFirst(5);
      }
      function qa(e, t, n) {
        return { name: Va(e, t), fields: n.value.mapValue.fields };
      }
      function ja(e, t, n) {
        const r = Ma(e, t.name),
          s = Ra(t.updateTime),
          i = new Fs({ mapValue: { fields: t.fields } }),
          a = Ps.newFoundDocument(r, s, i);
        return (
          n && a.setHasCommittedMutations(),
          n ? a.setHasCommittedMutations() : a
        );
      }
      function Ka(e, t) {
        let n;
        if (t instanceof Xi) n = { update: qa(e, t.key, t.value) };
        else if (t instanceof na) n = { delete: Va(e, t.key) };
        else if (t instanceof Ji)
          n = {
            update: qa(e, t.key, t.data),
            updateMask: (function (e) {
              const t = [];
              return (
                e.fields.forEach((e) => t.push(e.canonicalString())),
                { fieldPaths: t }
              );
            })(t.fieldMask),
          };
        else {
          if (!(t instanceof ra)) return Ar();
          n = { verify: Va(e, t.key) };
        }
        return (
          0 < t.fieldTransforms.length &&
            (n.updateTransforms = t.fieldTransforms.map((e) =>
              (function (e) {
                var t = e.transform;
                if (t instanceof Li)
                  return {
                    fieldPath: e.field.canonicalString(),
                    setToServerValue: "REQUEST_TIME",
                  };
                if (t instanceof Vi)
                  return {
                    fieldPath: e.field.canonicalString(),
                    appendMissingElements: { values: t.elements },
                  };
                if (t instanceof Fi)
                  return {
                    fieldPath: e.field.canonicalString(),
                    removeAllFromArray: { values: t.elements },
                  };
                if (t instanceof Ui)
                  return {
                    fieldPath: e.field.canonicalString(),
                    increment: t.k,
                  };
                throw Ar();
              })(e)
            )),
          t.precondition.isNone ||
            (n.currentDocument =
              void 0 !== (r = t.precondition).updateTime
                ? { updateTime: ((t = r.updateTime), Ca(e, t.toTimestamp())) }
                : void 0 !== r.exists
                ? { exists: r.exists }
                : Ar()),
          n
        );
        var r;
      }
      function Ga(t, n) {
        const e = n.currentDocument
            ? void 0 !== (s = n.currentDocument).updateTime
              ? Gi.updateTime(Ra(s.updateTime))
              : void 0 !== s.exists
              ? Gi.exists(s.exists)
              : Gi.none()
            : Gi.none(),
          r = n.updateTransforms
            ? n.updateTransforms.map((e) =>
                (function (e, t) {
                  let n = null;
                  if ("setToServerValue" in t)
                    Dr("REQUEST_TIME" === t.setToServerValue), (n = new Li());
                  else if ("appendMissingElements" in t) {
                    const e = t.appendMissingElements.values || [];
                    n = new Vi(e);
                  } else if ("removeAllFromArray" in t) {
                    const e = t.removeAllFromArray.values || [];
                    n = new Fi(e);
                  } else "increment" in t ? (n = new Ui(e, t.increment)) : Ar();
                  var r = ss.fromServerFormat(t.fieldPath);
                  return new ji(r, n);
                })(t, e)
              )
            : [];
        var s;
        if (n.update) {
          n.update.name;
          var i = Ma(t, n.update.name),
            a = new Fs({ mapValue: { fields: n.update.fields } });
          if (n.updateMask) {
            const t = (function () {
              const e = n.updateMask.fieldPaths || [];
              return new is(e.map((e) => ss.fromServerFormat(e)));
            })();
            return new Ji(i, a, t, e, r);
          }
          return new Xi(i, a, e, r);
        }
        if (n.delete) {
          const r = Ma(t, n.delete);
          return new na(r, e);
        }
        if (n.verify) {
          const r = Ma(t, n.verify);
          return new ra(r, e);
        }
        return Ar();
      }
      function $a(e, t) {
        return { documents: [Fa(e, t.path)] };
      }
      function za(e, t) {
        const n = { structuredQuery: {} },
          r = t.path;
        null !== t.collectionGroup
          ? ((n.parent = Fa(e, r)),
            (n.structuredQuery.from = [
              { collectionId: t.collectionGroup, allDescendants: !0 },
            ]))
          : ((n.parent = Fa(e, r.popLast())),
            (n.structuredQuery.from = [{ collectionId: r.lastSegment() }]));
        var s = (function (e) {
          if (0 !== e.length) {
            var t = e.map((e) =>
              (function (e) {
                if ("==" === e.op) {
                  if (ks(e.value))
                    return {
                      unaryFilter: { field: Ha(e.field), op: "IS_NAN" },
                    };
                  if (Cs(e.value))
                    return {
                      unaryFilter: { field: Ha(e.field), op: "IS_NULL" },
                    };
                } else if ("!=" === e.op) {
                  if (ks(e.value))
                    return {
                      unaryFilter: { field: Ha(e.field), op: "IS_NOT_NAN" },
                    };
                  if (Cs(e.value))
                    return {
                      unaryFilter: { field: Ha(e.field), op: "IS_NOT_NULL" },
                    };
                }
                return {
                  fieldFilter: {
                    field: Ha(e.field),
                    op: ((t = e.op), xa[t]),
                    value: e.value,
                  },
                };
                var t;
              })(e)
            );
            return 1 === t.length
              ? t[0]
              : { compositeFilter: { op: "AND", filters: t } };
          }
        })(t.filters);
        s && (n.structuredQuery.where = s);
        s = (function (e) {
          if (0 !== e.length)
            return e.map((e) =>
              (function (e) {
                return { field: Ha(e.field), direction: ((e = e.dir), Da[e]) };
              })(e)
            );
        })(t.orderBy);
        s && (n.structuredQuery.orderBy = s);
        var i,
          s = ((i = t.limit), e.N || ms(i) ? i : { value: i });
        return (
          null !== s && (n.structuredQuery.limit = s),
          t.startAt &&
            (n.structuredQuery.startAt = {
              before: (s = t.startAt).inclusive,
              values: s.position,
            }),
          t.endAt &&
            (n.structuredQuery.endAt = {
              before: !(t = t.endAt).inclusive,
              values: t.position,
            }),
          n
        );
      }
      function Wa(e) {
        let t = Pa(e.parent);
        const n = e.structuredQuery,
          r = n.from ? n.from.length : 0;
        let s = null;
        if (0 < r) {
          Dr(1 === r);
          const g = n.from[0];
          g.allDescendants
            ? (s = g.collectionId)
            : (t = t.child(g.collectionId));
        }
        let i = [];
        n.where &&
          (i = (function t(e) {
            return e
              ? void 0 !== e.unaryFilter
                ? [Xa(e)]
                : void 0 !== e.fieldFilter
                ? [Ya(e)]
                : void 0 !== e.compositeFilter
                ? e.compositeFilter.filters
                    .map((e) => t(e))
                    .reduce((e, t) => e.concat(t))
                : Ar()
              : [];
          })(n.where));
        let a = [];
        n.orderBy &&
          (a = n.orderBy.map((e) =>
            (function (e) {
              return new li(
                Qa(e.field),
                (function () {
                  switch (e.direction) {
                    case "ASCENDING":
                      return "asc";
                    case "DESCENDING":
                      return "desc";
                    default:
                      return;
                  }
                })()
              );
            })(e)
          ));
        let o = null;
        var u, h, c, l;
        n.limit &&
          (o =
            ((e = n.limit),
            ms((u = "object" == typeof e ? e.value : e)) ? null : u));
        let d = null;
        n.startAt &&
          (d =
            ((h = n.startAt),
            (l = !!h.before),
            (c = h.values || []),
            new ci(c, l)));
        let f = null;
        return (
          n.endAt &&
            (f =
              ((h = n.endAt),
              (c = !h.before),
              (l = h.values || []),
              new ci(l, c))),
          mi(t, s, a, i, o, "F", d, f)
        );
      }
      function Ha(e) {
        return { fieldPath: e.canonicalString() };
      }
      function Qa(e) {
        return ss.fromServerFormat(e.fieldPath);
      }
      function Ya(e) {
        return ti.create(
          Qa(e.fieldFilter.field),
          (function () {
            switch (e.fieldFilter.op) {
              case "EQUAL":
                return "==";
              case "NOT_EQUAL":
                return "!=";
              case "GREATER_THAN":
                return ">";
              case "GREATER_THAN_OR_EQUAL":
                return ">=";
              case "LESS_THAN":
                return "<";
              case "LESS_THAN_OR_EQUAL":
                return "<=";
              case "ARRAY_CONTAINS":
                return "array-contains";
              case "IN":
                return "in";
              case "NOT_IN":
                return "not-in";
              case "ARRAY_CONTAINS_ANY":
                return "array-contains-any";
              default:
                return Ar();
            }
          })(),
          e.fieldFilter.value
        );
      }
      function Xa(e) {
        switch (e.unaryFilter.op) {
          case "IS_NAN":
            var t = Qa(e.unaryFilter.field);
            return ti.create(t, "==", { doubleValue: NaN });
          case "IS_NULL":
            t = Qa(e.unaryFilter.field);
            return ti.create(t, "==", { nullValue: "NULL_VALUE" });
          case "IS_NOT_NAN":
            var n = Qa(e.unaryFilter.field);
            return ti.create(n, "!=", { doubleValue: NaN });
          case "IS_NOT_NULL":
            n = Qa(e.unaryFilter.field);
            return ti.create(n, "!=", { nullValue: "NULL_VALUE" });
          default:
            return Ar();
        }
      }
      function Ja(e) {
        return (
          4 <= e.length && "projects" === e.get(0) && "databases" === e.get(2)
        );
      }
      function Za(e) {
        let t = "";
        for (let n = 0; n < e.length; n++)
          0 < t.length && (t = eo(t)),
            (t = (function (e, t) {
              let n = t;
              const r = e.length;
              for (let s = 0; s < r; s++) {
                const r = e.charAt(s);
                switch (r) {
                  case "\0":
                    n += "";
                    break;
                  case "":
                    n += "";
                    break;
                  default:
                    n += r;
                }
              }
              return n;
            })(e.get(n), t));
        return eo(t);
      }
      function eo(e) {
        return e + "";
      }
      function to(t) {
        const n = t.length;
        if ((Dr(2 <= n), 2 === n))
          return Dr("" === t.charAt(0) && "" === t.charAt(1)), ns.emptyPath();
        const r = n - 2,
          s = [];
        let i = "";
        for (let a = 0; a < n; ) {
          const n = t.indexOf("", a);
          switch (((n < 0 || n > r) && Ar(), t.charAt(n + 1))) {
            case "":
              const r = t.substring(a, n);
              let e;
              0 === i.length ? (e = r) : ((i += r), (e = i), (i = "")),
                s.push(e);
              break;
            case "":
              (i += t.substring(a, n)), (i += "\0");
              break;
            case "":
              i += t.substring(a, n + 1);
              break;
            default:
              Ar();
          }
          a = n + 2;
        }
        return new ns(s);
      }
      const no = ["userId", "batchId"];
      function ro(e, t) {
        return [e, Za(t)];
      }
      function so(e, t, n) {
        return [e, Za(t), n];
      }
      const io = {},
        ao = ["prefixPath", "collectionGroup", "readTime", "documentId"],
        oo = ["prefixPath", "collectionGroup", "documentId"],
        uo = ["collectionGroup", "readTime", "prefixPath", "documentId"],
        ho = ["canonicalId", "targetId"],
        co = ["targetId", "path"],
        lo = ["path", "targetId"],
        fo = ["collectionId", "parent"],
        go = ["indexId", "uid"],
        mo = ["uid", "sequenceNumber"],
        po = [
          "indexId",
          "uid",
          "arrayValue",
          "directionalValue",
          "orderedDocumentKey",
          "documentKey",
        ],
        yo = ["indexId", "uid", "orderedDocumentKey"],
        vo = ["userId", "collectionPath", "documentId"],
        wo = ["userId", "collectionPath", "largestBatchId"],
        bo = ["userId", "collectionGroup", "largestBatchId"],
        Io = [
          "mutationQueues",
          "mutations",
          "documentMutations",
          "remoteDocuments",
          "targets",
          "owner",
          "targetGlobal",
          "targetDocuments",
          "clientMetadata",
          "remoteDocumentGlobal",
          "collectionParents",
          "bundles",
          "namedQueries",
        ],
        Eo = [...Io, "documentOverlays"],
        To = [
          "mutationQueues",
          "mutations",
          "documentMutations",
          "remoteDocumentsV14",
          "targets",
          "owner",
          "targetGlobal",
          "targetDocuments",
          "clientMetadata",
          "remoteDocumentGlobal",
          "collectionParents",
          "bundles",
          "namedQueries",
          "documentOverlays",
        ],
        _o = To,
        So = [..._o, "indexConfiguration", "indexState", "indexEntries"],
        Ao =
          "The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";
      class Do {
        constructor() {
          this.onCommittedListeners = [];
        }
        addOnCommittedListener(e) {
          this.onCommittedListeners.push(e);
        }
        raiseOnCommittedEvent() {
          this.onCommittedListeners.forEach((e) => e());
        }
      }
      class xo {
        constructor(e) {
          (this.nextCallback = null),
            (this.catchCallback = null),
            (this.result = void 0),
            (this.error = void 0),
            (this.isDone = !1),
            (this.callbackAttached = !1),
            e(
              (e) => {
                (this.isDone = !0),
                  (this.result = e),
                  this.nextCallback && this.nextCallback(e);
              },
              (e) => {
                (this.isDone = !0),
                  (this.error = e),
                  this.catchCallback && this.catchCallback(e);
              }
            );
        }
        catch(e) {
          return this.next(void 0, e);
        }
        next(r, s) {
          return (
            this.callbackAttached && Ar(),
            (this.callbackAttached = !0),
            this.isDone
              ? this.error
                ? this.wrapFailure(s, this.error)
                : this.wrapSuccess(r, this.result)
              : new xo((t, n) => {
                  (this.nextCallback = (e) => {
                    this.wrapSuccess(r, e).next(t, n);
                  }),
                    (this.catchCallback = (e) => {
                      this.wrapFailure(s, e).next(t, n);
                    });
                })
          );
        }
        toPromise() {
          return new Promise((e, t) => {
            this.next(e, t);
          });
        }
        wrapUserFunction(e) {
          try {
            var t = e();
            return t instanceof xo ? t : xo.resolve(t);
          } catch (e) {
            return xo.reject(e);
          }
        }
        wrapSuccess(e, t) {
          return e ? this.wrapUserFunction(() => e(t)) : xo.resolve(t);
        }
        wrapFailure(e, t) {
          return e ? this.wrapUserFunction(() => e(t)) : xo.reject(t);
        }
        static resolve(n) {
          return new xo((e, t) => {
            e(n);
          });
        }
        static reject(n) {
          return new xo((e, t) => {
            t(n);
          });
        }
        static waitFor(e) {
          return new xo((t, n) => {
            let r = 0,
              s = 0,
              i = !1;
            e.forEach((e) => {
              ++r,
                e.next(
                  () => {
                    ++s, i && s === r && t();
                  },
                  (e) => n(e)
                );
            }),
              (i = !0),
              s === r && t();
          });
        }
        static or(e) {
          let t = xo.resolve(!1);
          for (const n of e) t = t.next((e) => (e ? xo.resolve(e) : n()));
          return t;
        }
        static forEach(e, n) {
          const r = [];
          return (
            e.forEach((e, t) => {
              r.push(n.call(this, e, t));
            }),
            this.waitFor(r)
          );
        }
      }
      class No {
        constructor(n, e) {
          (this.action = n),
            (this.transaction = e),
            (this.aborted = !1),
            (this.At = new Cr()),
            (this.transaction.oncomplete = () => {
              this.At.resolve();
            }),
            (this.transaction.onabort = () => {
              e.error ? this.At.reject(new Ro(n, e.error)) : this.At.resolve();
            }),
            (this.transaction.onerror = (e) => {
              var t = Fo(e.target.error);
              this.At.reject(new Ro(n, t));
            });
        }
        static open(e, t, n, r) {
          try {
            return new No(t, e.transaction(r, n));
          } catch (e) {
            throw new Ro(t, e);
          }
        }
        get Rt() {
          return this.At.promise;
        }
        abort(e) {
          e && this.At.reject(e),
            this.aborted ||
              (Er(
                "SimpleDb",
                "Aborting transaction:",
                e ? e.message : "Client-initiated abort"
              ),
              (this.aborted = !0),
              this.transaction.abort());
        }
        Pt() {
          const e = this.transaction;
          this.aborted || "function" != typeof e.commit || e.commit();
        }
        store(e) {
          var t = this.transaction.objectStore(e);
          return new Lo(t);
        }
      }
      class Co {
        constructor(e, t, n) {
          (this.name = e),
            (this.version = t),
            (this.bt = n),
            12.2 === Co.Vt(f()) &&
              Tr(
                "Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround."
              );
        }
        static delete(e) {
          return (
            Er("SimpleDb", "Removing database:", e),
            Vo(window.indexedDB.deleteDatabase(e)).toPromise()
          );
        }
        static vt() {
          if ("object" != typeof indexedDB) return !1;
          if (Co.St()) return !0;
          const e = f(),
            t = Co.Vt(e),
            n = 0 < t && t < 10,
            r = Co.Dt(e),
            s = 0 < r && r < 4.5;
          return !(
            0 < e.indexOf("MSIE ") ||
            0 < e.indexOf("Trident/") ||
            0 < e.indexOf("Edge/") ||
            n ||
            s
          );
        }
        static St() {
          var e;
          return (
            "undefined" != typeof process &&
            "YES" ===
              (null === (e = process.env) || void 0 === e ? void 0 : e.Ct)
          );
        }
        static xt(e, t) {
          return e.store(t);
        }
        static Vt(e) {
          const t = e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),
            n = t ? t[1].split("_").slice(0, 2).join(".") : "-1";
          return Number(n);
        }
        static Dt(e) {
          const t = e.match(/Android ([\d.]+)/i),
            n = t ? t[1].split(".").slice(0, 2).join(".") : "-1";
          return Number(n);
        }
        async Nt(i) {
          return (
            this.db ||
              (Er("SimpleDb", "Opening database:", this.name),
              (this.db = await new Promise((n, r) => {
                const s = indexedDB.open(this.name, this.version);
                (s.onsuccess = (e) => {
                  var t = e.target.result;
                  n(t);
                }),
                  (s.onblocked = () => {
                    r(
                      new Ro(
                        i,
                        "Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."
                      )
                    );
                  }),
                  (s.onerror = (e) => {
                    var t = e.target.error;
                    "VersionError" === t.name
                      ? r(
                          new Nr(
                            xr.FAILED_PRECONDITION,
                            "A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh."
                          )
                        )
                      : "InvalidStateError" === t.name
                      ? r(
                          new Nr(
                            xr.FAILED_PRECONDITION,
                            "Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: " +
                              t
                          )
                        )
                      : r(new Ro(i, t));
                  }),
                  (s.onupgradeneeded = (e) => {
                    Er(
                      "SimpleDb",
                      'Database "' +
                        this.name +
                        '" requires upgrade from version:',
                      e.oldVersion
                    );
                    var t = e.target.result;
                    this.bt
                      .kt(t, s.transaction, e.oldVersion, this.version)
                      .next(() => {
                        Er(
                          "SimpleDb",
                          "Database upgrade to version " +
                            this.version +
                            " complete"
                        );
                      });
                  });
              }))),
            this.Ot && (this.db.onversionchange = (e) => this.Ot(e)),
            this.db
          );
        }
        Mt(t) {
          (this.Ot = t), this.db && (this.db.onversionchange = (e) => t(e));
        }
        async runTransaction(e, t, n, r) {
          var s = "readonly" === t;
          let i = 0;
          for (;;) {
            ++i;
            try {
              this.db = await this.Nt(e);
              const t = No.open(this.db, e, s ? "readonly" : "readwrite", n),
                i = r(t)
                  .next((e) => (t.Pt(), e))
                  .catch((e) => (t.abort(e), xo.reject(e)))
                  .toPromise();
              return i.catch(() => {}), await t.Rt, i;
            } catch (e) {
              const t = "FirebaseError" !== e.name && i < 3;
              if (
                (Er(
                  "SimpleDb",
                  "Transaction failed with error:",
                  e.message,
                  "Retrying:",
                  t
                ),
                this.close(),
                !t)
              )
                return Promise.reject(e);
            }
          }
        }
        close() {
          this.db && this.db.close(), (this.db = void 0);
        }
      }
      class ko {
        constructor(e) {
          (this.Ft = e), (this.$t = !1), (this.Bt = null);
        }
        get isDone() {
          return this.$t;
        }
        get Lt() {
          return this.Bt;
        }
        set cursor(e) {
          this.Ft = e;
        }
        done() {
          this.$t = !0;
        }
        Ut(e) {
          this.Bt = e;
        }
        delete() {
          return Vo(this.Ft.delete());
        }
      }
      class Ro extends Nr {
        constructor(e, t) {
          super(xr.UNAVAILABLE, `IndexedDB transaction '${e}' failed: ${t}`),
            (this.name = "IndexedDbTransactionError");
        }
      }
      function Oo(e) {
        return "IndexedDbTransactionError" === e.name;
      }
      class Lo {
        constructor(e) {
          this.store = e;
        }
        put(e, t) {
          let n;
          return (
            (n =
              void 0 !== t
                ? (Er("SimpleDb", "PUT", this.store.name, e, t),
                  this.store.put(t, e))
                : (Er("SimpleDb", "PUT", this.store.name, "<auto-key>", e),
                  this.store.put(e))),
            Vo(n)
          );
        }
        add(e) {
          return (
            Er("SimpleDb", "ADD", this.store.name, e, e), Vo(this.store.add(e))
          );
        }
        get(t) {
          return Vo(this.store.get(t)).next(
            (e) => (
              Er(
                "SimpleDb",
                "GET",
                this.store.name,
                t,
                (e = void 0 === e ? null : e)
              ),
              e
            )
          );
        }
        delete(e) {
          return (
            Er("SimpleDb", "DELETE", this.store.name, e),
            Vo(this.store.delete(e))
          );
        }
        count() {
          return (
            Er("SimpleDb", "COUNT", this.store.name), Vo(this.store.count())
          );
        }
        qt(e, n) {
          var t = this.options(e, n);
          if (t.index || "function" != typeof this.store.getAll) {
            const e = this.cursor(t),
              n = [];
            return this.Kt(e, (e, t) => {
              n.push(t);
            }).next(() => n);
          }
          {
            const e = this.store.getAll(t.range);
            return new xo((t, n) => {
              (e.onerror = (e) => {
                n(e.target.error);
              }),
                (e.onsuccess = (e) => {
                  t(e.target.result);
                });
            });
          }
        }
        Gt(e, t) {
          const r = this.store.getAll(e, null === t ? void 0 : t);
          return new xo((t, n) => {
            (r.onerror = (e) => {
              n(e.target.error);
            }),
              (r.onsuccess = (e) => {
                t(e.target.result);
              });
          });
        }
        Qt(e, t) {
          Er("SimpleDb", "DELETE ALL", this.store.name);
          const n = this.options(e, t);
          n.jt = !1;
          var r = this.cursor(n);
          return this.Kt(r, (e, t, n) => n.delete());
        }
        Wt(e, t) {
          let n;
          t ? (n = e) : ((n = {}), (t = e));
          var r = this.cursor(n);
          return this.Kt(r, t);
        }
        zt(s) {
          const e = this.cursor({});
          return new xo((n, r) => {
            (e.onerror = (e) => {
              var t = Fo(e.target.error);
              r(t);
            }),
              (e.onsuccess = (e) => {
                const t = e.target.result;
                t
                  ? s(t.primaryKey, t.value).next((e) => {
                      e ? t.continue() : n();
                    })
                  : n();
              });
          });
        }
        Kt(e, i) {
          const a = [];
          return new xo((s, t) => {
            (e.onerror = (e) => {
              t(e.target.error);
            }),
              (e.onsuccess = (e) => {
                const t = e.target.result;
                if (t) {
                  const n = new ko(t),
                    r = i(t.primaryKey, t.value, n);
                  if (r instanceof xo) {
                    const e = r.catch((e) => (n.done(), xo.reject(e)));
                    a.push(e);
                  }
                  n.isDone
                    ? s()
                    : null === n.Lt
                    ? t.continue()
                    : t.continue(n.Lt);
                } else s();
              });
          }).next(() => xo.waitFor(a));
        }
        options(e, t) {
          let n;
          return (
            void 0 !== e && ("string" == typeof e ? (n = e) : (t = e)),
            { index: n, range: t }
          );
        }
        cursor(e) {
          let t = "next";
          if ((e.reverse && (t = "prev"), e.index)) {
            const n = this.store.index(e.index);
            return e.jt
              ? n.openKeyCursor(e.range, t)
              : n.openCursor(e.range, t);
          }
          return this.store.openCursor(e.range, t);
        }
      }
      function Vo(e) {
        return new xo((n, r) => {
          (e.onsuccess = (e) => {
            var t = e.target.result;
            n(t);
          }),
            (e.onerror = (e) => {
              var t = Fo(e.target.error);
              r(t);
            });
        });
      }
      let Mo = !1;
      function Fo(e) {
        const t = Co.Vt(f());
        if (12.2 <= t && t < 13) {
          const t =
            "An internal error was encountered in the Indexed Database server";
          if (0 <= e.message.indexOf(t)) {
            const e = new Nr(
              "internal",
              `IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`
            );
            return (
              Mo ||
                ((Mo = !0),
                setTimeout(() => {
                  throw e;
                }, 0)),
              e
            );
          }
        }
        return e;
      }
      class Po extends Do {
        constructor(e, t) {
          super(), (this.Ht = e), (this.currentSequenceNumber = t);
        }
      }
      function Uo(e, t) {
        var n = e;
        return Co.xt(n.Ht, t);
      }
      class Bo {
        constructor(e, t, n, r) {
          (this.batchId = e),
            (this.localWriteTime = t),
            (this.baseMutations = n),
            (this.mutations = r);
        }
        applyToRemoteDocument(e, t) {
          var n = t.mutationResults;
          for (let r = 0; r < this.mutations.length; r++) {
            const s = this.mutations[r];
            s.key.isEqual(e.key) && Hi(s, e, n[r]);
          }
        }
        applyToLocalView(e, t) {
          for (const n of this.baseMutations)
            n.key.isEqual(e.key) && (t = Qi(n, e, t, this.localWriteTime));
          for (const r of this.mutations)
            r.key.isEqual(e.key) && (t = Qi(r, e, t, this.localWriteTime));
          return t;
        }
        applyToLocalDocumentSet(i, a) {
          const o = da();
          return (
            this.mutations.forEach((e) => {
              const t = i.get(e.key),
                n = t.overlayedDocument;
              let r = this.applyToLocalView(n, t.mutatedFields);
              r = a.has(e.key) ? null : r;
              var s = Wi(n, r);
              null !== s && o.set(e.key, s),
                n.isValidDocument() || n.convertToNoDocument($r.min());
            }),
            o
          );
        }
        keys() {
          return this.mutations.reduce((e, t) => e.add(t.key), pa());
        }
        isEqual(e) {
          return (
            this.batchId === e.batchId &&
            jr(this.mutations, e.mutations, (e, t) => Yi(e, t)) &&
            jr(this.baseMutations, e.baseMutations, (e, t) => Yi(e, t))
          );
        }
      }
      class qo {
        constructor(e, t, n, r) {
          (this.batch = e),
            (this.commitVersion = t),
            (this.mutationResults = n),
            (this.docVersions = r);
        }
        static from(e, t, n) {
          Dr(e.mutations.length === n.length);
          let r = ga;
          var s = e.mutations;
          for (let i = 0; i < s.length; i++)
            r = r.insert(s[i].key, n[i].version);
          return new qo(e, t, n, r);
        }
      }
      class jo {
        constructor(e, t) {
          (this.largestBatchId = e), (this.mutation = t);
        }
        getKey() {
          return this.mutation.key;
        }
        isEqual(e) {
          return null !== e && this.mutation === e.mutation;
        }
        toString() {
          return `Overlay{\n      largestBatchId: ${
            this.largestBatchId
          },\n      mutation: ${this.mutation.toString()}\n    }`;
        }
      }
      class Ko {
        constructor(
          e,
          t,
          n,
          r,
          s = $r.min(),
          i = $r.min(),
          a = as.EMPTY_BYTE_STRING
        ) {
          (this.target = e),
            (this.targetId = t),
            (this.purpose = n),
            (this.sequenceNumber = r),
            (this.snapshotVersion = s),
            (this.lastLimboFreeSnapshotVersion = i),
            (this.resumeToken = a);
        }
        withSequenceNumber(e) {
          return new Ko(
            this.target,
            this.targetId,
            this.purpose,
            e,
            this.snapshotVersion,
            this.lastLimboFreeSnapshotVersion,
            this.resumeToken
          );
        }
        withResumeToken(e, t) {
          return new Ko(
            this.target,
            this.targetId,
            this.purpose,
            this.sequenceNumber,
            t,
            this.lastLimboFreeSnapshotVersion,
            e
          );
        }
        withLastLimboFreeSnapshotVersion(e) {
          return new Ko(
            this.target,
            this.targetId,
            this.purpose,
            this.sequenceNumber,
            this.snapshotVersion,
            e,
            this.resumeToken
          );
        }
      }
      class Go {
        constructor(e) {
          this.Jt = e;
        }
      }
      function $o(e, t) {
        const n = t.key,
          r = {
            prefixPath: n.getCollectionPath().popLast().toArray(),
            collectionGroup: n.collectionGroup,
            documentId: n.path.lastSegment(),
            readTime: zo(t.readTime),
            hasCommittedMutations: t.hasCommittedMutations,
          };
        if (t.isFoundDocument())
          r.document = {
            name: Va((s = e.Jt), (e = t).key),
            fields: e.data.value.mapValue.fields,
            updateTime: Ca(s, e.version.toTimestamp()),
          };
        else if (t.isNoDocument())
          r.noDocument = { path: n.path.toArray(), readTime: Wo(t.version) };
        else {
          if (!t.isUnknownDocument()) return Ar();
          r.unknownDocument = {
            path: n.path.toArray(),
            version: Wo(t.version),
          };
        }
        var s;
        return r;
      }
      function zo(e) {
        var t = e.toTimestamp();
        return [t.seconds, t.nanoseconds];
      }
      function Wo(e) {
        var t = e.toTimestamp();
        return { seconds: t.seconds, nanoseconds: t.nanoseconds };
      }
      function Ho(e) {
        var t = new Gr(e.seconds, e.nanoseconds);
        return $r.fromTimestamp(t);
      }
      function Qo(t, e) {
        const n = (e.baseMutations || []).map((e) => Ga(t.Jt, e));
        for (let i = 0; i < e.mutations.length - 1; ++i) {
          const n = e.mutations[i];
          if (
            i + 1 < e.mutations.length &&
            void 0 !== e.mutations[i + 1].transform
          ) {
            const r = e.mutations[i + 1];
            (n.updateTransforms = r.transform.fieldTransforms),
              e.mutations.splice(i + 1, 1),
              ++i;
          }
        }
        const r = e.mutations.map((e) => Ga(t.Jt, e)),
          s = Gr.fromMillis(e.localWriteTimeMs);
        return new Bo(e.batchId, s, n, r);
      }
      function Yo(e) {
        var t,
          n = Ho(e.readTime),
          r =
            void 0 !== e.lastLimboFreeSnapshotVersion
              ? Ho(e.lastLimboFreeSnapshotVersion)
              : $r.min();
        let s;
        return (
          (s =
            void 0 !== e.query.documents
              ? (Dr(1 === (t = e.query).documents.length),
                Ii(pi(Pa(t.documents[0]))))
              : Ii(Wa(e.query))),
          new Ko(
            s,
            e.targetId,
            0,
            e.lastListenSequenceNumber,
            n,
            r,
            as.fromBase64String(e.resumeToken)
          )
        );
      }
      function Xo(e, t) {
        var n = Wo(t.snapshotVersion),
          r = Wo(t.lastLimboFreeSnapshotVersion),
          s = (Xs(t.target) ? $a : za)(e.Jt, t.target),
          i = t.resumeToken.toBase64();
        return {
          targetId: t.targetId,
          canonicalId: Qs(t.target),
          readTime: n,
          resumeToken: i,
          lastListenSequenceNumber: t.sequenceNumber,
          lastLimboFreeSnapshotVersion: r,
          query: s,
        };
      }
      function Jo(e) {
        var t = Wa({ parent: e.parent, structuredQuery: e.structuredQuery });
        return "LAST" === e.limitType ? Ei(t, t.limit, "L") : t;
      }
      function Zo(e, t) {
        return new jo(t.largestBatchId, Ga(e.Jt, t.overlayMutation));
      }
      function eu(e, t) {
        var n = t.path.lastSegment();
        return [e, Za(t.path.popLast()), n];
      }
      class tu {
        getBundleMetadata(e, t) {
          return nu(e)
            .get(t)
            .next((e) => {
              if (e)
                return {
                  id: (t = e).bundleId,
                  createTime: Ho(t.createTime),
                  version: t.version,
                };
              var t;
            });
        }
        saveBundleMetadata(e, t) {
          return nu(e).put({
            bundleId: (n = t).id,
            createTime: Wo(Ra(n.createTime)),
            version: n.version,
          });
          var n;
        }
        getNamedQuery(e, t) {
          return ru(e)
            .get(t)
            .next((e) => {
              if (e)
                return {
                  name: (t = e).name,
                  query: Jo(t.bundledQuery),
                  readTime: Ho(t.readTime),
                };
              var t;
            });
        }
        saveNamedQuery(e, t) {
          return ru(e).put({
            name: (t = t).name,
            readTime: Wo(Ra(t.readTime)),
            bundledQuery: t.bundledQuery,
          });
        }
      }
      function nu(e) {
        return Uo(e, "bundles");
      }
      function ru(e) {
        return Uo(e, "namedQueries");
      }
      class su {
        constructor(e, t) {
          (this.O = e), (this.userId = t);
        }
        static Yt(e, t) {
          var n = t.uid || "";
          return new su(e, n);
        }
        getOverlay(e, t) {
          return iu(e)
            .get(eu(this.userId, t))
            .next((e) => (e ? Zo(this.O, e) : null));
        }
        getOverlays(e, t) {
          const n = la(),
            r = [];
          return (
            t.forEach((t) => {
              r.push(
                this.getOverlay(e, t).next((e) => {
                  null !== e && n.set(t, e);
                })
              );
            }),
            xo.waitFor(r).next(() => n)
          );
        }
        saveOverlays(r, s, e) {
          const i = [];
          return (
            e.forEach((e, t) => {
              var n = new jo(s, t);
              i.push(this.Xt(r, n));
            }),
            xo.waitFor(i)
          );
        }
        removeOverlaysForBatchId(n, e, r) {
          const t = new Set();
          e.forEach((e) => t.add(Za(e.getCollectionPath())));
          const s = [];
          return (
            t.forEach((e) => {
              var t = IDBKeyRange.bound(
                [this.userId, e, r],
                [this.userId, e, r + 1],
                !1,
                !0
              );
              s.push(iu(n).Qt("collectionPathOverlayIndex", t));
            }),
            xo.waitFor(s)
          );
        }
        getOverlaysForCollection(e, t, n) {
          const r = la(),
            s = Za(t),
            i = IDBKeyRange.bound(
              [this.userId, s, n],
              [this.userId, s, Number.POSITIVE_INFINITY],
              !0
            );
          return iu(e)
            .qt("collectionPathOverlayIndex", i)
            .next((e) => {
              for (const t of e) {
                const e = Zo(this.O, t);
                r.set(e.getKey(), e);
              }
              return r;
            });
        }
        getOverlaysForCollectionGroup(e, t, n, s) {
          const i = la();
          let a;
          var r = IDBKeyRange.bound(
            [this.userId, t, n],
            [this.userId, t, Number.POSITIVE_INFINITY],
            !0
          );
          return iu(e)
            .Wt(
              { index: "collectionGroupOverlayIndex", range: r },
              (e, t, n) => {
                const r = Zo(this.O, t);
                i.size() < s || r.largestBatchId === a
                  ? (i.set(r.getKey(), r), (a = r.largestBatchId))
                  : n.done();
              }
            )
            .next(() => i);
        }
        Xt(e, t) {
          return iu(e).put(
            (function (e, t, n) {
              var [, r, s] = eu(t, n.mutation.key);
              return {
                userId: t,
                collectionPath: r,
                documentId: s,
                collectionGroup: n.mutation.key.getCollectionGroup(),
                largestBatchId: n.largestBatchId,
                overlayMutation: Ka(e.Jt, n.mutation),
              };
            })(this.O, this.userId, t)
          );
        }
      }
      function iu(e) {
        return Uo(e, "documentOverlays");
      }
      class au {
        constructor() {}
        Zt(e, t) {
          this.te(e, t), t.ee();
        }
        te(e, t) {
          var n, r;
          "nullValue" in e
            ? this.ne(t, 5)
            : "booleanValue" in e
            ? (this.ne(t, 10), t.se(e.booleanValue ? 1 : 0))
            : "integerValue" in e
            ? (this.ne(t, 15), t.se(hs(e.integerValue)))
            : "doubleValue" in e
            ? ((n = hs(e.doubleValue)),
              isNaN(n)
                ? this.ne(t, 13)
                : (this.ne(t, 15), ps(n) ? t.se(0) : t.se(n)))
            : "timestampValue" in e
            ? ((r = e.timestampValue),
              this.ne(t, 20),
              "string" == typeof r
                ? t.ie(r)
                : (t.ie(`${r.seconds || ""}`), t.se(r.nanos || 0)))
            : "stringValue" in e
            ? (this.re(e.stringValue, t), this.oe(t))
            : "bytesValue" in e
            ? (this.ne(t, 30), t.ue(cs(e.bytesValue)), this.oe(t))
            : "referenceValue" in e
            ? this.ae(e.referenceValue, t)
            : "geoPointValue" in e
            ? ((r = e.geoPointValue),
              this.ne(t, 45),
              t.se(r.latitude || 0),
              t.se(r.longitude || 0))
            : "mapValue" in e
            ? Ls(e)
              ? this.ne(t, Number.MAX_SAFE_INTEGER)
              : (this.ce(e.mapValue, t), this.oe(t))
            : "arrayValue" in e
            ? (this.he(e.arrayValue, t), this.oe(t))
            : Ar();
        }
        re(e, t) {
          this.ne(t, 25), this.le(e, t);
        }
        le(e, t) {
          t.ie(e);
        }
        ce(e, t) {
          var n = e.fields || {};
          this.ne(t, 55);
          for (const e of Object.keys(n)) this.re(e, t), this.te(n[e], t);
        }
        he(e, t) {
          var n = e.values || [];
          this.ne(t, 50);
          for (const e of n) this.te(e, t);
        }
        ae(e, t) {
          this.ne(t, 37),
            vs.fromName(e).path.forEach((e) => {
              this.ne(t, 60), this.le(e, t);
            });
        }
        ne(e, t) {
          e.se(t);
        }
        oe(e) {
          e.se(2);
        }
      }
      function ou(e) {
        var t =
          64 -
          (function (e) {
            let t = 0;
            for (let r = 0; r < 8; ++r) {
              var n = (function (e) {
                if (0 === e) return 8;
                let t = 0;
                return (
                  e >> 4 == 0 && ((t += 4), (e <<= 4)),
                  e >> 6 == 0 && ((t += 2), (e <<= 2)),
                  e >> 7 == 0 && (t += 1),
                  t
                );
              })(255 & e[r]);
              if (((t += n), 8 !== n)) break;
            }
            return t;
          })(e);
        return Math.ceil(t / 8);
      }
      au.fe = new au();
      class uu {
        constructor() {
          (this.buffer = new Uint8Array(1024)), (this.position = 0);
        }
        de(e) {
          const t = e[Symbol.iterator]();
          let n = t.next();
          for (; !n.done; ) this._e(n.value), (n = t.next());
          this.we();
        }
        me(e) {
          const t = e[Symbol.iterator]();
          let n = t.next();
          for (; !n.done; ) this.ge(n.value), (n = t.next());
          this.ye();
        }
        pe(e) {
          for (const t of e) {
            const e = t.charCodeAt(0);
            if (e < 128) this._e(e);
            else if (e < 2048)
              this._e(960 | (e >>> 6)), this._e(128 | (63 & e));
            else if (t < "\ud800" || "\udbff" < t)
              this._e(480 | (e >>> 12)),
                this._e(128 | (63 & (e >>> 6))),
                this._e(128 | (63 & e));
            else {
              const e = t.codePointAt(0);
              this._e(240 | (e >>> 18)),
                this._e(128 | (63 & (e >>> 12))),
                this._e(128 | (63 & (e >>> 6))),
                this._e(128 | (63 & e));
            }
          }
          this.we();
        }
        Ie(e) {
          for (const t of e) {
            const e = t.charCodeAt(0);
            if (e < 128) this.ge(e);
            else if (e < 2048)
              this.ge(960 | (e >>> 6)), this.ge(128 | (63 & e));
            else if (t < "\ud800" || "\udbff" < t)
              this.ge(480 | (e >>> 12)),
                this.ge(128 | (63 & (e >>> 6))),
                this.ge(128 | (63 & e));
            else {
              const e = t.codePointAt(0);
              this.ge(240 | (e >>> 18)),
                this.ge(128 | (63 & (e >>> 12))),
                this.ge(128 | (63 & (e >>> 6))),
                this.ge(128 | (63 & e));
            }
          }
          this.ye();
        }
        Te(e) {
          var t = this.Ee(e),
            n = ou(t);
          this.Ae(1 + n), (this.buffer[this.position++] = 255 & n);
          for (let r = t.length - n; r < t.length; ++r)
            this.buffer[this.position++] = 255 & t[r];
        }
        Re(e) {
          var t = this.Ee(e),
            n = ou(t);
          this.Ae(1 + n), (this.buffer[this.position++] = ~(255 & n));
          for (let r = t.length - n; r < t.length; ++r)
            this.buffer[this.position++] = ~(255 & t[r]);
        }
        Pe() {
          this.be(255), this.be(255);
        }
        Ve() {
          this.ve(255), this.ve(255);
        }
        reset() {
          this.position = 0;
        }
        seed(e) {
          this.Ae(e.length),
            this.buffer.set(e, this.position),
            (this.position += e.length);
        }
        Se() {
          return this.buffer.slice(0, this.position);
        }
        Ee(e) {
          const t = (function (e) {
              const t = new DataView(new ArrayBuffer(8));
              return t.setFloat64(0, e, !1), new Uint8Array(t.buffer);
            })(e),
            n = 0 != (128 & t[0]);
          t[0] ^= n ? 255 : 128;
          for (let r = 1; r < t.length; ++r) t[r] ^= n ? 255 : 0;
          return t;
        }
        _e(e) {
          var t = 255 & e;
          0 == t
            ? (this.be(0), this.be(255))
            : 255 == t
            ? (this.be(255), this.be(0))
            : this.be(t);
        }
        ge(e) {
          var t = 255 & e;
          0 == t
            ? (this.ve(0), this.ve(255))
            : 255 == t
            ? (this.ve(255), this.ve(0))
            : this.ve(e);
        }
        we() {
          this.be(0), this.be(1);
        }
        ye() {
          this.ve(0), this.ve(1);
        }
        be(e) {
          this.Ae(1), (this.buffer[this.position++] = e);
        }
        ve(e) {
          this.Ae(1), (this.buffer[this.position++] = ~e);
        }
        Ae(e) {
          var t = e + this.position;
          if (!(t <= this.buffer.length)) {
            let e = 2 * this.buffer.length;
            e < t && (e = t);
            const n = new Uint8Array(e);
            n.set(this.buffer), (this.buffer = n);
          }
        }
      }
      class hu {
        constructor(e) {
          this.De = e;
        }
        ue(e) {
          this.De.de(e);
        }
        ie(e) {
          this.De.pe(e);
        }
        se(e) {
          this.De.Te(e);
        }
        ee() {
          this.De.Pe();
        }
      }
      class cu {
        constructor(e) {
          this.De = e;
        }
        ue(e) {
          this.De.me(e);
        }
        ie(e) {
          this.De.Ie(e);
        }
        se(e) {
          this.De.Re(e);
        }
        ee() {
          this.De.Ve();
        }
      }
      class lu {
        constructor() {
          (this.De = new uu()),
            (this.Ce = new hu(this.De)),
            (this.xe = new cu(this.De));
        }
        seed(e) {
          this.De.seed(e);
        }
        Ne(e) {
          return 0 === e ? this.Ce : this.xe;
        }
        Se() {
          return this.De.Se();
        }
        reset() {
          this.De.reset();
        }
      }
      class du {
        constructor(e, t, n, r) {
          (this.indexId = e),
            (this.documentKey = t),
            (this.arrayValue = n),
            (this.directionalValue = r);
        }
        ke() {
          const e = this.directionalValue.length,
            t = 0 === e || 255 === this.directionalValue[e - 1] ? e + 1 : e,
            n = new Uint8Array(t);
          return (
            n.set(this.directionalValue, 0),
            t !== e
              ? n.set([0], this.directionalValue.length)
              : ++n[n.length - 1],
            new du(this.indexId, this.documentKey, this.arrayValue, n)
          );
        }
      }
      function fu(e, t) {
        let n = e.indexId - t.indexId;
        return 0 !== n
          ? n
          : ((n = gu(e.arrayValue, t.arrayValue)),
            0 !== n
              ? n
              : ((n = gu(e.directionalValue, t.directionalValue)),
                0 !== n ? n : vs.comparator(e.documentKey, t.documentKey)));
      }
      function gu(e, t) {
        for (let r = 0; r < e.length && r < t.length; ++r) {
          var n = e[r] - t[r];
          if (0 != n) return n;
        }
        return e.length - t.length;
      }
      class mu {
        constructor(e) {
          (this.collectionId =
            null != e.collectionGroup
              ? e.collectionGroup
              : e.path.lastSegment()),
            (this.Oe = e.orderBy),
            (this.Me = []);
          for (const t of e.filters) {
            const e = t;
            e.S() ? (this.Fe = e) : this.Me.push(e);
          }
        }
        $e(e) {
          var t = Bs(e);
          if (void 0 !== t && !this.Be(t)) return !1;
          var n = qs(e);
          let r = 0,
            s = 0;
          for (; r < n.length && this.Be(n[r]); ++r);
          if (r === n.length) return !0;
          if (void 0 !== this.Fe) {
            const e = n[r];
            if (!this.Le(this.Fe, e) || !this.Ue(this.Oe[s++], e)) return !1;
            ++r;
          }
          for (; r < n.length; ++r) {
            const e = n[r];
            if (s >= this.Oe.length || !this.Ue(this.Oe[s++], e)) return !1;
          }
          return !0;
        }
        Be(e) {
          for (const t of this.Me) if (this.Le(t, e)) return !0;
          return !1;
        }
        Le(e, t) {
          if (void 0 === e || !e.field.isEqual(t.fieldPath)) return !1;
          var n = "array-contains" === e.op || "array-contains-any" === e.op;
          return (2 === t.kind) == n;
        }
        Ue(e, t) {
          return (
            !!e.field.isEqual(t.fieldPath) &&
            ((0 === t.kind && "asc" === e.dir) ||
              (1 === t.kind && "desc" === e.dir))
          );
        }
      }
      class pu {
        constructor() {
          this.qe = new yu();
        }
        addToCollectionParentIndex(e, t) {
          return this.qe.add(t), xo.resolve();
        }
        getCollectionParents(e, t) {
          return xo.resolve(this.qe.getEntries(t));
        }
        addFieldIndex(e, t) {
          return xo.resolve();
        }
        deleteFieldIndex(e, t) {
          return xo.resolve();
        }
        getDocumentsMatchingTarget(e, t) {
          return xo.resolve(null);
        }
        getIndexType(e, t) {
          return xo.resolve(0);
        }
        getFieldIndexes(e, t) {
          return xo.resolve([]);
        }
        getNextCollectionGroupToUpdate(e) {
          return xo.resolve(null);
        }
        getMinOffset(e, t) {
          return xo.resolve($s.min());
        }
        updateCollectionGroup(e, t, n) {
          return xo.resolve();
        }
        updateIndexEntries(e, t) {
          return xo.resolve();
        }
      }
      class yu {
        constructor() {
          this.index = {};
        }
        add(e) {
          const t = e.lastSegment(),
            n = e.popLast(),
            r = this.index[t] || new Jr(ns.comparator),
            s = !r.has(n);
          return (this.index[t] = r.add(n)), s;
        }
        has(e) {
          const t = e.lastSegment(),
            n = e.popLast(),
            r = this.index[t];
          return r && r.has(n);
        }
        getEntries(e) {
          return (this.index[e] || new Jr(ns.comparator)).toArray();
        }
      }
      const vu = new Uint8Array(0);
      class wu {
        constructor(e, t) {
          (this.user = e),
            (this.databaseId = t),
            (this.Ke = new yu()),
            (this.Ge = new oa(
              (e) => Qs(e),
              (e, t) => Ys(e, t)
            )),
            (this.uid = e.uid || "");
        }
        addToCollectionParentIndex(e, t) {
          if (this.Ke.has(t)) return xo.resolve();
          var n = t.lastSegment(),
            r = t.popLast();
          e.addOnCommittedListener(() => {
            this.Ke.add(t);
          });
          r = { collectionId: n, parent: Za(r) };
          return bu(e).put(r);
        }
        getCollectionParents(e, n) {
          const r = [],
            t = IDBKeyRange.bound([n, ""], [Kr(n), ""], !1, !0);
          return bu(e)
            .qt(t)
            .next((e) => {
              for (const t of e) {
                if (t.collectionId !== n) break;
                r.push(to(t.parent));
              }
              return r;
            });
        }
        addFieldIndex(e, t) {
          const n = Eu(e),
            r = {
              indexId: t.indexId,
              collectionGroup: t.collectionGroup,
              fields: t.fields.map((e) => [
                e.fieldPath.canonicalString(),
                e.kind,
              ]),
            };
          return delete r.indexId, n.add(r).next();
        }
        deleteFieldIndex(e, t) {
          const n = Eu(e),
            r = Tu(e),
            s = Iu(e);
          return n
            .delete(t.indexId)
            .next(() =>
              r.delete(IDBKeyRange.bound([t.indexId], [t.indexId + 1], !1, !0))
            )
            .next(() =>
              s.delete(IDBKeyRange.bound([t.indexId], [t.indexId + 1], !1, !0))
            );
        }
        getDocumentsMatchingTarget(e, h) {
          const c = Iu(e);
          let l = !0;
          const n = new Map();
          return xo
            .forEach(this.Qe(h), (t) =>
              this.je(e, t).next((e) => {
                (l = l && !!e), n.set(t, e);
              })
            )
            .next(() => {
              if (l) {
                let u = pa();
                const l = [];
                return xo
                  .forEach(n, (e, t) => {
                    Er(
                      "IndexedDbIndexManager",
                      `Using index ${
                        ((o = e),
                        `id=${o.indexId}|cg=${o.collectionGroup}|f=${o.fields
                          .map((e) => `${e.fieldPath}:${e.kind}`)
                          .join(",")}`)
                      } to execute ${Qs(h)}`
                    );
                    var n = (function (e, t) {
                        var n = Bs(t);
                        if (void 0 === n) return null;
                        for (const t of Js(e, n.fieldPath))
                          switch (t.op) {
                            case "array-contains-any":
                              return t.value.arrayValue.values || [];
                            case "array-contains":
                              return [t.value];
                          }
                        return null;
                      })(t, e),
                      r = (function (e, t) {
                        const n = new Map();
                        for (const r of qs(t))
                          for (const t of Js(e, r.fieldPath))
                            switch (t.op) {
                              case "==":
                              case "in":
                                n.set(r.fieldPath.canonicalString(), t.value);
                                break;
                              case "not-in":
                              case "!=":
                                return (
                                  n.set(r.fieldPath.canonicalString(), t.value),
                                  Array.from(n.values())
                                );
                            }
                        return null;
                      })(t, e),
                      s = (function (e, t) {
                        const n = [];
                        let r = !0;
                        for (const s of qs(t)) {
                          const t = (0 === s.kind ? Zs : ei)(
                            e,
                            s.fieldPath,
                            e.startAt
                          );
                          n.push(t.value), (r = r && t.inclusive);
                        }
                        return new ci(n, r);
                      })(t, e),
                      i = (function (e, t) {
                        const n = [];
                        let r = !0;
                        for (const s of qs(t)) {
                          const t = (0 === s.kind ? ei : Zs)(
                            e,
                            s.fieldPath,
                            e.endAt
                          );
                          n.push(t.value), (r = r && t.inclusive);
                        }
                        return new ci(n, r);
                      })(t, e),
                      a = this.We(e, t, s),
                      o = this.We(e, t, i),
                      r = this.ze(e, t, r),
                      r = this.He(
                        e.indexId,
                        n,
                        a,
                        s.inclusive,
                        o,
                        i.inclusive,
                        r
                      );
                    return xo.forEach(r, (e) =>
                      c.Gt(e, h.limit).next((e) => {
                        e.forEach((e) => {
                          var t = vs.fromSegments(e.documentKey);
                          u.has(t) || ((u = u.add(t)), l.push(t));
                        });
                      })
                    );
                  })
                  .next(() => l);
              }
              return xo.resolve(null);
            });
        }
        Qe(e) {
          var t;
          return (t = this.Ge.get(e)) || (this.Ge.set(e, (t = [e])), t);
        }
        He(t, e, n, r, s, i, a) {
          const o = (null != e ? e.length : 1) * Math.max(n.length, s.length),
            u = o / (null != e ? e.length : 1),
            h = [];
          for (let c = 0; c < o; ++c) {
            const o = e ? this.Je(e[c / u]) : vu,
              l = this.Ye(t, o, n[c % u], r),
              d = this.Xe(t, o, s[c % u], i),
              f = a.map((e) => this.Ye(t, o, e, !0));
            h.push(...this.createRange(l, d, f));
          }
          return h;
        }
        Ye(e, t, n, r) {
          const s = new du(e, vs.empty(), t, n);
          return r ? s : s.ke();
        }
        Xe(e, t, n, r) {
          const s = new du(e, vs.empty(), t, n);
          return r ? s.ke() : s;
        }
        je(e, t) {
          const r = new mu(t),
            n =
              null != t.collectionGroup
                ? t.collectionGroup
                : t.path.lastSegment();
          return this.getFieldIndexes(e, n).next((e) => {
            let t = null;
            for (const n of e)
              r.$e(n) && (!t || n.fields.length > t.fields.length) && (t = n);
            return t;
          });
        }
        getIndexType(e, t) {
          let n = 2;
          return xo
            .forEach(this.Qe(t), (t) =>
              this.je(e, t).next((e) => {
                e
                  ? 0 !== n &&
                    e.fields.length <
                      (function (e) {
                        let t = new Jr(ss.comparator),
                          n = !1;
                        for (const r of e.filters) {
                          const e = r;
                          e.field.isKeyField() ||
                            ("array-contains" === e.op ||
                            "array-contains-any" === e.op
                              ? (n = !0)
                              : (t = t.add(e.field)));
                        }
                        for (const n of e.orderBy)
                          n.field.isKeyField() || (t = t.add(n.field));
                        return t.size + (n ? 1 : 0);
                      })(t) &&
                    (n = 1)
                  : (n = 0);
              })
            )
            .next(() => n);
        }
        Ze(e, t) {
          const n = new lu();
          for (const s of qs(e)) {
            const e = t.data.field(s.fieldPath);
            if (null == e) return null;
            var r = n.Ne(s.kind);
            au.fe.Zt(e, r);
          }
          return n.Se();
        }
        Je(e) {
          const t = new lu();
          return au.fe.Zt(e, t.Ne(0)), t.Se();
        }
        tn(e, t) {
          const n = new lu();
          return (
            au.fe.Zt(
              Ds(this.databaseId, t),
              n.Ne(0 === (r = qs(e)).length ? 0 : r[r.length - 1].kind)
            ),
            n.Se()
          );
          var r;
        }
        ze(e, t, n) {
          if (null === n) return [];
          let r = [];
          r.push(new lu());
          let s = 0;
          for (const i of qs(e)) {
            const e = n[s++];
            for (const n of r)
              if (this.en(t, i.fieldPath) && Ns(e)) r = this.nn(r, i, e);
              else {
                const t = n.Ne(i.kind);
                au.fe.Zt(e, t);
              }
          }
          return this.sn(r);
        }
        We(e, t, n) {
          return this.ze(e, t, n.position);
        }
        sn(e) {
          const t = [];
          for (let n = 0; n < e.length; ++n) t[n] = e[n].Se();
          return t;
        }
        nn(e, t, n) {
          const r = [...e],
            s = [];
          for (const e of n.arrayValue.values || [])
            for (const n of r) {
              const r = new lu();
              r.seed(n.Se()), au.fe.Zt(e, r.Ne(t.kind)), s.push(r);
            }
          return s;
        }
        en(e, t) {
          return !!e.filters.find(
            (e) =>
              e instanceof ti &&
              e.field.isEqual(t) &&
              ("in" === e.op || "not-in" === e.op)
          );
        }
        getFieldIndexes(e, t) {
          const n = Eu(e),
            r = Tu(e);
          return (
            t ? n.qt("collectionGroupIndex", IDBKeyRange.bound(t, t)) : n.qt()
          ).next((e) => {
            const i = [];
            return xo
              .forEach(e, (s) =>
                r.get([s.indexId, this.uid]).next((e) => {
                  var t, n, r;
                  i.push(
                    ((t = s),
                    (n = (e = e)
                      ? new Ks(
                          e.sequenceNumber,
                          new $s(
                            Ho(e.readTime),
                            new vs(to(e.documentKey)),
                            e.largestBatchId
                          )
                        )
                      : Ks.empty()),
                    (r = t.fields.map(
                      ([e, t]) => new js(ss.fromServerFormat(e), t)
                    )),
                    new Us(t.indexId, t.collectionGroup, r, n))
                  );
                })
              )
              .next(() => i);
          });
        }
        getNextCollectionGroupToUpdate(e) {
          return this.getFieldIndexes(e).next((e) =>
            0 === e.length
              ? null
              : (e.sort((e, t) => {
                  var n =
                    e.indexState.sequenceNumber - t.indexState.sequenceNumber;
                  return 0 != n ? n : qr(e.collectionGroup, t.collectionGroup);
                }),
                e[0].collectionGroup)
          );
        }
        updateCollectionGroup(e, t, n) {
          const s = Eu(e),
            i = Tu(e);
          return this.rn(e).next((r) =>
            s.qt("collectionGroupIndex", IDBKeyRange.bound(t, t)).next((e) =>
              xo.forEach(e, (e) =>
                i.put(
                  (function (e, t, n) {
                    return {
                      indexId: e,
                      uid: t.uid || "",
                      sequenceNumber: r,
                      readTime: Wo(n.readTime),
                      documentKey: Za(n.documentKey.path),
                      largestBatchId: n.largestBatchId,
                    };
                  })(e.indexId, this.user, n)
                )
              )
            )
          );
        }
        updateIndexEntries(s, e) {
          const n = new Map();
          return xo.forEach(e, (t, r) => {
            var e = n.get(t.collectionGroup);
            return (
              e ? xo.resolve(e) : this.getFieldIndexes(s, t.collectionGroup)
            ).next(
              (e) => (
                n.set(t.collectionGroup, e),
                xo.forEach(e, (n) =>
                  this.on(s, t, n).next((e) => {
                    var t = this.un(r, n);
                    return e.isEqual(t) ? xo.resolve() : this.an(s, r, n, e, t);
                  })
                )
              )
            );
          });
        }
        cn(e, t, n, r) {
          return Iu(e).put({
            indexId: r.indexId,
            uid: this.uid,
            arrayValue: r.arrayValue,
            directionalValue: r.directionalValue,
            orderedDocumentKey: this.tn(n, t.key),
            documentKey: t.key.path.toArray(),
          });
        }
        hn(e, t, n, r) {
          return Iu(e).delete([
            r.indexId,
            this.uid,
            r.arrayValue,
            r.directionalValue,
            this.tn(n, t.key),
            t.key.path.toArray(),
          ]);
        }
        on(e, n, r) {
          const t = Iu(e);
          let s = new Jr(fu);
          return t
            .Wt(
              {
                index: "documentKeyIndex",
                range: IDBKeyRange.only([r.indexId, this.uid, this.tn(r, n)]),
              },
              (e, t) => {
                s = s.add(
                  new du(r.indexId, n, t.arrayValue, t.directionalValue)
                );
              }
            )
            .next(() => s);
        }
        un(e, t) {
          let n = new Jr(fu);
          var r = this.Ze(t, e);
          if (null == r) return n;
          const s = Bs(t);
          if (null != s) {
            var i = e.data.field(s.fieldPath);
            if (Ns(i))
              for (const s of i.arrayValue.values || [])
                n = n.add(new du(t.indexId, e.key, this.Je(s), r));
          } else n = n.add(new du(t.indexId, e.key, vu, r));
          return n;
        }
        an(t, n, r, h, e) {
          Er(
            "IndexedDbIndexManager",
            "Updating index entries for document '%s'",
            n.key
          );
          const s = [];
          return (
            (function (e, n, r, s) {
              var i = h.getIterator(),
                a = e.getIterator();
              let o = es(i),
                u = es(a);
              for (; o || u; ) {
                let e = !1,
                  t = !1;
                if (o && u) {
                  const r = n(o, u);
                  r < 0 ? (t = !0) : 0 < r && (e = !0);
                } else null != o ? (t = !0) : (e = !0);
                e
                  ? (r(u), (u = es(a)))
                  : t
                  ? (s(o), (o = es(i)))
                  : ((o = es(i)), (u = es(a)));
              }
            })(
              e,
              fu,
              (e) => {
                s.push(this.cn(t, n, r, e));
              },
              (e) => {
                s.push(this.hn(t, n, r, e));
              }
            ),
            xo.waitFor(s)
          );
        }
        rn(e) {
          let r = 1;
          return Tu(e)
            .Wt(
              {
                index: "sequenceNumberIndex",
                reverse: !0,
                range: IDBKeyRange.upperBound([
                  this.uid,
                  Number.MAX_SAFE_INTEGER,
                ]),
              },
              (e, t, n) => {
                n.done(), (r = t.sequenceNumber + 1);
              }
            )
            .next(() => r);
        }
        createRange(e, t, n) {
          n = n
            .sort((e, t) => fu(e, t))
            .filter((e, t, n) => !t || 0 !== fu(e, n[t - 1]));
          const r = [];
          r.push(e);
          for (const s of n) {
            const n = fu(s, e),
              i = fu(s, t);
            if (0 === n) r[0] = e.ke();
            else if (0 < n && i < 0) r.push(s), r.push(s.ke());
            else if (0 < i) break;
          }
          r.push(t);
          const s = [];
          for (let a = 0; a < r.length; a += 2)
            s.push(
              IDBKeyRange.bound(
                [
                  r[a].indexId,
                  this.uid,
                  r[a].arrayValue,
                  r[a].directionalValue,
                  vu,
                  [],
                ],
                [
                  r[a + 1].indexId,
                  this.uid,
                  r[a + 1].arrayValue,
                  r[a + 1].directionalValue,
                  vu,
                  [],
                ]
              )
            );
          return s;
        }
        getMinOffset(t, e) {
          let n;
          return xo
            .forEach(this.Qe(e), (e) =>
              this.je(t, e).next((e) => {
                e
                  ? (!n || zs(e.indexState.offset, n) < 0) &&
                    (n = e.indexState.offset)
                  : (n = $s.min());
              })
            )
            .next(() => n);
        }
      }
      function bu(e) {
        return Uo(e, "collectionParents");
      }
      function Iu(e) {
        return Uo(e, "indexEntries");
      }
      function Eu(e) {
        return Uo(e, "indexConfiguration");
      }
      function Tu(e) {
        return Uo(e, "indexState");
      }
      const _u = {
        didRun: !1,
        sequenceNumbersCollected: 0,
        targetsRemoved: 0,
        documentsRemoved: 0,
      };
      class Su {
        constructor(e, t, n) {
          (this.cacheSizeCollectionThreshold = e),
            (this.percentileToCollect = t),
            (this.maximumSequenceNumbersToCollect = n);
        }
        static withCacheSize(e) {
          return new Su(
            e,
            Su.DEFAULT_COLLECTION_PERCENTILE,
            Su.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT
          );
        }
      }
      function Au(e, t, n) {
        const r = e.store("mutations"),
          s = e.store("documentMutations"),
          i = [],
          a = IDBKeyRange.only(n.batchId);
        let o = 0;
        const u = r.Wt({ range: a }, (e, t, n) => (o++, n.delete()));
        i.push(
          u.next(() => {
            Dr(1 === o);
          })
        );
        const h = [];
        for (const e of n.mutations) {
          const r = so(t, e.key.path, n.batchId);
          i.push(s.delete(r)), h.push(e.key);
        }
        return xo.waitFor(i).next(() => h);
      }
      function Du(e) {
        if (!e) return 0;
        let t;
        if (e.document) t = e.document;
        else if (e.unknownDocument) t = e.unknownDocument;
        else {
          if (!e.noDocument) throw Ar();
          t = e.noDocument;
        }
        return JSON.stringify(t).length;
      }
      (Su.DEFAULT_COLLECTION_PERCENTILE = 10),
        (Su.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT = 1e3),
        (Su.DEFAULT = new Su(
          41943040,
          Su.DEFAULT_COLLECTION_PERCENTILE,
          Su.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT
        )),
        (Su.DISABLED = new Su(-1, 0, 0));
      class xu {
        constructor(e, t, n, r) {
          (this.userId = e),
            (this.O = t),
            (this.indexManager = n),
            (this.referenceDelegate = r),
            (this.ln = {});
        }
        static Yt(e, t, n, r) {
          Dr("" !== e.uid);
          var s = e.isAuthenticated() ? e.uid : "";
          return new xu(s, t, n, r);
        }
        checkEmpty(e) {
          let r = !0;
          var t = IDBKeyRange.bound(
            [this.userId, Number.NEGATIVE_INFINITY],
            [this.userId, Number.POSITIVE_INFINITY]
          );
          return Cu(e)
            .Wt({ index: "userMutationsIndex", range: t }, (e, t, n) => {
              (r = !1), n.done();
            })
            .next(() => r);
        }
        addMutationBatch(c, l, d, f) {
          const g = ku(c),
            m = Cu(c);
          return m.add({}).next((e) => {
            Dr("number" == typeof e);
            const t = new Bo(e, l, d, f),
              n =
                ((s = this.O),
                (i = this.userId),
                (a = t),
                (o = a.baseMutations.map((e) => Ka(s.Jt, e))),
                (u = a.mutations.map((e) => Ka(s.Jt, e))),
                {
                  userId: i,
                  batchId: a.batchId,
                  localWriteTimeMs: a.localWriteTime.toMillis(),
                  baseMutations: o,
                  mutations: u,
                }),
              r = [];
            var s, i, a, o, u;
            let h = new Jr((e, t) =>
              qr(e.canonicalString(), t.canonicalString())
            );
            for (const c of f) {
              const l = so(this.userId, c.key.path, e);
              (h = h.add(c.key.path.popLast())),
                r.push(m.put(n)),
                r.push(g.put(l, io));
            }
            return (
              h.forEach((e) => {
                r.push(this.indexManager.addToCollectionParentIndex(c, e));
              }),
              c.addOnCommittedListener(() => {
                this.ln[e] = t.keys();
              }),
              xo.waitFor(r).next(() => t)
            );
          });
        }
        lookupMutationBatch(e, t) {
          return Cu(e)
            .get(t)
            .next((e) =>
              e ? (Dr(e.userId === this.userId), Qo(this.O, e)) : null
            );
        }
        fn(e, n) {
          return this.ln[n]
            ? xo.resolve(this.ln[n])
            : this.lookupMutationBatch(e, n).next((e) => {
                if (e) {
                  var t = e.keys();
                  return (this.ln[n] = t);
                }
                return null;
              });
        }
        getNextMutationBatchAfterBatchId(e, t) {
          const r = t + 1,
            n = IDBKeyRange.lowerBound([this.userId, r]);
          let s = null;
          return Cu(e)
            .Wt({ index: "userMutationsIndex", range: n }, (e, t, n) => {
              t.userId === this.userId &&
                (Dr(t.batchId >= r), (s = Qo(this.O, t))),
                n.done();
            })
            .next(() => s);
        }
        getHighestUnacknowledgedBatchId(e) {
          var t = IDBKeyRange.upperBound([
            this.userId,
            Number.POSITIVE_INFINITY,
          ]);
          let r = -1;
          return Cu(e)
            .Wt(
              { index: "userMutationsIndex", range: t, reverse: !0 },
              (e, t, n) => {
                (r = t.batchId), n.done();
              }
            )
            .next(() => r);
        }
        getAllMutationBatches(e) {
          var t = IDBKeyRange.bound(
            [this.userId, -1],
            [this.userId, Number.POSITIVE_INFINITY]
          );
          return Cu(e)
            .qt("userMutationsIndex", t)
            .next((e) => e.map((e) => Qo(this.O, e)));
        }
        getAllMutationBatchesAffectingDocumentKey(a, o) {
          const e = ro(this.userId, o.path),
            t = IDBKeyRange.lowerBound(e),
            u = [];
          return ku(a)
            .Wt({ range: t }, (e, t, n) => {
              var [r, s, i] = e,
                s = to(s);
              if (r === this.userId && o.path.isEqual(s))
                return Cu(a)
                  .get(i)
                  .next((e) => {
                    if (!e) throw Ar();
                    Dr(e.userId === this.userId), u.push(Qo(this.O, e));
                  });
              n.done();
            })
            .next(() => u);
        }
        getAllMutationBatchesAffectingDocumentKeys(t, e) {
          let o = new Jr(qr);
          const n = [];
          return (
            e.forEach((a) => {
              var e = ro(this.userId, a.path),
                e = IDBKeyRange.lowerBound(e),
                e = ku(t).Wt({ range: e }, (e, t, n) => {
                  var [r, s, i] = e,
                    s = to(s);
                  r === this.userId && a.path.isEqual(s)
                    ? (o = o.add(i))
                    : n.done();
                });
              n.push(e);
            }),
            xo.waitFor(n).next(() => this.dn(t, o))
          );
        }
        getAllMutationBatchesAffectingQuery(e, t) {
          const a = t.path,
            o = a.length + 1,
            n = ro(this.userId, a),
            r = IDBKeyRange.lowerBound(n);
          let u = new Jr(qr);
          return ku(e)
            .Wt({ range: r }, (e, t, n) => {
              var [r, s, i] = e,
                s = to(s);
              r === this.userId && a.isPrefixOf(s)
                ? s.length === o && (u = u.add(i))
                : n.done();
            })
            .next(() => this.dn(e, u));
        }
        dn(t, e) {
          const n = [],
            r = [];
          return (
            e.forEach((e) => {
              r.push(
                Cu(t)
                  .get(e)
                  .next((e) => {
                    if (null === e) throw Ar();
                    Dr(e.userId === this.userId), n.push(Qo(this.O, e));
                  })
              );
            }),
            xo.waitFor(r).next(() => n)
          );
        }
        removeMutationBatch(t, n) {
          return Au(t.Ht, this.userId, n).next(
            (e) => (
              t.addOnCommittedListener(() => {
                this._n(n.batchId);
              }),
              xo.forEach(e, (e) =>
                this.referenceDelegate.markPotentiallyOrphaned(t, e)
              )
            )
          );
        }
        _n(e) {
          delete this.ln[e];
        }
        performConsistencyCheck(n) {
          return this.checkEmpty(n).next((e) => {
            if (!e) return xo.resolve();
            var t = IDBKeyRange.lowerBound([this.userId]);
            const r = [];
            return ku(n)
              .Wt({ range: t }, (e, t, n) => {
                if (e[0] === this.userId) {
                  const t = to(e[1]);
                  r.push(t);
                } else n.done();
              })
              .next(() => {
                Dr(0 === r.length);
              });
          });
        }
        containsKey(e, t) {
          return Nu(e, this.userId, t);
        }
        wn(e) {
          return Ru(e)
            .get(this.userId)
            .next(
              (e) =>
                e || {
                  userId: this.userId,
                  lastAcknowledgedBatchId: -1,
                  lastStreamToken: "",
                }
            );
        }
      }
      function Nu(e, i, t) {
        const n = ro(i, t.path),
          a = n[1],
          r = IDBKeyRange.lowerBound(n);
        let o = !1;
        return ku(e)
          .Wt({ range: r, jt: !0 }, (e, t, n) => {
            var [r, s] = e;
            r === i && s === a && (o = !0), n.done();
          })
          .next(() => o);
      }
      function Cu(e) {
        return Uo(e, "mutations");
      }
      function ku(e) {
        return Uo(e, "documentMutations");
      }
      function Ru(e) {
        return Uo(e, "mutationQueues");
      }
      class Ou {
        constructor(e) {
          this.mn = e;
        }
        next() {
          return (this.mn += 2), this.mn;
        }
        static gn() {
          return new Ou(0);
        }
        static yn() {
          return new Ou(-1);
        }
      }
      class Lu {
        constructor(e, t) {
          (this.referenceDelegate = e), (this.O = t);
        }
        allocateTargetId(n) {
          return this.pn(n).next((e) => {
            const t = new Ou(e.highestTargetId);
            return (
              (e.highestTargetId = t.next()),
              this.In(n, e).next(() => e.highestTargetId)
            );
          });
        }
        getLastRemoteSnapshotVersion(e) {
          return this.pn(e).next((e) =>
            $r.fromTimestamp(
              new Gr(
                e.lastRemoteSnapshotVersion.seconds,
                e.lastRemoteSnapshotVersion.nanoseconds
              )
            )
          );
        }
        getHighestSequenceNumber(e) {
          return this.pn(e).next((e) => e.highestListenSequenceNumber);
        }
        setTargetsMetadata(t, n, r) {
          return this.pn(t).next(
            (e) => (
              (e.highestListenSequenceNumber = n),
              r && (e.lastRemoteSnapshotVersion = r.toTimestamp()),
              n > e.highestListenSequenceNumber &&
                (e.highestListenSequenceNumber = n),
              this.In(t, e)
            )
          );
        }
        addTargetData(t, n) {
          return this.Tn(t, n).next(() =>
            this.pn(t).next(
              (e) => ((e.targetCount += 1), this.En(n, e), this.In(t, e))
            )
          );
        }
        updateTargetData(e, t) {
          return this.Tn(e, t);
        }
        removeTargetData(t, e) {
          return this.removeMatchingKeysForTargetId(t, e.targetId)
            .next(() => Vu(t).delete(e.targetId))
            .next(() => this.pn(t))
            .next(
              (e) => (Dr(0 < e.targetCount), --e.targetCount, this.In(t, e))
            );
        }
        removeTargets(r, s, i) {
          let a = 0;
          const o = [];
          return Vu(r)
            .Wt((e, t) => {
              var n = Yo(t);
              n.sequenceNumber <= s &&
                null === i.get(n.targetId) &&
                (a++, o.push(this.removeTargetData(r, n)));
            })
            .next(() => xo.waitFor(o))
            .next(() => a);
        }
        forEachTarget(e, r) {
          return Vu(e).Wt((e, t) => {
            var n = Yo(t);
            r(n);
          });
        }
        pn(e) {
          return Mu(e)
            .get("targetGlobalKey")
            .next((e) => (Dr(null !== e), e));
        }
        In(e, t) {
          return Mu(e).put("targetGlobalKey", t);
        }
        Tn(e, t) {
          return Vu(e).put(Xo(this.O, t));
        }
        En(e, t) {
          let n = !1;
          return (
            e.targetId > t.highestTargetId &&
              ((t.highestTargetId = e.targetId), (n = !0)),
            e.sequenceNumber > t.highestListenSequenceNumber &&
              ((t.highestListenSequenceNumber = e.sequenceNumber), (n = !0)),
            n
          );
        }
        getTargetCount(e) {
          return this.pn(e).next((e) => e.targetCount);
        }
        getTargetData(e, s) {
          var t = Qs(s),
            t = IDBKeyRange.bound(
              [t, Number.NEGATIVE_INFINITY],
              [t, Number.POSITIVE_INFINITY]
            );
          let i = null;
          return Vu(e)
            .Wt({ range: t, index: "queryTargetsIndex" }, (e, t, n) => {
              var r = Yo(t);
              Ys(s, r.target) && ((i = r), n.done());
            })
            .next(() => i);
        }
        addMatchingKeys(n, e, r) {
          const s = [],
            i = Fu(n);
          return (
            e.forEach((e) => {
              var t = Za(e.path);
              s.push(i.put({ targetId: r, path: t })),
                s.push(this.referenceDelegate.addReference(n, r, e));
            }),
            xo.waitFor(s)
          );
        }
        removeMatchingKeys(n, e, r) {
          const s = Fu(n);
          return xo.forEach(e, (e) => {
            var t = Za(e.path);
            return xo.waitFor([
              s.delete([r, t]),
              this.referenceDelegate.removeReference(n, r, e),
            ]);
          });
        }
        removeMatchingKeysForTargetId(e, t) {
          const n = Fu(e),
            r = IDBKeyRange.bound([t], [t + 1], !1, !0);
          return n.delete(r);
        }
        getMatchingKeysForTargetId(e, t) {
          const n = IDBKeyRange.bound([t], [t + 1], !1, !0),
            r = Fu(e);
          let s = pa();
          return r
            .Wt({ range: n, jt: !0 }, (e, t, n) => {
              var r = to(e[1]),
                r = new vs(r);
              s = s.add(r);
            })
            .next(() => s);
        }
        containsKey(e, t) {
          var n = Za(t.path),
            n = IDBKeyRange.bound([n], [Kr(n)], !1, !0);
          let r = 0;
          return Fu(e)
            .Wt(
              { index: "documentTargetsIndex", jt: !0, range: n },
              ([e], t, n) => {
                0 !== e && (r++, n.done());
              }
            )
            .next(() => 0 < r);
        }
        Et(e, t) {
          return Vu(e)
            .get(t)
            .next((e) => (e ? Yo(e) : null));
        }
      }
      function Vu(e) {
        return Uo(e, "targets");
      }
      function Mu(e) {
        return Uo(e, "targetGlobal");
      }
      function Fu(e) {
        return Uo(e, "targetDocuments");
      }
      async function Pu(e) {
        if (e.code !== xr.FAILED_PRECONDITION || e.message !== Ao) throw e;
        Er("LocalStore", "Unexpectedly lost primary lease");
      }
      function Uu([e, t], [n, r]) {
        var s = qr(e, n);
        return 0 === s ? qr(t, r) : s;
      }
      class Bu {
        constructor(e) {
          (this.An = e), (this.buffer = new Jr(Uu)), (this.Rn = 0);
        }
        Pn() {
          return ++this.Rn;
        }
        bn(e) {
          var t = [e, this.Pn()];
          if (this.buffer.size < this.An) this.buffer = this.buffer.add(t);
          else {
            const e = this.buffer.last();
            Uu(t, e) < 0 && (this.buffer = this.buffer.delete(e).add(t));
          }
        }
        get maxValue() {
          return this.buffer.last()[0];
        }
      }
      class qu {
        constructor(e, t) {
          (this.garbageCollector = e),
            (this.asyncQueue = t),
            (this.Vn = !1),
            (this.vn = null);
        }
        start(e) {
          -1 !== this.garbageCollector.params.cacheSizeCollectionThreshold &&
            this.Sn(e);
        }
        stop() {
          this.vn && (this.vn.cancel(), (this.vn = null));
        }
        get started() {
          return null !== this.vn;
        }
        Sn(e) {
          var t = this.Vn ? 3e5 : 6e4;
          Er("LruGarbageCollector", `Garbage collection scheduled in ${t}ms`),
            (this.vn = this.asyncQueue.enqueueAfterDelay(
              "lru_garbage_collection",
              t,
              async () => {
                (this.vn = null), (this.Vn = !0);
                try {
                  await e.collectGarbage(this.garbageCollector);
                } catch (e) {
                  Oo(e)
                    ? Er(
                        "LruGarbageCollector",
                        "Ignoring IndexedDB error during garbage collection: ",
                        e
                      )
                    : await Pu(e);
                }
                await this.Sn(e);
              }
            ));
        }
      }
      class ju {
        constructor(e, t) {
          (this.Dn = e), (this.params = t);
        }
        calculateTargetCount(e, t) {
          return this.Dn.Cn(e).next((e) => Math.floor((t / 100) * e));
        }
        nthSequenceNumber(e, t) {
          if (0 === t) return xo.resolve(Ur.A);
          const n = new Bu(t);
          return this.Dn.forEachTarget(e, (e) => n.bn(e.sequenceNumber))
            .next(() => this.Dn.xn(e, (e) => n.bn(e)))
            .next(() => n.maxValue);
        }
        removeTargets(e, t, n) {
          return this.Dn.removeTargets(e, t, n);
        }
        removeOrphanedDocuments(e, t) {
          return this.Dn.removeOrphanedDocuments(e, t);
        }
        collect(t, n) {
          return -1 === this.params.cacheSizeCollectionThreshold
            ? (Er(
                "LruGarbageCollector",
                "Garbage collection skipped; disabled"
              ),
              xo.resolve(_u))
            : this.getCacheSize(t).next((e) =>
                e < this.params.cacheSizeCollectionThreshold
                  ? (Er(
                      "LruGarbageCollector",
                      `Garbage collection skipped; Cache size ${e} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`
                    ),
                    _u)
                  : this.Nn(t, n)
              );
        }
        getCacheSize(e) {
          return this.Dn.getCacheSize(e);
        }
        Nn(t, n) {
          let r, s, i, a, o, u, h;
          const c = Date.now();
          return this.calculateTargetCount(t, this.params.percentileToCollect)
            .next(
              (e) => (
                (s =
                  e > this.params.maximumSequenceNumbersToCollect
                    ? (Er(
                        "LruGarbageCollector",
                        `Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${e}`
                      ),
                      this.params.maximumSequenceNumbersToCollect)
                    : e),
                (a = Date.now()),
                this.nthSequenceNumber(t, s)
              )
            )
            .next(
              (e) => ((r = e), (o = Date.now()), this.removeTargets(t, r, n))
            )
            .next(
              (e) => (
                (i = e), (u = Date.now()), this.removeOrphanedDocuments(t, r)
              )
            )
            .next(
              (e) => (
                (h = Date.now()),
                Ir() <= l.DEBUG &&
                  Er(
                    "LruGarbageCollector",
                    `LRU Garbage Collection\n\tCounted targets in ${
                      a - c
                    }ms\n\tDetermined least recently used ${s} in ` +
                      (o - a) +
                      "ms\n" +
                      `\tRemoved ${i} targets in ` +
                      (u - o) +
                      "ms\n" +
                      `\tRemoved ${e} documents in ` +
                      (h - u) +
                      "ms\n" +
                      `Total Duration: ${h - c}ms`
                  ),
                xo.resolve({
                  didRun: !0,
                  sequenceNumbersCollected: s,
                  targetsRemoved: i,
                  documentsRemoved: e,
                })
              )
            );
        }
      }
      class Ku {
        constructor(e, t) {
          (this.db = e),
            (this.garbageCollector = ((e = this), (t = t), new ju(e, t)));
        }
        Cn(e) {
          const n = this.kn(e);
          return this.db
            .getTargetCache()
            .getTargetCount(e)
            .next((t) => n.next((e) => t + e));
        }
        kn(e) {
          let t = 0;
          return this.xn(e, (e) => {
            t++;
          }).next(() => t);
        }
        forEachTarget(e, t) {
          return this.db.getTargetCache().forEachTarget(e, t);
        }
        xn(e, n) {
          return this.On(e, (e, t) => n(t));
        }
        addReference(e, t, n) {
          return Gu(e, n);
        }
        removeReference(e, t, n) {
          return Gu(e, n);
        }
        removeTargets(e, t, n) {
          return this.db.getTargetCache().removeTargets(e, t, n);
        }
        markPotentiallyOrphaned(e, t) {
          return Gu(e, t);
        }
        Mn(t, n) {
          let r = !1;
          return Ru(t)
            .zt((e) => Nu(t, e, n).next((e) => (e && (r = !0), xo.resolve(!e))))
            .next(() => r);
        }
        removeOrphanedDocuments(n, r) {
          const s = this.db.getRemoteDocumentCache().newChangeBuffer(),
            i = [];
          let a = 0;
          return this.On(n, (t, e) => {
            if (e <= r) {
              const r = this.Mn(n, t).next((e) => {
                if (!e)
                  return (
                    a++,
                    s
                      .getEntry(n, t)
                      .next(
                        () => (
                          s.removeEntry(t, $r.min()),
                          Fu(n).delete([0, Za(t.path)])
                        )
                      )
                  );
              });
              i.push(r);
            }
          })
            .next(() => xo.waitFor(i))
            .next(() => s.apply(n))
            .next(() => a);
        }
        removeTarget(e, t) {
          var n = t.withSequenceNumber(e.currentSequenceNumber);
          return this.db.getTargetCache().updateTargetData(e, n);
        }
        updateLimboDocument(e, t) {
          return Gu(e, t);
        }
        On(e, r) {
          const t = Fu(e);
          let s,
            i = Ur.A;
          return t
            .Wt(
              { index: "documentTargetsIndex" },
              ([e], { path: t, sequenceNumber: n }) => {
                0 === e
                  ? (i !== Ur.A && r(new vs(to(s)), i), (i = n), (s = t))
                  : (i = Ur.A);
              }
            )
            .next(() => {
              i !== Ur.A && r(new vs(to(s)), i);
            });
        }
        getCacheSize(e) {
          return this.db.getRemoteDocumentCache().getSize(e);
        }
      }
      function Gu(e, t) {
        return Fu(e).put(
          ((e = e.currentSequenceNumber),
          { targetId: 0, path: Za(t.path), sequenceNumber: e })
        );
      }
      class $u {
        constructor() {
          (this.changes = new oa(
            (e) => e.toString(),
            (e, t) => e.isEqual(t)
          )),
            (this.changesApplied = !1);
        }
        addEntry(e) {
          this.assertNotApplied(), this.changes.set(e.key, e);
        }
        removeEntry(e, t) {
          this.assertNotApplied(),
            this.changes.set(e, Ps.newInvalidDocument(e).setReadTime(t));
        }
        getEntry(e, t) {
          this.assertNotApplied();
          var n = this.changes.get(t);
          return void 0 !== n ? xo.resolve(n) : this.getFromCache(e, t);
        }
        getEntries(e, t) {
          return this.getAllFromCache(e, t);
        }
        apply(e) {
          return (
            this.assertNotApplied(),
            (this.changesApplied = !0),
            this.applyChanges(e)
          );
        }
        assertNotApplied() {}
      }
      class zu {
        constructor(e) {
          this.O = e;
        }
        setIndexManager(e) {
          this.indexManager = e;
        }
        addEntry(e, t, n) {
          return Yu(e).put(n);
        }
        removeEntry(e, n, t) {
          return Yu(e).delete(
            (function (e) {
              const t = n.path.toArray();
              return [
                t.slice(0, t.length - 2),
                t[t.length - 2],
                zo(e),
                t[t.length - 1],
              ];
            })(t)
          );
        }
        updateMetadata(t, n) {
          return this.getMetadata(t).next(
            (e) => ((e.byteSize += n), this.Fn(t, e))
          );
        }
        getEntry(e, n) {
          let r = Ps.newInvalidDocument(n);
          return Yu(e)
            .Wt(
              { index: "documentKeyIndex", range: IDBKeyRange.only(Xu(n)) },
              (e, t) => {
                r = this.$n(n, t);
              }
            )
            .next(() => r);
        }
        Bn(e, n) {
          let r = { size: 0, document: Ps.newInvalidDocument(n) };
          return Yu(e)
            .Wt(
              { index: "documentKeyIndex", range: IDBKeyRange.only(Xu(n)) },
              (e, t) => {
                r = { document: this.$n(n, t), size: Du(t) };
              }
            )
            .next(() => r);
        }
        getEntries(e, t) {
          let r = ua;
          return this.Ln(e, t, (e, t) => {
            var n = this.$n(e, t);
            r = r.insert(e, n);
          }).next(() => r);
        }
        Un(e, t) {
          let r = ua,
            s = new Qr(vs.comparator);
          return this.Ln(e, t, (e, t) => {
            var n = this.$n(e, t);
            (r = r.insert(e, n)), (s = s.insert(e, Du(t)));
          }).next(() => ({ documents: r, qn: s }));
        }
        Ln(e, t, s) {
          if (t.isEmpty()) return xo.resolve();
          let n = new Jr(Zu);
          t.forEach((e) => (n = n.add(e)));
          const r = IDBKeyRange.bound(Xu(n.first()), Xu(n.last())),
            i = n.getIterator();
          let a = i.getNext();
          return Yu(e)
            .Wt({ index: "documentKeyIndex", range: r }, (e, t, n) => {
              for (
                var r = vs.fromSegments([
                  ...t.prefixPath,
                  t.collectionGroup,
                  t.documentId,
                ]);
                a && Zu(a, r) < 0;

              )
                s(a, null), (a = i.getNext());
              a &&
                a.isEqual(r) &&
                (s(a, t), (a = i.hasNext() ? i.getNext() : null)),
                a ? n.Ut(Xu(a)) : n.done();
            })
            .next(() => {
              for (; a; ) s(a, null), (a = i.hasNext() ? i.getNext() : null);
            });
        }
        getAllFromCollection(e, t, n) {
          var r = [
              t.popLast().toArray(),
              t.lastSegment(),
              zo(n.readTime),
              n.documentKey.path.isEmpty()
                ? ""
                : n.documentKey.path.lastSegment(),
            ],
            s = [
              t.popLast().toArray(),
              t.lastSegment(),
              [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
              "",
            ];
          return Yu(e)
            .qt(IDBKeyRange.bound(r, s, !0))
            .next((e) => {
              let t = ua;
              for (const n of e) {
                const e = this.$n(
                  vs.fromSegments(
                    n.prefixPath.concat(n.collectionGroup, n.documentId)
                  ),
                  n
                );
                t = t.insert(e.key, e);
              }
              return t;
            });
        }
        getAllFromCollectionGroup(e, t, n, s) {
          let i = ua;
          var r = Ju(t, n),
            a = Ju(t, $s.max());
          return Yu(e)
            .Wt(
              {
                index: "collectionGroupIndex",
                range: IDBKeyRange.bound(r, a, !0),
              },
              (e, t, n) => {
                var r = this.$n(
                  vs.fromSegments(
                    t.prefixPath.concat(t.collectionGroup, t.documentId)
                  ),
                  t
                );
                (i = i.insert(r.key, r)), i.size === s && n.done();
              }
            )
            .next(() => i);
        }
        newChangeBuffer(e) {
          return new Hu(this, !!e && e.trackRemovals);
        }
        getSize(e) {
          return this.getMetadata(e).next((e) => e.byteSize);
        }
        getMetadata(e) {
          return Qu(e)
            .get("remoteDocumentGlobalKey")
            .next((e) => (Dr(!!e), e));
        }
        Fn(e, t) {
          return Qu(e).put("remoteDocumentGlobalKey", t);
        }
        $n(e, t) {
          if (t) {
            const e = (function (e, t) {
              let n;
              if (t.document)
                n = ja(e.Jt, t.document, !!t.hasCommittedMutations);
              else if (t.noDocument) {
                const e = vs.fromSegments(t.noDocument.path),
                  s = Ho(t.noDocument.readTime);
                (n = Ps.newNoDocument(e, s)),
                  t.hasCommittedMutations && n.setHasCommittedMutations();
              } else {
                if (!t.unknownDocument) return Ar();
                {
                  const e = vs.fromSegments(t.unknownDocument.path),
                    i = Ho(t.unknownDocument.version);
                  n = Ps.newUnknownDocument(e, i);
                }
              }
              return (
                t.readTime &&
                  n.setReadTime(
                    ((t = t.readTime),
                    (r = new Gr(t[0], t[1])),
                    $r.fromTimestamp(r))
                  ),
                n
              );
              var r;
            })(this.O, t);
            if (!e.isNoDocument() || !e.version.isEqual($r.min())) return e;
          }
          return Ps.newInvalidDocument(e);
        }
      }
      function Wu(e) {
        return new zu(e);
      }
      class Hu extends $u {
        constructor(e, t) {
          super(),
            (this.Kn = e),
            (this.trackRemovals = t),
            (this.Gn = new oa(
              (e) => e.toString(),
              (e, t) => e.isEqual(t)
            ));
        }
        applyChanges(i) {
          const a = [];
          let o = 0,
            u = new Jr((e, t) => qr(e.canonicalString(), t.canonicalString()));
          return (
            this.changes.forEach((e, t) => {
              var n = this.Gn.get(e);
              if (
                (a.push(this.Kn.removeEntry(i, e, n.readTime)),
                t.isValidDocument())
              ) {
                var r = $o(this.Kn.O, t);
                u = u.add(e.path.popLast());
                var s = Du(r);
                (o += s - n.size), a.push(this.Kn.addEntry(i, e, r));
              } else if (((o -= n.size), this.trackRemovals)) {
                const o = $o(this.Kn.O, t.convertToNoDocument($r.min()));
                a.push(this.Kn.addEntry(i, e, o));
              }
            }),
            u.forEach((e) => {
              a.push(this.Kn.indexManager.addToCollectionParentIndex(i, e));
            }),
            a.push(this.Kn.updateMetadata(i, o)),
            xo.waitFor(a)
          );
        }
        getFromCache(e, t) {
          return this.Kn.Bn(e, t).next(
            (e) => (
              this.Gn.set(t, { size: e.size, readTime: e.document.readTime }),
              e.document
            )
          );
        }
        getAllFromCache(e, t) {
          return this.Kn.Un(e, t).next(
            ({ documents: n, qn: e }) => (
              e.forEach((e, t) => {
                this.Gn.set(e, { size: t, readTime: n.get(e).readTime });
              }),
              n
            )
          );
        }
      }
      function Qu(e) {
        return Uo(e, "remoteDocumentGlobal");
      }
      function Yu(e) {
        return Uo(e, "remoteDocumentsV14");
      }
      function Xu(e) {
        const t = e.path.toArray();
        return [t.slice(0, t.length - 2), t[t.length - 2], t[t.length - 1]];
      }
      function Ju(e, t) {
        const n = t.documentKey.path.toArray();
        return [
          e,
          zo(t.readTime),
          n.slice(0, n.length - 2),
          0 < n.length ? n[n.length - 1] : "",
        ];
      }
      function Zu(e, t) {
        var n = e.path.toArray(),
          r = t.path.toArray();
        let s = 0;
        for (let i = 0; i < n.length - 2 && i < r.length - 2; ++i)
          if (((s = qr(n[i], r[i])), s)) return s;
        return (
          (s = qr(n.length, r.length)),
          s ||
            ((s = qr(n[n.length - 2], r[r.length - 2])),
            s || qr(n[n.length - 1], r[r.length - 1]))
        );
      }
      class eh {
        constructor(e, t) {
          (this.overlayedDocument = e), (this.mutatedFields = t);
        }
      }
      class th {
        constructor(e, t, n, r) {
          (this.Qn = e), (this.jn = t), (this.Wn = n), (this.indexManager = r);
        }
        zn(t, n) {
          let r = null;
          return this.Wn.getOverlay(t, n)
            .next((e) => ((r = e), this.Hn(t, n, r)))
            .next(
              (e) => (null !== r && Qi(r.mutation, e, is.empty(), Gr.now()), e)
            );
        }
        Jn(t, e) {
          return this.Qn.getEntries(t, e).next((e) =>
            this.Yn(t, e, pa()).next(() => e)
          );
        }
        Yn(e, t, n = pa()) {
          const r = la();
          return this.Xn(e, r, t).next(() =>
            this.Zn(e, t, r, n).next((e) => {
              let n = ca();
              return (
                e.forEach((e, t) => {
                  n = n.insert(e, t.overlayedDocument);
                }),
                n
              );
            })
          );
        }
        ts(e, t) {
          const n = la();
          return this.Xn(e, n, t).next(() => this.Zn(e, t, n, pa()));
        }
        Xn(e, n, t) {
          let r = pa();
          return (
            t.forEach((e) => {
              n.has(e) || (r = r.add(e));
            }),
            this.Wn.getOverlays(e, r).next((e) => {
              e.forEach((e, t) => {
                n.set(e, t);
              });
            })
          );
        }
        Zn(e, t, r, s) {
          let i = ua;
          const a = fa(),
            o = fa();
          return (
            t.forEach((e, t) => {
              const n = r.get(t.key);
              s.has(t.key) && (void 0 === n || n.mutation instanceof Ji)
                ? (i = i.insert(t.key, t))
                : void 0 !== n &&
                  (a.set(t.key, n.mutation.getFieldMask()),
                  Qi(n.mutation, t, n.mutation.getFieldMask(), Gr.now()));
            }),
            this.es(e, i).next(
              (e) => (
                e.forEach((e, t) => a.set(e, t)),
                t.forEach((e, t) => {
                  var n;
                  return o.set(
                    e,
                    new eh(
                      t,
                      null !== (n = a.get(e)) && void 0 !== n ? n : null
                    )
                  );
                }),
                o
              )
            )
          );
        }
        es(i, a) {
          const o = fa();
          let u = new Qr((e, t) => e - t),
            h = pa();
          return this.jn
            .getAllMutationBatchesAffectingDocumentKeys(i, a)
            .next((e) => {
              for (const r of e)
                r.keys().forEach((e) => {
                  var t,
                    n = a.get(e);
                  null !== n &&
                    ((t = o.get(e) || is.empty()),
                    (t = r.applyToLocalView(n, t)),
                    o.set(e, t),
                    (t = (u.get(r.batchId) || pa()).add(e)),
                    (u = u.insert(r.batchId, t)));
                });
            })
            .next(() => {
              const e = [],
                t = u.getReverseIterator();
              for (; t.hasNext(); ) {
                const u = t.getNext(),
                  n = u.key,
                  r = u.value,
                  s = da();
                r.forEach((e) => {
                  var t;
                  h.has(e) ||
                    (null !== (t = Wi(a.get(e), o.get(e))) && s.set(e, t),
                    (h = h.add(e)));
                }),
                  e.push(this.Wn.saveOverlays(i, n, s));
              }
              return xo.waitFor(e);
            })
            .next(() => o);
        }
        ns(t, e) {
          return this.Qn.getEntries(t, e).next((e) => this.es(t, e));
        }
        ss(e, t, n) {
          return (
            (r = t),
            vs.isDocumentKey(r.path) &&
            null === r.collectionGroup &&
            0 === r.filters.length
              ? this.rs(e, t.path)
              : wi(t)
              ? this.os(e, t, n)
              : this.us(e, t, n)
          );
          var r;
        }
        rs(e, t) {
          return this.zn(e, new vs(t)).next((e) => {
            let t = ca();
            return e.isFoundDocument() && (t = t.insert(e.key, e)), t;
          });
        }
        os(r, s, i) {
          const a = s.collectionGroup;
          let o = ca();
          return this.indexManager.getCollectionParents(r, a).next((e) =>
            xo
              .forEach(e, (e) => {
                var t,
                  n =
                    ((t = s),
                    (e = e.child(a)),
                    new gi(
                      e,
                      null,
                      t.explicitOrderBy.slice(),
                      t.filters.slice(),
                      t.limit,
                      t.limitType,
                      t.startAt,
                      t.endAt
                    ));
                return this.us(r, n, i).next((e) => {
                  e.forEach((e, t) => {
                    o = o.insert(e, t);
                  });
                });
              })
              .next(() => o)
          );
        }
        us(t, i, n) {
          let a;
          return this.Qn.getAllFromCollection(t, i.path, n)
            .next(
              (e) => (
                (a = e),
                this.Wn.getOverlaysForCollection(t, i.path, n.largestBatchId)
              )
            )
            .next((r) => {
              r.forEach((e, t) => {
                var n = t.getKey();
                null === a.get(n) &&
                  (a = a.insert(n, Ps.newInvalidDocument(n)));
              });
              let s = ca();
              return (
                a.forEach((e, t) => {
                  var n = r.get(e);
                  void 0 !== n && Qi(n.mutation, t, is.empty(), Gr.now()),
                    Ai(i, t) && (s = s.insert(e, t));
                }),
                s
              );
            });
        }
        Hn(e, t, n) {
          return null === n || n.mutation instanceof Ji
            ? this.Qn.getEntry(e, t)
            : xo.resolve(Ps.newInvalidDocument(t));
        }
      }
      class nh {
        constructor(e) {
          (this.O = e), (this.cs = new Map()), (this.hs = new Map());
        }
        getBundleMetadata(e, t) {
          return xo.resolve(this.cs.get(t));
        }
        saveBundleMetadata(e, t) {
          return (
            this.cs.set(t.id, {
              id: t.id,
              version: t.version,
              createTime: Ra(t.createTime),
            }),
            xo.resolve()
          );
        }
        getNamedQuery(e, t) {
          return xo.resolve(this.hs.get(t));
        }
        saveNamedQuery(e, t) {
          return (
            this.hs.set(t.name, {
              name: (t = t).name,
              query: Jo(t.bundledQuery),
              readTime: Ra(t.readTime),
            }),
            xo.resolve()
          );
        }
      }
      class rh {
        constructor() {
          (this.overlays = new Qr(vs.comparator)), (this.ls = new Map());
        }
        getOverlay(e, t) {
          return xo.resolve(this.overlays.get(t));
        }
        getOverlays(e, t) {
          const n = la(),
            r = [];
          return (
            t.forEach((t) => {
              r.push(
                this.getOverlay(e, t).next((e) => {
                  null !== e && n.set(t, e);
                })
              );
            }),
            xo.waitFor(r).next(() => n)
          );
        }
        saveOverlays(n, r, e) {
          return (
            e.forEach((e, t) => {
              this.Xt(n, r, t);
            }),
            xo.resolve()
          );
        }
        removeOverlaysForBatchId(e, t, n) {
          const r = this.ls.get(n);
          return (
            void 0 !== r &&
              (r.forEach((e) => (this.overlays = this.overlays.remove(e))),
              this.ls.delete(n)),
            xo.resolve()
          );
        }
        getOverlaysForCollection(e, t, n) {
          const r = la(),
            s = t.length + 1,
            i = new vs(t.child("")),
            a = this.overlays.getIteratorFrom(i);
          for (; a.hasNext(); ) {
            const e = a.getNext().value,
              i = e.getKey();
            if (!t.isPrefixOf(i.path)) break;
            i.path.length === s && e.largestBatchId > n && r.set(e.getKey(), e);
          }
          return xo.resolve(r);
        }
        getOverlaysForCollectionGroup(t, e, n, r) {
          let s = new Qr((e, t) => e - t);
          const i = this.overlays.getIterator();
          for (; i.hasNext(); ) {
            const t = i.getNext().value;
            if (t.getKey().getCollectionGroup() === e && t.largestBatchId > n) {
              let e = s.get(t.largestBatchId);
              null === e && ((e = la()), (s = s.insert(t.largestBatchId, e))),
                e.set(t.getKey(), t);
            }
          }
          const a = la(),
            o = s.getIterator();
          for (
            ;
            o.hasNext() &&
            (o.getNext().value.forEach((e, t) => a.set(e, t)),
            !(a.size() >= r));

          );
          return xo.resolve(a);
        }
        Xt(e, t, n) {
          var r = this.overlays.get(n.key);
          if (null !== r) {
            const e = this.ls.get(r.largestBatchId).delete(n.key);
            this.ls.set(r.largestBatchId, e);
          }
          this.overlays = this.overlays.insert(n.key, new jo(t, n));
          let s = this.ls.get(t);
          void 0 === s && ((s = pa()), this.ls.set(t, s)),
            this.ls.set(t, s.add(n.key));
        }
      }
      class sh {
        constructor() {
          (this.fs = new Jr(ih.ds)), (this._s = new Jr(ih.ws));
        }
        isEmpty() {
          return this.fs.isEmpty();
        }
        addReference(e, t) {
          var n = new ih(e, t);
          (this.fs = this.fs.add(n)), (this._s = this._s.add(n));
        }
        gs(e, t) {
          e.forEach((e) => this.addReference(e, t));
        }
        removeReference(e, t) {
          this.ys(new ih(e, t));
        }
        ps(e, t) {
          e.forEach((e) => this.removeReference(e, t));
        }
        Is(e) {
          const t = new vs(new ns([])),
            n = new ih(t, e),
            r = new ih(t, e + 1),
            s = [];
          return (
            this._s.forEachInRange([n, r], (e) => {
              this.ys(e), s.push(e.key);
            }),
            s
          );
        }
        Ts() {
          this.fs.forEach((e) => this.ys(e));
        }
        ys(e) {
          (this.fs = this.fs.delete(e)), (this._s = this._s.delete(e));
        }
        Es(e) {
          var t = new vs(new ns([])),
            n = new ih(t, e),
            t = new ih(t, e + 1);
          let r = pa();
          return (
            this._s.forEachInRange([n, t], (e) => {
              r = r.add(e.key);
            }),
            r
          );
        }
        containsKey(e) {
          var t = new ih(e, 0),
            t = this.fs.firstAfterOrEqual(t);
          return null !== t && e.isEqual(t.key);
        }
      }
      class ih {
        constructor(e, t) {
          (this.key = e), (this.As = t);
        }
        static ds(e, t) {
          return vs.comparator(e.key, t.key) || qr(e.As, t.As);
        }
        static ws(e, t) {
          return qr(e.As, t.As) || vs.comparator(e.key, t.key);
        }
      }
      class ah {
        constructor(e, t) {
          (this.indexManager = e),
            (this.referenceDelegate = t),
            (this.jn = []),
            (this.Rs = 1),
            (this.Ps = new Jr(ih.ds));
        }
        checkEmpty(e) {
          return xo.resolve(0 === this.jn.length);
        }
        addMutationBatch(e, t, n, r) {
          var s = this.Rs;
          this.Rs++, 0 < this.jn.length && this.jn[this.jn.length - 1];
          var i = new Bo(s, t, n, r);
          this.jn.push(i);
          for (const t of r)
            (this.Ps = this.Ps.add(new ih(t.key, s))),
              this.indexManager.addToCollectionParentIndex(
                e,
                t.key.path.popLast()
              );
          return xo.resolve(i);
        }
        lookupMutationBatch(e, t) {
          return xo.resolve(this.bs(t));
        }
        getNextMutationBatchAfterBatchId(e, t) {
          var n = this.Vs(t + 1),
            n = n < 0 ? 0 : n;
          return xo.resolve(this.jn.length > n ? this.jn[n] : null);
        }
        getHighestUnacknowledgedBatchId() {
          return xo.resolve(0 === this.jn.length ? -1 : this.Rs - 1);
        }
        getAllMutationBatches(e) {
          return xo.resolve(this.jn.slice());
        }
        getAllMutationBatchesAffectingDocumentKey(e, t) {
          const n = new ih(t, 0),
            r = new ih(t, Number.POSITIVE_INFINITY),
            s = [];
          return (
            this.Ps.forEachInRange([n, r], (e) => {
              var t = this.bs(e.As);
              s.push(t);
            }),
            xo.resolve(s)
          );
        }
        getAllMutationBatchesAffectingDocumentKeys(e, t) {
          let r = new Jr(qr);
          return (
            t.forEach((e) => {
              var t = new ih(e, 0),
                n = new ih(e, Number.POSITIVE_INFINITY);
              this.Ps.forEachInRange([t, n], (e) => {
                r = r.add(e.As);
              });
            }),
            xo.resolve(this.vs(r))
          );
        }
        getAllMutationBatchesAffectingQuery(e, t) {
          const n = t.path,
            r = n.length + 1;
          let s = n;
          vs.isDocumentKey(s) || (s = s.child(""));
          var i = new ih(new vs(s), 0);
          let a = new Jr(qr);
          return (
            this.Ps.forEachWhile((e) => {
              var t = e.key.path;
              return (
                !!n.isPrefixOf(t) && (t.length === r && (a = a.add(e.As)), !0)
              );
            }, i),
            xo.resolve(this.vs(a))
          );
        }
        vs(e) {
          const n = [];
          return (
            e.forEach((e) => {
              var t = this.bs(e);
              null !== t && n.push(t);
            }),
            n
          );
        }
        removeMutationBatch(n, r) {
          Dr(0 === this.Ss(r.batchId, "removed")), this.jn.shift();
          let s = this.Ps;
          return xo
            .forEach(r.mutations, (e) => {
              var t = new ih(e.key, r.batchId);
              return (
                (s = s.delete(t)),
                this.referenceDelegate.markPotentiallyOrphaned(n, e.key)
              );
            })
            .next(() => {
              this.Ps = s;
            });
        }
        _n(e) {}
        containsKey(e, t) {
          var n = new ih(t, 0),
            n = this.Ps.firstAfterOrEqual(n);
          return xo.resolve(t.isEqual(n && n.key));
        }
        performConsistencyCheck(e) {
          return this.jn.length, xo.resolve();
        }
        Ss(e, t) {
          return this.Vs(e);
        }
        Vs(e) {
          return 0 === this.jn.length ? 0 : e - this.jn[0].batchId;
        }
        bs(e) {
          var t = this.Vs(e);
          return t < 0 || t >= this.jn.length ? null : this.jn[t];
        }
      }
      class oh {
        constructor(e) {
          (this.Ds = e), (this.docs = new Qr(vs.comparator)), (this.size = 0);
        }
        setIndexManager(e) {
          this.indexManager = e;
        }
        addEntry(e, t) {
          const n = t.key,
            r = this.docs.get(n),
            s = r ? r.size : 0,
            i = this.Ds(t);
          return (
            (this.docs = this.docs.insert(n, {
              document: t.mutableCopy(),
              size: i,
            })),
            (this.size += i - s),
            this.indexManager.addToCollectionParentIndex(e, n.path.popLast())
          );
        }
        removeEntry(e) {
          var t = this.docs.get(e);
          t && ((this.docs = this.docs.remove(e)), (this.size -= t.size));
        }
        getEntry(e, t) {
          const n = this.docs.get(t);
          return xo.resolve(
            n ? n.document.mutableCopy() : Ps.newInvalidDocument(t)
          );
        }
        getEntries(e, t) {
          let n = ua;
          return (
            t.forEach((e) => {
              const t = this.docs.get(e);
              n = n.insert(
                e,
                t ? t.document.mutableCopy() : Ps.newInvalidDocument(e)
              );
            }),
            xo.resolve(n)
          );
        }
        getAllFromCollection(e, t, n) {
          let r = ua;
          const s = new vs(t.child("")),
            i = this.docs.getIteratorFrom(s);
          for (; i.hasNext(); ) {
            const {
              key: e,
              value: { document: s },
            } = i.getNext();
            if (!t.isPrefixOf(e.path)) break;
            e.path.length > t.length + 1 ||
              zs(((a = s), new $s(a.readTime, a.key, -1)), n) <= 0 ||
              (r = r.insert(s.key, s.mutableCopy()));
          }
          var a;
          return xo.resolve(r);
        }
        getAllFromCollectionGroup(e, t, n, r) {
          Ar();
        }
        Cs(e, t) {
          return xo.forEach(this.docs, (e) => t(e));
        }
        newChangeBuffer(e) {
          return new uh(this);
        }
        getSize(e) {
          return xo.resolve(this.size);
        }
      }
      class uh extends $u {
        constructor(e) {
          super(), (this.Kn = e);
        }
        applyChanges(n) {
          const r = [];
          return (
            this.changes.forEach((e, t) => {
              t.isValidDocument()
                ? r.push(this.Kn.addEntry(n, t))
                : this.Kn.removeEntry(e);
            }),
            xo.waitFor(r)
          );
        }
        getFromCache(e, t) {
          return this.Kn.getEntry(e, t);
        }
        getAllFromCache(e, t) {
          return this.Kn.getEntries(e, t);
        }
      }
      class hh {
        constructor(e) {
          (this.persistence = e),
            (this.xs = new oa((e) => Qs(e), Ys)),
            (this.lastRemoteSnapshotVersion = $r.min()),
            (this.highestTargetId = 0),
            (this.Ns = 0),
            (this.ks = new sh()),
            (this.targetCount = 0),
            (this.Os = Ou.gn());
        }
        forEachTarget(e, n) {
          return this.xs.forEach((e, t) => n(t)), xo.resolve();
        }
        getLastRemoteSnapshotVersion(e) {
          return xo.resolve(this.lastRemoteSnapshotVersion);
        }
        getHighestSequenceNumber(e) {
          return xo.resolve(this.Ns);
        }
        allocateTargetId(e) {
          return (
            (this.highestTargetId = this.Os.next()),
            xo.resolve(this.highestTargetId)
          );
        }
        setTargetsMetadata(e, t, n) {
          return (
            n && (this.lastRemoteSnapshotVersion = n),
            t > this.Ns && (this.Ns = t),
            xo.resolve()
          );
        }
        Tn(e) {
          this.xs.set(e.target, e);
          var t = e.targetId;
          t > this.highestTargetId &&
            ((this.Os = new Ou(t)), (this.highestTargetId = t)),
            e.sequenceNumber > this.Ns && (this.Ns = e.sequenceNumber);
        }
        addTargetData(e, t) {
          return this.Tn(t), (this.targetCount += 1), xo.resolve();
        }
        updateTargetData(e, t) {
          return this.Tn(t), xo.resolve();
        }
        removeTargetData(e, t) {
          return (
            this.xs.delete(t.target),
            this.ks.Is(t.targetId),
            --this.targetCount,
            xo.resolve()
          );
        }
        removeTargets(n, r, s) {
          let i = 0;
          const a = [];
          return (
            this.xs.forEach((e, t) => {
              t.sequenceNumber <= r &&
                null === s.get(t.targetId) &&
                (this.xs.delete(e),
                a.push(this.removeMatchingKeysForTargetId(n, t.targetId)),
                i++);
            }),
            xo.waitFor(a).next(() => i)
          );
        }
        getTargetCount(e) {
          return xo.resolve(this.targetCount);
        }
        getTargetData(e, t) {
          var n = this.xs.get(t) || null;
          return xo.resolve(n);
        }
        addMatchingKeys(e, t, n) {
          return this.ks.gs(t, n), xo.resolve();
        }
        removeMatchingKeys(t, e, n) {
          this.ks.ps(e, n);
          const r = this.persistence.referenceDelegate,
            s = [];
          return (
            r &&
              e.forEach((e) => {
                s.push(r.markPotentiallyOrphaned(t, e));
              }),
            xo.waitFor(s)
          );
        }
        removeMatchingKeysForTargetId(e, t) {
          return this.ks.Is(t), xo.resolve();
        }
        getMatchingKeysForTargetId(e, t) {
          var n = this.ks.Es(t);
          return xo.resolve(n);
        }
        containsKey(e, t) {
          return xo.resolve(this.ks.containsKey(t));
        }
      }
      class ch {
        constructor(e, t) {
          (this.Ms = {}),
            (this.overlays = {}),
            (this.Fs = new Ur(0)),
            (this.$s = !1),
            (this.$s = !0),
            (this.referenceDelegate = e(this)),
            (this.Bs = new hh(this)),
            (this.indexManager = new pu()),
            (this.Qn = ((e = (e) => this.referenceDelegate.Ls(e)), new oh(e))),
            (this.O = new Go(t)),
            (this.Us = new nh(this.O));
        }
        start() {
          return Promise.resolve();
        }
        shutdown() {
          return (this.$s = !1), Promise.resolve();
        }
        get started() {
          return this.$s;
        }
        setDatabaseDeletedListener() {}
        setNetworkEnabled() {}
        getIndexManager(e) {
          return this.indexManager;
        }
        getDocumentOverlayCache(e) {
          let t = this.overlays[e.toKey()];
          return t || ((t = new rh()), (this.overlays[e.toKey()] = t)), t;
        }
        getMutationQueue(e, t) {
          let n = this.Ms[e.toKey()];
          return (
            n ||
              ((n = new ah(t, this.referenceDelegate)),
              (this.Ms[e.toKey()] = n)),
            n
          );
        }
        getTargetCache() {
          return this.Bs;
        }
        getRemoteDocumentCache() {
          return this.Qn;
        }
        getBundleCache() {
          return this.Us;
        }
        runTransaction(e, t, n) {
          Er("MemoryPersistence", "Starting transaction:", e);
          const r = new lh(this.Fs.next());
          return (
            this.referenceDelegate.qs(),
            n(r)
              .next((e) => this.referenceDelegate.Ks(r).next(() => e))
              .toPromise()
              .then((e) => (r.raiseOnCommittedEvent(), e))
          );
        }
        Gs(t, n) {
          return xo.or(
            Object.values(this.Ms).map((e) => () => e.containsKey(t, n))
          );
        }
      }
      class lh extends Do {
        constructor(e) {
          super(), (this.currentSequenceNumber = e);
        }
      }
      class dh {
        constructor(e) {
          (this.persistence = e), (this.Qs = new sh()), (this.js = null);
        }
        static Ws(e) {
          return new dh(e);
        }
        get zs() {
          if (this.js) return this.js;
          throw Ar();
        }
        addReference(e, t, n) {
          return (
            this.Qs.addReference(n, t),
            this.zs.delete(n.toString()),
            xo.resolve()
          );
        }
        removeReference(e, t, n) {
          return (
            this.Qs.removeReference(n, t),
            this.zs.add(n.toString()),
            xo.resolve()
          );
        }
        markPotentiallyOrphaned(e, t) {
          return this.zs.add(t.toString()), xo.resolve();
        }
        removeTarget(e, t) {
          this.Qs.Is(t.targetId).forEach((e) => this.zs.add(e.toString()));
          const n = this.persistence.getTargetCache();
          return n
            .getMatchingKeysForTargetId(e, t.targetId)
            .next((e) => {
              e.forEach((e) => this.zs.add(e.toString()));
            })
            .next(() => n.removeTargetData(e, t));
        }
        qs() {
          this.js = new Set();
        }
        Ks(n) {
          const r = this.persistence.getRemoteDocumentCache().newChangeBuffer();
          return xo
            .forEach(this.zs, (e) => {
              const t = vs.fromPath(e);
              return this.Hs(n, t).next((e) => {
                e || r.removeEntry(t, $r.min());
              });
            })
            .next(() => ((this.js = null), r.apply(n)));
        }
        updateLimboDocument(e, t) {
          return this.Hs(e, t).next((e) => {
            e ? this.zs.delete(t.toString()) : this.zs.add(t.toString());
          });
        }
        Ls(e) {
          return 0;
        }
        Hs(e, t) {
          return xo.or([
            () => xo.resolve(this.Qs.containsKey(t)),
            () => this.persistence.getTargetCache().containsKey(e, t),
            () => this.persistence.Gs(e, t),
          ]);
        }
      }
      class fh {
        constructor(e) {
          this.O = e;
        }
        kt(t, e, n, r) {
          const s = new No("createOrUpgrade", e);
          var i;
          n < 1 &&
            1 <= r &&
            (t.createObjectStore("owner"),
            (i = t).createObjectStore("mutationQueues", { keyPath: "userId" }),
            i
              .createObjectStore("mutations", {
                keyPath: "batchId",
                autoIncrement: !0,
              })
              .createIndex("userMutationsIndex", no, { unique: !0 }),
            i.createObjectStore("documentMutations"),
            gh(t),
            t.createObjectStore("remoteDocuments"));
          let a = xo.resolve();
          return (
            n < 3 &&
              3 <= r &&
              (0 !== n &&
                ((i = t).deleteObjectStore("targetDocuments"),
                i.deleteObjectStore("targets"),
                i.deleteObjectStore("targetGlobal"),
                gh(t)),
              (a = a.next(() =>
                (function () {
                  const e = s.store("targetGlobal"),
                    t = {
                      highestTargetId: 0,
                      highestListenSequenceNumber: 0,
                      lastRemoteSnapshotVersion: $r.min().toTimestamp(),
                      targetCount: 0,
                    };
                  return e.put("targetGlobalKey", t);
                })()
              ))),
            n < 4 &&
              4 <= r &&
              (0 !== n &&
                (a = a.next(() =>
                  (function (r, s) {
                    return s
                      .store("mutations")
                      .qt()
                      .next((e) => {
                        r.deleteObjectStore("mutations"),
                          r
                            .createObjectStore("mutations", {
                              keyPath: "batchId",
                              autoIncrement: !0,
                            })
                            .createIndex("userMutationsIndex", no, {
                              unique: !0,
                            });
                        const t = s.store("mutations"),
                          n = e.map((e) => t.put(e));
                        return xo.waitFor(n);
                      });
                  })(t, s)
                )),
              (a = a.next(() => {
                t.createObjectStore("clientMetadata", { keyPath: "clientId" });
              }))),
            n < 5 && 5 <= r && (a = a.next(() => this.Js(s))),
            n < 6 &&
              6 <= r &&
              (a = a.next(
                () => (t.createObjectStore("remoteDocumentGlobal"), this.Ys(s))
              )),
            n < 7 && 7 <= r && (a = a.next(() => this.Xs(s))),
            n < 8 && 8 <= r && (a = a.next(() => this.Zs(t, s))),
            n < 9 &&
              9 <= r &&
              (a = a.next(() => {
                var e;
                (e = t).objectStoreNames.contains("remoteDocumentChanges") &&
                  e.deleteObjectStore("remoteDocumentChanges");
              })),
            n < 10 && 10 <= r && (a = a.next(() => this.ti(s))),
            n < 11 &&
              11 <= r &&
              (a = a.next(() => {
                t.createObjectStore("bundles", { keyPath: "bundleId" }),
                  t.createObjectStore("namedQueries", { keyPath: "name" });
              })),
            n < 12 &&
              12 <= r &&
              (a = a.next(() => {
                !(function () {
                  const e = t.createObjectStore("documentOverlays", {
                    keyPath: vo,
                  });
                  e.createIndex("collectionPathOverlayIndex", wo, {
                    unique: !1,
                  }),
                    e.createIndex("collectionGroupOverlayIndex", bo, {
                      unique: !1,
                    });
                })();
              })),
            n < 13 &&
              13 <= r &&
              (a = a
                .next(() =>
                  (function () {
                    const e = t.createObjectStore("remoteDocumentsV14", {
                      keyPath: ao,
                    });
                    e.createIndex("documentKeyIndex", oo),
                      e.createIndex("collectionGroupIndex", uo);
                  })()
                )
                .next(() => this.ei(t, s))
                .next(() => t.deleteObjectStore("remoteDocuments"))),
            n < 14 && 14 <= r && (a = a.next(() => this.ni(t, s))),
            n < 15 &&
              15 <= r &&
              (a = a.next(() =>
                (function (e) {
                  e
                    .createObjectStore("indexConfiguration", {
                      keyPath: "indexId",
                      autoIncrement: !0,
                    })
                    .createIndex("collectionGroupIndex", "collectionGroup", {
                      unique: !1,
                    }),
                    e
                      .createObjectStore("indexState", { keyPath: go })
                      .createIndex("sequenceNumberIndex", mo, { unique: !1 }),
                    e
                      .createObjectStore("indexEntries", { keyPath: po })
                      .createIndex("documentKeyIndex", yo, { unique: !1 });
                })(t)
              )),
            a
          );
        }
        Ys(t) {
          let n = 0;
          return t
            .store("remoteDocuments")
            .Wt((e, t) => {
              n += Du(t);
            })
            .next(() => {
              var e = { byteSize: n };
              return t
                .store("remoteDocumentGlobal")
                .put("remoteDocumentGlobalKey", e);
            });
        }
        Js(r) {
          const e = r.store("mutationQueues"),
            t = r.store("mutations");
          return e.qt().next((e) =>
            xo.forEach(e, (n) => {
              var e = IDBKeyRange.bound(
                [n.userId, -1],
                [n.userId, n.lastAcknowledgedBatchId]
              );
              return t.qt("userMutationsIndex", e).next((e) =>
                xo.forEach(e, (e) => {
                  Dr(e.userId === n.userId);
                  var t = Qo(this.O, e);
                  return Au(r, n.userId, t).next(() => {});
                })
              );
            })
          );
        }
        Xs(e) {
          const a = e.store("targetDocuments"),
            t = e.store("remoteDocuments");
          return e
            .store("targetGlobal")
            .get("targetGlobalKey")
            .next((s) => {
              const i = [];
              return t
                .Wt((e, t) => {
                  const n = new ns(e),
                    r = [0, Za(n)];
                  i.push(
                    a.get(r).next((e) =>
                      e
                        ? xo.resolve()
                        : ((e) =>
                            a.put({
                              targetId: 0,
                              path: Za(e),
                              sequenceNumber: s.highestListenSequenceNumber,
                            }))(n)
                    )
                  );
                })
                .next(() => xo.waitFor(i));
            });
        }
        Zs(e, t) {
          e.createObjectStore("collectionParents", { keyPath: fo });
          const n = t.store("collectionParents"),
            r = new yu(),
            s = (e) => {
              if (r.add(e)) {
                const t = e.lastSegment(),
                  r = e.popLast();
                return n.put({ collectionId: t, parent: Za(r) });
              }
            };
          return t
            .store("remoteDocuments")
            .Wt({ jt: !0 }, (e, t) => {
              const n = new ns(e);
              return s(n.popLast());
            })
            .next(() =>
              t.store("documentMutations").Wt({ jt: !0 }, ([, e], t) => {
                const n = to(e);
                return s(n.popLast());
              })
            );
        }
        ti(e) {
          const r = e.store("targets");
          return r.Wt((e, t) => {
            var n = Yo(t),
              n = Xo(this.O, n);
            return r.put(n);
          });
        }
        ei(e, i) {
          const t = i.store("remoteDocuments"),
            a = [];
          return t
            .Wt((e, t) => {
              const n = i.store("remoteDocumentsV14"),
                r = (
                  (s = t).document
                    ? new vs(ns.fromString(s.document.name).popFirst(5))
                    : s.noDocument
                    ? vs.fromSegments(s.noDocument.path)
                    : s.unknownDocument
                    ? vs.fromSegments(s.unknownDocument.path)
                    : Ar()
                ).path.toArray();
              var s = {
                prefixPath: r.slice(0, r.length - 2),
                collectionGroup: r[r.length - 2],
                documentId: r[r.length - 1],
                readTime: t.readTime || [0, 0],
                unknownDocument: t.unknownDocument,
                noDocument: t.noDocument,
                document: t.document,
                hasCommittedMutations: !!t.hasCommittedMutations,
              };
              a.push(n.put(s));
            })
            .next(() => xo.waitFor(a));
        }
        ni(e, o) {
          const t = o.store("mutations"),
            u = Wu(this.O),
            h = new ch(dh.Ws, this.O.Jt),
            c = [],
            r = new Map();
          return t
            .qt()
            .next((e) => {
              e.forEach((e) => {
                var t;
                let n =
                  null !== (t = r.get(e.userId)) && void 0 !== t ? t : pa();
                Qo(this.O, e)
                  .keys()
                  .forEach((e) => (n = n.add(e))),
                  r.set(e.userId, n);
              });
            })
            .next(() => {
              r.forEach((e, t) => {
                const n = new vr(t),
                  r = su.Yt(this.O, n),
                  s = h.getIndexManager(n),
                  i = xu.Yt(n, this.O, s, h.referenceDelegate),
                  a = new th(u, i, r, s);
                c.push(a.ns(new Po(o, Ur.A), e));
              });
            })
            .next(() => xo.waitFor(c));
        }
      }
      function gh(e) {
        e
          .createObjectStore("targetDocuments", { keyPath: co })
          .createIndex("documentTargetsIndex", lo, { unique: !0 }),
          e
            .createObjectStore("targets", { keyPath: "targetId" })
            .createIndex("queryTargetsIndex", ho, { unique: !0 }),
          e.createObjectStore("targetGlobal");
      }
      const mh =
        "Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";
      class ph {
        constructor(e, t, n, r, s, i, a, o, u, h, c = 14) {
          if (
            ((this.allowTabSynchronization = e),
            (this.persistenceKey = t),
            (this.clientId = n),
            (this.si = s),
            (this.window = i),
            (this.document = a),
            (this.ii = u),
            (this.ri = h),
            (this.oi = c),
            (this.Fs = null),
            (this.$s = !1),
            (this.isPrimary = !1),
            (this.networkEnabled = !0),
            (this.ui = null),
            (this.inForeground = !1),
            (this.ai = null),
            (this.ci = null),
            (this.hi = Number.NEGATIVE_INFINITY),
            (this.li = (e) => Promise.resolve()),
            !ph.vt())
          )
            throw new Nr(
              xr.UNIMPLEMENTED,
              "This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled."
            );
          (this.referenceDelegate = new Ku(this, r)),
            (this.fi = t + "main"),
            (this.O = new Go(o)),
            (this.di = new Co(this.fi, this.oi, new fh(this.O))),
            (this.Bs = new Lu(this.referenceDelegate, this.O)),
            (this.Qn = Wu(this.O)),
            (this.Us = new tu()),
            this.window && this.window.localStorage
              ? (this._i = this.window.localStorage)
              : ((this._i = null),
                !1 === h &&
                  Tr(
                    "IndexedDbPersistence",
                    "LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."
                  ));
        }
        start() {
          return this.wi()
            .then(() => {
              if (!this.isPrimary && !this.allowTabSynchronization)
                throw new Nr(xr.FAILED_PRECONDITION, mh);
              return (
                this.mi(),
                this.gi(),
                this.yi(),
                this.runTransaction(
                  "getHighestListenSequenceNumber",
                  "readonly",
                  (e) => this.Bs.getHighestSequenceNumber(e)
                )
              );
            })
            .then((e) => {
              this.Fs = new Ur(e, this.ii);
            })
            .then(() => {
              this.$s = !0;
            })
            .catch((e) => (this.di && this.di.close(), Promise.reject(e)));
        }
        pi(t) {
          return (
            (this.li = async (e) => {
              if (this.started) return t(e);
            }),
            t(this.isPrimary)
          );
        }
        setDatabaseDeletedListener(t) {
          this.di.Mt(async (e) => {
            null === e.newVersion && (await t());
          });
        }
        setNetworkEnabled(e) {
          this.networkEnabled !== e &&
            ((this.networkEnabled = e),
            this.si.enqueueAndForget(async () => {
              this.started && (await this.wi());
            }));
        }
        wi() {
          return this.runTransaction(
            "updateClientMetadataAndTryBecomePrimary",
            "readwrite",
            (t) =>
              vh(t)
                .put({
                  clientId: this.clientId,
                  updateTimeMs: Date.now(),
                  networkEnabled: this.networkEnabled,
                  inForeground: this.inForeground,
                })
                .next(() => {
                  if (this.isPrimary)
                    return this.Ii(t).next((e) => {
                      e ||
                        ((this.isPrimary = !1),
                        this.si.enqueueRetryable(() => this.li(!1)));
                    });
                })
                .next(() => this.Ti(t))
                .next((e) =>
                  this.isPrimary && !e
                    ? this.Ei(t).next(() => !1)
                    : !!e && this.Ai(t).next(() => !0)
                )
          )
            .catch((e) => {
              if (Oo(e))
                return (
                  Er(
                    "IndexedDbPersistence",
                    "Failed to extend owner lease: ",
                    e
                  ),
                  this.isPrimary
                );
              if (!this.allowTabSynchronization) throw e;
              return (
                Er(
                  "IndexedDbPersistence",
                  "Releasing owner lease after error during lease refresh",
                  e
                ),
                !1
              );
            })
            .then((e) => {
              this.isPrimary !== e &&
                this.si.enqueueRetryable(() => this.li(e)),
                (this.isPrimary = e);
            });
        }
        Ii(e) {
          return yh(e)
            .get("owner")
            .next((e) => xo.resolve(this.Ri(e)));
        }
        Pi(e) {
          return vh(e).delete(this.clientId);
        }
        async bi() {
          if (this.isPrimary && !this.Vi(this.hi, 18e5)) {
            this.hi = Date.now();
            var e = await this.runTransaction(
              "maybeGarbageCollectMultiClientState",
              "readwrite-primary",
              (e) => {
                const r = Uo(e, "clientMetadata");
                return r.qt().next((e) => {
                  const t = this.vi(e, 18e5),
                    n = e.filter((e) => -1 === t.indexOf(e));
                  return xo
                    .forEach(n, (e) => r.delete(e.clientId))
                    .next(() => n);
                });
              }
            ).catch(() => []);
            if (this._i)
              for (const t of e) this._i.removeItem(this.Si(t.clientId));
          }
        }
        yi() {
          this.ci = this.si.enqueueAfterDelay(
            "client_metadata_refresh",
            4e3,
            () =>
              this.wi()
                .then(() => this.bi())
                .then(() => this.yi())
          );
        }
        Ri(e) {
          return !!e && e.ownerId === this.clientId;
        }
        Ti(t) {
          return this.ri
            ? xo.resolve(!0)
            : yh(t)
                .get("owner")
                .next((e) => {
                  if (
                    null !== e &&
                    this.Vi(e.leaseTimestampMs, 5e3) &&
                    !this.Di(e.ownerId)
                  ) {
                    if (this.Ri(e) && this.networkEnabled) return !0;
                    if (!this.Ri(e)) {
                      if (!e.allowTabSynchronization)
                        throw new Nr(xr.FAILED_PRECONDITION, mh);
                      return !1;
                    }
                  }
                  return (
                    !(!this.networkEnabled || !this.inForeground) ||
                    vh(t)
                      .qt()
                      .next(
                        (e) =>
                          void 0 ===
                          this.vi(e, 5e3).find((e) => {
                            if (this.clientId !== e.clientId) {
                              var t = !this.networkEnabled && e.networkEnabled,
                                n = !this.inForeground && e.inForeground,
                                r = this.networkEnabled === e.networkEnabled;
                              if (t || (n && r)) return !0;
                            }
                            return !1;
                          })
                      )
                  );
                })
                .next(
                  (e) => (
                    this.isPrimary !== e &&
                      Er(
                        "IndexedDbPersistence",
                        `Client ${
                          e ? "is" : "is not"
                        } eligible for a primary lease.`
                      ),
                    e
                  )
                );
        }
        async shutdown() {
          (this.$s = !1),
            this.Ci(),
            this.ci && (this.ci.cancel(), (this.ci = null)),
            this.xi(),
            this.Ni(),
            await this.di.runTransaction(
              "shutdown",
              "readwrite",
              ["owner", "clientMetadata"],
              (e) => {
                const t = new Po(e, Ur.A);
                return this.Ei(t).next(() => this.Pi(t));
              }
            ),
            this.di.close(),
            this.ki();
        }
        vi(e, t) {
          return e.filter(
            (e) => this.Vi(e.updateTimeMs, t) && !this.Di(e.clientId)
          );
        }
        Oi() {
          return this.runTransaction("getActiveClients", "readonly", (e) =>
            vh(e)
              .qt()
              .next((e) => this.vi(e, 18e5).map((e) => e.clientId))
          );
        }
        get started() {
          return this.$s;
        }
        getMutationQueue(e, t) {
          return xu.Yt(e, this.O, t, this.referenceDelegate);
        }
        getTargetCache() {
          return this.Bs;
        }
        getRemoteDocumentCache() {
          return this.Qn;
        }
        getIndexManager(e) {
          return new wu(e, this.O.Jt.databaseId);
        }
        getDocumentOverlayCache(e) {
          return su.Yt(this.O, e);
        }
        getBundleCache() {
          return this.Us;
        }
        runTransaction(t, n, r) {
          Er("IndexedDbPersistence", "Starting transaction:", t);
          var e,
            s = "readonly" === n ? "readonly" : "readwrite",
            e =
              15 === (e = this.oi)
                ? So
                : 14 === e
                ? _o
                : 13 === e
                ? To
                : 12 === e
                ? Eo
                : 11 === e
                ? Io
                : void Ar();
          let i;
          return this.di
            .runTransaction(
              t,
              s,
              e,
              (e) => (
                (i = new Po(e, this.Fs ? this.Fs.next() : Ur.A)),
                "readwrite-primary" === n
                  ? this.Ii(i)
                      .next((e) => !!e || this.Ti(i))
                      .next((e) => {
                        if (!e)
                          throw (
                            (Tr(
                              `Failed to obtain primary lease for action '${t}'.`
                            ),
                            (this.isPrimary = !1),
                            this.si.enqueueRetryable(() => this.li(!1)),
                            new Nr(xr.FAILED_PRECONDITION, Ao))
                          );
                        return r(i);
                      })
                      .next((e) => this.Ai(i).next(() => e))
                  : this.Mi(i).next(() => r(i))
              )
            )
            .then((e) => (i.raiseOnCommittedEvent(), e));
        }
        Mi(e) {
          return yh(e)
            .get("owner")
            .next((e) => {
              if (
                null !== e &&
                this.Vi(e.leaseTimestampMs, 5e3) &&
                !this.Di(e.ownerId) &&
                !this.Ri(e) &&
                !(
                  this.ri ||
                  (this.allowTabSynchronization && e.allowTabSynchronization)
                )
              )
                throw new Nr(xr.FAILED_PRECONDITION, mh);
            });
        }
        Ai(e) {
          var t = {
            ownerId: this.clientId,
            allowTabSynchronization: this.allowTabSynchronization,
            leaseTimestampMs: Date.now(),
          };
          return yh(e).put("owner", t);
        }
        static vt() {
          return Co.vt();
        }
        Ei(e) {
          const t = yh(e);
          return t
            .get("owner")
            .next((e) =>
              this.Ri(e)
                ? (Er("IndexedDbPersistence", "Releasing primary lease."),
                  t.delete("owner"))
                : xo.resolve()
            );
        }
        Vi(e, t) {
          var n = Date.now();
          return !(
            e < n - t ||
            (n < e &&
              (Tr(`Detected an update time that is in the future: ${e} > ${n}`),
              1))
          );
        }
        mi() {
          null !== this.document &&
            "function" == typeof this.document.addEventListener &&
            ((this.ai = () => {
              this.si.enqueueAndForget(
                () => (
                  (this.inForeground =
                    "visible" === this.document.visibilityState),
                  this.wi()
                )
              );
            }),
            this.document.addEventListener("visibilitychange", this.ai),
            (this.inForeground = "visible" === this.document.visibilityState));
        }
        xi() {
          this.ai &&
            (this.document.removeEventListener("visibilitychange", this.ai),
            (this.ai = null));
        }
        gi() {
          var e;
          "function" ==
            typeof (null === (e = this.window) || void 0 === e
              ? void 0
              : e.addEventListener) &&
            ((this.ui = () => {
              this.Ci(),
                s() &&
                  navigator.appVersion.match(/Version\/1[45]/) &&
                  this.si.enterRestrictedMode(!0),
                this.si.enqueueAndForget(() => this.shutdown());
            }),
            this.window.addEventListener("pagehide", this.ui));
        }
        Ni() {
          this.ui &&
            (this.window.removeEventListener("pagehide", this.ui),
            (this.ui = null));
        }
        Di(e) {
          var t;
          try {
            var n =
              null !==
              (null === (t = this._i) || void 0 === t
                ? void 0
                : t.getItem(this.Si(e)));
            return (
              Er(
                "IndexedDbPersistence",
                `Client '${e}' ${n ? "is" : "is not"} zombied in LocalStorage`
              ),
              n
            );
          } catch (e) {
            return (
              Tr("IndexedDbPersistence", "Failed to get zombied client id.", e),
              !1
            );
          }
        }
        Ci() {
          if (this._i)
            try {
              this._i.setItem(this.Si(this.clientId), String(Date.now()));
            } catch (e) {
              Tr("Failed to set zombie client id.", e);
            }
        }
        ki() {
          if (this._i)
            try {
              this._i.removeItem(this.Si(this.clientId));
            } catch (e) {}
        }
        Si(e) {
          return `firestore_zombie_${this.persistenceKey}_${e}`;
        }
      }
      function yh(e) {
        return Uo(e, "owner");
      }
      function vh(e) {
        return Uo(e, "clientMetadata");
      }
      function wh(e, t) {
        let n = e.projectId;
        return (
          e.isDefaultDatabase || (n += "." + e.database),
          "firestore/" + t + "/" + n + "/"
        );
      }
      class bh {
        constructor(e, t, n, r) {
          (this.targetId = e),
            (this.fromCache = t),
            (this.Fi = n),
            (this.$i = r);
        }
        static Bi(e, t) {
          let n = pa(),
            r = pa();
          for (const e of t.docChanges)
            switch (e.type) {
              case 0:
                n = n.add(e.doc.key);
                break;
              case 1:
                r = r.add(e.doc.key);
            }
          return new bh(e, t.fromCache, n, r);
        }
      }
      class Ih {
        constructor() {
          this.Li = !1;
        }
        initialize(e, t) {
          (this.Ui = e), (this.indexManager = t), (this.Li = !0);
        }
        ss(t, n, r, s) {
          return this.qi(t, n)
            .next((e) => e || this.Ki(t, n, s, r))
            .next((e) => e || this.Gi(t, n));
        }
        qi(e, t) {
          return xo.resolve(null);
        }
        Ki(n, r, s, i) {
          return (0 === (e = r).filters.length &&
            null === e.limit &&
            null == e.startAt &&
            null == e.endAt &&
            (0 === e.explicitOrderBy.length ||
              (1 === e.explicitOrderBy.length &&
                e.explicitOrderBy[0].field.isKeyField()))) ||
            i.isEqual($r.min())
            ? this.Gi(n, r)
            : this.Ui.Jn(n, s).next((e) => {
                var t = this.Qi(r, e);
                return this.ji(r, t, s, i)
                  ? this.Gi(n, r)
                  : (Ir() <= l.DEBUG &&
                      Er(
                        "QueryEngine",
                        "Re-using previous result from %s to execute query: %s",
                        i.toString(),
                        Si(r)
                      ),
                    this.Wi(n, t, r, Gs(i, -1)));
              });
          var e;
        }
        Qi(n, e) {
          let r = new Jr(xi(n));
          return (
            e.forEach((e, t) => {
              Ai(n, t) && (r = r.add(t));
            }),
            r
          );
        }
        ji(e, t, n, r) {
          if (null === e.limit) return !1;
          if (n.size !== t.size) return !0;
          const s = "F" === e.limitType ? t.last() : t.first();
          return !!s && (s.hasPendingWrites || 0 < s.version.compareTo(r));
        }
        Gi(e, t) {
          return (
            Ir() <= l.DEBUG &&
              Er(
                "QueryEngine",
                "Using full collection scan to execute query:",
                Si(t)
              ),
            this.Ui.ss(e, t, $s.min())
          );
        }
        Wi(e, n, t, r) {
          return this.Ui.ss(e, t, r).next(
            (t) => (
              n.forEach((e) => {
                t = t.insert(e.key, e);
              }),
              t
            )
          );
        }
      }
      class Eh {
        constructor(e, t, n, r) {
          (this.persistence = e),
            (this.zi = t),
            (this.O = r),
            (this.Hi = new Qr(qr)),
            (this.Ji = new oa((e) => Qs(e), Ys)),
            (this.Yi = new Map()),
            (this.Xi = e.getRemoteDocumentCache()),
            (this.Bs = e.getTargetCache()),
            (this.Us = e.getBundleCache()),
            this.Zi(n);
        }
        Zi(e) {
          (this.Wn = this.persistence.getDocumentOverlayCache(e)),
            (this.indexManager = this.persistence.getIndexManager(e)),
            (this.jn = this.persistence.getMutationQueue(e, this.indexManager)),
            (this.tr = new th(this.Xi, this.jn, this.Wn, this.indexManager)),
            this.Xi.setIndexManager(this.indexManager),
            this.zi.initialize(this.tr, this.indexManager);
        }
        collectGarbage(t) {
          return this.persistence.runTransaction(
            "Collect garbage",
            "readwrite-primary",
            (e) => t.collect(e, this.Hi)
          );
        }
      }
      function Th(e, t, n, r) {
        return new Eh(e, t, n, r);
      }
      async function _h(e, t) {
        const a = e;
        return a.persistence.runTransaction(
          "Handle user change",
          "readonly",
          (s) => {
            let i;
            return a.jn
              .getAllMutationBatches(s)
              .next((e) => ((i = e), a.Zi(t), a.jn.getAllMutationBatches(s)))
              .next((e) => {
                const t = [],
                  n = [];
                let r = pa();
                for (const s of i) {
                  t.push(s.batchId);
                  for (const e of s.mutations) r = r.add(e.key);
                }
                for (const s of e) {
                  n.push(s.batchId);
                  for (const e of s.mutations) r = r.add(e.key);
                }
                return a.tr.Jn(s, r).next((e) => ({
                  er: e,
                  removedBatchIds: t,
                  addedBatchIds: n,
                }));
              });
          }
        );
      }
      function Sh(e) {
        const t = e;
        return t.persistence.runTransaction(
          "Get last remote snapshot version",
          "readonly",
          (e) => t.Bs.getLastRemoteSnapshotVersion(e)
        );
      }
      function Ah(e, h) {
        const c = e,
          l = h.snapshotVersion;
        let d = c.Hi;
        return c.persistence
          .runTransaction("Apply remote event", "readwrite-primary", (o) => {
            const e = c.Xi.newChangeBuffer({ trackRemovals: !0 });
            d = c.Hi;
            const u = [];
            h.targetChanges.forEach((t, n) => {
              const r = d.get(n);
              if (r) {
                u.push(
                  c.Bs.removeMatchingKeys(o, t.removedDocuments, n).next(() =>
                    c.Bs.addMatchingKeys(o, t.addedDocuments, n)
                  )
                );
                let e = r.withSequenceNumber(o.currentSequenceNumber);
                var s, i, a;
                h.targetMismatches.has(n)
                  ? (e = e
                      .withResumeToken(as.EMPTY_BYTE_STRING, $r.min())
                      .withLastLimboFreeSnapshotVersion($r.min()))
                  : 0 < t.resumeToken.approximateByteSize() &&
                    (e = e.withResumeToken(t.resumeToken, l)),
                  (d = d.insert(n, e)),
                  (s = r),
                  (i = e),
                  (a = t),
                  (0 !== s.resumeToken.approximateByteSize() &&
                    !(
                      3e8 <=
                        i.snapshotVersion.toMicroseconds() -
                          s.snapshotVersion.toMicroseconds() ||
                      0 <
                        a.addedDocuments.size +
                          a.modifiedDocuments.size +
                          a.removedDocuments.size
                    )) ||
                    u.push(c.Bs.updateTargetData(o, e));
              }
            });
            let t = ua,
              n = pa();
            if (
              (h.documentUpdates.forEach((e) => {
                h.resolvedLimboDocuments.has(e) &&
                  u.push(
                    c.persistence.referenceDelegate.updateLimboDocument(o, e)
                  );
              }),
              u.push(
                Dh(o, e, h.documentUpdates).next((e) => {
                  (t = e.nr), (n = e.sr);
                })
              ),
              !l.isEqual($r.min()))
            ) {
              const h = c.Bs.getLastRemoteSnapshotVersion(o).next((e) =>
                c.Bs.setTargetsMetadata(o, o.currentSequenceNumber, l)
              );
              u.push(h);
            }
            return xo
              .waitFor(u)
              .next(() => e.apply(o))
              .next(() => c.tr.Yn(o, t, n))
              .next(() => t);
          })
          .then((e) => ((c.Hi = d), e));
      }
      function Dh(e, i, t) {
        let n = pa(),
          a = pa();
        return (
          t.forEach((e) => (n = n.add(e))),
          i.getEntries(e, n).next((r) => {
            let s = ua;
            return (
              t.forEach((e, t) => {
                const n = r.get(e);
                t.isFoundDocument() !== n.isFoundDocument() && (a = a.add(e)),
                  t.isNoDocument() && t.version.isEqual($r.min())
                    ? (i.removeEntry(e, t.readTime), (s = s.insert(e, t)))
                    : !n.isValidDocument() ||
                      0 < t.version.compareTo(n.version) ||
                      (0 === t.version.compareTo(n.version) &&
                        n.hasPendingWrites)
                    ? (i.addEntry(t), (s = s.insert(e, t)))
                    : Er(
                        "LocalStore",
                        "Ignoring outdated watch update for ",
                        e,
                        ". Current version:",
                        n.version,
                        " Watch version:",
                        t.version
                      );
              }),
              { nr: s, sr: a }
            );
          })
        );
      }
      function xh(e, r) {
        const s = e;
        return s.persistence
          .runTransaction("Allocate target", "readwrite", (t) => {
            let n;
            return s.Bs.getTargetData(t, r).next((e) =>
              e
                ? ((n = e), xo.resolve(n))
                : s.Bs.allocateTargetId(t).next(
                    (e) => (
                      (n = new Ko(r, e, 0, t.currentSequenceNumber)),
                      s.Bs.addTargetData(t, n).next(() => n)
                    )
                  )
            );
          })
          .then((e) => {
            var t = s.Hi.get(e.targetId);
            return (
              (null === t ||
                0 < e.snapshotVersion.compareTo(t.snapshotVersion)) &&
                ((s.Hi = s.Hi.insert(e.targetId, e)), s.Ji.set(r, e.targetId)),
              e
            );
          });
      }
      async function Nh(e, t, n) {
        const r = e,
          s = r.Hi.get(t),
          i = n ? "readwrite" : "readwrite-primary";
        try {
          n ||
            (await r.persistence.runTransaction("Release target", i, (e) =>
              r.persistence.referenceDelegate.removeTarget(e, s)
            ));
        } catch (e) {
          if (!Oo(e)) throw e;
          Er(
            "LocalStore",
            `Failed to update sequence numbers for target ${t}: ${e}`
          );
        }
        (r.Hi = r.Hi.remove(t)), r.Ji.delete(s.target);
      }
      function Ch(e, n, r) {
        const s = e;
        let i = $r.min(),
          a = pa();
        return s.persistence.runTransaction("Execute query", "readonly", (t) =>
          (function (e, t, n) {
            const r = e,
              s = r.Ji.get(n);
            return void 0 !== s
              ? xo.resolve(r.Hi.get(s))
              : r.Bs.getTargetData(t, n);
          })(s, t, Ii(n))
            .next((e) => {
              if (e)
                return (
                  (i = e.lastLimboFreeSnapshotVersion),
                  s.Bs.getMatchingKeysForTargetId(t, e.targetId).next((e) => {
                    a = e;
                  })
                );
            })
            .next(() => s.zi.ss(t, n, r ? i : $r.min(), r ? a : pa()))
            .next((e) => (Oh(s, Di(n), e), { documents: e, ir: a }))
        );
      }
      function kh(e, t) {
        const n = e,
          r = n.Bs,
          s = n.Hi.get(t);
        return s
          ? Promise.resolve(s.target)
          : n.persistence.runTransaction("Get target data", "readonly", (e) =>
              r.Et(e, t).next((e) => (e ? e.target : null))
            );
      }
      function Rh(e, t) {
        const n = e,
          r = n.Yi.get(t) || $r.min();
        return n.persistence
          .runTransaction("Get new document changes", "readonly", (e) =>
            n.Xi.getAllFromCollectionGroup(
              e,
              t,
              Gs(r, -1),
              Number.MAX_SAFE_INTEGER
            )
          )
          .then((e) => (Oh(n, t, e), e));
      }
      function Oh(e, t, n) {
        let r = $r.min();
        n.forEach((e, t) => {
          0 < t.readTime.compareTo(r) && (r = t.readTime);
        }),
          e.Yi.set(t, r);
      }
      function Lh(e, t) {
        return `firestore_clients_${e}_${t}`;
      }
      function Vh(e, t, n) {
        let r = `firestore_mutations_${e}_${n}`;
        return t.isAuthenticated() && (r += `_${t.uid}`), r;
      }
      function Mh(e, t) {
        return `firestore_targets_${e}_${t}`;
      }
      class Fh {
        constructor(e, t, n, r) {
          (this.user = e),
            (this.batchId = t),
            (this.state = n),
            (this.error = r);
        }
        static cr(e, t, n) {
          var r = JSON.parse(n);
          let s,
            i =
              "object" == typeof r &&
              -1 !== ["pending", "acknowledged", "rejected"].indexOf(r.state) &&
              (void 0 === r.error || "object" == typeof r.error);
          return (
            i &&
              r.error &&
              ((i =
                "string" == typeof r.error.message &&
                "string" == typeof r.error.code),
              i && (s = new Nr(r.error.code, r.error.message))),
            i
              ? new Fh(e, t, r.state, s)
              : (Tr(
                  "SharedClientState",
                  `Failed to parse mutation state for ID '${t}': ${n}`
                ),
                null)
          );
        }
        hr() {
          const e = { state: this.state, updateTimeMs: Date.now() };
          return (
            this.error &&
              (e.error = {
                code: this.error.code,
                message: this.error.message,
              }),
            JSON.stringify(e)
          );
        }
      }
      class Ph {
        constructor(e, t, n) {
          (this.targetId = e), (this.state = t), (this.error = n);
        }
        static cr(e, t) {
          var n = JSON.parse(t);
          let r,
            s =
              "object" == typeof n &&
              -1 !== ["not-current", "current", "rejected"].indexOf(n.state) &&
              (void 0 === n.error || "object" == typeof n.error);
          return (
            s &&
              n.error &&
              ((s =
                "string" == typeof n.error.message &&
                "string" == typeof n.error.code),
              s && (r = new Nr(n.error.code, n.error.message))),
            s
              ? new Ph(e, n.state, r)
              : (Tr(
                  "SharedClientState",
                  `Failed to parse target state for ID '${e}': ${t}`
                ),
                null)
          );
        }
        hr() {
          const e = { state: this.state, updateTimeMs: Date.now() };
          return (
            this.error &&
              (e.error = {
                code: this.error.code,
                message: this.error.message,
              }),
            JSON.stringify(e)
          );
        }
      }
      class Uh {
        constructor(e, t) {
          (this.clientId = e), (this.activeTargetIds = t);
        }
        static cr(e, t) {
          var n = JSON.parse(t);
          let r = "object" == typeof n && n.activeTargetIds instanceof Array,
            s = ya;
          for (let i = 0; r && i < n.activeTargetIds.length; ++i)
            (r = ys(n.activeTargetIds[i])), (s = s.add(n.activeTargetIds[i]));
          return r
            ? new Uh(e, s)
            : (Tr(
                "SharedClientState",
                `Failed to parse client data for instance '${e}': ${t}`
              ),
              null);
        }
      }
      class Bh {
        constructor(e, t) {
          (this.clientId = e), (this.onlineState = t);
        }
        static cr(e) {
          var t = JSON.parse(e);
          return "object" == typeof t &&
            -1 !== ["Unknown", "Online", "Offline"].indexOf(t.onlineState) &&
            "string" == typeof t.clientId
            ? new Bh(t.clientId, t.onlineState)
            : (Tr("SharedClientState", `Failed to parse online state: ${e}`),
              null);
        }
      }
      class qh {
        constructor() {
          this.activeTargetIds = ya;
        }
        lr(e) {
          this.activeTargetIds = this.activeTargetIds.add(e);
        }
        dr(e) {
          this.activeTargetIds = this.activeTargetIds.delete(e);
        }
        hr() {
          var e = {
            activeTargetIds: this.activeTargetIds.toArray(),
            updateTimeMs: Date.now(),
          };
          return JSON.stringify(e);
        }
      }
      class jh {
        constructor(e, t, n, r, s) {
          (this.window = e),
            (this.si = t),
            (this.persistenceKey = n),
            (this._r = r),
            (this.syncEngine = null),
            (this.onlineStateHandler = null),
            (this.sequenceNumberHandler = null),
            (this.wr = this.mr.bind(this)),
            (this.gr = new Qr(qr)),
            (this.started = !1),
            (this.yr = []);
          var i = n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          (this.storage = this.window.localStorage),
            (this.currentUser = s),
            (this.pr = Lh(this.persistenceKey, this._r)),
            (this.Ir = `firestore_sequence_number_${this.persistenceKey}`),
            (this.gr = this.gr.insert(this._r, new qh())),
            (this.Tr = new RegExp(`^firestore_clients_${i}_([^_]*)$`)),
            (this.Er = new RegExp(
              `^firestore_mutations_${i}_(\\d+)(?:_(.*))?$`
            )),
            (this.Ar = new RegExp(`^firestore_targets_${i}_(\\d+)$`)),
            (this.Rr = `firestore_online_state_${this.persistenceKey}`),
            (this.Pr = `firestore_bundle_loaded_v2_${this.persistenceKey}`),
            this.window.addEventListener("storage", this.wr);
        }
        static vt(e) {
          return !(!e || !e.localStorage);
        }
        async start() {
          const e = await this.syncEngine.Oi();
          for (const n of e)
            if (n !== this._r) {
              const e = this.getItem(Lh(this.persistenceKey, n));
              var t;
              !e ||
                ((t = Uh.cr(n, e)) &&
                  (this.gr = this.gr.insert(t.clientId, t)));
            }
          this.br();
          const n = this.storage.getItem(this.Rr);
          if (n) {
            const e = this.Vr(n);
            e && this.vr(e);
          }
          for (const e of this.yr) this.mr(e);
          (this.yr = []),
            this.window.addEventListener("pagehide", () => this.shutdown()),
            (this.started = !0);
        }
        writeSequenceNumber(e) {
          this.setItem(this.Ir, JSON.stringify(e));
        }
        getAllActiveQueryTargets() {
          return this.Sr(this.gr);
        }
        isActiveQueryTarget(n) {
          let r = !1;
          return (
            this.gr.forEach((e, t) => {
              t.activeTargetIds.has(n) && (r = !0);
            }),
            r
          );
        }
        addPendingMutation(e) {
          this.Dr(e, "pending");
        }
        updateMutationState(e, t, n) {
          this.Dr(e, t, n), this.Cr(e);
        }
        addLocalQueryTarget(e) {
          let t = "not-current";
          var n;
          return (
            this.isActiveQueryTarget(e) &&
              (!(n = this.storage.getItem(Mh(this.persistenceKey, e))) ||
                ((n = Ph.cr(e, n)) && (t = n.state))),
            this.Nr.lr(e),
            this.br(),
            t
          );
        }
        removeLocalQueryTarget(e) {
          this.Nr.dr(e), this.br();
        }
        isLocalQueryTarget(e) {
          return this.Nr.activeTargetIds.has(e);
        }
        clearQueryState(e) {
          this.removeItem(Mh(this.persistenceKey, e));
        }
        updateQueryState(e, t, n) {
          this.kr(e, t, n);
        }
        handleUserChange(e, t, n) {
          t.forEach((e) => {
            this.Cr(e);
          }),
            (this.currentUser = e),
            n.forEach((e) => {
              this.addPendingMutation(e);
            });
        }
        setOnlineState(e) {
          this.Or(e);
        }
        notifyBundleLoaded(e) {
          this.Mr(e);
        }
        shutdown() {
          this.started &&
            (this.window.removeEventListener("storage", this.wr),
            this.removeItem(this.pr),
            (this.started = !1));
        }
        getItem(e) {
          var t = this.storage.getItem(e);
          return Er("SharedClientState", "READ", e, t), t;
        }
        setItem(e, t) {
          Er("SharedClientState", "SET", e, t), this.storage.setItem(e, t);
        }
        removeItem(e) {
          Er("SharedClientState", "REMOVE", e), this.storage.removeItem(e);
        }
        mr(e) {
          const s = e;
          s.storageArea === this.storage &&
            (Er("SharedClientState", "EVENT", s.key, s.newValue),
            s.key !== this.pr
              ? this.si.enqueueRetryable(async () => {
                  if (this.started) {
                    if (null !== s.key)
                      if (this.Tr.test(s.key)) {
                        if (null == s.newValue) {
                          var e = this.Fr(s.key);
                          return this.$r(e, null);
                        }
                        e = this.Br(s.key, s.newValue);
                        if (e) return this.$r(e.clientId, e);
                      } else if (this.Er.test(s.key)) {
                        if (null !== s.newValue) {
                          var t = this.Lr(s.key, s.newValue);
                          if (t) return this.Ur(t);
                        }
                      } else if (this.Ar.test(s.key)) {
                        if (null !== s.newValue) {
                          t = this.qr(s.key, s.newValue);
                          if (t) return this.Kr(t);
                        }
                      } else if (s.key === this.Rr) {
                        if (null !== s.newValue) {
                          var n = this.Vr(s.newValue);
                          if (n) return this.vr(n);
                        }
                      } else if (s.key === this.Ir) {
                        n = (function (e) {
                          let t = Ur.A;
                          if (null != e)
                            try {
                              var n = JSON.parse(e);
                              Dr("number" == typeof n), (t = n);
                            } catch (e) {
                              Tr(
                                "SharedClientState",
                                "Failed to read sequence number from WebStorage",
                                e
                              );
                            }
                          return t;
                        })(s.newValue);
                        n !== Ur.A && this.sequenceNumberHandler(n);
                      } else if (s.key === this.Pr) {
                        const r = this.Gr(s.newValue);
                        await Promise.all(r.map((e) => this.syncEngine.Qr(e)));
                      }
                  } else this.yr.push(s);
                })
              : Tr(
                  "Received WebStorage notification for local change. Another client might have garbage-collected our state"
                ));
        }
        get Nr() {
          return this.gr.get(this._r);
        }
        br() {
          this.setItem(this.pr, this.Nr.hr());
        }
        Dr(e, t, n) {
          const r = new Fh(this.currentUser, e, t, n),
            s = Vh(this.persistenceKey, this.currentUser, e);
          this.setItem(s, r.hr());
        }
        Cr(e) {
          var t = Vh(this.persistenceKey, this.currentUser, e);
          this.removeItem(t);
        }
        Or(e) {
          var t = { clientId: this._r, onlineState: e };
          this.storage.setItem(this.Rr, JSON.stringify(t));
        }
        kr(e, t, n) {
          const r = Mh(this.persistenceKey, e),
            s = new Ph(e, t, n);
          this.setItem(r, s.hr());
        }
        Mr(e) {
          var t = JSON.stringify(Array.from(e));
          this.setItem(this.Pr, t);
        }
        Fr(e) {
          var t = this.Tr.exec(e);
          return t ? t[1] : null;
        }
        Br(e, t) {
          var n = this.Fr(e);
          return Uh.cr(n, t);
        }
        Lr(e, t) {
          var n = this.Er.exec(e),
            r = Number(n[1]),
            n = void 0 !== n[2] ? n[2] : null;
          return Fh.cr(new vr(n), r, t);
        }
        qr(e, t) {
          var n = this.Ar.exec(e),
            n = Number(n[1]);
          return Ph.cr(n, t);
        }
        Vr(e) {
          return Bh.cr(e);
        }
        Gr(e) {
          return JSON.parse(e);
        }
        async Ur(e) {
          if (e.user.uid === this.currentUser.uid)
            return this.syncEngine.jr(e.batchId, e.state, e.error);
          Er(
            "SharedClientState",
            `Ignoring mutation for non-active user ${e.user.uid}`
          );
        }
        Kr(e) {
          return this.syncEngine.Wr(e.targetId, e.state, e.error);
        }
        $r(e, t) {
          const n = t ? this.gr.insert(e, t) : this.gr.remove(e),
            r = this.Sr(this.gr),
            s = this.Sr(n),
            i = [],
            a = [];
          return (
            s.forEach((e) => {
              r.has(e) || i.push(e);
            }),
            r.forEach((e) => {
              s.has(e) || a.push(e);
            }),
            this.syncEngine.zr(i, a).then(() => {
              this.gr = n;
            })
          );
        }
        vr(e) {
          this.gr.get(e.clientId) && this.onlineStateHandler(e.onlineState);
        }
        Sr(e) {
          let n = ya;
          return (
            e.forEach((e, t) => {
              n = n.unionWith(t.activeTargetIds);
            }),
            n
          );
        }
      }
      class Kh {
        constructor() {
          (this.Hr = new qh()),
            (this.Jr = {}),
            (this.onlineStateHandler = null),
            (this.sequenceNumberHandler = null);
        }
        addPendingMutation(e) {}
        updateMutationState(e, t, n) {}
        addLocalQueryTarget(e) {
          return this.Hr.lr(e), this.Jr[e] || "not-current";
        }
        updateQueryState(e, t, n) {
          this.Jr[e] = t;
        }
        removeLocalQueryTarget(e) {
          this.Hr.dr(e);
        }
        isLocalQueryTarget(e) {
          return this.Hr.activeTargetIds.has(e);
        }
        clearQueryState(e) {
          delete this.Jr[e];
        }
        getAllActiveQueryTargets() {
          return this.Hr.activeTargetIds;
        }
        isActiveQueryTarget(e) {
          return this.Hr.activeTargetIds.has(e);
        }
        start() {
          return (this.Hr = new qh()), Promise.resolve();
        }
        handleUserChange(e, t, n) {}
        setOnlineState(e) {}
        shutdown() {}
        writeSequenceNumber(e) {}
        notifyBundleLoaded(e) {}
      }
      class Gh {
        Yr(e) {}
        shutdown() {}
      }
      class $h {
        constructor() {
          (this.Xr = () => this.Zr()),
            (this.eo = () => this.no()),
            (this.so = []),
            this.io();
        }
        Yr(e) {
          this.so.push(e);
        }
        shutdown() {
          window.removeEventListener("online", this.Xr),
            window.removeEventListener("offline", this.eo);
        }
        io() {
          window.addEventListener("online", this.Xr),
            window.addEventListener("offline", this.eo);
        }
        Zr() {
          Er("ConnectivityMonitor", "Network connectivity changed: AVAILABLE");
          for (const e of this.so) e(0);
        }
        no() {
          Er(
            "ConnectivityMonitor",
            "Network connectivity changed: UNAVAILABLE"
          );
          for (const e of this.so) e(1);
        }
        static vt() {
          return (
            "undefined" != typeof window &&
            void 0 !== window.addEventListener &&
            void 0 !== window.removeEventListener
          );
        }
      }
      const zh = {
        BatchGetDocuments: "batchGet",
        Commit: "commit",
        RunQuery: "runQuery",
      };
      class Wh {
        constructor(e) {
          (this.ro = e.ro), (this.oo = e.oo);
        }
        uo(e) {
          this.ao = e;
        }
        co(e) {
          this.ho = e;
        }
        onMessage(e) {
          this.lo = e;
        }
        close() {
          this.oo();
        }
        send(e) {
          this.ro(e);
        }
        fo() {
          this.ao();
        }
        _o(e) {
          this.ho(e);
        }
        wo(e) {
          this.lo(e);
        }
      }
      class Hh extends class {
        constructor(e) {
          (this.databaseInfo = e), (this.databaseId = e.databaseId);
          var t = e.ssl ? "https" : "http";
          (this.mo = t + "://" + e.host),
            (this.yo =
              "projects/" +
              this.databaseId.projectId +
              "/databases/" +
              this.databaseId.database +
              "/documents");
        }
        po(t, e, n, r, s) {
          const i = this.Io(t, e);
          Er("RestConnection", "Sending: ", i, n);
          var a = {};
          return (
            this.To(a, r, s),
            this.Eo(t, i, a, n).then(
              (e) => (Er("RestConnection", "Received: ", e), e),
              (e) => {
                throw (
                  (_r(
                    "RestConnection",
                    `${t} failed with error: `,
                    e,
                    "url: ",
                    i,
                    "request:",
                    n
                  ),
                  e)
                );
              }
            )
          );
        }
        Ao(e, t, n, r, s) {
          return this.po(e, t, n, r, s);
        }
        To(n, e, t) {
          (n["X-Goog-Api-Client"] = "gl-js/ fire/" + wr),
            (n["Content-Type"] = "text/plain"),
            this.databaseInfo.appId &&
              (n["X-Firebase-GMPID"] = this.databaseInfo.appId),
            e && e.headers.forEach((e, t) => (n[t] = e)),
            t && t.headers.forEach((e, t) => (n[t] = e));
        }
        Io(e, t) {
          var n = zh[e];
          return `${this.mo}/v1/${t}:${n}`;
        }
      } {
        constructor(e) {
          super(e),
            (this.forceLongPolling = e.forceLongPolling),
            (this.autoDetectLongPolling = e.autoDetectLongPolling),
            (this.useFetchStreams = e.useFetchStreams);
        }
        Eo(o, t, n, r) {
          return new Promise((s, i) => {
            const a = new pr();
            a.listenOnce(cr.COMPLETE, () => {
              try {
                switch (a.getLastErrorCode()) {
                  case hr.NO_ERROR:
                    var e = a.getResponseJson();
                    Er("Connection", "XHR received:", JSON.stringify(e)), s(e);
                    break;
                  case hr.TIMEOUT:
                    Er("Connection", 'RPC "' + o + '" timed out'),
                      i(new Nr(xr.DEADLINE_EXCEEDED, "Request time out"));
                    break;
                  case hr.HTTP_ERROR:
                    var t,
                      n = a.getStatus();
                    if (
                      (Er(
                        "Connection",
                        'RPC "' + o + '" failed with status:',
                        n,
                        "response text:",
                        a.getResponseText()
                      ),
                      0 < n)
                    ) {
                      const o = a.getResponseJson().error;
                      o && o.status && o.message
                        ? ((r = o.status.toLowerCase().replace(/_/g, "-")),
                          (t =
                            0 <= Object.values(xr).indexOf(r) ? r : xr.UNKNOWN),
                          i(new Nr(t, o.message)))
                        : i(
                            new Nr(
                              xr.UNKNOWN,
                              "Server responded with status " + a.getStatus()
                            )
                          );
                    } else i(new Nr(xr.UNAVAILABLE, "Connection failed."));
                    break;
                  default:
                    Ar();
                }
              } finally {
                Er("Connection", 'RPC "' + o + '" completed.');
              }
              var r;
            });
            var e = JSON.stringify(r);
            a.send(t, "POST", e, n, 15);
          });
        }
        Ro(e, t, n) {
          const r = [
              this.mo,
              "/",
              "google.firestore.v1.Firestore",
              "/",
              e,
              "/channel",
            ],
            s = new nr(),
            i = ur(),
            a = {
              httpSessionIdParam: "gsessionid",
              initMessageHeaders: {},
              messageUrlParams: {
                database: `projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`,
              },
              sendRawJson: !0,
              supportsCrossDomainXhr: !0,
              internalChannelParams: { forwardChannelRequestTimeoutMs: 6e5 },
              forceLongPolling: this.forceLongPolling,
              detectBufferingProxy: this.autoDetectLongPolling,
            };
          this.useFetchStreams && (a.xmlHttpFactory = new gr({})),
            this.To(a.initMessageHeaders, t, n),
            ("undefined" != typeof window &&
              (window.cordova || window.phonegap || window.PhoneGap) &&
              /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(f())) ||
              ("object" == typeof navigator &&
                "ReactNative" === navigator.product) ||
              0 <= f().indexOf("Electron/") ||
              (function () {
                const e = f();
                return 0 <= e.indexOf("MSIE ") || 0 <= e.indexOf("Trident/");
              })() ||
              0 <= f().indexOf("MSAppHost/") ||
              ("object" ==
                typeof (o =
                  "object" == typeof chrome
                    ? chrome.runtime
                    : "object" == typeof browser
                    ? browser.runtime
                    : void 0) &&
                void 0 !== o.id) ||
              (a.httpHeadersOverwriteParam = "$httpHeaders");
          var o = r.join("");
          Er("Connection", "Creating WebChannel: " + o, a);
          const u = s.createWebChannel(o, a);
          let h = !1,
            c = !1;
          const l = new Wh({
              ro: (e) => {
                c
                  ? Er(
                      "Connection",
                      "Not sending because WebChannel is closed:",
                      e
                    )
                  : (h ||
                      (Er("Connection", "Opening WebChannel transport."),
                      u.open(),
                      (h = !0)),
                    Er("Connection", "WebChannel sending:", e),
                    u.send(e));
              },
              oo: () => u.close(),
            }),
            d = (e, t, n) => {
              e.listen(t, (e) => {
                try {
                  n(e);
                } catch (e) {
                  setTimeout(() => {
                    throw e;
                  }, 0);
                }
              });
            };
          return (
            d(u, mr.EventType.OPEN, () => {
              c || Er("Connection", "WebChannel transport opened.");
            }),
            d(u, mr.EventType.CLOSE, () => {
              c ||
                ((c = !0),
                Er("Connection", "WebChannel transport closed"),
                l._o());
            }),
            d(u, mr.EventType.ERROR, (e) => {
              c ||
                ((c = !0),
                _r("Connection", "WebChannel transport errored:", e),
                l._o(
                  new Nr(xr.UNAVAILABLE, "The operation could not be completed")
                ));
            }),
            d(u, mr.EventType.MESSAGE, (n) => {
              if (!c) {
                var e = n.data[0];
                Dr(!!e);
                var r =
                  e.error ||
                  (null === (r = e[0]) || void 0 === r ? void 0 : r.error);
                if (r) {
                  Er("Connection", "WebChannel received error:", r);
                  const n = r.status;
                  let e = (function (e) {
                      var t = or[e];
                      if (void 0 !== t) return aa(t);
                    })(n),
                    t = r.message;
                  void 0 === e &&
                    ((e = xr.INTERNAL),
                    (t =
                      "Unknown error status: " +
                      n +
                      " with message " +
                      r.message)),
                    (c = !0),
                    l._o(new Nr(e, t)),
                    u.close();
                } else Er("Connection", "WebChannel received:", e), l.wo(e);
              }
            }),
            d(i, lr.STAT_EVENT, (e) => {
              e.stat === dr
                ? Er("Connection", "Detected buffering proxy")
                : e.stat === fr &&
                  Er("Connection", "Detected no buffering proxy");
            }),
            setTimeout(() => {
              l.fo();
            }, 0),
            l
          );
        }
      }
      function Qh() {
        return "undefined" != typeof window ? window : null;
      }
      function Yh() {
        return "undefined" != typeof document ? document : null;
      }
      function Xh(e) {
        return new Na(e, !0);
      }
      class Jh {
        constructor(e, t, n = 1e3, r = 1.5, s = 6e4) {
          (this.si = e),
            (this.timerId = t),
            (this.Po = n),
            (this.bo = r),
            (this.Vo = s),
            (this.vo = 0),
            (this.So = null),
            (this.Do = Date.now()),
            this.reset();
        }
        reset() {
          this.vo = 0;
        }
        Co() {
          this.vo = this.Vo;
        }
        xo(e) {
          this.cancel();
          var t = Math.floor(this.vo + this.No()),
            n = Math.max(0, Date.now() - this.Do),
            r = Math.max(0, t - n);
          0 < r &&
            Er(
              "ExponentialBackoff",
              `Backing off for ${r} ms (base delay: ${this.vo} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`
            ),
            (this.So = this.si.enqueueAfterDelay(
              this.timerId,
              r,
              () => ((this.Do = Date.now()), e())
            )),
            (this.vo *= this.bo),
            this.vo < this.Po && (this.vo = this.Po),
            this.vo > this.Vo && (this.vo = this.Vo);
        }
        ko() {
          null !== this.So && (this.So.skipDelay(), (this.So = null));
        }
        cancel() {
          null !== this.So && (this.So.cancel(), (this.So = null));
        }
        No() {
          return (Math.random() - 0.5) * this.vo;
        }
      }
      class Zh {
        constructor(e, t, n, r, s, i, a, o) {
          (this.si = e),
            (this.Oo = n),
            (this.Mo = r),
            (this.Fo = s),
            (this.authCredentialsProvider = i),
            (this.appCheckCredentialsProvider = a),
            (this.listener = o),
            (this.state = 0),
            (this.$o = 0),
            (this.Bo = null),
            (this.Lo = null),
            (this.stream = null),
            (this.Uo = new Jh(e, t));
        }
        qo() {
          return 1 === this.state || 5 === this.state || this.Ko();
        }
        Ko() {
          return 2 === this.state || 3 === this.state;
        }
        start() {
          4 !== this.state ? this.auth() : this.Go();
        }
        async stop() {
          this.qo() && (await this.close(0));
        }
        Qo() {
          (this.state = 0), this.Uo.reset();
        }
        jo() {
          this.Ko() &&
            null === this.Bo &&
            (this.Bo = this.si.enqueueAfterDelay(this.Oo, 6e4, () =>
              this.Wo()
            ));
        }
        zo(e) {
          this.Ho(), this.stream.send(e);
        }
        async Wo() {
          if (this.Ko()) return this.close(0);
        }
        Ho() {
          this.Bo && (this.Bo.cancel(), (this.Bo = null));
        }
        Jo() {
          this.Lo && (this.Lo.cancel(), (this.Lo = null));
        }
        async close(e, t) {
          this.Ho(),
            this.Jo(),
            this.Uo.cancel(),
            this.$o++,
            4 !== e
              ? this.Uo.reset()
              : t && t.code === xr.RESOURCE_EXHAUSTED
              ? (Tr(t.toString()),
                Tr(
                  "Using maximum backoff delay to prevent overloading the backend."
                ),
                this.Uo.Co())
              : t &&
                t.code === xr.UNAUTHENTICATED &&
                3 !== this.state &&
                (this.authCredentialsProvider.invalidateToken(),
                this.appCheckCredentialsProvider.invalidateToken()),
            null !== this.stream &&
              (this.Yo(), this.stream.close(), (this.stream = null)),
            (this.state = e),
            await this.listener.co(t);
        }
        Yo() {}
        auth() {
          this.state = 1;
          const e = this.Xo(this.$o),
            n = this.$o;
          Promise.all([
            this.authCredentialsProvider.getToken(),
            this.appCheckCredentialsProvider.getToken(),
          ]).then(
            ([e, t]) => {
              this.$o === n && this.Zo(e, t);
            },
            (t) => {
              e(() => {
                var e = new Nr(
                  xr.UNKNOWN,
                  "Fetching auth token failed: " + t.message
                );
                return this.tu(e);
              });
            }
          );
        }
        Zo(e, t) {
          const n = this.Xo(this.$o);
          (this.stream = this.eu(e, t)),
            this.stream.uo(() => {
              n(
                () => (
                  (this.state = 2),
                  (this.Lo = this.si.enqueueAfterDelay(
                    this.Mo,
                    1e4,
                    () => (this.Ko() && (this.state = 3), Promise.resolve())
                  )),
                  this.listener.uo()
                )
              );
            }),
            this.stream.co((e) => {
              n(() => this.tu(e));
            }),
            this.stream.onMessage((e) => {
              n(() => this.onMessage(e));
            });
        }
        Go() {
          (this.state = 5),
            this.Uo.xo(async () => {
              (this.state = 0), this.start();
            });
        }
        tu(e) {
          return (
            Er("PersistentStream", `close with error: ${e}`),
            (this.stream = null),
            this.close(4, e)
          );
        }
        Xo(t) {
          return (e) => {
            this.si.enqueueAndForget(() =>
              this.$o === t
                ? e()
                : (Er(
                    "PersistentStream",
                    "stream callback skipped by getCloseGuardedDispatcher."
                  ),
                  Promise.resolve())
            );
          };
        }
      }
      class ec extends Zh {
        constructor(e, t, n, r, s, i) {
          super(
            e,
            "listen_stream_connection_backoff",
            "listen_stream_idle",
            "health_check_timeout",
            t,
            n,
            r,
            i
          ),
            (this.O = s);
        }
        eu(e, t) {
          return this.Fo.Ro("Listen", e, t);
        }
        onMessage(e) {
          this.Uo.reset();
          var t = (function (e, t) {
              let n;
              if ("targetChange" in t) {
                t.targetChange;
                var r =
                    "NO_CHANGE" ===
                    (f = t.targetChange.targetChangeType || "NO_CHANGE")
                      ? 0
                      : "ADD" === f
                      ? 1
                      : "REMOVE" === f
                      ? 2
                      : "CURRENT" === f
                      ? 3
                      : "RESET" === f
                      ? 4
                      : Ar(),
                  s = t.targetChange.targetIds || [],
                  i =
                    ((f = t.targetChange.resumeToken),
                    e.N
                      ? (Dr(void 0 === f || "string" == typeof f),
                        as.fromBase64String(f || ""))
                      : (Dr(void 0 === f || f instanceof Uint8Array),
                        as.fromUint8Array(f || new Uint8Array()))),
                  a = t.targetChange.cause,
                  o =
                    a &&
                    ((o = void 0 === (f = a).code ? xr.UNKNOWN : aa(f.code)),
                    new Nr(o, f.message || ""));
                n = new Ea(r, s, i, o || null);
              } else if ("documentChange" in t) {
                t.documentChange;
                var u = t.documentChange;
                u.document, u.document.name, u.document.updateTime;
                var o = Ma(e, u.document.name),
                  h = Ra(u.document.updateTime),
                  c = new Fs({ mapValue: { fields: u.document.fields } }),
                  h = Ps.newFoundDocument(o, h, c),
                  c = u.targetIds || [],
                  u = u.removedTargetIds || [];
                n = new ba(c, u, h.key, h);
              } else if ("documentDelete" in t) {
                t.documentDelete;
                c = t.documentDelete;
                c.document;
                (u = Ma(e, c.document)),
                  (h = c.readTime ? Ra(c.readTime) : $r.min()),
                  (h = Ps.newNoDocument(u, h)),
                  (c = c.removedTargetIds || []);
                n = new ba([], c, h.key, h);
              } else if ("documentRemove" in t) {
                t.documentRemove;
                var l = t.documentRemove;
                l.document;
                var d = Ma(e, l.document),
                  l = l.removedTargetIds || [];
                n = new ba([], l, d, null);
              } else {
                if (!("filter" in t)) return Ar();
                {
                  t.filter;
                  const e = t.filter;
                  e.targetId;
                  (l = e.count || 0), (d = new sa(l)), (l = e.targetId);
                  n = new Ia(l, d);
                }
              }
              var o, f;
              return n;
            })(this.O, e),
            n = (function (e) {
              if (!("targetChange" in e)) return $r.min();
              var t = e.targetChange;
              return (!t.targetIds || !t.targetIds.length) && t.readTime
                ? Ra(t.readTime)
                : $r.min();
            })(e);
          return this.listener.nu(t, n);
        }
        su(e) {
          const t = {};
          (t.database = Ua(this.O)),
            (t.addTarget = (function (e, t) {
              let n;
              var r = t.target;
              return (
                (n = Xs(r) ? { documents: $a(e, r) } : { query: za(e, r) }),
                (n.targetId = t.targetId),
                0 < t.resumeToken.approximateByteSize()
                  ? (n.resumeToken = ka(e, t.resumeToken))
                  : 0 < t.snapshotVersion.compareTo($r.min()) &&
                    (n.readTime = Ca(e, t.snapshotVersion.toTimestamp())),
                n
              );
            })(this.O, e));
          var n,
            r,
            r =
              (this.O,
              (n = e),
              null ==
              (r = (function () {
                switch (n.purpose) {
                  case 0:
                    return null;
                  case 1:
                    return "existence-filter-mismatch";
                  case 2:
                    return "limbo-document";
                  default:
                    return Ar();
                }
              })())
                ? null
                : { "goog-listen-tags": r });
          r && (t.labels = r), this.zo(t);
        }
        iu(e) {
          const t = {};
          (t.database = Ua(this.O)), (t.removeTarget = e), this.zo(t);
        }
      }
      class tc extends Zh {
        constructor(e, t, n, r, s, i) {
          super(
            e,
            "write_stream_connection_backoff",
            "write_stream_idle",
            "health_check_timeout",
            t,
            n,
            r,
            i
          ),
            (this.O = s),
            (this.ru = !1);
        }
        get ou() {
          return this.ru;
        }
        start() {
          (this.ru = !1), (this.lastStreamToken = void 0), super.start();
        }
        Yo() {
          this.ru && this.uu([]);
        }
        eu(e, t) {
          return this.Fo.Ro("Write", e, t);
        }
        onMessage(e) {
          if (
            (Dr(!!e.streamToken),
            (this.lastStreamToken = e.streamToken),
            this.ru)
          ) {
            this.Uo.reset();
            var t =
                ((r = e.writeResults),
                (s = e.commitTime),
                r && 0 < r.length
                  ? (Dr(void 0 !== s),
                    r.map((e) =>
                      (function (e, t) {
                        let n = e.updateTime ? Ra(e.updateTime) : Ra(t);
                        return (
                          n.isEqual($r.min()) && (n = Ra(t)),
                          new Ki(n, e.transformResults || [])
                        );
                      })(e, s)
                    ))
                  : []),
              n = Ra(e.commitTime);
            return this.listener.au(n, t);
          }
          var r, s;
          return (
            Dr(!e.writeResults || 0 === e.writeResults.length),
            (this.ru = !0),
            this.listener.cu()
          );
        }
        hu() {
          const e = {};
          (e.database = Ua(this.O)), this.zo(e);
        }
        uu(e) {
          var t = {
            streamToken: this.lastStreamToken,
            writes: e.map((e) => Ka(this.O, e)),
          };
          this.zo(t);
        }
      }
      class nc extends class {} {
        constructor(e, t, n, r) {
          super(),
            (this.authCredentials = e),
            (this.appCheckCredentials = t),
            (this.Fo = n),
            (this.O = r),
            (this.lu = !1);
        }
        fu() {
          if (this.lu)
            throw new Nr(
              xr.FAILED_PRECONDITION,
              "The client has already been terminated."
            );
        }
        po(n, r, s) {
          return (
            this.fu(),
            Promise.all([
              this.authCredentials.getToken(),
              this.appCheckCredentials.getToken(),
            ])
              .then(([e, t]) => this.Fo.po(n, r, s, e, t))
              .catch((e) => {
                throw "FirebaseError" === e.name
                  ? (e.code === xr.UNAUTHENTICATED &&
                      (this.authCredentials.invalidateToken(),
                      this.appCheckCredentials.invalidateToken()),
                    e)
                  : new Nr(xr.UNKNOWN, e.toString());
              })
          );
        }
        Ao(n, r, s) {
          return (
            this.fu(),
            Promise.all([
              this.authCredentials.getToken(),
              this.appCheckCredentials.getToken(),
            ])
              .then(([e, t]) => this.Fo.Ao(n, r, s, e, t))
              .catch((e) => {
                throw "FirebaseError" === e.name
                  ? (e.code === xr.UNAUTHENTICATED &&
                      (this.authCredentials.invalidateToken(),
                      this.appCheckCredentials.invalidateToken()),
                    e)
                  : new Nr(xr.UNKNOWN, e.toString());
              })
          );
        }
        terminate() {
          this.lu = !0;
        }
      }
      class rc {
        constructor(e, t) {
          (this.asyncQueue = e),
            (this.onlineStateHandler = t),
            (this.state = "Unknown"),
            (this.du = 0),
            (this._u = null),
            (this.wu = !0);
        }
        mu() {
          0 === this.du &&
            (this.gu("Unknown"),
            (this._u = this.asyncQueue.enqueueAfterDelay(
              "online_state_timeout",
              1e4,
              () => (
                (this._u = null),
                this.yu("Backend didn't respond within 10 seconds."),
                this.gu("Offline"),
                Promise.resolve()
              )
            )));
        }
        pu(e) {
          "Online" === this.state
            ? this.gu("Unknown")
            : (this.du++,
              1 <= this.du &&
                (this.Iu(),
                this.yu(
                  `Connection failed 1 times. Most recent error: ${e.toString()}`
                ),
                this.gu("Offline")));
        }
        set(e) {
          this.Iu(),
            (this.du = 0),
            "Online" === e && (this.wu = !1),
            this.gu(e);
        }
        gu(e) {
          e !== this.state && ((this.state = e), this.onlineStateHandler(e));
        }
        yu(e) {
          var t = `Could not reach Cloud Firestore backend. ${e}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;
          this.wu ? (Tr(t), (this.wu = !1)) : Er("OnlineStateTracker", t);
        }
        Iu() {
          null !== this._u && (this._u.cancel(), (this._u = null));
        }
      }
      class sc {
        constructor(e, t, n, r, s) {
          (this.localStore = e),
            (this.datastore = t),
            (this.asyncQueue = n),
            (this.remoteSyncer = {}),
            (this.Tu = []),
            (this.Eu = new Map()),
            (this.Au = new Set()),
            (this.Ru = []),
            (this.Pu = s),
            this.Pu.Yr((e) => {
              n.enqueueAndForget(async () => {
                fc(this) &&
                  (Er(
                    "RemoteStore",
                    "Restarting streams for network reachability change."
                  ),
                  await (async function (e) {
                    const t = e;
                    t.Au.add(4),
                      await ac(t),
                      t.bu.set("Unknown"),
                      t.Au.delete(4),
                      await ic(t);
                  })(this));
              });
            }),
            (this.bu = new rc(n, r));
        }
      }
      async function ic(e) {
        if (fc(e)) for (const t of e.Ru) await t(!0);
      }
      async function ac(e) {
        for (const t of e.Ru) await t(!1);
      }
      function oc(e, t) {
        const n = e;
        n.Eu.has(t.targetId) ||
          (n.Eu.set(t.targetId, t), dc(n) ? lc(n) : Ec(n).Ko() && hc(n, t));
      }
      function uc(e, t) {
        const n = e,
          r = Ec(n);
        n.Eu.delete(t),
          r.Ko() && cc(n, t),
          0 === n.Eu.size && (r.Ko() ? r.jo() : fc(n) && n.bu.set("Unknown"));
      }
      function hc(e, t) {
        e.Vu.Z(t.targetId), Ec(e).su(t);
      }
      function cc(e, t) {
        e.Vu.Z(t), Ec(e).iu(t);
      }
      function lc(t) {
        (t.Vu = new _a({
          getRemoteKeysForTarget: (e) =>
            t.remoteSyncer.getRemoteKeysForTarget(e),
          Et: (e) => t.Eu.get(e) || null,
        })),
          Ec(t).start(),
          t.bu.mu();
      }
      function dc(e) {
        return fc(e) && !Ec(e).qo() && 0 < e.Eu.size;
      }
      function fc(e) {
        return 0 === e.Au.size;
      }
      function gc(e) {
        e.Vu = void 0;
      }
      async function mc(e, t, n) {
        if (!Oo(t)) throw t;
        e.Au.add(1),
          await ac(e),
          e.bu.set("Offline"),
          (n = n || (() => Sh(e.localStore))),
          e.asyncQueue.enqueueRetryable(async () => {
            Er("RemoteStore", "Retrying IndexedDB access"),
              await n(),
              e.Au.delete(1),
              await ic(e);
          });
      }
      function pc(t, n) {
        return n().catch((e) => mc(t, e, n));
      }
      async function yc(e) {
        const t = e,
          n = Tc(t);
        let r = 0 < t.Tu.length ? t.Tu[t.Tu.length - 1].batchId : -1;
        for (; fc((s = t)) && s.Tu.length < 10; )
          try {
            const e = await (function (e, t) {
              const n = e;
              return n.persistence.runTransaction(
                "Get next mutation batch",
                "readonly",
                (e) => (
                  void 0 === t && (t = -1),
                  n.jn.getNextMutationBatchAfterBatchId(e, t)
                )
              );
            })(t.localStore, r);
            if (null === e) {
              0 === t.Tu.length && n.jo();
              break;
            }
            (r = e.batchId),
              (function (e, t) {
                e.Tu.push(t);
                const n = Tc(e);
                n.Ko() && n.ou && n.uu(t.mutations);
              })(t, e);
          } catch (e) {
            await mc(t, e);
          }
        var s;
        vc(t) && wc(t);
      }
      function vc(e) {
        return fc(e) && !Tc(e).qo() && 0 < e.Tu.length;
      }
      function wc(e) {
        Tc(e).start();
      }
      async function bc(e, t) {
        const n = e;
        n.asyncQueue.verifyOperationInProgress(),
          Er("RemoteStore", "RemoteStore received new credentials");
        var r = fc(n);
        n.Au.add(3),
          await ac(n),
          r && n.bu.set("Unknown"),
          await n.remoteSyncer.handleCredentialChange(t),
          n.Au.delete(3),
          await ic(n);
      }
      async function Ic(e, t) {
        const n = e;
        t
          ? (n.Au.delete(2), await ic(n))
          : (n.Au.add(2), await ac(n), n.bu.set("Unknown"));
      }
      function Ec(t) {
        return (
          t.vu ||
            ((t.vu = (function (e, t, n) {
              const r = e;
              return (
                r.fu(),
                new ec(
                  t,
                  r.Fo,
                  r.authCredentials,
                  r.appCheckCredentials,
                  r.O,
                  n
                )
              );
            })(t.datastore, t.asyncQueue, {
              uo: async function (n) {
                n.Eu.forEach((e, t) => {
                  hc(n, e);
                });
              }.bind(null, t),
              co: async function (e, t) {
                gc(e), dc(e) ? (e.bu.pu(t), lc(e)) : e.bu.set("Unknown");
              }.bind(null, t),
              nu: async function (e, r, t) {
                if (
                  (e.bu.set("Online"),
                  r instanceof Ea && 2 === r.state && r.cause)
                )
                  try {
                    await (async function (e) {
                      var t = r.cause;
                      for (const n of r.targetIds)
                        e.Eu.has(n) &&
                          (await e.remoteSyncer.rejectListen(n, t),
                          e.Eu.delete(n),
                          e.Vu.removeTarget(n));
                    })(e);
                  } catch (t) {
                    Er(
                      "RemoteStore",
                      "Failed to remove targets %s: %s ",
                      r.targetIds.join(","),
                      t
                    ),
                      await mc(e, t);
                  }
                else if (
                  (r instanceof ba
                    ? e.Vu.ut(r)
                    : r instanceof Ia
                    ? e.Vu._t(r)
                    : e.Vu.ht(r),
                  !t.isEqual($r.min()))
                )
                  try {
                    const r = await Sh(e.localStore);
                    0 <= t.compareTo(r) &&
                      (await (function (r, s) {
                        const e = r.Vu.yt(s);
                        return (
                          e.targetChanges.forEach((e, t) => {
                            if (0 < e.resumeToken.approximateByteSize()) {
                              const n = r.Eu.get(t);
                              n &&
                                r.Eu.set(
                                  t,
                                  n.withResumeToken(e.resumeToken, s)
                                );
                            }
                          }),
                          e.targetMismatches.forEach((e) => {
                            const t = r.Eu.get(e);
                            var n;
                            t &&
                              (r.Eu.set(
                                e,
                                t.withResumeToken(
                                  as.EMPTY_BYTE_STRING,
                                  t.snapshotVersion
                                )
                              ),
                              cc(r, e),
                              (n = new Ko(t.target, e, 1, t.sequenceNumber)),
                              hc(r, n));
                          }),
                          r.remoteSyncer.applyRemoteEvent(e)
                        );
                      })(e, t));
                  } catch (r) {
                    Er("RemoteStore", "Failed to raise snapshot:", r),
                      await mc(e, r);
                  }
              }.bind(null, t),
            })),
            t.Ru.push(async (e) => {
              e
                ? (t.vu.Qo(), dc(t) ? lc(t) : t.bu.set("Unknown"))
                : (await t.vu.stop(), gc(t));
            })),
          t.vu
        );
      }
      function Tc(t) {
        return (
          t.Su ||
            ((t.Su = (function (e, t, n) {
              const r = e;
              return (
                r.fu(),
                new tc(
                  t,
                  r.Fo,
                  r.authCredentials,
                  r.appCheckCredentials,
                  r.O,
                  n
                )
              );
            })(t.datastore, t.asyncQueue, {
              uo: async function (e) {
                Tc(e).hu();
              }.bind(null, t),
              co: async function (e, t) {
                t &&
                  Tc(e).ou &&
                  (await (async function (e, t) {
                    if (ia((n = t.code)) && n !== xr.ABORTED) {
                      const n = e.Tu.shift();
                      Tc(e).Qo(),
                        await pc(e, () =>
                          e.remoteSyncer.rejectFailedWrite(n.batchId, t)
                        ),
                        await yc(e);
                    }
                    var n;
                  })(e, t)),
                  vc(e) && wc(e);
              }.bind(null, t),
              cu: async function (e) {
                const t = Tc(e);
                for (const n of e.Tu) t.uu(n.mutations);
              }.bind(null, t),
              au: async function (e, t, n) {
                const r = e.Tu.shift(),
                  s = qo.from(r, t, n);
                await pc(e, () => e.remoteSyncer.applySuccessfulWrite(s)),
                  await yc(e);
              }.bind(null, t),
            })),
            t.Ru.push(async (e) => {
              e
                ? (t.Su.Qo(), await yc(t))
                : (await t.Su.stop(),
                  0 < t.Tu.length &&
                    (Er(
                      "RemoteStore",
                      `Stopping write stream with ${t.Tu.length} pending writes`
                    ),
                    (t.Tu = [])));
            })),
          t.Su
        );
      }
      class _c {
        constructor(e, t, n, r, s) {
          (this.asyncQueue = e),
            (this.timerId = t),
            (this.targetTimeMs = n),
            (this.op = r),
            (this.removalCallback = s),
            (this.deferred = new Cr()),
            (this.then = this.deferred.promise.then.bind(
              this.deferred.promise
            )),
            this.deferred.promise.catch((e) => {});
        }
        static createAndSchedule(e, t, n, r, s) {
          const i = Date.now() + n,
            a = new _c(e, t, i, r, s);
          return a.start(n), a;
        }
        start(e) {
          this.timerHandle = setTimeout(() => this.handleDelayElapsed(), e);
        }
        skipDelay() {
          return this.handleDelayElapsed();
        }
        cancel(e) {
          null !== this.timerHandle &&
            (this.clearTimeout(),
            this.deferred.reject(
              new Nr(xr.CANCELLED, "Operation cancelled" + (e ? ": " + e : ""))
            ));
        }
        handleDelayElapsed() {
          this.asyncQueue.enqueueAndForget(() =>
            null !== this.timerHandle
              ? (this.clearTimeout(),
                this.op().then((e) => this.deferred.resolve(e)))
              : Promise.resolve()
          );
        }
        clearTimeout() {
          null !== this.timerHandle &&
            (this.removalCallback(this),
            clearTimeout(this.timerHandle),
            (this.timerHandle = null));
        }
      }
      function Sc(e, t) {
        if ((Tr("AsyncQueue", `${t}: ${e}`), Oo(e)))
          return new Nr(xr.UNAVAILABLE, `${t}: ${e}`);
        throw e;
      }
      class Ac {
        constructor(n) {
          (this.comparator = n
            ? (e, t) => n(e, t) || vs.comparator(e.key, t.key)
            : (e, t) => vs.comparator(e.key, t.key)),
            (this.keyedMap = ca()),
            (this.sortedSet = new Qr(this.comparator));
        }
        static emptySet(e) {
          return new Ac(e.comparator);
        }
        has(e) {
          return null != this.keyedMap.get(e);
        }
        get(e) {
          return this.keyedMap.get(e);
        }
        first() {
          return this.sortedSet.minKey();
        }
        last() {
          return this.sortedSet.maxKey();
        }
        isEmpty() {
          return this.sortedSet.isEmpty();
        }
        indexOf(e) {
          var t = this.keyedMap.get(e);
          return t ? this.sortedSet.indexOf(t) : -1;
        }
        get size() {
          return this.sortedSet.size;
        }
        forEach(n) {
          this.sortedSet.inorderTraversal((e, t) => (n(e), !1));
        }
        add(e) {
          const t = this.delete(e.key);
          return t.copy(
            t.keyedMap.insert(e.key, e),
            t.sortedSet.insert(e, null)
          );
        }
        delete(e) {
          var t = this.get(e);
          return t
            ? this.copy(this.keyedMap.remove(e), this.sortedSet.remove(t))
            : this;
        }
        isEqual(e) {
          if (!(e instanceof Ac)) return !1;
          if (this.size !== e.size) return !1;
          const t = this.sortedSet.getIterator(),
            n = e.sortedSet.getIterator();
          for (; t.hasNext(); ) {
            const e = t.getNext().key,
              r = n.getNext().key;
            if (!e.isEqual(r)) return !1;
          }
          return !0;
        }
        toString() {
          const t = [];
          return (
            this.forEach((e) => {
              t.push(e.toString());
            }),
            0 === t.length
              ? "DocumentSet ()"
              : "DocumentSet (\n  " + t.join("  \n") + "\n)"
          );
        }
        copy(e, t) {
          const n = new Ac();
          return (
            (n.comparator = this.comparator),
            (n.keyedMap = e),
            (n.sortedSet = t),
            n
          );
        }
      }
      class Dc {
        constructor() {
          this.Du = new Qr(vs.comparator);
        }
        track(e) {
          var t = e.doc.key,
            n = this.Du.get(t);
          !n || (0 !== e.type && 3 === n.type)
            ? (this.Du = this.Du.insert(t, e))
            : 3 === e.type && 1 !== n.type
            ? (this.Du = this.Du.insert(t, { type: n.type, doc: e.doc }))
            : 2 === e.type && 2 === n.type
            ? (this.Du = this.Du.insert(t, { type: 2, doc: e.doc }))
            : 2 === e.type && 0 === n.type
            ? (this.Du = this.Du.insert(t, { type: 0, doc: e.doc }))
            : 1 === e.type && 0 === n.type
            ? (this.Du = this.Du.remove(t))
            : 1 === e.type && 2 === n.type
            ? (this.Du = this.Du.insert(t, { type: 1, doc: n.doc }))
            : 0 === e.type && 1 === n.type
            ? (this.Du = this.Du.insert(t, { type: 2, doc: e.doc }))
            : Ar();
        }
        Cu() {
          const n = [];
          return (
            this.Du.inorderTraversal((e, t) => {
              n.push(t);
            }),
            n
          );
        }
      }
      class xc {
        constructor(e, t, n, r, s, i, a, o) {
          (this.query = e),
            (this.docs = t),
            (this.oldDocs = n),
            (this.docChanges = r),
            (this.mutatedKeys = s),
            (this.fromCache = i),
            (this.syncStateChanged = a),
            (this.excludesMetadataChanges = o);
        }
        static fromInitialDocuments(e, t, n, r) {
          const s = [];
          return (
            t.forEach((e) => {
              s.push({ type: 0, doc: e });
            }),
            new xc(e, t, Ac.emptySet(t), s, n, r, !0, !1)
          );
        }
        get hasPendingWrites() {
          return !this.mutatedKeys.isEmpty();
        }
        isEqual(e) {
          if (
            !(
              this.fromCache === e.fromCache &&
              this.syncStateChanged === e.syncStateChanged &&
              this.mutatedKeys.isEqual(e.mutatedKeys) &&
              Ti(this.query, e.query) &&
              this.docs.isEqual(e.docs) &&
              this.oldDocs.isEqual(e.oldDocs)
            )
          )
            return !1;
          const t = this.docChanges,
            n = e.docChanges;
          if (t.length !== n.length) return !1;
          for (let r = 0; r < t.length; r++)
            if (t[r].type !== n[r].type || !t[r].doc.isEqual(n[r].doc))
              return !1;
          return !0;
        }
      }
      class Nc {
        constructor() {
          (this.xu = void 0), (this.listeners = []);
        }
      }
      class Cc {
        constructor() {
          (this.queries = new oa((e) => _i(e), Ti)),
            (this.onlineState = "Unknown"),
            (this.Nu = new Set());
        }
      }
      async function kc(e, t) {
        const n = e,
          r = t.query;
        let s = !1,
          i = n.queries.get(r);
        if ((i || ((s = !0), (i = new Nc())), s))
          try {
            i.xu = await n.onListen(r);
          } catch (e) {
            const n = Sc(e, `Initialization of query '${Si(t.query)}' failed`);
            return void t.onError(n);
          }
        n.queries.set(r, i),
          i.listeners.push(t),
          t.ku(n.onlineState),
          !i.xu || (t.Ou(i.xu) && Oc(n));
      }
      async function Rc(e, t) {
        const n = e,
          r = t.query;
        let s = !1;
        const i = n.queries.get(r);
        if (i) {
          const e = i.listeners.indexOf(t);
          0 <= e && (i.listeners.splice(e, 1), (s = 0 === i.listeners.length));
        }
        if (s) return n.queries.delete(r), n.onUnlisten(r);
      }
      function Oc(e) {
        e.Nu.forEach((e) => {
          e.next();
        });
      }
      class Lc {
        constructor(e, t, n) {
          (this.query = e),
            (this.Mu = t),
            (this.Fu = !1),
            (this.$u = null),
            (this.onlineState = "Unknown"),
            (this.options = n || {});
        }
        Ou(e) {
          if (!this.options.includeMetadataChanges) {
            const t = [];
            for (const n of e.docChanges) 3 !== n.type && t.push(n);
            e = new xc(
              e.query,
              e.docs,
              e.oldDocs,
              t,
              e.mutatedKeys,
              e.fromCache,
              e.syncStateChanged,
              !0
            );
          }
          let t = !1;
          return (
            this.Fu
              ? this.Bu(e) && (this.Mu.next(e), (t = !0))
              : this.Lu(e, this.onlineState) && (this.Uu(e), (t = !0)),
            (this.$u = e),
            t
          );
        }
        onError(e) {
          this.Mu.error(e);
        }
        ku(e) {
          this.onlineState = e;
          let t = !1;
          return (
            this.$u &&
              !this.Fu &&
              this.Lu(this.$u, e) &&
              (this.Uu(this.$u), (t = !0)),
            t
          );
        }
        Lu(e, t) {
          return (
            !e.fromCache ||
            !(
              (this.options.qu && "Offline" !== t) ||
              (e.docs.isEmpty() && "Offline" !== t)
            )
          );
        }
        Bu(e) {
          if (0 < e.docChanges.length) return !0;
          var t = this.$u && this.$u.hasPendingWrites !== e.hasPendingWrites;
          return (
            !(!e.syncStateChanged && !t) &&
            !0 === this.options.includeMetadataChanges
          );
        }
        Uu(e) {
          (e = xc.fromInitialDocuments(
            e.query,
            e.docs,
            e.mutatedKeys,
            e.fromCache
          )),
            (this.Fu = !0),
            this.Mu.next(e);
        }
      }
      class Vc {
        constructor(e, t) {
          (this.payload = e), (this.byteLength = t);
        }
        Ku() {
          return "metadata" in this.payload;
        }
      }
      class Mc {
        constructor(e) {
          this.O = e;
        }
        rr(e) {
          return Ma(this.O, e);
        }
        ur(e) {
          return e.metadata.exists
            ? ja(this.O, e.document, !1)
            : Ps.newNoDocument(
                this.rr(e.metadata.name),
                this.ar(e.metadata.readTime)
              );
        }
        ar(e) {
          return Ra(e);
        }
      }
      class Fc {
        constructor(e, t, n) {
          (this.Gu = e),
            (this.localStore = t),
            (this.O = n),
            (this.queries = []),
            (this.documents = []),
            (this.collectionGroups = new Set()),
            (this.progress = Pc(e));
        }
        Qu(e) {
          this.progress.bytesLoaded += e.byteLength;
          let t = this.progress.documentsLoaded;
          if (e.payload.namedQuery) this.queries.push(e.payload.namedQuery);
          else if (e.payload.documentMetadata) {
            this.documents.push({ metadata: e.payload.documentMetadata }),
              e.payload.documentMetadata.exists || ++t;
            const n = ns.fromString(e.payload.documentMetadata.name);
            this.collectionGroups.add(n.get(n.length - 2));
          } else
            e.payload.document &&
              ((this.documents[this.documents.length - 1].document =
                e.payload.document),
              ++t);
          return t !== this.progress.documentsLoaded
            ? ((this.progress.documentsLoaded = t),
              Object.assign({}, this.progress))
            : null;
        }
        ju(e) {
          const t = new Map(),
            n = new Mc(this.O);
          for (const s of e)
            if (s.metadata.queries) {
              const e = n.rr(s.metadata.name);
              for (const n of s.metadata.queries) {
                var r = (t.get(n) || pa()).add(e);
                t.set(n, r);
              }
            }
          return t;
        }
        async complete() {
          const e = await (async function (e, t, n, r) {
              const s = e;
              let i = pa(),
                a = ua;
              for (const e of n) {
                const n = t.rr(e.metadata.name);
                e.document && (i = i.add(n));
                const h = t.ur(e);
                h.setReadTime(t.ar(e.metadata.readTime)), (a = a.insert(n, h));
              }
              const o = s.Xi.newChangeBuffer({ trackRemovals: !0 }),
                u = await xh(
                  s,
                  ((r = r), Ii(pi(ns.fromString(`__bundle__/docs/${r}`))))
                );
              return s.persistence.runTransaction(
                "Apply bundle documents",
                "readwrite",
                (t) =>
                  Dh(t, o, a)
                    .next((e) => (o.apply(t), e))
                    .next((e) =>
                      s.Bs.removeMatchingKeysForTargetId(t, u.targetId)
                        .next(() => s.Bs.addMatchingKeys(t, i, u.targetId))
                        .next(() => s.tr.Yn(t, e.nr, e.sr))
                        .next(() => e.nr)
                    )
              );
            })(this.localStore, new Mc(this.O), this.documents, this.Gu.id),
            t = this.ju(this.documents);
          for (const e of this.queries)
            await (async function (e, n, r = pa()) {
              const s = await xh(e, Ii(Jo(n.bundledQuery))),
                i = e;
              return i.persistence.runTransaction(
                "Save named query",
                "readwrite",
                (e) => {
                  var t = Ra(n.readTime);
                  if (0 <= s.snapshotVersion.compareTo(t))
                    return i.Us.saveNamedQuery(e, n);
                  t = s.withResumeToken(as.EMPTY_BYTE_STRING, t);
                  return (
                    (i.Hi = i.Hi.insert(t.targetId, t)),
                    i.Bs.updateTargetData(e, t)
                      .next(() =>
                        i.Bs.removeMatchingKeysForTargetId(e, s.targetId)
                      )
                      .next(() => i.Bs.addMatchingKeys(e, r, s.targetId))
                      .next(() => i.Us.saveNamedQuery(e, n))
                  );
                }
              );
            })(this.localStore, e, t.get(e.name));
          return (
            (this.progress.taskState = "Success"),
            { progress: this.progress, Wu: this.collectionGroups, zu: e }
          );
        }
      }
      function Pc(e) {
        return {
          taskState: "Running",
          documentsLoaded: 0,
          bytesLoaded: 0,
          totalDocuments: e.totalDocuments,
          totalBytes: e.totalBytes,
        };
      }
      class Uc {
        constructor(e) {
          this.key = e;
        }
      }
      class Bc {
        constructor(e) {
          this.key = e;
        }
      }
      class qc {
        constructor(e, t) {
          (this.query = e),
            (this.Hu = t),
            (this.Ju = null),
            (this.current = !1),
            (this.Yu = pa()),
            (this.mutatedKeys = pa()),
            (this.Xu = xi(e)),
            (this.Zu = new Ac(this.Xu));
        }
        get ta() {
          return this.Hu;
        }
        ea(e, t) {
          const o = t ? t.na : new Dc(),
            u = (t || this).Zu;
          let h = (t || this).mutatedKeys,
            c = u,
            l = !1;
          const d =
              "F" === this.query.limitType && u.size === this.query.limit
                ? u.last()
                : null,
            f =
              "L" === this.query.limitType && u.size === this.query.limit
                ? u.first()
                : null;
          if (
            (e.inorderTraversal((e, t) => {
              const n = u.get(e),
                r = Ai(this.query, t) ? t : null,
                s = !!n && this.mutatedKeys.has(n.key),
                i =
                  !!r &&
                  (r.hasLocalMutations ||
                    (this.mutatedKeys.has(r.key) && r.hasCommittedMutations));
              let a = !1;
              n && r
                ? n.data.isEqual(r.data)
                  ? s !== i && (o.track({ type: 3, doc: r }), (a = !0))
                  : this.sa(n, r) ||
                    (o.track({ type: 2, doc: r }),
                    (a = !0),
                    ((d && 0 < this.Xu(r, d)) || (f && this.Xu(r, f) < 0)) &&
                      (l = !0))
                : !n && r
                ? (o.track({ type: 0, doc: r }), (a = !0))
                : n &&
                  !r &&
                  (o.track({ type: 1, doc: n }),
                  (a = !0),
                  (d || f) && (l = !0)),
                a &&
                  (h = r
                    ? ((c = c.add(r)), i ? h.add(e) : h.delete(e))
                    : ((c = c.delete(e)), h.delete(e)));
            }),
            null !== this.query.limit)
          )
            for (; c.size > this.query.limit; ) {
              const e = "F" === this.query.limitType ? c.last() : c.first();
              (c = c.delete(e.key)),
                (h = h.delete(e.key)),
                o.track({ type: 1, doc: e });
            }
          return { Zu: c, na: o, ji: l, mutatedKeys: h };
        }
        sa(e, t) {
          return (
            e.hasLocalMutations &&
            t.hasCommittedMutations &&
            !t.hasLocalMutations
          );
        }
        applyChanges(e, t, n) {
          var r = this.Zu;
          (this.Zu = e.Zu), (this.mutatedKeys = e.mutatedKeys);
          const s = e.na.Cu();
          s.sort(
            (e, t) =>
              (function (e, t) {
                var n = (e) => {
                  switch (e) {
                    case 0:
                      return 1;
                    case 2:
                    case 3:
                      return 2;
                    case 1:
                      return 0;
                    default:
                      return Ar();
                  }
                };
                return n(e) - n(t);
              })(e.type, t.type) || this.Xu(e.doc, t.doc)
          ),
            this.ia(n);
          var i = t ? this.ra() : [],
            a = 0 === this.Yu.size && this.current ? 1 : 0,
            o = a !== this.Ju;
          return (
            (this.Ju = a),
            0 !== s.length || o
              ? {
                  snapshot: new xc(
                    this.query,
                    e.Zu,
                    r,
                    s,
                    e.mutatedKeys,
                    0 == a,
                    o,
                    !1
                  ),
                  oa: i,
                }
              : { oa: i }
          );
        }
        ku(e) {
          return this.current && "Offline" === e
            ? ((this.current = !1),
              this.applyChanges(
                {
                  Zu: this.Zu,
                  na: new Dc(),
                  mutatedKeys: this.mutatedKeys,
                  ji: !1,
                },
                !1
              ))
            : { oa: [] };
        }
        ua(e) {
          return (
            !this.Hu.has(e) &&
            !!this.Zu.has(e) &&
            !this.Zu.get(e).hasLocalMutations
          );
        }
        ia(e) {
          e &&
            (e.addedDocuments.forEach((e) => (this.Hu = this.Hu.add(e))),
            e.modifiedDocuments.forEach((e) => {}),
            e.removedDocuments.forEach((e) => (this.Hu = this.Hu.delete(e))),
            (this.current = e.current));
        }
        ra() {
          if (!this.current) return [];
          const t = this.Yu;
          (this.Yu = pa()),
            this.Zu.forEach((e) => {
              this.ua(e.key) && (this.Yu = this.Yu.add(e.key));
            });
          const n = [];
          return (
            t.forEach((e) => {
              this.Yu.has(e) || n.push(new Bc(e));
            }),
            this.Yu.forEach((e) => {
              t.has(e) || n.push(new Uc(e));
            }),
            n
          );
        }
        aa(e) {
          (this.Hu = e.ir), (this.Yu = pa());
          var t = this.ea(e.documents);
          return this.applyChanges(t, !0);
        }
        ca() {
          return xc.fromInitialDocuments(
            this.query,
            this.Zu,
            this.mutatedKeys,
            0 === this.Ju
          );
        }
      }
      class jc {
        constructor(e, t, n) {
          (this.query = e), (this.targetId = t), (this.view = n);
        }
      }
      class Kc {
        constructor(e) {
          (this.key = e), (this.ha = !1);
        }
      }
      class Gc {
        constructor(e, t, n, r, s, i) {
          (this.localStore = e),
            (this.remoteStore = t),
            (this.eventManager = n),
            (this.sharedClientState = r),
            (this.currentUser = s),
            (this.maxConcurrentLimboResolutions = i),
            (this.la = {}),
            (this.fa = new oa((e) => _i(e), Ti)),
            (this.da = new Map()),
            (this._a = new Set()),
            (this.wa = new Qr(vs.comparator)),
            (this.ma = new Map()),
            (this.ga = new sh()),
            (this.ya = {}),
            (this.pa = new Map()),
            (this.Ia = Ou.yn()),
            (this.onlineState = "Unknown"),
            (this.Ta = void 0);
        }
        get isPrimaryClient() {
          return !0 === this.Ta;
        }
      }
      async function $c(n, e, t, r) {
        n.Ea = (e, i, t) =>
          (async function (e, t, n) {
            let r = t.view.ea(i);
            r.ji &&
              (r = await Ch(e.localStore, t.query, !1).then(
                ({ documents: e }) => t.view.ea(e, r)
              ));
            var s = n && n.targetChanges.get(t.targetId),
              s = t.view.applyChanges(r, e.isPrimaryClient, s);
            return el(e, t.targetId, s.oa), s.snapshot;
          })(n, e, t);
        const s = await Ch(n.localStore, e, !0),
          i = new qc(e, s.ir),
          a = i.ea(s.documents),
          o = wa.createSynthesizedTargetChangeForCurrentChange(
            t,
            r && "Offline" !== n.onlineState
          ),
          u = i.applyChanges(a, n.isPrimaryClient, o);
        el(n, t, u.oa);
        var h = new jc(e, t, i);
        return (
          n.fa.set(e, h),
          n.da.has(t) ? n.da.get(t).push(e) : n.da.set(t, [e]),
          u.snapshot
        );
      }
      async function zc(e, t, n) {
        const r = ol(e);
        try {
          const e = await (function (e, s) {
            const i = e,
              a = Gr.now(),
              o = s.reduce((e, t) => e.add(t.key), pa());
            let u, h;
            return i.persistence
              .runTransaction("Locally write mutations", "readwrite", (n) => {
                let t = ua,
                  r = pa();
                return i.Xi.getEntries(n, o)
                  .next((e) => {
                    (t = e),
                      t.forEach((e, t) => {
                        t.isValidDocument() || (r = r.add(e));
                      });
                  })
                  .next(() => i.tr.ts(n, t))
                  .next((e) => {
                    u = e;
                    const t = [];
                    for (const n of s) {
                      const s = (function (e, t) {
                        let n = null;
                        for (const r of e.fieldTransforms) {
                          const e = t.data.field(r.field),
                            s = Oi(r.transform, e || null);
                          null != s &&
                            (null === n && (n = Fs.empty()), n.set(r.field, s));
                        }
                        return n || null;
                      })(n, u.get(n.key).overlayedDocument);
                      null != s &&
                        t.push(
                          new Ji(
                            n.key,
                            s,
                            (function r(e) {
                              const s = [];
                              return (
                                Wr(e.fields, (e, t) => {
                                  const n = new ss([e]);
                                  if (Rs(t)) {
                                    const e = r(t.mapValue).fields;
                                    if (0 === e.length) s.push(n);
                                    else for (const t of e) s.push(n.child(t));
                                  } else s.push(n);
                                }),
                                new is(s)
                              );
                            })(s.value.mapValue),
                            Gi.exists(!0)
                          )
                        );
                    }
                    return i.jn.addMutationBatch(n, a, t, s);
                  })
                  .next((e) => {
                    var t = (h = e).applyToLocalDocumentSet(u, r);
                    return i.Wn.saveOverlays(n, e.batchId, t);
                  });
              })
              .then(() => {
                let n = ca();
                return (
                  u.forEach((e, t) => (n = n.insert(e, t.overlayedDocument))),
                  { batchId: h.batchId, changes: n }
                );
              });
          })(r.localStore, t);
          r.sharedClientState.addPendingMutation(e.batchId),
            (function (e, t, n) {
              let r = e.ya[e.currentUser.toKey()];
              (r = r || new Qr(qr)),
                (r = r.insert(t, n)),
                (e.ya[e.currentUser.toKey()] = r);
            })(r, e.batchId, n),
            await nl(r, e.changes),
            await yc(r.remoteStore);
        } catch (e) {
          const t = Sc(e, "Failed to persist write");
          n.reject(t);
        }
      }
      async function Wc(e, t) {
        const r = e;
        try {
          const e = await Ah(r.localStore, t);
          t.targetChanges.forEach((e, t) => {
            const n = r.ma.get(t);
            n &&
              (Dr(
                e.addedDocuments.size +
                  e.modifiedDocuments.size +
                  e.removedDocuments.size <=
                  1
              ),
              0 < e.addedDocuments.size
                ? (n.ha = !0)
                : 0 < e.modifiedDocuments.size
                ? Dr(n.ha)
                : 0 < e.removedDocuments.size && (Dr(n.ha), (n.ha = !1)));
          }),
            await nl(r, e, t);
        } catch (e) {
          await Pu(e);
        }
      }
      function Hc(r, s, e) {
        const t = r;
        if ((t.isPrimaryClient && 0 === e) || (!t.isPrimaryClient && 1 === e)) {
          const r = [];
          t.fa.forEach((e, t) => {
            var n = t.view.ku(s);
            n.snapshot && r.push(n.snapshot);
          }),
            (function (e, n) {
              const t = e;
              t.onlineState = n;
              let r = !1;
              t.queries.forEach((e, t) => {
                for (const e of t.listeners) e.ku(n) && (r = !0);
              }),
                r && Oc(t);
            })(t.eventManager, s),
            r.length && t.la.nu(r),
            (t.onlineState = s),
            t.isPrimaryClient && t.sharedClientState.setOnlineState(s);
        }
      }
      async function Qc(e, t) {
        const n = e,
          r = t.batch.batchId;
        try {
          const e = await (function (e, r) {
            const s = e;
            return s.persistence.runTransaction(
              "Acknowledge batch",
              "readwrite-primary",
              (e) => {
                const t = r.batch.keys(),
                  n = s.Xi.newChangeBuffer({ trackRemovals: !0 });
                return (function (e, t, r, s) {
                  const i = r.batch,
                    n = i.keys();
                  let a = xo.resolve();
                  return (
                    n.forEach((n) => {
                      a = a
                        .next(() => s.getEntry(t, n))
                        .next((e) => {
                          var t = r.docVersions.get(n);
                          Dr(null !== t),
                            e.version.compareTo(t) < 0 &&
                              (i.applyToRemoteDocument(e, r),
                              e.isValidDocument() &&
                                (e.setReadTime(r.commitVersion),
                                s.addEntry(e)));
                        });
                    }),
                    a.next(() => e.jn.removeMutationBatch(t, i))
                  );
                })(s, e, r, n)
                  .next(() => n.apply(e))
                  .next(() => s.jn.performConsistencyCheck(e))
                  .next(() =>
                    s.Wn.removeOverlaysForBatchId(e, t, r.batch.batchId)
                  )
                  .next(() =>
                    s.tr.ns(
                      e,
                      (function (e) {
                        let t = pa();
                        for (let n = 0; n < e.mutationResults.length; ++n)
                          0 < e.mutationResults[n].transformResults.length &&
                            (t = t.add(e.batch.mutations[n].key));
                        return t;
                      })(r)
                    )
                  )
                  .next(() => s.tr.Jn(e, t));
              }
            );
          })(n.localStore, t);
          Xc(n, r, null),
            Yc(n, r),
            n.sharedClientState.updateMutationState(r, "acknowledged"),
            await nl(n, e);
        } catch (e) {
          await Pu(e);
        }
      }
      function Yc(e, t) {
        (e.pa.get(t) || []).forEach((e) => {
          e.resolve();
        }),
          e.pa.delete(t);
      }
      function Xc(e, t, n) {
        const r = e;
        let s = r.ya[r.currentUser.toKey()];
        if (s) {
          const e = s.get(t);
          e && (n ? e.reject(n) : e.resolve(), (s = s.remove(t))),
            (r.ya[r.currentUser.toKey()] = s);
        }
      }
      function Jc(t, e, n = null) {
        t.sharedClientState.removeLocalQueryTarget(e);
        for (const r of t.da.get(e)) t.fa.delete(r), n && t.la.Aa(r, n);
        t.da.delete(e),
          t.isPrimaryClient &&
            t.ga.Is(e).forEach((e) => {
              t.ga.containsKey(e) || Zc(t, e);
            });
      }
      function Zc(e, t) {
        e._a.delete(t.path.canonicalString());
        var n = e.wa.get(t);
        null !== n &&
          (uc(e.remoteStore, n),
          (e.wa = e.wa.remove(t)),
          e.ma.delete(n),
          tl(e));
      }
      function el(e, t, n) {
        for (const r of n)
          r instanceof Uc
            ? (e.ga.addReference(r.key, t),
              (function (e, t) {
                const n = t.key,
                  r = n.path.canonicalString();
                e.wa.get(n) ||
                  e._a.has(r) ||
                  (Er("SyncEngine", "New document in limbo: " + n),
                  e._a.add(r),
                  tl(e));
              })(e, r))
            : r instanceof Bc
            ? (Er("SyncEngine", "Document no longer in limbo: " + r.key),
              e.ga.removeReference(r.key, t),
              e.ga.containsKey(r.key) || Zc(e, r.key))
            : Ar();
      }
      function tl(e) {
        for (; 0 < e._a.size && e.wa.size < e.maxConcurrentLimboResolutions; ) {
          var t = e._a.values().next().value;
          e._a.delete(t);
          var n = new vs(ns.fromString(t)),
            t = e.Ia.next();
          e.ma.set(t, new Kc(n)),
            (e.wa = e.wa.insert(n, t)),
            oc(e.remoteStore, new Ko(Ii(pi(n.path)), t, 2, Ur.A));
        }
      }
      async function nl(e, t, r) {
        const s = e,
          i = [],
          a = [],
          o = [];
        s.fa.isEmpty() ||
          (s.fa.forEach((e, n) => {
            o.push(
              s.Ea(n, t, r).then((e) => {
                var t;
                e &&
                  (s.isPrimaryClient &&
                    s.sharedClientState.updateQueryState(
                      n.targetId,
                      e.fromCache ? "not-current" : "current"
                    ),
                  i.push(e),
                  (t = bh.Bi(n.targetId, e)),
                  a.push(t));
              })
            );
          }),
          await Promise.all(o),
          s.la.nu(i),
          await (async function (e, t) {
            const r = e;
            try {
              await r.persistence.runTransaction(
                "notifyLocalViewChanges",
                "readwrite",
                (n) =>
                  xo.forEach(t, (t) =>
                    xo
                      .forEach(t.Fi, (e) =>
                        r.persistence.referenceDelegate.addReference(
                          n,
                          t.targetId,
                          e
                        )
                      )
                      .next(() =>
                        xo.forEach(t.$i, (e) =>
                          r.persistence.referenceDelegate.removeReference(
                            n,
                            t.targetId,
                            e
                          )
                        )
                      )
                  )
              );
            } catch (e) {
              if (!Oo(e)) throw e;
              Er("LocalStore", "Failed to update sequence numbers: " + e);
            }
            for (const e of t) {
              const t = e.targetId;
              if (!e.fromCache) {
                const e = r.Hi.get(t),
                  n = e.snapshotVersion,
                  s = e.withLastLimboFreeSnapshotVersion(n);
                r.Hi = r.Hi.insert(t, s);
              }
            }
          })(s.localStore, a));
      }
      async function rl(r, e) {
        const s = r;
        if ((al(s), ol(s), !0 === e && !0 !== s.Ta)) {
          const r = s.sharedClientState.getAllActiveQueryTargets(),
            e = await sl(s, r.toArray());
          (s.Ta = !0), await Ic(s.remoteStore, !0);
          for (const r of e) oc(s.remoteStore, r);
        } else if (!1 === e && !1 !== s.Ta) {
          const r = [];
          let n = Promise.resolve();
          s.da.forEach((e, t) => {
            s.sharedClientState.isLocalQueryTarget(t)
              ? r.push(t)
              : (n = n.then(() => (Jc(s, t), Nh(s.localStore, t, !0)))),
              uc(s.remoteStore, t);
          }),
            await n,
            await sl(s, r),
            (function () {
              const n = s;
              n.ma.forEach((e, t) => {
                uc(n.remoteStore, t);
              }),
                n.ga.Ts(),
                (n.ma = new Map()),
                (n.wa = new Qr(vs.comparator));
            })(),
            (s.Ta = !1),
            await Ic(s.remoteStore, !1);
        }
      }
      async function sl(t, n) {
        const r = t,
          s = [],
          i = [];
        for (const t of n) {
          let e;
          const c = r.da.get(t);
          if (c && 0 !== c.length) {
            e = await xh(r.localStore, Ii(c[0]));
            for (const t of c) {
              const n = r.fa.get(t),
                c =
                  ((a = r),
                  (o = n),
                  (h = u = void 0),
                  (h = await Ch((u = a).localStore, o.query, !0)),
                  (h = o.view.aa(h)),
                  u.isPrimaryClient && el(u, o.targetId, h.oa),
                  await h);
              c.snapshot && i.push(c.snapshot);
            }
          } else {
            const c = await kh(r.localStore, t);
            (e = await xh(r.localStore, c)), await $c(r, il(c), t, !1);
          }
          s.push(e);
        }
        var a, o, u, h;
        return r.la.nu(i), s;
      }
      function il(e) {
        return mi(
          e.path,
          e.collectionGroup,
          e.orderBy,
          e.filters,
          e.limit,
          "F",
          e.startAt,
          e.endAt
        );
      }
      function al(e) {
        const t = e;
        return (
          (t.remoteStore.remoteSyncer.applyRemoteEvent = Wc.bind(null, t)),
          (t.remoteStore.remoteSyncer.getRemoteKeysForTarget = function (e, t) {
            const n = e,
              r = n.ma.get(t);
            if (r && r.ha) return pa().add(r.key);
            {
              let e = pa();
              const r = n.da.get(t);
              if (!r) return e;
              for (const t of r) {
                const r = n.fa.get(t);
                e = e.unionWith(r.view.ta);
              }
              return e;
            }
          }.bind(null, t)),
          (t.remoteStore.remoteSyncer.rejectListen = async function (e, t, n) {
            const r = e;
            r.sharedClientState.updateQueryState(t, "rejected", n);
            const s = r.ma.get(t),
              i = s && s.key;
            if (i) {
              let e = new Qr(vs.comparator);
              e = e.insert(i, Ps.newNoDocument(i, $r.min()));
              const n = pa().add(i),
                s = new va($r.min(), new Map(), new Jr(qr), e, n);
              await Wc(r, s), (r.wa = r.wa.remove(i)), r.ma.delete(t), tl(r);
            } else
              await Nh(r.localStore, t, !1)
                .then(() => Jc(r, t, n))
                .catch(Pu);
          }.bind(null, t)),
          (t.la.nu = function (e, t) {
            const n = e;
            let r = !1;
            for (const e of t) {
              const t = e.query,
                s = n.queries.get(t);
              if (s) {
                for (const t of s.listeners) t.Ou(e) && (r = !0);
                s.xu = e;
              }
            }
            r && Oc(n);
          }.bind(null, t.eventManager)),
          (t.la.Aa = function (e, t, n) {
            const r = e,
              s = r.queries.get(t);
            if (s) for (const e of s.listeners) e.onError(n);
            r.queries.delete(t);
          }.bind(null, t.eventManager)),
          t
        );
      }
      function ol(e) {
        const t = e;
        return (
          (t.remoteStore.remoteSyncer.applySuccessfulWrite = Qc.bind(null, t)),
          (t.remoteStore.remoteSyncer.rejectFailedWrite = async function (
            e,
            t,
            n
          ) {
            const r = e;
            try {
              const e = await (function (e, r) {
                const s = e;
                return s.persistence.runTransaction(
                  "Reject batch",
                  "readwrite-primary",
                  (t) => {
                    let n;
                    return s.jn
                      .lookupMutationBatch(t, r)
                      .next(
                        (e) => (
                          Dr(null !== e),
                          (n = e.keys()),
                          s.jn.removeMutationBatch(t, e)
                        )
                      )
                      .next(() => s.jn.performConsistencyCheck(t))
                      .next(() => s.Wn.removeOverlaysForBatchId(t, n, r))
                      .next(() => s.tr.ns(t, n))
                      .next(() => s.tr.Jn(t, n));
                  }
                );
              })(r.localStore, t);
              Xc(r, t, n),
                Yc(r, t),
                r.sharedClientState.updateMutationState(t, "rejected", n),
                await nl(r, e);
            } catch (n) {
              await Pu(n);
            }
          }.bind(null, t)),
          t
        );
      }
      class ul {
        constructor() {
          this.synchronizeTabs = !1;
        }
        async initialize(e) {
          (this.O = Xh(e.databaseInfo.databaseId)),
            (this.sharedClientState = this.Pa(e)),
            (this.persistence = this.ba(e)),
            await this.persistence.start(),
            (this.gcScheduler = this.Va(e)),
            (this.localStore = this.va(e));
        }
        Va(e) {
          return null;
        }
        va(e) {
          return Th(this.persistence, new Ih(), e.initialUser, this.O);
        }
        ba(e) {
          return new ch(dh.Ws, this.O);
        }
        Pa(e) {
          return new Kh();
        }
        async terminate() {
          this.gcScheduler && this.gcScheduler.stop(),
            await this.sharedClientState.shutdown(),
            await this.persistence.shutdown();
        }
      }
      class hl extends ul {
        constructor(e, t, n) {
          super(),
            (this.Sa = e),
            (this.cacheSizeBytes = t),
            (this.forceOwnership = n),
            (this.synchronizeTabs = !1);
        }
        async initialize(e) {
          await super.initialize(e),
            await this.Sa.initialize(this, e),
            await ol(this.Sa.syncEngine),
            await yc(this.Sa.remoteStore),
            await this.persistence.pi(
              () => (
                this.gcScheduler &&
                  !this.gcScheduler.started &&
                  this.gcScheduler.start(this.localStore),
                Promise.resolve()
              )
            );
        }
        va(e) {
          return Th(this.persistence, new Ih(), e.initialUser, this.O);
        }
        Va(e) {
          var t = this.persistence.referenceDelegate.garbageCollector;
          return new qu(t, e.asyncQueue);
        }
        ba(e) {
          var t = wh(e.databaseInfo.databaseId, e.databaseInfo.persistenceKey),
            n =
              void 0 !== this.cacheSizeBytes
                ? Su.withCacheSize(this.cacheSizeBytes)
                : Su.DEFAULT;
          return new ph(
            this.synchronizeTabs,
            t,
            e.clientId,
            n,
            e.asyncQueue,
            Qh(),
            Yh(),
            this.O,
            this.sharedClientState,
            !!this.forceOwnership
          );
        }
        Pa(e) {
          return new Kh();
        }
      }
      class cl extends hl {
        constructor(e, t) {
          super(e, t, !1),
            (this.Sa = e),
            (this.cacheSizeBytes = t),
            (this.synchronizeTabs = !0);
        }
        async initialize(e) {
          await super.initialize(e);
          var t = this.Sa.syncEngine;
          this.sharedClientState instanceof jh &&
            ((this.sharedClientState.syncEngine = {
              jr: async function (e, t, n, r) {
                var s = e,
                  i = await (function (e, n) {
                    const r = e,
                      s = r.jn;
                    return r.persistence.runTransaction(
                      "Lookup mutation documents",
                      "readonly",
                      (t) =>
                        s
                          .fn(t, n)
                          .next((e) => (e ? r.tr.Jn(t, e) : xo.resolve(null)))
                    );
                  })(s.localStore, t);
                null !== i
                  ? ("pending" === n
                      ? await yc(s.remoteStore)
                      : "acknowledged" === n || "rejected" === n
                      ? (Xc(s, t, r || null), Yc(s, t), s.localStore.jn._n(t))
                      : Ar(),
                    await nl(s, i))
                  : Er(
                      "SyncEngine",
                      "Cannot apply mutation batch with id: " + t
                    );
              }.bind(null, t),
              Wr: async function (e, t, n, r) {
                const s = e;
                if (s.Ta)
                  Er(
                    "SyncEngine",
                    "Ignoring unexpected query state notification."
                  );
                else {
                  var i = s.da.get(t);
                  if (i && 0 < i.length)
                    switch (n) {
                      case "current":
                      case "not-current": {
                        const e = await Rh(s.localStore, Di(i[0])),
                          r = va.createSynthesizedRemoteEventForCurrentChange(
                            t,
                            "current" === n
                          );
                        await nl(s, e, r);
                        break;
                      }
                      case "rejected":
                        await Nh(s.localStore, t, !0), Jc(s, t, r);
                        break;
                      default:
                        Ar();
                    }
                }
              }.bind(null, t),
              zr: async function (e, t, n) {
                const r = al(e);
                if (r.Ta) {
                  for (const e of t)
                    if (r.da.has(e))
                      Er("SyncEngine", "Adding an already active target " + e);
                    else {
                      const t = await kh(r.localStore, e),
                        n = await xh(r.localStore, t);
                      await $c(r, il(t), n.targetId, !1), oc(r.remoteStore, n);
                    }
                  for (const e of n)
                    r.da.has(e) &&
                      (await Nh(r.localStore, e, !1)
                        .then(() => {
                          uc(r.remoteStore, e), Jc(r, e);
                        })
                        .catch(Pu));
                }
              }.bind(null, t),
              Oi: function (e) {
                return e.localStore.persistence.Oi();
              }.bind(null, t),
              Qr: async function (e, t) {
                const n = e;
                return Rh(n.localStore, t).then((e) => nl(n, e));
              }.bind(null, t),
            }),
            await this.sharedClientState.start()),
            await this.persistence.pi(async (e) => {
              await rl(this.Sa.syncEngine, e),
                this.gcScheduler &&
                  (e && !this.gcScheduler.started
                    ? this.gcScheduler.start(this.localStore)
                    : e || this.gcScheduler.stop());
            });
        }
        Pa(e) {
          var t = Qh();
          if (!jh.vt(t))
            throw new Nr(
              xr.UNIMPLEMENTED,
              "IndexedDB persistence is only available on platforms that support LocalStorage."
            );
          var n = wh(e.databaseInfo.databaseId, e.databaseInfo.persistenceKey);
          return new jh(t, e.asyncQueue, n, e.clientId, e.initialUser);
        }
      }
      class ll {
        async initialize(e, t) {
          this.localStore ||
            ((this.localStore = e.localStore),
            (this.sharedClientState = e.sharedClientState),
            (this.datastore = this.createDatastore(t)),
            (this.remoteStore = this.createRemoteStore(t)),
            (this.eventManager = this.createEventManager(t)),
            (this.syncEngine = this.createSyncEngine(t, !e.synchronizeTabs)),
            (this.sharedClientState.onlineStateHandler = (e) =>
              Hc(this.syncEngine, e, 1)),
            (this.remoteStore.remoteSyncer.handleCredentialChange =
              async function (e, t) {
                const n = e;
                if (!n.currentUser.isEqual(t)) {
                  Er("SyncEngine", "User change. New user:", t.toKey());
                  const r = await _h(n.localStore, t);
                  (n.currentUser = t),
                    (e = n).pa.forEach((e) => {
                      e.forEach((e) => {
                        e.reject(
                          new Nr(
                            xr.CANCELLED,
                            "'waitForPendingWrites' promise is rejected due to a user change."
                          )
                        );
                      });
                    }),
                    e.pa.clear(),
                    n.sharedClientState.handleUserChange(
                      t,
                      r.removedBatchIds,
                      r.addedBatchIds
                    ),
                    await nl(n, r.er);
                }
              }.bind(null, this.syncEngine)),
            await Ic(this.remoteStore, this.syncEngine.isPrimaryClient));
        }
        createEventManager(e) {
          return new Cc();
        }
        createDatastore(e) {
          var t,
            n,
            r,
            s,
            i = Xh(e.databaseInfo.databaseId),
            t = ((t = e.databaseInfo), new Hh(t));
          return (
            (n = e.authCredentials),
            (r = e.appCheckCredentials),
            (s = t),
            (e = i),
            new nc(n, r, s, e)
          );
        }
        createRemoteStore(e) {
          return (
            (t = this.localStore),
            (n = this.datastore),
            (r = e.asyncQueue),
            (s = (e) => Hc(this.syncEngine, e, 0)),
            (i = new ($h.vt() ? $h : Gh)()),
            new sc(t, n, r, s, i)
          );
          var t, n, r, s, i;
        }
        createSyncEngine(e, t) {
          return (function (e, t, n, r, s, i, a) {
            const o = new Gc(e, t, n, r, s, i);
            return a && (o.Ta = !0), o;
          })(
            this.localStore,
            this.remoteStore,
            this.eventManager,
            this.sharedClientState,
            e.initialUser,
            e.maxConcurrentLimboResolutions,
            t
          );
        }
        terminate() {
          return (async function (e) {
            const t = e;
            Er("RemoteStore", "RemoteStore shutting down."),
              t.Au.add(5),
              await ac(t),
              t.Pu.shutdown(),
              t.bu.set("Unknown");
          })(this.remoteStore);
        }
      }
      function dl(t, n = 10240) {
        let r = 0;
        return {
          async read() {
            if (r < t.byteLength) {
              var e = { value: t.slice(r, r + n), done: !1 };
              return (r += n), e;
            }
            return { done: !0 };
          },
          async cancel() {},
          releaseLock() {},
          closed: Promise.reject("unimplemented"),
        };
      }
      class fl {
        constructor(e) {
          (this.observer = e), (this.muted = !1);
        }
        next(e) {
          this.observer.next && this.Da(this.observer.next, e);
        }
        error(e) {
          this.observer.error
            ? this.Da(this.observer.error, e)
            : console.error("Uncaught Error in snapshot listener:", e);
        }
        Ca() {
          this.muted = !0;
        }
        Da(e, t) {
          this.muted ||
            setTimeout(() => {
              this.muted || e(t);
            }, 0);
        }
      }
      class gl {
        constructor(e, t) {
          (this.xa = e),
            (this.O = t),
            (this.metadata = new Cr()),
            (this.buffer = new Uint8Array()),
            (this.Na = new TextDecoder("utf-8")),
            this.ka().then(
              (e) => {
                e && e.Ku()
                  ? this.metadata.resolve(e.payload.metadata)
                  : this.metadata.reject(
                      new Error(
                        `The first element of the bundle is not a metadata, it is\n             ${JSON.stringify(
                          null == e ? void 0 : e.payload
                        )}`
                      )
                    );
              },
              (e) => this.metadata.reject(e)
            );
        }
        close() {
          return this.xa.cancel();
        }
        async getMetadata() {
          return this.metadata.promise;
        }
        async Ra() {
          return await this.getMetadata(), this.ka();
        }
        async ka() {
          var e = await this.Oa();
          if (null === e) return null;
          var t = this.Na.decode(e),
            n = Number(t);
          isNaN(n) && this.Ma(`length string (${t}) is not valid number`);
          t = await this.Fa(n);
          return new Vc(JSON.parse(t), e.length + n);
        }
        $a() {
          return this.buffer.findIndex((e) => e === "{".charCodeAt(0));
        }
        async Oa() {
          for (; this.$a() < 0 && !(await this.Ba()); );
          if (0 === this.buffer.length) return null;
          var e = this.$a();
          e < 0 &&
            this.Ma(
              "Reached the end of bundle when a length string is expected."
            );
          var t = this.buffer.slice(0, e);
          return (this.buffer = this.buffer.slice(e)), t;
        }
        async Fa(e) {
          for (; this.buffer.length < e; )
            (await this.Ba()) &&
              this.Ma("Reached the end of bundle when more is expected.");
          var t = this.Na.decode(this.buffer.slice(0, e));
          return (this.buffer = this.buffer.slice(e)), t;
        }
        Ma(e) {
          throw (this.xa.cancel(), new Error(`Invalid bundle format: ${e}`));
        }
        async Ba() {
          var e = await this.xa.read();
          if (!e.done) {
            const t = new Uint8Array(this.buffer.length + e.value.length);
            t.set(this.buffer),
              t.set(e.value, this.buffer.length),
              (this.buffer = t);
          }
          return e.done;
        }
      }
      class ml {
        constructor(e) {
          (this.datastore = e),
            (this.readVersions = new Map()),
            (this.mutations = []),
            (this.committed = !1),
            (this.lastWriteError = null),
            (this.writtenDocs = new Set());
        }
        async lookup(e) {
          if ((this.ensureCommitNotCalled(), 0 < this.mutations.length))
            throw new Nr(
              xr.INVALID_ARGUMENT,
              "Firestore transactions require all reads to be executed before all writes."
            );
          const t = await (async function (e, t) {
            const r = e,
              n = Ua(r.O) + "/documents",
              s = { documents: t.map((e) => Va(r.O, e)) },
              i = await r.Ao("BatchGetDocuments", n, s),
              a = new Map();
            i.forEach((e) => {
              const t =
                ((n = r.O),
                "found" in (e = e)
                  ? (function (e, t) {
                      Dr(!!t.found), t.found.name, t.found.updateTime;
                      var n = Ma(e, t.found.name),
                        r = Ra(t.found.updateTime),
                        s = new Fs({ mapValue: { fields: t.found.fields } });
                      return Ps.newFoundDocument(n, r, s);
                    })(n, e)
                  : "missing" in e
                  ? (function (e, t) {
                      Dr(!!t.missing), Dr(!!t.readTime);
                      var n = Ma(e, t.missing),
                        r = Ra(t.readTime);
                      return Ps.newNoDocument(n, r);
                    })(n, e)
                  : Ar());
              var n;
              a.set(t.key.toString(), t);
            });
            const o = [];
            return (
              t.forEach((e) => {
                var t = a.get(e.toString());
                Dr(!!t), o.push(t);
              }),
              o
            );
          })(this.datastore, e);
          return t.forEach((e) => this.recordVersion(e)), t;
        }
        set(e, t) {
          this.write(t.toMutation(e, this.precondition(e))),
            this.writtenDocs.add(e.toString());
        }
        update(e, t) {
          try {
            this.write(t.toMutation(e, this.preconditionForUpdate(e)));
          } catch (e) {
            this.lastWriteError = e;
          }
          this.writtenDocs.add(e.toString());
        }
        delete(e) {
          this.write(new na(e, this.precondition(e))),
            this.writtenDocs.add(e.toString());
        }
        async commit() {
          if ((this.ensureCommitNotCalled(), this.lastWriteError))
            throw this.lastWriteError;
          const t = this.readVersions;
          this.mutations.forEach((e) => {
            t.delete(e.key.toString());
          }),
            t.forEach((e, t) => {
              var n = vs.fromPath(t);
              this.mutations.push(new ra(n, this.precondition(n)));
            }),
            await (async function (e, t) {
              const n = e,
                r = Ua(n.O) + "/documents",
                s = { writes: t.map((e) => Ka(n.O, e)) };
              await n.po("Commit", r, s);
            })(this.datastore, this.mutations),
            (this.committed = !0);
        }
        recordVersion(e) {
          let t;
          if (e.isFoundDocument()) t = e.version;
          else {
            if (!e.isNoDocument()) throw Ar();
            t = $r.min();
          }
          var n = this.readVersions.get(e.key.toString());
          if (n) {
            if (!t.isEqual(n))
              throw new Nr(
                xr.ABORTED,
                "Document version changed between two reads."
              );
          } else this.readVersions.set(e.key.toString(), t);
        }
        precondition(e) {
          var t = this.readVersions.get(e.toString());
          return !this.writtenDocs.has(e.toString()) && t
            ? Gi.updateTime(t)
            : Gi.none();
        }
        preconditionForUpdate(e) {
          const t = this.readVersions.get(e.toString());
          if (this.writtenDocs.has(e.toString()) || !t) return Gi.exists(!0);
          if (t.isEqual($r.min()))
            throw new Nr(
              xr.INVALID_ARGUMENT,
              "Can't update a document that doesn't exist."
            );
          return Gi.updateTime(t);
        }
        write(e) {
          this.ensureCommitNotCalled(), this.mutations.push(e);
        }
        ensureCommitNotCalled() {}
      }
      class pl {
        constructor(e, t, n, r, s) {
          (this.asyncQueue = e),
            (this.datastore = t),
            (this.options = n),
            (this.updateFunction = r),
            (this.deferred = s),
            (this.La = n.maxAttempts),
            (this.Uo = new Jh(this.asyncQueue, "transaction_retry"));
        }
        run() {
          --this.La, this.Ua();
        }
        Ua() {
          this.Uo.xo(async () => {
            const t = new ml(this.datastore),
              e = this.qa(t);
            e &&
              e
                .then((e) => {
                  this.asyncQueue.enqueueAndForget(() =>
                    t
                      .commit()
                      .then(() => {
                        this.deferred.resolve(e);
                      })
                      .catch((e) => {
                        this.Ka(e);
                      })
                  );
                })
                .catch((e) => {
                  this.Ka(e);
                });
          });
        }
        qa(e) {
          try {
            var t = this.updateFunction(e);
            return !ms(t) && t.catch && t.then
              ? t
              : (this.deferred.reject(
                  Error("Transaction callback must return a Promise")
                ),
                null);
          } catch (e) {
            return this.deferred.reject(e), null;
          }
        }
        Ka(e) {
          0 < this.La && this.Ga(e)
            ? (--this.La,
              this.asyncQueue.enqueueAndForget(
                () => (this.Ua(), Promise.resolve())
              ))
            : this.deferred.reject(e);
        }
        Ga(e) {
          if ("FirebaseError" !== e.name) return !1;
          var t = e.code;
          return "aborted" === t || "failed-precondition" === t || !ia(t);
        }
      }
      class yl {
        constructor(e, t, n, r) {
          (this.authCredentials = e),
            (this.appCheckCredentials = t),
            (this.asyncQueue = n),
            (this.databaseInfo = r),
            (this.user = vr.UNAUTHENTICATED),
            (this.clientId = Br.R()),
            (this.authCredentialListener = () => Promise.resolve()),
            (this.appCheckCredentialListener = () => Promise.resolve()),
            this.authCredentials.start(n, async (e) => {
              Er("FirestoreClient", "Received user=", e.uid),
                await this.authCredentialListener(e),
                (this.user = e);
            }),
            this.appCheckCredentials.start(
              n,
              (e) => (
                Er("FirestoreClient", "Received new app check token=", e),
                this.appCheckCredentialListener(e, this.user)
              )
            );
        }
        async getConfiguration() {
          return {
            asyncQueue: this.asyncQueue,
            databaseInfo: this.databaseInfo,
            clientId: this.clientId,
            authCredentials: this.authCredentials,
            appCheckCredentials: this.appCheckCredentials,
            initialUser: this.user,
            maxConcurrentLimboResolutions: 100,
          };
        }
        setCredentialChangeListener(e) {
          this.authCredentialListener = e;
        }
        setAppCheckTokenChangeListener(e) {
          this.appCheckCredentialListener = e;
        }
        verifyNotTerminated() {
          if (this.asyncQueue.isShuttingDown)
            throw new Nr(
              xr.FAILED_PRECONDITION,
              "The client has already been terminated."
            );
        }
        terminate() {
          this.asyncQueue.enterRestrictedMode();
          const n = new Cr();
          return (
            this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async () => {
              try {
                this.onlineComponents &&
                  (await this.onlineComponents.terminate()),
                  this.offlineComponents &&
                    (await this.offlineComponents.terminate()),
                  this.authCredentials.shutdown(),
                  this.appCheckCredentials.shutdown(),
                  n.resolve();
              } catch (e) {
                var t = Sc(e, "Failed to shutdown persistence");
                n.reject(t);
              }
            }),
            n.promise
          );
        }
      }
      async function vl(e, t) {
        e.asyncQueue.verifyOperationInProgress(),
          Er("FirestoreClient", "Initializing OfflineComponentProvider");
        var n = await e.getConfiguration();
        await t.initialize(n);
        let r = n.initialUser;
        e.setCredentialChangeListener(async (e) => {
          r.isEqual(e) || (await _h(t.localStore, e), (r = e));
        }),
          t.persistence.setDatabaseDeletedListener(() => e.terminate()),
          (e.offlineComponents = t);
      }
      async function wl(e, n) {
        e.asyncQueue.verifyOperationInProgress();
        var t = await bl(e);
        Er("FirestoreClient", "Initializing OnlineComponentProvider");
        var r = await e.getConfiguration();
        await n.initialize(t, r),
          e.setCredentialChangeListener((e) => bc(n.remoteStore, e)),
          e.setAppCheckTokenChangeListener((e, t) => bc(n.remoteStore, t)),
          (e.onlineComponents = n);
      }
      async function bl(e) {
        return (
          e.offlineComponents ||
            (Er("FirestoreClient", "Using default OfflineComponentProvider"),
            await vl(e, new ul())),
          e.offlineComponents
        );
      }
      async function Il(e) {
        return (
          e.onlineComponents ||
            (Er("FirestoreClient", "Using default OnlineComponentProvider"),
            await wl(e, new ll())),
          e.onlineComponents
        );
      }
      function El(e) {
        return bl(e).then((e) => e.persistence);
      }
      function Tl(e) {
        return bl(e).then((e) => e.localStore);
      }
      function _l(e) {
        return Il(e).then((e) => e.remoteStore);
      }
      function Sl(e) {
        return Il(e).then((e) => e.syncEngine);
      }
      async function Al(e) {
        const t = await Il(e),
          n = t.eventManager;
        return (
          (n.onListen = async function (e, t) {
            const n = al(e);
            let r, s;
            const i = n.fa.get(t);
            if (i)
              (r = i.targetId),
                n.sharedClientState.addLocalQueryTarget(r),
                (s = i.view.ca());
            else {
              const e = await xh(n.localStore, Ii(t));
              n.isPrimaryClient && oc(n.remoteStore, e);
              const i = n.sharedClientState.addLocalQueryTarget(e.targetId);
              (r = e.targetId), (s = await $c(n, t, r, "current" === i));
            }
            return s;
          }.bind(null, t.syncEngine)),
          (n.onUnlisten = async function (e, t) {
            const n = e,
              r = n.fa.get(t),
              s = n.da.get(r.targetId);
            if (1 < s.length)
              return (
                n.da.set(
                  r.targetId,
                  s.filter((e) => !Ti(e, t))
                ),
                void n.fa.delete(t)
              );
            n.isPrimaryClient
              ? (n.sharedClientState.removeLocalQueryTarget(r.targetId),
                n.sharedClientState.isActiveQueryTarget(r.targetId) ||
                  (await Nh(n.localStore, r.targetId, !1)
                    .then(() => {
                      n.sharedClientState.clearQueryState(r.targetId),
                        uc(n.remoteStore, r.targetId),
                        Jc(n, r.targetId);
                    })
                    .catch(Pu)))
              : (Jc(n, r.targetId), await Nh(n.localStore, r.targetId, !0));
          }.bind(null, t.syncEngine)),
          n
        );
      }
      function Dl(e, t, n = {}) {
        const r = new Cr();
        return (
          e.asyncQueue.enqueueAndForget(async () =>
            (function (n, r, s, i, a) {
              const e = new fl({
                  next: (e) => {
                    r.enqueueAndForget(() => Rc(n, o));
                    var t = e.docs.has(s);
                    !t && e.fromCache
                      ? a.reject(
                          new Nr(
                            xr.UNAVAILABLE,
                            "Failed to get document because the client is offline."
                          )
                        )
                      : t && e.fromCache && i && "server" === i.source
                      ? a.reject(
                          new Nr(
                            xr.UNAVAILABLE,
                            'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)'
                          )
                        )
                      : a.resolve(e);
                  },
                  error: (e) => a.reject(e),
                }),
                o = new Lc(pi(s.path), e, {
                  includeMetadataChanges: !0,
                  qu: !0,
                });
              return kc(n, o);
            })(await Al(e), e.asyncQueue, t, n, r)
          ),
          r.promise
        );
      }
      function xl(e, t, n = {}) {
        const r = new Cr();
        return (
          e.asyncQueue.enqueueAndForget(async () =>
            (function (t, n, e, r, s) {
              const i = new fl({
                  next: (e) => {
                    n.enqueueAndForget(() => Rc(t, a)),
                      e.fromCache && "server" === r.source
                        ? s.reject(
                            new Nr(
                              xr.UNAVAILABLE,
                              'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)'
                            )
                          )
                        : s.resolve(e);
                  },
                  error: (e) => s.reject(e),
                }),
                a = new Lc(e, i, { includeMetadataChanges: !0, qu: !0 });
              return kc(t, a);
            })(await Al(e), e.asyncQueue, t, n, r)
          ),
          r.promise
        );
      }
      function Nl(e, t, n, r) {
        const s =
          ((n = n),
          (t = Xh(t)),
          (i = "string" == typeof n ? new TextEncoder().encode(n) : n),
          (n = (function (e) {
            if (e instanceof Uint8Array) return dl(e, void 0);
            if (e instanceof ArrayBuffer) return dl(new Uint8Array(e), void 0);
            if (e instanceof ReadableStream) return e.getReader();
            throw new Error(
              "Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream"
            );
          })(i)),
          (t = t),
          new gl(n, t));
        var i;
        e.asyncQueue.enqueueAndForget(async () => {
          !(function (e, t, n) {
            const r = e;
            !(async function (t, n, r) {
              try {
                var s = await n.getMetadata();
                if (
                  await (function (e, t) {
                    const n = e,
                      r = Ra(t.createTime);
                    return n.persistence
                      .runTransaction("hasNewerBundle", "readonly", (e) =>
                        n.Us.getBundleMetadata(e, t.id)
                      )
                      .then((e) => !!e && 0 <= e.createTime.compareTo(r));
                  })(t.localStore, s)
                )
                  return (
                    await n.close(),
                    r._completeWith({
                      taskState: "Success",
                      documentsLoaded: s.totalDocuments,
                      bytesLoaded: s.totalBytes,
                      totalDocuments: s.totalDocuments,
                      totalBytes: s.totalBytes,
                    }),
                    Promise.resolve(new Set())
                  );
                r._updateProgress(Pc(s));
                const a = new Fc(s, t.localStore, n.O);
                let e = await n.Ra();
                for (; e; ) {
                  const t = await a.Qu(e);
                  t && r._updateProgress(t), (e = await n.Ra());
                }
                var i = await a.complete();
                return (
                  await nl(t, i.zu, void 0),
                  await (function (e, t) {
                    const n = e;
                    return n.persistence.runTransaction(
                      "Save bundle",
                      "readwrite",
                      (e) => n.Us.saveBundleMetadata(e, t)
                    );
                  })(t.localStore, s),
                  r._completeWith(i.progress),
                  Promise.resolve(i.Wu)
                );
              } catch (t) {
                return (
                  _r("SyncEngine", `Loading bundle failed with ${t}`),
                  r._failWith(t),
                  Promise.resolve(new Set())
                );
              }
            })(r, t, n).then((e) => {
              r.sharedClientState.notifyBundleLoaded(e);
            });
          })(await Sl(e), s, r);
        });
      }
      const Cl = new Map();
      function kl(e, t, n) {
        if (!n)
          throw new Nr(
            xr.INVALID_ARGUMENT,
            `Function ${e}() cannot be called with an empty ${t}.`
          );
      }
      function Rl(e, t, n, r) {
        if (!0 === t && !0 === r)
          throw new Nr(
            xr.INVALID_ARGUMENT,
            `${e} and ${n} cannot be used together.`
          );
      }
      function Ol(e) {
        if (!vs.isDocumentKey(e))
          throw new Nr(
            xr.INVALID_ARGUMENT,
            `Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`
          );
      }
      function Ll(e) {
        if (vs.isDocumentKey(e))
          throw new Nr(
            xr.INVALID_ARGUMENT,
            `Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`
          );
      }
      function Vl(e) {
        if (void 0 === e) return "undefined";
        if (null === e) return "null";
        if ("string" == typeof e)
          return (
            20 < e.length && (e = `${e.substring(0, 20)}...`), JSON.stringify(e)
          );
        if ("number" == typeof e || "boolean" == typeof e) return "" + e;
        if ("object" != typeof e)
          return "function" == typeof e ? "a function" : Ar();
        if (e instanceof Array) return "an array";
        var t = (e = e).constructor ? e.constructor.name : null;
        return t ? `a custom ${t} object` : "an object";
      }
      function Ml(e, t) {
        if ((e = "_delegate" in e ? e._delegate : e) instanceof t) return e;
        if (t.name === e.constructor.name)
          throw new Nr(
            xr.INVALID_ARGUMENT,
            "Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?"
          );
        var n = Vl(e);
        throw new Nr(
          xr.INVALID_ARGUMENT,
          `Expected type '${t.name}', but it was: ${n}`
        );
      }
      function Fl(e, t) {
        if (t <= 0)
          throw new Nr(
            xr.INVALID_ARGUMENT,
            `Function ${e}() requires a positive number, but it was: ${t}.`
          );
      }
      class Pl {
        constructor(e) {
          var t;
          if (void 0 === e.host) {
            if (void 0 !== e.ssl)
              throw new Nr(
                xr.INVALID_ARGUMENT,
                "Can't provide ssl option if host option is not set"
              );
            (this.host = "firestore.googleapis.com"), (this.ssl = !0);
          } else
            (this.host = e.host),
              (this.ssl = null === (t = e.ssl) || void 0 === t || t);
          if (
            ((this.credentials = e.credentials),
            (this.ignoreUndefinedProperties = !!e.ignoreUndefinedProperties),
            void 0 === e.cacheSizeBytes)
          )
            this.cacheSizeBytes = 41943040;
          else {
            if (-1 !== e.cacheSizeBytes && e.cacheSizeBytes < 1048576)
              throw new Nr(
                xr.INVALID_ARGUMENT,
                "cacheSizeBytes must be at least 1048576"
              );
            this.cacheSizeBytes = e.cacheSizeBytes;
          }
          (this.experimentalForceLongPolling =
            !!e.experimentalForceLongPolling),
            (this.experimentalAutoDetectLongPolling =
              !!e.experimentalAutoDetectLongPolling),
            (this.useFetchStreams = !!e.useFetchStreams),
            Rl(
              "experimentalForceLongPolling",
              e.experimentalForceLongPolling,
              "experimentalAutoDetectLongPolling",
              e.experimentalAutoDetectLongPolling
            );
        }
        isEqual(e) {
          return (
            this.host === e.host &&
            this.ssl === e.ssl &&
            this.credentials === e.credentials &&
            this.cacheSizeBytes === e.cacheSizeBytes &&
            this.experimentalForceLongPolling ===
              e.experimentalForceLongPolling &&
            this.experimentalAutoDetectLongPolling ===
              e.experimentalAutoDetectLongPolling &&
            this.ignoreUndefinedProperties === e.ignoreUndefinedProperties &&
            this.useFetchStreams === e.useFetchStreams
          );
        }
      }
      class Ul {
        constructor(e, t, n) {
          (this._authCredentials = t),
            (this._appCheckCredentials = n),
            (this.type = "firestore-lite"),
            (this._persistenceKey = "(lite)"),
            (this._settings = new Pl({})),
            (this._settingsFrozen = !1),
            e instanceof gs
              ? (this._databaseId = e)
              : ((this._app = e),
                (this._databaseId = (function (e) {
                  if (
                    !Object.prototype.hasOwnProperty.apply(e.options, [
                      "projectId",
                    ])
                  )
                    throw new Nr(
                      xr.INVALID_ARGUMENT,
                      '"projectId" not provided in firebase.initializeApp.'
                    );
                  return new gs(e.options.projectId);
                })(e)));
        }
        get app() {
          if (!this._app)
            throw new Nr(
              xr.FAILED_PRECONDITION,
              "Firestore was not initialized using the Firebase SDK. 'app' is not available"
            );
          return this._app;
        }
        get _initialized() {
          return this._settingsFrozen;
        }
        get _terminated() {
          return void 0 !== this._terminateTask;
        }
        _setSettings(e) {
          if (this._settingsFrozen)
            throw new Nr(
              xr.FAILED_PRECONDITION,
              "Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object."
            );
          (this._settings = new Pl(e)),
            void 0 !== e.credentials &&
              (this._authCredentials = (function (e) {
                if (!e) return new Rr();
                switch (e.type) {
                  case "gapi":
                    var t = e.client;
                    return (
                      Dr(
                        !(
                          "object" != typeof t ||
                          null === t ||
                          !t.auth ||
                          !t.auth.getAuthHeaderValueForFirstParty
                        )
                      ),
                      new Mr(t, e.sessionIndex || "0", e.iamToken || null)
                    );
                  case "provider":
                    return e.client;
                  default:
                    throw new Nr(
                      xr.INVALID_ARGUMENT,
                      "makeAuthCredentialsProvider failed due to invalid credential type"
                    );
                }
              })(e.credentials));
        }
        _getSettings() {
          return this._settings;
        }
        _freezeSettings() {
          return (this._settingsFrozen = !0), this._settings;
        }
        _delete() {
          return (
            this._terminateTask || (this._terminateTask = this._terminate()),
            this._terminateTask
          );
        }
        toJSON() {
          return {
            app: this._app,
            databaseId: this._databaseId,
            settings: this._settings,
          };
        }
        _terminate() {
          return (
            (function (e) {
              const t = Cl.get(e);
              t &&
                (Er("ComponentProvider", "Removing Datastore"),
                Cl.delete(e),
                t.terminate());
            })(this),
            Promise.resolve()
          );
        }
      }
      function Bl(n, e, t, r = {}) {
        var s;
        const i = (n = Ml(n, Ul))._getSettings();
        if (
          ("firestore.googleapis.com" !== i.host &&
            i.host !== e &&
            _r(
              "Host has been set in both settings() and useEmulator(), emulator host will be used"
            ),
          n._setSettings(
            Object.assign(Object.assign({}, i), { host: `${e}:${t}`, ssl: !1 })
          ),
          r.mockUserToken)
        ) {
          let e, t;
          if ("string" == typeof r.mockUserToken)
            (e = r.mockUserToken), (t = vr.MOCK_USER);
          else {
            e = (function (e, t) {
              if (e.uid)
                throw new Error(
                  'The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.'
                );
              var n = t || "demo-project",
                r = e.iat || 0,
                s = e.sub || e.user_id;
              if (!s)
                throw new Error(
                  "mockUserToken must contain 'sub' or 'user_id' field!"
                );
              return (
                (s = Object.assign(
                  {
                    iss: `https://securetoken.google.com/${n}`,
                    aud: n,
                    iat: r,
                    exp: r + 3600,
                    auth_time: r,
                    sub: s,
                    user_id: s,
                    firebase: { sign_in_provider: "custom", identities: {} },
                  },
                  e
                )),
                [
                  a(JSON.stringify({ alg: "none", type: "JWT" })),
                  a(JSON.stringify(s)),
                  "",
                ].join(".")
              );
            })(
              r.mockUserToken,
              null === (s = n._app) || void 0 === s
                ? void 0
                : s.options.projectId
            );
            const i = r.mockUserToken.sub || r.mockUserToken.user_id;
            if (!i)
              throw new Nr(
                xr.INVALID_ARGUMENT,
                "mockUserToken must contain 'sub' or 'user_id' field!"
              );
            t = new vr(i);
          }
          n._authCredentials = new Or(new kr(e, t));
        }
      }
      class ql {
        constructor(e, t, n) {
          (this.converter = t),
            (this._key = n),
            (this.type = "document"),
            (this.firestore = e);
        }
        get _path() {
          return this._key.path;
        }
        get id() {
          return this._key.path.lastSegment();
        }
        get path() {
          return this._key.path.canonicalString();
        }
        get parent() {
          return new Kl(
            this.firestore,
            this.converter,
            this._key.path.popLast()
          );
        }
        withConverter(e) {
          return new ql(this.firestore, e, this._key);
        }
      }
      class jl {
        constructor(e, t, n) {
          (this.converter = t),
            (this._query = n),
            (this.type = "query"),
            (this.firestore = e);
        }
        withConverter(e) {
          return new jl(this.firestore, e, this._query);
        }
      }
      class Kl extends jl {
        constructor(e, t, n) {
          super(e, t, pi(n)), (this._path = n), (this.type = "collection");
        }
        get id() {
          return this._query.path.lastSegment();
        }
        get path() {
          return this._query.path.canonicalString();
        }
        get parent() {
          const e = this._path.popLast();
          return e.isEmpty() ? null : new ql(this.firestore, null, new vs(e));
        }
        withConverter(e) {
          return new Kl(this.firestore, e, this._path);
        }
      }
      function Gl(e, t, ...n) {
        if (((e = m(e)), kl("collection", "path", t), e instanceof Ul)) {
          var r = ns.fromString(t, ...n);
          return Ll(r), new Kl(e, null, r);
        }
        if (!(e instanceof ql || e instanceof Kl))
          throw new Nr(
            xr.INVALID_ARGUMENT,
            "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore"
          );
        r = e._path.child(ns.fromString(t, ...n));
        return Ll(r), new Kl(e.firestore, null, r);
      }
      function $l(e, t, ...n) {
        if (
          ((e = m(e)),
          kl("doc", "path", (t = 1 === arguments.length ? Br.R() : t)),
          e instanceof Ul)
        ) {
          var r = ns.fromString(t, ...n);
          return Ol(r), new ql(e, null, new vs(r));
        }
        if (!(e instanceof ql || e instanceof Kl))
          throw new Nr(
            xr.INVALID_ARGUMENT,
            "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore"
          );
        r = e._path.child(ns.fromString(t, ...n));
        return (
          Ol(r),
          new ql(e.firestore, e instanceof Kl ? e.converter : null, new vs(r))
        );
      }
      function zl(e, t) {
        return (
          (e = m(e)),
          (t = m(t)),
          (e instanceof ql || e instanceof Kl) &&
            (t instanceof ql || t instanceof Kl) &&
            e.firestore === t.firestore &&
            e.path === t.path &&
            e.converter === t.converter
        );
      }
      function Wl(e, t) {
        return (
          (e = m(e)),
          (t = m(t)),
          e instanceof jl &&
            t instanceof jl &&
            e.firestore === t.firestore &&
            Ti(e._query, t._query) &&
            e.converter === t.converter
        );
      }
      class Hl {
        constructor() {
          (this.Qa = Promise.resolve()),
            (this.ja = []),
            (this.Wa = !1),
            (this.za = []),
            (this.Ha = null),
            (this.Ja = !1),
            (this.Ya = !1),
            (this.Xa = []),
            (this.Uo = new Jh(this, "async_queue_retry")),
            (this.Za = () => {
              var e = Yh();
              e &&
                Er(
                  "AsyncQueue",
                  "Visibility state changed to " + e.visibilityState
                ),
                this.Uo.ko();
            });
          const e = Yh();
          e &&
            "function" == typeof e.addEventListener &&
            e.addEventListener("visibilitychange", this.Za);
        }
        get isShuttingDown() {
          return this.Wa;
        }
        enqueueAndForget(e) {
          this.enqueue(e);
        }
        enqueueAndForgetEvenWhileRestricted(e) {
          this.tc(), this.ec(e);
        }
        enterRestrictedMode(e) {
          if (!this.Wa) {
            (this.Wa = !0), (this.Ya = e || !1);
            const t = Yh();
            t &&
              "function" == typeof t.removeEventListener &&
              t.removeEventListener("visibilitychange", this.Za);
          }
        }
        enqueue(e) {
          if ((this.tc(), this.Wa)) return new Promise(() => {});
          const t = new Cr();
          return this.ec(() =>
            this.Wa && this.Ya
              ? Promise.resolve()
              : (e().then(t.resolve, t.reject), t.promise)
          ).then(() => t.promise);
        }
        enqueueRetryable(e) {
          this.enqueueAndForget(() => (this.ja.push(e), this.nc()));
        }
        async nc() {
          if (0 !== this.ja.length) {
            try {
              await this.ja[0](), this.ja.shift(), this.Uo.reset();
            } catch (e) {
              if (!Oo(e)) throw e;
              Er("AsyncQueue", "Operation failed with retryable error: " + e);
            }
            0 < this.ja.length && this.Uo.xo(() => this.nc());
          }
        }
        ec(e) {
          var t = this.Qa.then(
            () => (
              (this.Ja = !0),
              e()
                .catch((e) => {
                  throw (
                    ((this.Ha = e),
                    (this.Ja = !1),
                    Tr(
                      "INTERNAL UNHANDLED ERROR: ",
                      (function (e) {
                        let t = e.message || "";
                        return (
                          e.stack &&
                            (t = e.stack.includes(e.message)
                              ? e.stack
                              : e.message + "\n" + e.stack),
                          t
                        );
                      })(e)
                    ),
                    e)
                  );
                })
                .then((e) => ((this.Ja = !1), e))
            )
          );
          return (this.Qa = t);
        }
        enqueueAfterDelay(e, t, n) {
          this.tc(), -1 < this.Xa.indexOf(e) && (t = 0);
          var r = _c.createAndSchedule(this, e, t, n, (e) => this.sc(e));
          return this.za.push(r), r;
        }
        tc() {
          this.Ha && Ar();
        }
        verifyOperationInProgress() {}
        async ic() {
          for (var e; await (e = this.Qa), e !== this.Qa; );
        }
        rc(e) {
          for (const t of this.za) if (t.timerId === e) return !0;
          return !1;
        }
        oc(t) {
          return this.ic().then(() => {
            this.za.sort((e, t) => e.targetTimeMs - t.targetTimeMs);
            for (const e of this.za)
              if ((e.skipDelay(), "all" !== t && e.timerId === t)) break;
            return this.ic();
          });
        }
        uc(e) {
          this.Xa.push(e);
        }
        sc(e) {
          var t = this.za.indexOf(e);
          this.za.splice(t, 1);
        }
      }
      function Ql(e) {
        return (function (e) {
          if ("object" == typeof e && null !== e) {
            var t = e;
            for (const e of ["next", "error", "complete"])
              if (e in t && "function" == typeof t[e]) return 1;
          }
        })(e);
      }
      class Yl {
        constructor() {
          (this._progressObserver = {}),
            (this._taskCompletionResolver = new Cr()),
            (this._lastProgress = {
              taskState: "Running",
              totalBytes: 0,
              totalDocuments: 0,
              bytesLoaded: 0,
              documentsLoaded: 0,
            });
        }
        onProgress(e, t, n) {
          this._progressObserver = { next: e, error: t, complete: n };
        }
        catch(e) {
          return this._taskCompletionResolver.promise.catch(e);
        }
        then(e, t) {
          return this._taskCompletionResolver.promise.then(e, t);
        }
        _completeWith(e) {
          this._updateProgress(e),
            this._progressObserver.complete &&
              this._progressObserver.complete(),
            this._taskCompletionResolver.resolve(e);
        }
        _failWith(e) {
          (this._lastProgress.taskState = "Error"),
            this._progressObserver.next &&
              this._progressObserver.next(this._lastProgress),
            this._progressObserver.error && this._progressObserver.error(e),
            this._taskCompletionResolver.reject(e);
        }
        _updateProgress(e) {
          (this._lastProgress = e),
            this._progressObserver.next && this._progressObserver.next(e);
        }
      }
      var Xl, Jl, Zl;
      class ed extends Ul {
        constructor(e, t, n) {
          super(e, t, n),
            (this.type = "firestore"),
            (this._queue = new Hl()),
            (this._persistenceKey = "name" in e ? e.name : "[DEFAULT]");
        }
        _terminate() {
          return (
            this._firestoreClient || nd(this), this._firestoreClient.terminate()
          );
        }
      }
      function td(e) {
        return (
          e._firestoreClient || nd(e),
          e._firestoreClient.verifyNotTerminated(),
          e._firestoreClient
        );
      }
      function nd(e) {
        var t,
          n,
          r,
          s,
          i,
          a = e._freezeSettings(),
          a =
            ((n = e._databaseId),
            (r =
              (null === (t = e._app) || void 0 === t
                ? void 0
                : t.options.appId) || ""),
            (s = e._persistenceKey),
            (i = a),
            new fs(
              n,
              r,
              s,
              i.host,
              i.ssl,
              i.experimentalForceLongPolling,
              i.experimentalAutoDetectLongPolling,
              i.useFetchStreams
            ));
        e._firestoreClient = new yl(
          e._authCredentials,
          e._appCheckCredentials,
          e._queue,
          a
        );
      }
      function rd(e, n, r) {
        const s = new Cr();
        return e.asyncQueue
          .enqueue(async () => {
            try {
              await vl(e, r), await wl(e, n), s.resolve();
            } catch (e) {
              if (
                !("FirebaseError" === (t = e).name
                  ? t.code === xr.FAILED_PRECONDITION ||
                    t.code === xr.UNIMPLEMENTED
                  : !(
                      "undefined" != typeof DOMException &&
                      t instanceof DOMException
                    ) ||
                    22 === t.code ||
                    20 === t.code ||
                    11 === t.code)
              )
                throw e;
              console.warn(
                "Error enabling offline persistence. Falling back to persistence disabled: " +
                  e
              ),
                s.reject(e);
            }
            var t;
          })
          .then(() => s.promise);
      }
      function sd(e) {
        return (function (e) {
          const t = new Cr();
          return (
            e.asyncQueue.enqueueAndForget(async () =>
              (async function (e, t) {
                const n = e;
                fc(n.remoteStore) ||
                  Er(
                    "SyncEngine",
                    "The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled."
                  );
                try {
                  const e = await (function () {
                    const t = n.localStore;
                    return t.persistence.runTransaction(
                      "Get highest unacknowledged batch id",
                      "readonly",
                      (e) => t.jn.getHighestUnacknowledgedBatchId(e)
                    );
                  })();
                  if (-1 === e) return void t.resolve();
                  const r = n.pa.get(e) || [];
                  r.push(t), n.pa.set(e, r);
                } catch (e) {
                  const n = Sc(
                    e,
                    "Initialization of waitForPendingWrites() operation failed"
                  );
                  t.reject(n);
                }
              })(await Sl(e), t)
            ),
            t.promise
          );
        })(td((e = Ml(e, ed))));
      }
      function id(e) {
        return (n = td((e = Ml(e, ed)))).asyncQueue.enqueue(async () => {
          const e = await El(n),
            t = await _l(n);
          return (
            e.setNetworkEnabled(!0),
            (function () {
              const e = t;
              return e.Au.delete(0), ic(e);
            })()
          );
        });
        var n;
      }
      function ad(e) {
        return (n = td((e = Ml(e, ed)))).asyncQueue.enqueue(async () => {
          const e = await El(n),
            t = await _l(n);
          return (
            e.setNetworkEnabled(!1),
            (async function () {
              const e = t;
              e.Au.add(0), await ac(e), e.bu.set("Offline");
            })()
          );
        });
        var n;
      }
      function od(t, e) {
        return (
          (n = td((t = Ml(t, ed)))),
          (r = e),
          n.asyncQueue
            .enqueue(async () =>
              (function (e, t) {
                const n = e;
                return n.persistence.runTransaction(
                  "Get named query",
                  "readonly",
                  (e) => n.Us.getNamedQuery(e, t)
                );
              })(await Tl(n), r)
            )
            .then((e) => (e ? new jl(t, null, e.query) : null))
        );
        var n, r;
      }
      function ud(e) {
        if (e._initialized || e._terminated)
          throw new Nr(
            xr.FAILED_PRECONDITION,
            "Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object."
          );
      }
      class hd {
        constructor(...e) {
          for (let t = 0; t < e.length; ++t)
            if (0 === e[t].length)
              throw new Nr(
                xr.INVALID_ARGUMENT,
                "Invalid field name at argument $(i + 1). Field names must not be empty."
              );
          this._internalPath = new ss(e);
        }
        isEqual(e) {
          return this._internalPath.isEqual(e._internalPath);
        }
      }
      class cd {
        constructor(e) {
          this._byteString = e;
        }
        static fromBase64String(e) {
          try {
            return new cd(as.fromBase64String(e));
          } catch (e) {
            throw new Nr(
              xr.INVALID_ARGUMENT,
              "Failed to construct data from Base64 string: " + e
            );
          }
        }
        static fromUint8Array(e) {
          return new cd(as.fromUint8Array(e));
        }
        toBase64() {
          return this._byteString.toBase64();
        }
        toUint8Array() {
          return this._byteString.toUint8Array();
        }
        toString() {
          return "Bytes(base64: " + this.toBase64() + ")";
        }
        isEqual(e) {
          return this._byteString.isEqual(e._byteString);
        }
      }
      class ld {
        constructor(e) {
          this._methodName = e;
        }
      }
      class dd {
        constructor(e, t) {
          if (!isFinite(e) || e < -90 || 90 < e)
            throw new Nr(
              xr.INVALID_ARGUMENT,
              "Latitude must be a number between -90 and 90, but was: " + e
            );
          if (!isFinite(t) || t < -180 || 180 < t)
            throw new Nr(
              xr.INVALID_ARGUMENT,
              "Longitude must be a number between -180 and 180, but was: " + t
            );
          (this._lat = e), (this._long = t);
        }
        get latitude() {
          return this._lat;
        }
        get longitude() {
          return this._long;
        }
        isEqual(e) {
          return this._lat === e._lat && this._long === e._long;
        }
        toJSON() {
          return { latitude: this._lat, longitude: this._long };
        }
        _compareTo(e) {
          return qr(this._lat, e._lat) || qr(this._long, e._long);
        }
      }
      const fd = /^__.*__$/;
      class gd {
        constructor(e, t, n) {
          (this.data = e), (this.fieldMask = t), (this.fieldTransforms = n);
        }
        toMutation(e, t) {
          return null !== this.fieldMask
            ? new Ji(e, this.data, this.fieldMask, t, this.fieldTransforms)
            : new Xi(e, this.data, t, this.fieldTransforms);
        }
      }
      class md {
        constructor(e, t, n) {
          (this.data = e), (this.fieldMask = t), (this.fieldTransforms = n);
        }
        toMutation(e, t) {
          return new Ji(e, this.data, this.fieldMask, t, this.fieldTransforms);
        }
      }
      function pd(e) {
        switch (e) {
          case 0:
          case 2:
          case 1:
            return 1;
          case 3:
          case 4:
            return;
          default:
            throw Ar();
        }
      }
      class yd {
        constructor(e, t, n, r, s, i) {
          (this.settings = e),
            (this.databaseId = t),
            (this.O = n),
            (this.ignoreUndefinedProperties = r),
            void 0 === s && this.ac(),
            (this.fieldTransforms = s || []),
            (this.fieldMask = i || []);
        }
        get path() {
          return this.settings.path;
        }
        get cc() {
          return this.settings.cc;
        }
        hc(e) {
          return new yd(
            Object.assign(Object.assign({}, this.settings), e),
            this.databaseId,
            this.O,
            this.ignoreUndefinedProperties,
            this.fieldTransforms,
            this.fieldMask
          );
        }
        lc(e) {
          var t;
          const n =
              null === (t = this.path) || void 0 === t ? void 0 : t.child(e),
            r = this.hc({ path: n, fc: !1 });
          return r.dc(e), r;
        }
        _c(e) {
          var t;
          const n =
              null === (t = this.path) || void 0 === t ? void 0 : t.child(e),
            r = this.hc({ path: n, fc: !1 });
          return r.ac(), r;
        }
        wc(e) {
          return this.hc({ path: void 0, fc: !0 });
        }
        mc(e) {
          return Fd(
            e,
            this.settings.methodName,
            this.settings.gc || !1,
            this.path,
            this.settings.yc
          );
        }
        contains(t) {
          return (
            void 0 !== this.fieldMask.find((e) => t.isPrefixOf(e)) ||
            void 0 !== this.fieldTransforms.find((e) => t.isPrefixOf(e.field))
          );
        }
        ac() {
          if (this.path)
            for (let e = 0; e < this.path.length; e++)
              this.dc(this.path.get(e));
        }
        dc(e) {
          if (0 === e.length)
            throw this.mc("Document fields must not be empty");
          if (pd(this.cc) && fd.test(e))
            throw this.mc('Document fields cannot begin and end with "__"');
        }
      }
      class vd {
        constructor(e, t, n) {
          (this.databaseId = e),
            (this.ignoreUndefinedProperties = t),
            (this.O = n || Xh(e));
        }
        Ic(e, t, n, r = !1) {
          return new yd(
            {
              cc: e,
              methodName: t,
              yc: n,
              path: ss.emptyPath(),
              fc: !1,
              gc: r,
            },
            this.databaseId,
            this.O,
            this.ignoreUndefinedProperties
          );
        }
      }
      function wd(e) {
        var t = e._freezeSettings(),
          n = Xh(e._databaseId);
        return new vd(e._databaseId, !!t.ignoreUndefinedProperties, n);
      }
      function bd(e, t, n, r, s, i = {}) {
        const a = e.Ic(i.merge || i.mergeFields ? 2 : 0, t, n, s);
        Od("Data must be an object, but it was:", a, r);
        var o = kd(r, a);
        let u, h;
        if (i.merge) (u = new is(a.fieldMask)), (h = a.fieldTransforms);
        else if (i.mergeFields) {
          const e = [];
          for (const r of i.mergeFields) {
            const s = Ld(t, r, n);
            if (!a.contains(s))
              throw new Nr(
                xr.INVALID_ARGUMENT,
                `Field '${s}' is specified in your field mask but missing from your input data.`
              );
            Pd(e, s) || e.push(s);
          }
          (u = new is(e)),
            (h = a.fieldTransforms.filter((e) => u.covers(e.field)));
        } else (u = null), (h = a.fieldTransforms);
        return new gd(new Fs(o), u, h);
      }
      class Id extends ld {
        _toFieldTransform(e) {
          if (2 !== e.cc)
            throw 1 === e.cc
              ? e.mc(
                  `${this._methodName}() can only appear at the top level of your update data`
                )
              : e.mc(
                  `${this._methodName}() cannot be used with set() unless you pass {merge:true}`
                );
          return e.fieldMask.push(e.path), null;
        }
        isEqual(e) {
          return e instanceof Id;
        }
      }
      function Ed(e, t, n) {
        return new yd(
          { cc: 3, yc: t.settings.yc, methodName: e._methodName, fc: n },
          t.databaseId,
          t.O,
          t.ignoreUndefinedProperties
        );
      }
      class Td extends ld {
        _toFieldTransform(e) {
          return new ji(e.path, new Li());
        }
        isEqual(e) {
          return e instanceof Td;
        }
      }
      class _d extends ld {
        constructor(e, t) {
          super(e), (this.Tc = t);
        }
        _toFieldTransform(e) {
          const t = Ed(this, e, !0),
            n = this.Tc.map((e) => Cd(e, t)),
            r = new Vi(n);
          return new ji(e.path, r);
        }
        isEqual(e) {
          return this === e;
        }
      }
      class Sd extends ld {
        constructor(e, t) {
          super(e), (this.Tc = t);
        }
        _toFieldTransform(e) {
          const t = Ed(this, e, !0),
            n = this.Tc.map((e) => Cd(e, t)),
            r = new Fi(n);
          return new ji(e.path, r);
        }
        isEqual(e) {
          return this === e;
        }
      }
      class Ad extends ld {
        constructor(e, t) {
          super(e), (this.Ec = t);
        }
        _toFieldTransform(e) {
          var t = new Ui(e.O, ki(e.O, this.Ec));
          return new ji(e.path, t);
        }
        isEqual(e) {
          return this === e;
        }
      }
      function Dd(e, s, i, t) {
        const a = e.Ic(1, s, i);
        Od("Data must be an object, but it was:", a, t);
        const o = [],
          u = Fs.empty();
        Wr(t, (e, t) => {
          var n = Md(s, e, i);
          t = m(t);
          var r = a._c(n);
          if (t instanceof Id) o.push(n);
          else {
            const e = Cd(t, r);
            null != e && (o.push(n), u.set(n, e));
          }
        });
        var n = new is(o);
        return new md(u, n, a.fieldTransforms);
      }
      function xd(e, t, n, r, s, i) {
        const a = e.Ic(1, t, n),
          o = [Ld(t, r, n)],
          u = [s];
        if (i.length % 2 != 0)
          throw new Nr(
            xr.INVALID_ARGUMENT,
            `Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`
          );
        for (let f = 0; f < i.length; f += 2)
          o.push(Ld(t, i[f])), u.push(i[f + 1]);
        const h = [],
          c = Fs.empty();
        for (let g = o.length - 1; 0 <= g; --g)
          if (!Pd(h, o[g])) {
            const t = o[g];
            var l = m((l = u[g]));
            const r = a._c(t);
            if (l instanceof Id) h.push(t);
            else {
              const e = Cd(l, r);
              null != e && (h.push(t), c.set(t, e));
            }
          }
        var d = new is(h);
        return new md(c, d, a.fieldTransforms);
      }
      function Nd(e, t, n, r = !1) {
        return Cd(n, e.Ic(r ? 4 : 3, t));
      }
      function Cd(i, e) {
        if (Rd((i = m(i))))
          return Od("Unsupported field value:", e, i), kd(i, e);
        if (i instanceof ld)
          return (
            (function (e, t) {
              if (!pd(t.cc))
                throw t.mc(
                  `${e._methodName}() can only be used with update() and set()`
                );
              if (!t.path)
                throw t.mc(
                  `${e._methodName}() is not currently supported inside arrays`
                );
              var n = e._toFieldTransform(t);
              n && t.fieldTransforms.push(n);
            })(i, e),
            null
          );
        if (void 0 === i && e.ignoreUndefinedProperties) return null;
        if ((e.path && e.fieldMask.push(e.path), i instanceof Array)) {
          if (e.settings.fc && 4 !== e.cc)
            throw e.mc("Nested arrays are not supported");
          return (function (t) {
            const n = [];
            let r = 0;
            for (const s of i) {
              let e = Cd(s, t.wc(r));
              null == e && (e = { nullValue: "NULL_VALUE" }), n.push(e), r++;
            }
            return { arrayValue: { values: n } };
          })(e);
        }
        return (function (e, t) {
          if (null === (e = m(i))) return { nullValue: "NULL_VALUE" };
          if ("number" == typeof e) return ki(t.O, e);
          if ("boolean" == typeof e) return { booleanValue: e };
          if ("string" == typeof e) return { stringValue: e };
          if (e instanceof Date) {
            var n = Gr.fromDate(e);
            return { timestampValue: Ca(t.O, n) };
          }
          if (e instanceof Gr) {
            n = new Gr(e.seconds, 1e3 * Math.floor(e.nanoseconds / 1e3));
            return { timestampValue: Ca(t.O, n) };
          }
          if (e instanceof dd)
            return {
              geoPointValue: { latitude: e.latitude, longitude: e.longitude },
            };
          if (e instanceof cd) return { bytesValue: ka(t.O, e._byteString) };
          if (e instanceof ql) {
            const r = t.databaseId,
              s = e.firestore._databaseId;
            if (!s.isEqual(r))
              throw t.mc(
                `Document reference is for database ${s.projectId}/${s.database} but should be for database ${r.projectId}/${r.database}`
              );
            return {
              referenceValue: Oa(
                e.firestore._databaseId || t.databaseId,
                e._key.path
              ),
            };
          }
          throw t.mc(`Unsupported field value: ${Vl(e)}`);
        })(0, e);
      }
      function kd(e, r) {
        const s = {};
        return (
          Hr(e)
            ? r.path && 0 < r.path.length && r.fieldMask.push(r.path)
            : Wr(e, (e, t) => {
                var n = Cd(t, r.lc(e));
                null != n && (s[e] = n);
              }),
          { mapValue: { fields: s } }
        );
      }
      function Rd(e) {
        return !(
          "object" != typeof e ||
          null === e ||
          e instanceof Array ||
          e instanceof Date ||
          e instanceof Gr ||
          e instanceof dd ||
          e instanceof cd ||
          e instanceof ql ||
          e instanceof ld
        );
      }
      function Od(e, t, n) {
        if (
          !Rd(n) ||
          "object" != typeof (s = n) ||
          null === s ||
          (Object.getPrototypeOf(s) !== Object.prototype &&
            null !== Object.getPrototypeOf(s))
        ) {
          var r = Vl(n);
          throw "an object" === r
            ? t.mc(e + " a custom object")
            : t.mc(e + " " + r);
        }
        var s;
      }
      function Ld(e, t, n) {
        if ((t = m(t)) instanceof hd) return t._internalPath;
        if ("string" == typeof t) return Md(e, t);
        throw Fd(
          "Field path arguments must be of type string or ",
          e,
          !1,
          void 0,
          n
        );
      }
      const Vd = new RegExp("[~\\*/\\[\\]]");
      function Md(t, n, r) {
        if (0 <= n.search(Vd))
          throw Fd(
            `Invalid field path (${n}). Paths must not contain '~', '*', '/', '[', or ']'`,
            t,
            !1,
            void 0,
            r
          );
        try {
          return new hd(...n.split("."))._internalPath;
        } catch (e) {
          throw Fd(
            `Invalid field path (${n}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,
            t,
            !1,
            void 0,
            r
          );
        }
      }
      function Fd(e, t, n, r, s) {
        var i = r && !r.isEmpty(),
          a = void 0 !== s;
        let o = `Function ${t}() called with invalid data`;
        n && (o += " (via `toFirestore()`)"), (o += ". ");
        let u = "";
        return (
          (i || a) &&
            ((u += " (found"),
            i && (u += ` in field ${r}`),
            a && (u += ` in document ${s}`),
            (u += ")")),
          new Nr(xr.INVALID_ARGUMENT, o + e + u)
        );
      }
      function Pd(e, t) {
        return e.some((e) => e.isEqual(t));
      }
      class Ud {
        constructor(e, t, n, r, s) {
          (this._firestore = e),
            (this._userDataWriter = t),
            (this._key = n),
            (this._document = r),
            (this._converter = s);
        }
        get id() {
          return this._key.path.lastSegment();
        }
        get ref() {
          return new ql(this._firestore, this._converter, this._key);
        }
        exists() {
          return null !== this._document;
        }
        data() {
          if (this._document) {
            if (this._converter) {
              var e = new Bd(
                this._firestore,
                this._userDataWriter,
                this._key,
                this._document,
                null
              );
              return this._converter.fromFirestore(e);
            }
            return this._userDataWriter.convertValue(this._document.data.value);
          }
        }
        get(e) {
          if (this._document) {
            var t = this._document.data.field(qd("DocumentSnapshot.get", e));
            if (null !== t) return this._userDataWriter.convertValue(t);
          }
        }
      }
      class Bd extends Ud {
        data() {
          return super.data();
        }
      }
      function qd(e, t) {
        return "string" == typeof t
          ? Md(e, t)
          : (t instanceof hd ? t : t._delegate)._internalPath;
      }
      class jd {
        constructor(e, t) {
          (this.hasPendingWrites = e), (this.fromCache = t);
        }
        isEqual(e) {
          return (
            this.hasPendingWrites === e.hasPendingWrites &&
            this.fromCache === e.fromCache
          );
        }
      }
      class Kd extends Ud {
        constructor(e, t, n, r, s, i) {
          super(e, t, n, r, i),
            (this._firestore = e),
            (this._firestoreImpl = e),
            (this.metadata = s);
        }
        exists() {
          return super.exists();
        }
        data(e = {}) {
          if (this._document) {
            if (this._converter) {
              var t = new Gd(
                this._firestore,
                this._userDataWriter,
                this._key,
                this._document,
                this.metadata,
                null
              );
              return this._converter.fromFirestore(t, e);
            }
            return this._userDataWriter.convertValue(
              this._document.data.value,
              e.serverTimestamps
            );
          }
        }
        get(e, t = {}) {
          if (this._document) {
            var n = this._document.data.field(qd("DocumentSnapshot.get", e));
            if (null !== n)
              return this._userDataWriter.convertValue(n, t.serverTimestamps);
          }
        }
      }
      class Gd extends Kd {
        data(e = {}) {
          return super.data(e);
        }
      }
      class $d {
        constructor(e, t, n, r) {
          (this._firestore = e),
            (this._userDataWriter = t),
            (this._snapshot = r),
            (this.metadata = new jd(r.hasPendingWrites, r.fromCache)),
            (this.query = n);
        }
        get docs() {
          const t = [];
          return this.forEach((e) => t.push(e)), t;
        }
        get size() {
          return this._snapshot.docs.size;
        }
        get empty() {
          return 0 === this.size;
        }
        forEach(t, n) {
          this._snapshot.docs.forEach((e) => {
            t.call(
              n,
              new Gd(
                this._firestore,
                this._userDataWriter,
                e.key,
                e,
                new jd(
                  this._snapshot.mutatedKeys.has(e.key),
                  this._snapshot.fromCache
                ),
                this.query.converter
              )
            );
          });
        }
        docChanges(e = {}) {
          var t = !!e.includeMetadataChanges;
          if (t && this._snapshot.excludesMetadataChanges)
            throw new Nr(
              xr.INVALID_ARGUMENT,
              "To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot()."
            );
          return (
            (this._cachedChanges &&
              this._cachedChangesIncludeMetadataChanges === t) ||
              ((this._cachedChanges = (function (i, t) {
                if (i._snapshot.oldDocs.isEmpty()) {
                  let t = 0;
                  return i._snapshot.docChanges.map((e) => ({
                    type: "added",
                    doc: new Gd(
                      i._firestore,
                      i._userDataWriter,
                      e.doc.key,
                      e.doc,
                      new jd(
                        i._snapshot.mutatedKeys.has(e.doc.key),
                        i._snapshot.fromCache
                      ),
                      i.query.converter
                    ),
                    oldIndex: -1,
                    newIndex: t++,
                  }));
                }
                {
                  let s = i._snapshot.oldDocs;
                  return i._snapshot.docChanges
                    .filter((e) => t || 3 !== e.type)
                    .map((e) => {
                      var t = new Gd(
                        i._firestore,
                        i._userDataWriter,
                        e.doc.key,
                        e.doc,
                        new jd(
                          i._snapshot.mutatedKeys.has(e.doc.key),
                          i._snapshot.fromCache
                        ),
                        i.query.converter
                      );
                      let n = -1,
                        r = -1;
                      return (
                        0 !== e.type &&
                          ((n = s.indexOf(e.doc.key)),
                          (s = s.delete(e.doc.key))),
                        1 !== e.type &&
                          ((s = s.add(e.doc)), (r = s.indexOf(e.doc.key))),
                        {
                          type: (function (e) {
                            switch (e) {
                              case 0:
                                return "added";
                              case 2:
                              case 3:
                                return "modified";
                              case 1:
                                return "removed";
                              default:
                                return Ar();
                            }
                          })(e.type),
                          doc: t,
                          oldIndex: n,
                          newIndex: r,
                        }
                      );
                    });
                }
              })(this, t)),
              (this._cachedChangesIncludeMetadataChanges = t)),
            this._cachedChanges
          );
        }
      }
      function zd(e, t) {
        return e instanceof Kd && t instanceof Kd
          ? e._firestore === t._firestore &&
              e._key.isEqual(t._key) &&
              (null === e._document
                ? null === t._document
                : e._document.isEqual(t._document)) &&
              e._converter === t._converter
          : e instanceof $d &&
              t instanceof $d &&
              e._firestore === t._firestore &&
              Wl(e.query, t.query) &&
              e.metadata.isEqual(t.metadata) &&
              e._snapshot.isEqual(t._snapshot);
      }
      function Wd(e) {
        if ("L" === e.limitType && 0 === e.explicitOrderBy.length)
          throw new Nr(
            xr.UNIMPLEMENTED,
            "limitToLast() queries require specifying at least one orderBy() clause"
          );
      }
      class Hd {}
      function Qd(e, ...t) {
        for (const n of t) e = n._apply(e);
        return e;
      }
      class Yd extends Hd {
        constructor(e, t, n) {
          super(),
            (this.Ac = e),
            (this.Rc = t),
            (this.Pc = n),
            (this.type = "where");
        }
        _apply(e) {
          var t = wd(e.firestore),
            t = (function (e, t, n, r, s, i, a) {
              let o;
              if (s.isKeyField()) {
                if ("array-contains" === i || "array-contains-any" === i)
                  throw new Nr(
                    xr.INVALID_ARGUMENT,
                    `Invalid Query. You can't perform '${i}' queries on documentId().`
                  );
                if ("in" === i || "not-in" === i) {
                  rf(a, i);
                  const t = [];
                  for (const n of a) t.push(nf(r, e, n));
                  o = { arrayValue: { values: t } };
                } else o = nf(r, e, a);
              } else
                ("in" !== i && "not-in" !== i && "array-contains-any" !== i) ||
                  rf(a, i),
                  (o = Nd(n, t, a, "in" === i || "not-in" === i));
              var u = ti.create(s, i, o);
              return (
                (function (e, t) {
                  if (t.S()) {
                    const r = vi(e);
                    if (null !== r && !r.isEqual(t.field))
                      throw new Nr(
                        xr.INVALID_ARGUMENT,
                        `Invalid query. All where filters with an inequality (<, <=, !=, not-in, >, or >=) must be on the same field. But you have inequality filters on '${r.toString()}' and '${t.field.toString()}'`
                      );
                    var n = yi(e);
                    null !== n && sf(0, t.field, n);
                  }
                  const r = (function (e, t) {
                    for (const n of e.filters)
                      if (0 <= t.indexOf(n.op)) return n.op;
                    return null;
                  })(
                    e,
                    (function () {
                      switch (t.op) {
                        case "!=":
                          return ["!=", "not-in"];
                        case "array-contains":
                          return [
                            "array-contains",
                            "array-contains-any",
                            "not-in",
                          ];
                        case "in":
                          return ["array-contains-any", "in", "not-in"];
                        case "array-contains-any":
                          return [
                            "array-contains",
                            "array-contains-any",
                            "in",
                            "not-in",
                          ];
                        case "not-in":
                          return [
                            "array-contains",
                            "array-contains-any",
                            "in",
                            "not-in",
                            "!=",
                          ];
                        default:
                          return [];
                      }
                    })()
                  );
                  if (null !== r)
                    throw r === t.op
                      ? new Nr(
                          xr.INVALID_ARGUMENT,
                          `Invalid query. You cannot use more than one '${t.op.toString()}' filter.`
                        )
                      : new Nr(
                          xr.INVALID_ARGUMENT,
                          `Invalid query. You cannot use '${t.op.toString()}' filters with '${r.toString()}' filters.`
                        );
                })(e, u),
                u
              );
            })(
              e._query,
              "where",
              t,
              e.firestore._databaseId,
              this.Ac,
              this.Rc,
              this.Pc
            );
          return new jl(
            e.firestore,
            e.converter,
            ((e = e._query),
            (t = e.filters.concat([t])),
            new gi(
              e.path,
              e.collectionGroup,
              e.explicitOrderBy.slice(),
              t,
              e.limit,
              e.limitType,
              e.startAt,
              e.endAt
            ))
          );
        }
      }
      class Xd extends Hd {
        constructor(e, t) {
          super(), (this.Ac = e), (this.bc = t), (this.type = "orderBy");
        }
        _apply(e) {
          var t = (function (e, t, n) {
            if (null !== e.startAt)
              throw new Nr(
                xr.INVALID_ARGUMENT,
                "Invalid query. You must not call startAt() or startAfter() before calling orderBy()."
              );
            if (null !== e.endAt)
              throw new Nr(
                xr.INVALID_ARGUMENT,
                "Invalid query. You must not call endAt() or endBefore() before calling orderBy()."
              );
            var r,
              s = new li(t, n);
            return (
              (n = s),
              null !== yi((e = e)) ||
                (null !== (r = vi(e)) && sf(0, r, n.field)),
              s
            );
          })(e._query, this.Ac, this.bc);
          return new jl(
            e.firestore,
            e.converter,
            ((e = e._query),
            (t = e.explicitOrderBy.concat([t])),
            new gi(
              e.path,
              e.collectionGroup,
              t,
              e.filters.slice(),
              e.limit,
              e.limitType,
              e.startAt,
              e.endAt
            ))
          );
        }
      }
      class Jd extends Hd {
        constructor(e, t, n) {
          super(), (this.type = e), (this.Vc = t), (this.vc = n);
        }
        _apply(e) {
          return new jl(
            e.firestore,
            e.converter,
            Ei(e._query, this.Vc, this.vc)
          );
        }
      }
      class Zd extends Hd {
        constructor(e, t, n) {
          super(), (this.type = e), (this.Sc = t), (this.Dc = n);
        }
        _apply(e) {
          var t,
            n = tf(e, this.type, this.Sc, this.Dc);
          return new jl(
            e.firestore,
            e.converter,
            ((t = e._query),
            (e = n),
            new gi(
              t.path,
              t.collectionGroup,
              t.explicitOrderBy.slice(),
              t.filters.slice(),
              t.limit,
              t.limitType,
              e,
              t.endAt
            ))
          );
        }
      }
      class ef extends Hd {
        constructor(e, t, n) {
          super(), (this.type = e), (this.Sc = t), (this.Dc = n);
        }
        _apply(e) {
          var t,
            n = tf(e, this.type, this.Sc, this.Dc);
          return new jl(
            e.firestore,
            e.converter,
            ((t = e._query),
            (e = n),
            new gi(
              t.path,
              t.collectionGroup,
              t.explicitOrderBy.slice(),
              t.filters.slice(),
              t.limit,
              t.limitType,
              t.startAt,
              e
            ))
          );
        }
      }
      function tf(e, t, n, r) {
        if (((n[0] = m(n[0])), n[0] instanceof Ud))
          return (function (e, t, n, r, s) {
            if (!r)
              throw new Nr(
                xr.NOT_FOUND,
                `Can't use a DocumentSnapshot that doesn't exist for ${n}().`
              );
            const i = [];
            for (const n of bi(e))
              if (n.field.isKeyField()) i.push(Ds(t, r.key));
              else {
                const e = r.data.field(n.field);
                if (ls(e))
                  throw new Nr(
                    xr.INVALID_ARGUMENT,
                    'Invalid query. You are trying to start or end a query using a document for which the field "' +
                      n.field +
                      '" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)'
                  );
                if (null === e) {
                  const e = n.field.canonicalString();
                  throw new Nr(
                    xr.INVALID_ARGUMENT,
                    `Invalid query. You are trying to start or end a query using a document for which the field '${e}' (used as the orderBy) does not exist.`
                  );
                }
                i.push(e);
              }
            return new ci(i, s);
          })(e._query, e.firestore._databaseId, t, n[0]._document, r);
        var s = wd(e.firestore);
        return (function (e, t, n, r, s, i) {
          const a = e.explicitOrderBy;
          if (s.length > a.length)
            throw new Nr(
              xr.INVALID_ARGUMENT,
              `Too many arguments provided to ${r}(). The number of arguments must be less than or equal to the number of orderBy() clauses`
            );
          const o = [];
          for (let u = 0; u < s.length; u++) {
            const h = s[u];
            if (a[u].field.isKeyField()) {
              if ("string" != typeof h)
                throw new Nr(
                  xr.INVALID_ARGUMENT,
                  `Invalid query. Expected a string for document ID in ${r}(), but got a ${typeof h}`
                );
              if (!wi(e) && -1 !== h.indexOf("/"))
                throw new Nr(
                  xr.INVALID_ARGUMENT,
                  `Invalid query. When querying a collection and ordering by documentId(), the value passed to ${r}() must be a plain document ID, but '${h}' contains a slash.`
                );
              const n = e.path.child(ns.fromString(h));
              if (!vs.isDocumentKey(n))
                throw new Nr(
                  xr.INVALID_ARGUMENT,
                  `Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${r}() must result in a valid document path, but '${n}' is not because it contains an odd number of segments.`
                );
              const s = new vs(n);
              o.push(Ds(t, s));
            } else {
              const e = Nd(n, r, h);
              o.push(e);
            }
          }
          return new ci(o, i);
        })(e._query, e.firestore._databaseId, s, t, n, r);
      }
      function nf(e, t, n) {
        if ("string" == typeof (n = m(n))) {
          if ("" === n)
            throw new Nr(
              xr.INVALID_ARGUMENT,
              "Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string."
            );
          if (!wi(t) && -1 !== n.indexOf("/"))
            throw new Nr(
              xr.INVALID_ARGUMENT,
              `Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`
            );
          var r = t.path.child(ns.fromString(n));
          if (!vs.isDocumentKey(r))
            throw new Nr(
              xr.INVALID_ARGUMENT,
              `Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`
            );
          return Ds(e, new vs(r));
        }
        if (n instanceof ql) return Ds(e, n._key);
        throw new Nr(
          xr.INVALID_ARGUMENT,
          `Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Vl(
            n
          )}.`
        );
      }
      function rf(e, t) {
        if (!Array.isArray(e) || 0 === e.length)
          throw new Nr(
            xr.INVALID_ARGUMENT,
            `Invalid Query. A non-empty array is required for '${t.toString()}' filters.`
          );
        if (10 < e.length)
          throw new Nr(
            xr.INVALID_ARGUMENT,
            `Invalid Query. '${t.toString()}' filters support a maximum of 10 elements in the value array.`
          );
      }
      function sf(e, t, n) {
        if (!n.isEqual(t))
          throw new Nr(
            xr.INVALID_ARGUMENT,
            `Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field '${t.toString()}' and so you must also use '${t.toString()}' as your first argument to orderBy(), but your first orderBy() is on field '${n.toString()}' instead.`
          );
      }
      const af = { maxAttempts: 5 };
      class of {
        convertValue(e, t = "none") {
          switch (Is(e)) {
            case 0:
              return null;
            case 1:
              return e.booleanValue;
            case 2:
              return hs(e.integerValue || e.doubleValue);
            case 3:
              return this.convertTimestamp(e.timestampValue);
            case 4:
              return this.convertServerTimestamp(e, t);
            case 5:
              return e.stringValue;
            case 6:
              return this.convertBytes(cs(e.bytesValue));
            case 7:
              return this.convertReference(e.referenceValue);
            case 8:
              return this.convertGeoPoint(e.geoPointValue);
            case 9:
              return this.convertArray(e.arrayValue, t);
            case 10:
              return this.convertObject(e.mapValue, t);
            default:
              throw Ar();
          }
        }
        convertObject(e, n) {
          const r = {};
          return (
            Wr(e.fields, (e, t) => {
              r[e] = this.convertValue(t, n);
            }),
            r
          );
        }
        convertGeoPoint(e) {
          return new dd(hs(e.latitude), hs(e.longitude));
        }
        convertArray(e, t) {
          return (e.values || []).map((e) => this.convertValue(e, t));
        }
        convertServerTimestamp(e, t) {
          switch (t) {
            case "previous":
              var n = (function e(t) {
                var n = t.mapValue.fields.__previous_value__;
                return ls(n) ? e(n) : n;
              })(e);
              return null == n ? null : this.convertValue(n, t);
            case "estimate":
              return this.convertTimestamp(ds(e));
            default:
              return null;
          }
        }
        convertTimestamp(e) {
          var t = us(e);
          return new Gr(t.seconds, t.nanos);
        }
        convertDocumentKey(e, t) {
          const n = ns.fromString(e);
          Dr(Ja(n));
          const r = new gs(n.get(1), n.get(3)),
            s = new vs(n.popFirst(5));
          return (
            r.isEqual(t) ||
              Tr(
                `Document ${s} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`
              ),
            s
          );
        }
      }
      function uf(e, t, n) {
        return e
          ? n && (n.merge || n.mergeFields)
            ? e.toFirestore(t, n)
            : e.toFirestore(t)
          : t;
      }
      class hf extends of {
        constructor(e) {
          super(), (this.firestore = e);
        }
        convertBytes(e) {
          return new cd(e);
        }
        convertReference(e) {
          var t = this.convertDocumentKey(e, this.firestore._databaseId);
          return new ql(this.firestore, null, t);
        }
      }
      class cf {
        constructor(e, t) {
          (this._firestore = e),
            (this._commitHandler = t),
            (this._mutations = []),
            (this._committed = !1),
            (this._dataReader = wd(e));
        }
        set(e, t, n) {
          this._verifyNotCommitted();
          const r = lf(e, this._firestore),
            s = uf(r.converter, t, n),
            i = bd(
              this._dataReader,
              "WriteBatch.set",
              r._key,
              s,
              null !== r.converter,
              n
            );
          return this._mutations.push(i.toMutation(r._key, Gi.none())), this;
        }
        update(e, t, n, ...r) {
          this._verifyNotCommitted();
          var s = lf(e, this._firestore);
          let i;
          return (
            (i =
              "string" == typeof (t = m(t)) || t instanceof hd
                ? xd(this._dataReader, "WriteBatch.update", s._key, t, n, r)
                : Dd(this._dataReader, "WriteBatch.update", s._key, t)),
            this._mutations.push(i.toMutation(s._key, Gi.exists(!0))),
            this
          );
        }
        delete(e) {
          this._verifyNotCommitted();
          var t = lf(e, this._firestore);
          return (
            (this._mutations = this._mutations.concat(
              new na(t._key, Gi.none())
            )),
            this
          );
        }
        commit() {
          return (
            this._verifyNotCommitted(),
            (this._committed = !0),
            0 < this._mutations.length
              ? this._commitHandler(this._mutations)
              : Promise.resolve()
          );
        }
        _verifyNotCommitted() {
          if (this._committed)
            throw new Nr(
              xr.FAILED_PRECONDITION,
              "A write batch can no longer be used after commit() has been called."
            );
        }
      }
      function lf(e, t) {
        if ((e = m(e)).firestore !== t)
          throw new Nr(
            xr.INVALID_ARGUMENT,
            "Provided document reference is from a different Firestore instance."
          );
        return e;
      }
      class df extends of {
        constructor(e) {
          super(), (this.firestore = e);
        }
        convertBytes(e) {
          return new cd(e);
        }
        convertReference(e) {
          var t = this.convertDocumentKey(e, this.firestore._databaseId);
          return new ql(this.firestore, null, t);
        }
      }
      function ff(t) {
        t = Ml(t, ql);
        const n = Ml(t.firestore, ed),
          e = td(n),
          r = new df(n);
        return (function (e, t) {
          const n = new Cr();
          return (
            e.asyncQueue.enqueueAndForget(async () =>
              (async function (e, t, n) {
                try {
                  const s = await (function (t) {
                    const n = e;
                    return n.persistence.runTransaction(
                      "read document",
                      "readonly",
                      (e) => n.tr.zn(e, t)
                    );
                  })(t);
                  s.isFoundDocument()
                    ? n.resolve(s)
                    : s.isNoDocument()
                    ? n.resolve(null)
                    : n.reject(
                        new Nr(
                          xr.UNAVAILABLE,
                          "Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"
                        )
                      );
                } catch (e) {
                  var r = Sc(e, `Failed to get document '${t} from cache`);
                  n.reject(r);
                }
              })(await Tl(e), t, n)
            ),
            n.promise
          );
        })(e, t._key).then(
          (e) =>
            new Kd(
              n,
              r,
              t._key,
              e,
              new jd(null !== e && e.hasLocalMutations, !0),
              t.converter
            )
        );
      }
      function gf(t) {
        t = Ml(t, jl);
        const n = Ml(t.firestore, ed),
          e = td(n),
          r = new df(n);
        return (function (e, t) {
          const n = new Cr();
          return (
            e.asyncQueue.enqueueAndForget(async () =>
              (async function (e, t, n) {
                try {
                  const s = await Ch(e, t, !0),
                    i = new qc(t, s.ir),
                    a = i.ea(s.documents),
                    o = i.applyChanges(a, !1);
                  n.resolve(o.snapshot);
                } catch (e) {
                  var r = Sc(e, `Failed to execute query '${t} against cache`);
                  n.reject(r);
                }
              })(await Tl(e), t, n)
            ),
            n.promise
          );
        })(e, t._query).then((e) => new $d(n, r, t, e));
      }
      function mf(e, t, n) {
        e = Ml(e, ql);
        var r = Ml(e.firestore, ed),
          s = uf(e.converter, t, n);
        return wf(r, [
          bd(wd(r), "setDoc", e._key, s, null !== e.converter, n).toMutation(
            e._key,
            Gi.none()
          ),
        ]);
      }
      function pf(e, t, n, ...r) {
        e = Ml(e, ql);
        var s = Ml(e.firestore, ed),
          i = wd(s);
        let a;
        return (
          (a =
            "string" == typeof (t = m(t)) || t instanceof hd
              ? xd(i, "updateDoc", e._key, t, n, r)
              : Dd(i, "updateDoc", e._key, t)),
          wf(s, [a.toMutation(e._key, Gi.exists(!0))])
        );
      }
      function yf(t, ...n) {
        var e;
        t = m(t);
        let r = { includeMetadataChanges: !1 },
          s = 0;
        "object" != typeof n[s] || Ql(n[s]) || ((r = n[s]), s++);
        var i = { includeMetadataChanges: r.includeMetadataChanges };
        if (Ql(n[s])) {
          const t = n[s];
          (n[s] = null === (e = t.next) || void 0 === e ? void 0 : e.bind(t)),
            (n[s + 1] =
              null === (e = t.error) || void 0 === e ? void 0 : e.bind(t)),
            (n[s + 2] =
              null === (e = t.complete) || void 0 === e ? void 0 : e.bind(t));
        }
        let a, o, u;
        if (t instanceof ql)
          (o = Ml(t.firestore, ed)),
            (u = pi(t._key.path)),
            (a = {
              next: (e) => {
                n[s] && n[s](bf(o, t, e));
              },
              error: n[s + 1],
              complete: n[s + 2],
            });
        else {
          const h = Ml(t, jl);
          (o = Ml(h.firestore, ed)), (u = h._query);
          const c = new df(o);
          (a = {
            next: (e) => {
              n[s] && n[s](new $d(o, c, h, e));
            },
            error: n[s + 1],
            complete: n[s + 2],
          }),
            Wd(t._query);
        }
        return (function (e, t, n, r) {
          const s = new fl(r),
            i = new Lc(t, s, n);
          return (
            e.asyncQueue.enqueueAndForget(async () => kc(await Al(e), i)),
            () => {
              s.Ca(),
                e.asyncQueue.enqueueAndForget(async () => Rc(await Al(e), i));
            }
          );
        })(td(o), u, i, a);
      }
      function vf(e, t) {
        return (function (e, t) {
          const n = new fl(t);
          return (
            e.asyncQueue.enqueueAndForget(async () =>
              (function (e, t) {
                e.Nu.add(t), t.next();
              })(await Al(e), n)
            ),
            () => {
              n.Ca(),
                e.asyncQueue.enqueueAndForget(async () =>
                  (function (e, t) {
                    e.Nu.delete(t);
                  })(await Al(e), n)
                );
            }
          );
        })(td((e = Ml(e, ed))), Ql(t) ? t : { next: t });
      }
      function wf(e, t) {
        return (function (e, t) {
          const n = new Cr();
          return (
            e.asyncQueue.enqueueAndForget(async () => zc(await Sl(e), t, n)),
            n.promise
          );
        })(td(e), t);
      }
      function bf(e, t, n) {
        var r = n.docs.get(t._key),
          s = new df(e);
        return new Kd(
          e,
          s,
          t._key,
          r,
          new jd(n.hasPendingWrites, n.fromCache),
          t.converter
        );
      }
      class If extends class {
        constructor(e, t) {
          (this._firestore = e),
            (this._transaction = t),
            (this._dataReader = wd(e));
        }
        get(e) {
          const n = lf(e, this._firestore),
            r = new hf(this._firestore);
          return this._transaction.lookup([n._key]).then((e) => {
            if (!e || 1 !== e.length) return Ar();
            const t = e[0];
            if (t.isFoundDocument())
              return new Ud(this._firestore, r, t.key, t, n.converter);
            if (t.isNoDocument())
              return new Ud(this._firestore, r, n._key, null, n.converter);
            throw Ar();
          });
        }
        set(e, t, n) {
          var r = lf(e, this._firestore),
            s = uf(r.converter, t, n),
            s = bd(
              this._dataReader,
              "Transaction.set",
              r._key,
              s,
              null !== r.converter,
              n
            );
          return this._transaction.set(r._key, s), this;
        }
        update(e, t, n, ...r) {
          var s = lf(e, this._firestore),
            i =
              "string" == typeof (t = m(t)) || t instanceof hd
                ? xd(this._dataReader, "Transaction.update", s._key, t, n, r)
                : Dd(this._dataReader, "Transaction.update", s._key, t);
          return this._transaction.update(s._key, i), this;
        }
        delete(e) {
          var t = lf(e, this._firestore);
          return this._transaction.delete(t._key), this;
        }
      } {
        constructor(e, t) {
          super(e, t), (this._firestore = e);
        }
        get(e) {
          const t = lf(e, this._firestore),
            n = new df(this._firestore);
          return super
            .get(e)
            .then(
              (e) =>
                new Kd(
                  this._firestore,
                  n,
                  t._key,
                  e._document,
                  new jd(!1, !1),
                  t.converter
                )
            );
        }
      }
      function Ef(t, n, e) {
        t = Ml(t, ed);
        var r = Object.assign(Object.assign({}, af), e);
        return (
          (function () {
            if (r.maxAttempts < 1)
              throw new Nr(
                xr.INVALID_ARGUMENT,
                "Max attempts must be at least 1"
              );
          })(),
          (function (t, n, r) {
            const s = new Cr();
            return (
              t.asyncQueue.enqueueAndForget(async () => {
                var e = await Il(t).then((e) => e.datastore);
                new pl(t.asyncQueue, e, r, n, s).run();
              }),
              s.promise
            );
          })(td(t), (e) => n(new If(t, e)), r)
        );
      }
      (Xl = Qf.SDK_VERSION),
        (wr = Xl),
        Qf._registerComponent(
          new h(
            "firestore",
            (e, { options: t }) => {
              const n = e.getProvider("app").getImmediate(),
                r = new ed(
                  n,
                  new Lr(e.getProvider("auth-internal")),
                  new Pr(e.getProvider("app-check-internal"))
                );
              return (
                (t = Object.assign({ useFetchStreams: !0 }, t)),
                r._setSettings(t),
                r
              );
            },
            "PUBLIC"
          )
        ),
        Qf.registerVersion(yr, "3.4.9", void 0),
        Qf.registerVersion(yr, "3.4.9", "esm2017");
      function Tf(e, t) {
        if (void 0 === t) return { merge: !1 };
        if (void 0 !== t.mergeFields && void 0 !== t.merge)
          throw new Nr(
            "invalid-argument",
            `Invalid options passed to function ${e}(): You cannot ` +
              'specify both "merge" and "mergeFields".'
          );
        return t;
      }
      function _f() {
        if ("undefined" == typeof Uint8Array)
          throw new Nr(
            "unimplemented",
            "Uint8Arrays are not available in this environment."
          );
      }
      function Sf() {
        if ("undefined" == typeof atob)
          throw new Nr(
            "unimplemented",
            "Blobs are unavailable in Firestore in this environment."
          );
      }
      class Af {
        constructor(e) {
          this._delegate = e;
        }
        static fromBase64String(e) {
          return Sf(), new Af(cd.fromBase64String(e));
        }
        static fromUint8Array(e) {
          return _f(), new Af(cd.fromUint8Array(e));
        }
        toBase64() {
          return Sf(), this._delegate.toBase64();
        }
        toUint8Array() {
          return _f(), this._delegate.toUint8Array();
        }
        isEqual(e) {
          return this._delegate.isEqual(e._delegate);
        }
        toString() {
          return "Blob(base64: " + this.toBase64() + ")";
        }
      }
      function Df(e) {
        return (function (e, t) {
          if ("object" != typeof e || null === e) return;
          var n = e;
          for (const r of t) if (r in n && "function" == typeof n[r]) return 1;
          return;
        })(e, ["next", "error", "complete"]);
      }
      class xf {
        enableIndexedDbPersistence(e, t) {
          return (function (e, t) {
            ud((e = Ml(e, ed)));
            var n = td(e),
              r = e._freezeSettings(),
              s = new ll();
            return rd(
              n,
              s,
              new hl(s, r.cacheSizeBytes, null == t ? void 0 : t.forceOwnership)
            );
          })(e._delegate, { forceOwnership: t });
        }
        enableMultiTabIndexedDbPersistence(e) {
          return (function (e) {
            ud((e = Ml(e, ed)));
            var t = td(e),
              n = e._freezeSettings(),
              r = new ll();
            return rd(t, r, new cl(r, n.cacheSizeBytes));
          })(e._delegate);
        }
        clearIndexedDbPersistence(e) {
          return (function (e) {
            if (e._initialized && !e._terminated)
              throw new Nr(
                xr.FAILED_PRECONDITION,
                "Persistence can only be cleared before a Firestore instance is initialized or after it is terminated."
              );
            const t = new Cr();
            return (
              e._queue.enqueueAndForgetEvenWhileRestricted(async () => {
                try {
                  await (async function (e) {
                    if (!Co.vt()) return Promise.resolve();
                    var t = e + "main";
                    await Co.delete(t);
                  })(wh(e._databaseId, e._persistenceKey)),
                    t.resolve();
                } catch (e) {
                  t.reject(e);
                }
              }),
              t.promise
            );
          })(e._delegate);
        }
      }
      class Nf {
        constructor(e, t, n) {
          (this._delegate = t),
            (this._persistenceProvider = n),
            (this.INTERNAL = { delete: () => this.terminate() }),
            e instanceof gs || (this._appCompat = e);
        }
        get _databaseId() {
          return this._delegate._databaseId;
        }
        settings(e) {
          var t = this._delegate._getSettings();
          e.merge ||
            t.host === e.host ||
            _r(
              "You are overriding the original host. If you did not intend to override your settings, use {merge: true}."
            ),
            e.merge &&
              delete (e = Object.assign(Object.assign({}, t), e)).merge,
            this._delegate._setSettings(e);
        }
        useEmulator(e, t, n = {}) {
          Bl(this._delegate, e, t, n);
        }
        enableNetwork() {
          return id(this._delegate);
        }
        disableNetwork() {
          return ad(this._delegate);
        }
        enablePersistence(e) {
          let t = !1,
            n = !1;
          return (
            e &&
              ((t = !!e.synchronizeTabs),
              (n = !!e.experimentalForceOwningTab),
              Rl("synchronizeTabs", t, "experimentalForceOwningTab", n)),
            t
              ? this._persistenceProvider.enableMultiTabIndexedDbPersistence(
                  this
                )
              : this._persistenceProvider.enableIndexedDbPersistence(this, n)
          );
        }
        clearPersistence() {
          return this._persistenceProvider.clearIndexedDbPersistence(this);
        }
        terminate() {
          return (
            this._appCompat &&
              (this._appCompat._removeServiceInstance("firestore-compat"),
              this._appCompat._removeServiceInstance("firestore")),
            this._delegate._delete()
          );
        }
        waitForPendingWrites() {
          return sd(this._delegate);
        }
        onSnapshotsInSync(e) {
          return vf(this._delegate, e);
        }
        get app() {
          if (!this._appCompat)
            throw new Nr(
              "failed-precondition",
              "Firestore was not initialized using the Firebase SDK. 'app' is not available"
            );
          return this._appCompat;
        }
        collection(e) {
          try {
            return new Kf(this, Gl(this._delegate, e));
          } catch (e) {
            throw Vf(e, "collection()", "Firestore.collection()");
          }
        }
        doc(e) {
          try {
            return new Lf(this, $l(this._delegate, e));
          } catch (e) {
            throw Vf(e, "doc()", "Firestore.doc()");
          }
        }
        collectionGroup(e) {
          try {
            return new Bf(
              this,
              (function (e, t) {
                if (
                  ((e = Ml(e, Ul)),
                  kl("collectionGroup", "collection id", t),
                  0 <= t.indexOf("/"))
                )
                  throw new Nr(
                    xr.INVALID_ARGUMENT,
                    `Invalid collection ID '${t}' passed to function collectionGroup(). Collection IDs must not contain '/'.`
                  );
                return new jl(e, null, ((t = t), new gi(ns.emptyPath(), t)));
              })(this._delegate, e)
            );
          } catch (e) {
            throw Vf(e, "collectionGroup()", "Firestore.collectionGroup()");
          }
        }
        runTransaction(t) {
          return Ef(this._delegate, (e) => t(new kf(this, e)));
        }
        batch() {
          return (
            td(this._delegate),
            new Rf(new cf(this._delegate, (e) => wf(this._delegate, e)))
          );
        }
        loadBundle(e) {
          return (
            (t = this._delegate),
            (e = e),
            (n = td((t = Ml(t, ed)))),
            (r = new Yl()),
            Nl(n, t._databaseId, e, r),
            r
          );
          var t, n, r;
        }
        namedQuery(e) {
          return od(this._delegate, e).then((e) =>
            e ? new Bf(this, e) : null
          );
        }
      }
      class Cf extends of {
        constructor(e) {
          super(), (this.firestore = e);
        }
        convertBytes(e) {
          return new Af(new cd(e));
        }
        convertReference(e) {
          var t = this.convertDocumentKey(e, this.firestore._databaseId);
          return Lf.forKey(t, this.firestore, null);
        }
      }
      class kf {
        constructor(e, t) {
          (this._firestore = e),
            (this._delegate = t),
            (this._userDataWriter = new Cf(e));
        }
        get(e) {
          const t = Gf(e);
          return this._delegate
            .get(t)
            .then(
              (e) =>
                new Pf(
                  this._firestore,
                  new Kd(
                    this._firestore._delegate,
                    this._userDataWriter,
                    e._key,
                    e._document,
                    e.metadata,
                    t.converter
                  )
                )
            );
        }
        set(e, t, n) {
          var r = Gf(e);
          return (
            n
              ? (Tf("Transaction.set", n), this._delegate.set(r, t, n))
              : this._delegate.set(r, t),
            this
          );
        }
        update(e, t, n, ...r) {
          var s = Gf(e);
          return (
            2 === arguments.length
              ? this._delegate.update(s, t)
              : this._delegate.update(s, t, n, ...r),
            this
          );
        }
        delete(e) {
          var t = Gf(e);
          return this._delegate.delete(t), this;
        }
      }
      class Rf {
        constructor(e) {
          this._delegate = e;
        }
        set(e, t, n) {
          var r = Gf(e);
          return (
            n
              ? (Tf("WriteBatch.set", n), this._delegate.set(r, t, n))
              : this._delegate.set(r, t),
            this
          );
        }
        update(e, t, n, ...r) {
          var s = Gf(e);
          return (
            2 === arguments.length
              ? this._delegate.update(s, t)
              : this._delegate.update(s, t, n, ...r),
            this
          );
        }
        delete(e) {
          var t = Gf(e);
          return this._delegate.delete(t), this;
        }
        commit() {
          return this._delegate.commit();
        }
      }
      class Of {
        constructor(e, t, n) {
          (this._firestore = e),
            (this._userDataWriter = t),
            (this._delegate = n);
        }
        fromFirestore(e, t) {
          var n = new Gd(
            this._firestore._delegate,
            this._userDataWriter,
            e._key,
            e._document,
            e.metadata,
            null
          );
          return this._delegate.fromFirestore(
            new Uf(this._firestore, n),
            null != t ? t : {}
          );
        }
        toFirestore(e, t) {
          return t
            ? this._delegate.toFirestore(e, t)
            : this._delegate.toFirestore(e);
        }
        static getInstance(e, t) {
          const n = Of.INSTANCES;
          let r = n.get(e);
          r || ((r = new WeakMap()), n.set(e, r));
          let s = r.get(t);
          return s || ((s = new Of(e, new Cf(e), t)), r.set(t, s)), s;
        }
      }
      Of.INSTANCES = new WeakMap();
      class Lf {
        constructor(e, t) {
          (this.firestore = e),
            (this._delegate = t),
            (this._userDataWriter = new Cf(e));
        }
        static forPath(e, t, n) {
          if (e.length % 2 != 0)
            throw new Nr(
              "invalid-argument",
              "Invalid document reference. Document references must have an even number of segments, but " +
                `${e.canonicalString()} has ${e.length}`
            );
          return new Lf(t, new ql(t._delegate, n, new vs(e)));
        }
        static forKey(e, t, n) {
          return new Lf(t, new ql(t._delegate, n, e));
        }
        get id() {
          return this._delegate.id;
        }
        get parent() {
          return new Kf(this.firestore, this._delegate.parent);
        }
        get path() {
          return this._delegate.path;
        }
        collection(e) {
          try {
            return new Kf(this.firestore, Gl(this._delegate, e));
          } catch (e) {
            throw Vf(e, "collection()", "DocumentReference.collection()");
          }
        }
        isEqual(e) {
          return (e = m(e)) instanceof ql && zl(this._delegate, e);
        }
        set(e, t) {
          t = Tf("DocumentReference.set", t);
          try {
            return t ? mf(this._delegate, e, t) : mf(this._delegate, e);
          } catch (e) {
            throw Vf(e, "setDoc()", "DocumentReference.set()");
          }
        }
        update(e, t, ...n) {
          try {
            return 1 === arguments.length
              ? pf(this._delegate, e)
              : pf(this._delegate, e, t, ...n);
          } catch (e) {
            throw Vf(e, "updateDoc()", "DocumentReference.update()");
          }
        }
        delete() {
          return wf(Ml((e = this._delegate).firestore, ed), [
            new na(e._key, Gi.none()),
          ]);
          var e;
        }
        onSnapshot(...e) {
          var t = Mf(e),
            n = Ff(
              e,
              (e) =>
                new Pf(
                  this.firestore,
                  new Kd(
                    this.firestore._delegate,
                    this._userDataWriter,
                    e._key,
                    e._document,
                    e.metadata,
                    this._delegate.converter
                  )
                )
            );
          return yf(this._delegate, t, n);
        }
        get(e) {
          let t;
          return (
            (t = (
              "cache" === (null == e ? void 0 : e.source)
                ? ff
                : "server" === (null == e ? void 0 : e.source)
                ? function (t) {
                    t = Ml(t, ql);
                    const n = Ml(t.firestore, ed);
                    return Dl(td(n), t._key, { source: "server" }).then((e) =>
                      bf(n, t, e)
                    );
                  }
                : function (t) {
                    t = Ml(t, ql);
                    const n = Ml(t.firestore, ed);
                    return Dl(td(n), t._key).then((e) => bf(n, t, e));
                  }
            )(this._delegate)),
            t.then(
              (e) =>
                new Pf(
                  this.firestore,
                  new Kd(
                    this.firestore._delegate,
                    this._userDataWriter,
                    e._key,
                    e._document,
                    e.metadata,
                    this._delegate.converter
                  )
                )
            )
          );
        }
        withConverter(e) {
          return new Lf(
            this.firestore,
            e
              ? this._delegate.withConverter(Of.getInstance(this.firestore, e))
              : this._delegate.withConverter(null)
          );
        }
      }
      function Vf(e, t, n) {
        return (e.message = e.message.replace(t, n)), e;
      }
      function Mf(e) {
        for (const t of e) if ("object" == typeof t && !Df(t)) return t;
        return {};
      }
      function Ff(e, t) {
        var n;
        let r;
        return (
          (r = Df(e[0])
            ? e[0]
            : Df(e[1])
            ? e[1]
            : "function" == typeof e[0]
            ? { next: e[0], error: e[1], complete: e[2] }
            : { next: e[1], error: e[2], complete: e[3] }),
          {
            next: (e) => {
              r.next && r.next(t(e));
            },
            error: null === (n = r.error) || void 0 === n ? void 0 : n.bind(r),
            complete:
              null === (n = r.complete) || void 0 === n ? void 0 : n.bind(r),
          }
        );
      }
      class Pf {
        constructor(e, t) {
          (this._firestore = e), (this._delegate = t);
        }
        get ref() {
          return new Lf(this._firestore, this._delegate.ref);
        }
        get id() {
          return this._delegate.id;
        }
        get metadata() {
          return this._delegate.metadata;
        }
        get exists() {
          return this._delegate.exists();
        }
        data(e) {
          return this._delegate.data(e);
        }
        get(e, t) {
          return this._delegate.get(e, t);
        }
        isEqual(e) {
          return zd(this._delegate, e._delegate);
        }
      }
      class Uf extends Pf {
        data(e) {
          var t = this._delegate.data(e);
          return void 0 !== t || Ar(), t;
        }
      }
      class Bf {
        constructor(e, t) {
          (this.firestore = e),
            (this._delegate = t),
            (this._userDataWriter = new Cf(e));
        }
        where(e, t, n) {
          try {
            return new Bf(
              this.firestore,
              Qd(
                this._delegate,
                ((r = n), (s = t), (i = qd("where", e)), new Yd(i, s, r))
              )
            );
          } catch (e) {
            throw Vf(e, /(orderBy|where)\(\)/, "Query.$1()");
          }
          var r, s, i;
        }
        orderBy(e, t) {
          try {
            return new Bf(
              this.firestore,
              Qd(
                this._delegate,
                (([n, r = "asc"] = [e, t]),
                (s = r),
                (i = qd("orderBy", n)),
                new Xd(i, s))
              )
            );
          } catch (e) {
            throw Vf(e, /(orderBy|where)\(\)/, "Query.$1()");
          }
          var n, r, s, i;
        }
        limit(e) {
          try {
            return new Bf(
              this.firestore,
              Qd(
                this._delegate,
                (Fl("limit", (t = e)), new Jd("limit", t, "F"))
              )
            );
          } catch (e) {
            throw Vf(e, "limit()", "Query.limit()");
          }
          var t;
        }
        limitToLast(e) {
          try {
            return new Bf(
              this.firestore,
              Qd(
                this._delegate,
                (Fl("limitToLast", (t = e)), new Jd("limitToLast", t, "L"))
              )
            );
          } catch (e) {
            throw Vf(e, "limitToLast()", "Query.limitToLast()");
          }
          var t;
        }
        startAt(...e) {
          try {
            return new Bf(
              this.firestore,
              Qd(
                this._delegate,
                (function (...e) {
                  return new Zd("startAt", e, !0);
                })(...e)
              )
            );
          } catch (e) {
            throw Vf(e, "startAt()", "Query.startAt()");
          }
        }
        startAfter(...e) {
          try {
            return new Bf(
              this.firestore,
              Qd(
                this._delegate,
                (function (...e) {
                  return new Zd("startAfter", e, !1);
                })(...e)
              )
            );
          } catch (e) {
            throw Vf(e, "startAfter()", "Query.startAfter()");
          }
        }
        endBefore(...e) {
          try {
            return new Bf(
              this.firestore,
              Qd(
                this._delegate,
                (function (...e) {
                  return new ef("endBefore", e, !1);
                })(...e)
              )
            );
          } catch (e) {
            throw Vf(e, "endBefore()", "Query.endBefore()");
          }
        }
        endAt(...e) {
          try {
            return new Bf(
              this.firestore,
              Qd(
                this._delegate,
                (function (...e) {
                  return new ef("endAt", e, !0);
                })(...e)
              )
            );
          } catch (e) {
            throw Vf(e, "endAt()", "Query.endAt()");
          }
        }
        isEqual(e) {
          return Wl(this._delegate, e._delegate);
        }
        get(e) {
          let t;
          return (
            (t = (
              "cache" === (null == e ? void 0 : e.source)
                ? gf
                : "server" === (null == e ? void 0 : e.source)
                ? function (t) {
                    t = Ml(t, jl);
                    const n = Ml(t.firestore, ed),
                      e = td(n),
                      r = new df(n);
                    return xl(e, t._query, { source: "server" }).then(
                      (e) => new $d(n, r, t, e)
                    );
                  }
                : function (t) {
                    t = Ml(t, jl);
                    const n = Ml(t.firestore, ed),
                      e = td(n),
                      r = new df(n);
                    return (
                      Wd(t._query),
                      xl(e, t._query).then((e) => new $d(n, r, t, e))
                    );
                  }
            )(this._delegate)),
            t.then(
              (e) =>
                new jf(
                  this.firestore,
                  new $d(
                    this.firestore._delegate,
                    this._userDataWriter,
                    this._delegate,
                    e._snapshot
                  )
                )
            )
          );
        }
        onSnapshot(...e) {
          var t = Mf(e),
            n = Ff(
              e,
              (e) =>
                new jf(
                  this.firestore,
                  new $d(
                    this.firestore._delegate,
                    this._userDataWriter,
                    this._delegate,
                    e._snapshot
                  )
                )
            );
          return yf(this._delegate, t, n);
        }
        withConverter(e) {
          return new Bf(
            this.firestore,
            e
              ? this._delegate.withConverter(Of.getInstance(this.firestore, e))
              : this._delegate.withConverter(null)
          );
        }
      }
      class qf {
        constructor(e, t) {
          (this._firestore = e), (this._delegate = t);
        }
        get type() {
          return this._delegate.type;
        }
        get doc() {
          return new Uf(this._firestore, this._delegate.doc);
        }
        get oldIndex() {
          return this._delegate.oldIndex;
        }
        get newIndex() {
          return this._delegate.newIndex;
        }
      }
      class jf {
        constructor(e, t) {
          (this._firestore = e), (this._delegate = t);
        }
        get query() {
          return new Bf(this._firestore, this._delegate.query);
        }
        get metadata() {
          return this._delegate.metadata;
        }
        get size() {
          return this._delegate.size;
        }
        get empty() {
          return this._delegate.empty;
        }
        get docs() {
          return this._delegate.docs.map((e) => new Uf(this._firestore, e));
        }
        docChanges(e) {
          return this._delegate
            .docChanges(e)
            .map((e) => new qf(this._firestore, e));
        }
        forEach(t, n) {
          this._delegate.forEach((e) => {
            t.call(n, new Uf(this._firestore, e));
          });
        }
        isEqual(e) {
          return zd(this._delegate, e._delegate);
        }
      }
      class Kf extends Bf {
        constructor(e, t) {
          super(e, t), (this.firestore = e), (this._delegate = t);
        }
        get id() {
          return this._delegate.id;
        }
        get path() {
          return this._delegate.path;
        }
        get parent() {
          var e = this._delegate.parent;
          return e ? new Lf(this.firestore, e) : null;
        }
        doc(e) {
          try {
            return void 0 === e
              ? new Lf(this.firestore, $l(this._delegate))
              : new Lf(this.firestore, $l(this._delegate, e));
          } catch (e) {
            throw Vf(e, "doc()", "CollectionReference.doc()");
          }
        }
        add(e) {
          return (function (e, t) {
            const n = Ml(e.firestore, ed),
              r = $l(e),
              s = uf(e.converter, t);
            return wf(n, [
              bd(
                wd(e.firestore),
                "addDoc",
                r._key,
                s,
                null !== e.converter,
                {}
              ).toMutation(r._key, Gi.exists(!1)),
            ]).then(() => r);
          })(this._delegate, e).then((e) => new Lf(this.firestore, e));
        }
        isEqual(e) {
          return zl(this._delegate, e._delegate);
        }
        withConverter(e) {
          return new Kf(
            this.firestore,
            e
              ? this._delegate.withConverter(Of.getInstance(this.firestore, e))
              : this._delegate.withConverter(null)
          );
        }
      }
      function Gf(e) {
        return Ml(e, ql);
      }
      const $f = {
        Firestore: Nf,
        GeoPoint: dd,
        Timestamp: Gr,
        Blob: Af,
        Transaction: kf,
        WriteBatch: Rf,
        DocumentReference: Lf,
        DocumentSnapshot: Pf,
        Query: Bf,
        QueryDocumentSnapshot: Uf,
        QuerySnapshot: jf,
        CollectionReference: Kf,
        FieldPath: class zf {
          constructor(...e) {
            this._delegate = new hd(...e);
          }
          static documentId() {
            return new zf(ss.keyField().canonicalString());
          }
          isEqual(e) {
            return (
              (e = m(e)) instanceof hd &&
              this._delegate._internalPath.isEqual(e._internalPath)
            );
          }
        },
        FieldValue: class Wf {
          constructor(e) {
            this._delegate = e;
          }
          static serverTimestamp() {
            const e = new Td("serverTimestamp");
            return (e._methodName = "FieldValue.serverTimestamp"), new Wf(e);
          }
          static delete() {
            const e = new Id("deleteField");
            return (e._methodName = "FieldValue.delete"), new Wf(e);
          }
          static arrayUnion(...e) {
            const t = (function (...e) {
              return new _d("arrayUnion", e);
            })(...e);
            return (t._methodName = "FieldValue.arrayUnion"), new Wf(t);
          }
          static arrayRemove(...e) {
            const t = (function (...e) {
              return new Sd("arrayRemove", e);
            })(...e);
            return (t._methodName = "FieldValue.arrayRemove"), new Wf(t);
          }
          static increment(e) {
            const t = new Ad("increment", e);
            return (t._methodName = "FieldValue.increment"), new Wf(t);
          }
          isEqual(e) {
            return this._delegate.isEqual(e._delegate);
          }
        },
        setLogLevel: function (e) {
          (e = e), br.setLogLevel(e);
        },
        CACHE_SIZE_UNLIMITED: -1,
      };
      (Jl = t.default),
        (Zl = (e, t) => new Nf(e, t, new xf())),
        Jl.INTERNAL.registerComponent(
          new h(
            "firestore-compat",
            (e) => {
              var t = e.getProvider("app-compat").getImmediate(),
                n = e.getProvider("firestore").getImmediate();
              return Zl(t, n);
            },
            "PUBLIC"
          ).setServiceProps(Object.assign({}, $f))
        ),
        Jl.registerVersion("@firebase/firestore-compat", "0.1.18");
    }.apply(this, arguments);
  } catch (e) {
    throw (
      (console.error(e),
      new Error(
        "Cannot instantiate firebase-firestore-compat.js - be sure to load firebase-app.js first."
      ))
    );
  }
});
//# sourceMappingURL=firebase-firestore-compat.js.map
