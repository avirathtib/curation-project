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
})(this, function (To, Io) {
  "use strict";
  try {
    !function () {
      function e(e) {
        return e && "object" == typeof e && "default" in e ? e : { default: e };
      }
      var n,
        t = e(To);
      function r(t) {
        const n = [];
        let r = 0;
        for (let i = 0; i < t.length; i++) {
          let e = t.charCodeAt(i);
          e < 128
            ? (n[r++] = e)
            : (e < 2048
                ? (n[r++] = (e >> 6) | 192)
                : (55296 == (64512 & e) &&
                  i + 1 < t.length &&
                  56320 == (64512 & t.charCodeAt(i + 1))
                    ? ((e =
                        65536 +
                        ((1023 & e) << 10) +
                        (1023 & t.charCodeAt(++i))),
                      (n[r++] = (e >> 18) | 240),
                      (n[r++] = ((e >> 12) & 63) | 128))
                    : (n[r++] = (e >> 12) | 224),
                  (n[r++] = ((e >> 6) & 63) | 128)),
              (n[r++] = (63 & e) | 128));
        }
        return n;
      }
      function i(e) {
        var t = r(e);
        return o.encodeByteArray(t, !0);
      }
      const s = {
          NODE_CLIENT: !1,
          NODE_ADMIN: !1,
          SDK_VERSION: "${JSCORE_VERSION}",
        },
        p = function (e, t) {
          if (!e) throw c(t);
        },
        c = function (e) {
          return new Error(
            "Firebase Database (" +
              s.SDK_VERSION +
              ") INTERNAL ASSERT FAILED: " +
              e
          );
        },
        o = {
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
            const i = [];
            for (let c = 0; c < n.length; c += 3) {
              var s = n[c],
                o = c + 1 < n.length,
                a = o ? n[c + 1] : 0,
                l = c + 2 < n.length,
                h = l ? n[c + 2] : 0;
              let e = ((15 & a) << 2) | (h >> 6),
                t = 63 & h;
              l || ((t = 64), o || (e = 64)),
                i.push(r[s >> 2], r[((3 & s) << 4) | (a >> 4)], r[e], r[t]);
            }
            return i.join("");
          },
          encodeString(e, t) {
            return this.HAS_NATIVE_SUPPORT && !t
              ? btoa(e)
              : this.encodeByteArray(r(e), t);
          },
          decodeString(e, t) {
            return this.HAS_NATIVE_SUPPORT && !t
              ? atob(e)
              : (function (e) {
                  const t = [];
                  let n = 0,
                    r = 0;
                  for (; n < e.length; ) {
                    var i,
                      s,
                      o = e[n++];
                    o < 128
                      ? (t[r++] = String.fromCharCode(o))
                      : 191 < o && o < 224
                      ? ((i = e[n++]),
                        (t[r++] = String.fromCharCode(
                          ((31 & o) << 6) | (63 & i)
                        )))
                      : 239 < o && o < 365
                      ? ((s =
                          (((7 & o) << 18) |
                            ((63 & e[n++]) << 12) |
                            ((63 & e[n++]) << 6) |
                            (63 & e[n++])) -
                          65536),
                        (t[r++] = String.fromCharCode(55296 + (s >> 10))),
                        (t[r++] = String.fromCharCode(56320 + (1023 & s))))
                      : ((i = e[n++]),
                        (s = e[n++]),
                        (t[r++] = String.fromCharCode(
                          ((15 & o) << 12) | ((63 & i) << 6) | (63 & s)
                        )));
                  }
                  return t.join("");
                })(this.decodeStringToByteArray(e, t));
          },
          decodeStringToByteArray(e, t) {
            this.init_();
            var n = t ? this.charToByteMapWebSafe_ : this.charToByteMap_;
            const r = [];
            for (let l = 0; l < e.length; ) {
              var i = n[e.charAt(l++)],
                s = l < e.length ? n[e.charAt(l)] : 0;
              ++l;
              var o = l < e.length ? n[e.charAt(l)] : 64;
              ++l;
              var a = l < e.length ? n[e.charAt(l)] : 64;
              if ((++l, null == i || null == s || null == o || null == a))
                throw Error();
              r.push((i << 2) | (s >> 4)),
                64 !== o &&
                  (r.push(((s << 4) & 240) | (o >> 2)),
                  64 !== a && r.push(((o << 6) & 192) | a));
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
          return i(e).replace(/\./g, "");
        },
        l = function (e) {
          try {
            return o.decodeString(e, !0);
          } catch (e) {
            console.error("base64Decode failed: ", e);
          }
          return null;
        };
      function h(e) {
        return (function e(t, n) {
          if (!(n instanceof Object)) return n;
          switch (n.constructor) {
            case Date:
              const r = n;
              return new Date(r.getTime());
            case Object:
              void 0 === t && (t = {});
              break;
            case Array:
              t = [];
              break;
            default:
              return n;
          }
          for (const i in n)
            n.hasOwnProperty(i) && u(i) && (t[i] = e(t[i], n[i]));
          return t;
        })(void 0, e);
      }
      function u(e) {
        return "__proto__" !== e;
      }
      class d {
        constructor() {
          (this.reject = () => {}),
            (this.resolve = () => {}),
            (this.promise = new Promise((e, t) => {
              (this.resolve = e), (this.reject = t);
            }));
        }
        wrapCallback(n) {
          return (e, t) => {
            e ? this.reject(e) : this.resolve(t),
              "function" == typeof n &&
                (this.promise.catch(() => {}), 1 === n.length ? n(e) : n(e, t));
          };
        }
      }
      function _() {
        return (
          "undefined" != typeof window &&
          (window.cordova || window.phonegap || window.PhoneGap) &&
          /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(
            "undefined" != typeof navigator &&
              "string" == typeof navigator.userAgent
              ? navigator.userAgent
              : ""
          )
        );
      }
      function f() {
        return !0 === s.NODE_ADMIN;
      }
      function g(e) {
        return JSON.parse(e);
      }
      function m(e) {
        return JSON.stringify(e);
      }
      function v(e) {
        let t = {},
          n = {},
          r = {},
          i = "";
        try {
          var s = e.split(".");
          (t = g(l(s[0]) || "")),
            (n = g(l(s[1]) || "")),
            (i = s[2]),
            (r = n.d || {}),
            delete n.d;
        } catch (e) {}
        return { header: t, claims: n, data: r, signature: i };
      }
      function y(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }
      function w(e, t) {
        if (Object.prototype.hasOwnProperty.call(e, t)) return e[t];
      }
      function C(e) {
        for (const t in e)
          if (Object.prototype.hasOwnProperty.call(e, t)) return !1;
        return !0;
      }
      function b(e, t, n) {
        const r = {};
        for (const i in e)
          Object.prototype.hasOwnProperty.call(e, i) &&
            (r[i] = t.call(n, e[i], i, e));
        return r;
      }
      class T {
        constructor() {
          (this.chain_ = []),
            (this.buf_ = []),
            (this.W_ = []),
            (this.pad_ = []),
            (this.inbuf_ = 0),
            (this.total_ = 0),
            (this.blockSize = 64),
            (this.pad_[0] = 128);
          for (let e = 1; e < this.blockSize; ++e) this.pad_[e] = 0;
          this.reset();
        }
        reset() {
          (this.chain_[0] = 1732584193),
            (this.chain_[1] = 4023233417),
            (this.chain_[2] = 2562383102),
            (this.chain_[3] = 271733878),
            (this.chain_[4] = 3285377520),
            (this.inbuf_ = 0),
            (this.total_ = 0);
        }
        compress_(n, r) {
          r = r || 0;
          const i = this.W_;
          if ("string" == typeof n)
            for (let e = 0; e < 16; e++)
              (i[e] =
                (n.charCodeAt(r) << 24) |
                (n.charCodeAt(r + 1) << 16) |
                (n.charCodeAt(r + 2) << 8) |
                n.charCodeAt(r + 3)),
                (r += 4);
          else
            for (let t = 0; t < 16; t++)
              (i[t] =
                (n[r] << 24) | (n[r + 1] << 16) | (n[r + 2] << 8) | n[r + 3]),
                (r += 4);
          for (let d = 16; d < 80; d++) {
            var e = i[d - 3] ^ i[d - 8] ^ i[d - 14] ^ i[d - 16];
            i[d] = 4294967295 & ((e << 1) | (e >>> 31));
          }
          let t = this.chain_[0],
            s = this.chain_[1],
            o = this.chain_[2],
            a = this.chain_[3],
            l = this.chain_[4],
            h,
            c;
          for (let _ = 0; _ < 80; _++) {
            c =
              _ < 40
                ? _ < 20
                  ? ((h = a ^ (s & (o ^ a))), 1518500249)
                  : ((h = s ^ o ^ a), 1859775393)
                : _ < 60
                ? ((h = (s & o) | (a & (s | o))), 2400959708)
                : ((h = s ^ o ^ a), 3395469782);
            var u = (((t << 5) | (t >>> 27)) + h + l + c + i[_]) & 4294967295;
            (l = a),
              (a = o),
              (o = 4294967295 & ((s << 30) | (s >>> 2))),
              (s = t),
              (t = u);
          }
          (this.chain_[0] = (this.chain_[0] + t) & 4294967295),
            (this.chain_[1] = (this.chain_[1] + s) & 4294967295),
            (this.chain_[2] = (this.chain_[2] + o) & 4294967295),
            (this.chain_[3] = (this.chain_[3] + a) & 4294967295),
            (this.chain_[4] = (this.chain_[4] + l) & 4294967295);
        }
        update(n, r) {
          if (null != n) {
            var i = (r = void 0 === r ? n.length : r) - this.blockSize;
            let e = 0;
            const s = this.buf_;
            let t = this.inbuf_;
            for (; e < r; ) {
              if (0 === t)
                for (; e <= i; ) this.compress_(n, e), (e += this.blockSize);
              if ("string" == typeof n) {
                for (; e < r; )
                  if (
                    ((s[t] = n.charCodeAt(e)), ++t, ++e, t === this.blockSize)
                  ) {
                    this.compress_(s), (t = 0);
                    break;
                  }
              } else
                for (; e < r; )
                  if (((s[t] = n[e]), ++t, ++e, t === this.blockSize)) {
                    this.compress_(s), (t = 0);
                    break;
                  }
            }
            (this.inbuf_ = t), (this.total_ += r);
          }
        }
        digest() {
          const t = [];
          let e = 8 * this.total_;
          this.inbuf_ < 56
            ? this.update(this.pad_, 56 - this.inbuf_)
            : this.update(this.pad_, this.blockSize - (this.inbuf_ - 56));
          for (let r = this.blockSize - 1; 56 <= r; r--)
            (this.buf_[r] = 255 & e), (e /= 256);
          this.compress_(this.buf_);
          let n = 0;
          for (let i = 0; i < 5; i++)
            for (let e = 24; 0 <= e; e -= 8)
              (t[n] = (this.chain_[i] >> e) & 255), ++n;
          return t;
        }
      }
      function I(e, t, n, r) {
        let i;
        if (
          (r < t
            ? (i = "at least " + t)
            : n < r && (i = 0 === n ? "none" : "no more than " + n),
          i)
        ) {
          var s =
            e +
            " failed: Was called with " +
            r +
            (1 === r ? " argument." : " arguments.") +
            " Expects " +
            i +
            ".";
          throw new Error(s);
        }
      }
      function E(e, t) {
        return `${e} failed: ${t} argument `;
      }
      function S(e, t, n, r) {
        if ((!r || n) && "function" != typeof n)
          throw new Error(E(e, t) + "must be a valid function.");
      }
      function k(e, t, n, r) {
        if ((!r || n) && ("object" != typeof n || null === n))
          throw new Error(E(e, t) + "must be a valid context object.");
      }
      const N = function (e) {
        let t = 0;
        for (let r = 0; r < e.length; r++) {
          var n = e.charCodeAt(r);
          n < 128
            ? t++
            : n < 2048
            ? (t += 2)
            : 55296 <= n && n <= 56319
            ? ((t += 4), r++)
            : (t += 3);
        }
        return t;
      };
      function P(e) {
        return e && e._delegate ? e._delegate : e;
      }
      class R {
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
      const x = "[DEFAULT]";
      class D {
        constructor(e, t) {
          (this.name = e),
            (this.container = t),
            (this.component = null),
            (this.instances = new Map()),
            (this.instancesDeferred = new Map()),
            (this.instancesOptions = new Map()),
            (this.onInitCallbacks = new Map());
        }
        get(e) {
          var t = this.normalizeInstanceIdentifier(e);
          if (!this.instancesDeferred.has(t)) {
            const r = new d();
            if (
              (this.instancesDeferred.set(t, r),
              this.isInitialized(t) || this.shouldAutoInitialize())
            )
              try {
                var n = this.getOrInitializeService({ instanceIdentifier: t });
                n && r.resolve(n);
              } catch (e) {}
          }
          return this.instancesDeferred.get(t).promise;
        }
        getImmediate(e) {
          var t = this.normalizeInstanceIdentifier(
              null == e ? void 0 : e.identifier
            ),
            n =
              null !== (n = null == e ? void 0 : e.optional) &&
              void 0 !== n &&
              n;
          if (!this.isInitialized(t) && !this.shouldAutoInitialize()) {
            if (n) return null;
            throw Error(`Service ${this.name} is not available`);
          }
          try {
            return this.getOrInitializeService({ instanceIdentifier: t });
          } catch (e) {
            if (n) return null;
            throw e;
          }
        }
        getComponent() {
          return this.component;
        }
        setComponent(e) {
          if (e.name !== this.name)
            throw Error(
              `Mismatching Component ${e.name} for Provider ${this.name}.`
            );
          if (this.component)
            throw Error(`Component for ${this.name} has already been provided`);
          if (((this.component = e), this.shouldAutoInitialize())) {
            if ("EAGER" === e.instantiationMode)
              try {
                this.getOrInitializeService({ instanceIdentifier: x });
              } catch (e) {}
            for (var [t, n] of this.instancesDeferred.entries()) {
              t = this.normalizeInstanceIdentifier(t);
              try {
                var r = this.getOrInitializeService({ instanceIdentifier: t });
                n.resolve(r);
              } catch (e) {}
            }
          }
        }
        clearInstance(e = x) {
          this.instancesDeferred.delete(e),
            this.instancesOptions.delete(e),
            this.instances.delete(e);
        }
        async delete() {
          const e = Array.from(this.instances.values());
          await Promise.all([
            ...e.filter((e) => "INTERNAL" in e).map((e) => e.INTERNAL.delete()),
            ...e.filter((e) => "_delete" in e).map((e) => e._delete()),
          ]);
        }
        isComponentSet() {
          return null != this.component;
        }
        isInitialized(e = x) {
          return this.instances.has(e);
        }
        getOptions(e = x) {
          return this.instancesOptions.get(e) || {};
        }
        initialize(e = {}) {
          var { options: t = {} } = e,
            n = this.normalizeInstanceIdentifier(e.instanceIdentifier);
          if (this.isInitialized(n))
            throw Error(`${this.name}(${n}) has already been initialized`);
          if (!this.isComponentSet())
            throw Error(`Component ${this.name} has not been registered yet`);
          var r,
            i,
            s = this.getOrInitializeService({
              instanceIdentifier: n,
              options: t,
            });
          for ([r, i] of this.instancesDeferred.entries())
            n === this.normalizeInstanceIdentifier(r) && i.resolve(s);
          return s;
        }
        onInit(e, t) {
          var n = this.normalizeInstanceIdentifier(t);
          const r =
            null !== (i = this.onInitCallbacks.get(n)) && void 0 !== i
              ? i
              : new Set();
          r.add(e), this.onInitCallbacks.set(n, r);
          var i = this.instances.get(n);
          return (
            i && e(i, n),
            () => {
              r.delete(e);
            }
          );
        }
        invokeOnInitCallbacks(e, t) {
          var n = this.onInitCallbacks.get(t);
          if (n)
            for (const r of n)
              try {
                r(e, t);
              } catch (e) {}
        }
        getOrInitializeService({ instanceIdentifier: e, options: t = {} }) {
          let n = this.instances.get(e);
          if (
            !n &&
            this.component &&
            ((n = this.component.instanceFactory(this.container, {
              instanceIdentifier: (r = e) === x ? void 0 : r,
              options: t,
            })),
            this.instances.set(e, n),
            this.instancesOptions.set(e, t),
            this.invokeOnInitCallbacks(n, e),
            this.component.onInstanceCreated)
          )
            try {
              this.component.onInstanceCreated(this.container, e, n);
            } catch (e) {}
          var r;
          return n || null;
        }
        normalizeInstanceIdentifier(e = x) {
          return !this.component || this.component.multipleInstances ? e : x;
        }
        shouldAutoInitialize() {
          return (
            !!this.component && "EXPLICIT" !== this.component.instantiationMode
          );
        }
      }
      class A {
        constructor(e) {
          (this.name = e), (this.providers = new Map());
        }
        addComponent(e) {
          const t = this.getProvider(e.name);
          if (t.isComponentSet())
            throw new Error(
              `Component ${e.name} has already been registered with ${this.name}`
            );
          t.setComponent(e);
        }
        addOrOverwriteComponent(e) {
          const t = this.getProvider(e.name);
          t.isComponentSet() && this.providers.delete(e.name),
            this.addComponent(e);
        }
        getProvider(e) {
          if (this.providers.has(e)) return this.providers.get(e);
          var t = new D(e, this);
          return this.providers.set(e, t), t;
        }
        getProviders() {
          return Array.from(this.providers.values());
        }
      }
      ((K = n = n || {})[(K.DEBUG = 0)] = "DEBUG"),
        (K[(K.VERBOSE = 1)] = "VERBOSE"),
        (K[(K.INFO = 2)] = "INFO"),
        (K[(K.WARN = 3)] = "WARN"),
        (K[(K.ERROR = 4)] = "ERROR"),
        (K[(K.SILENT = 5)] = "SILENT");
      const O = {
          debug: n.DEBUG,
          verbose: n.VERBOSE,
          info: n.INFO,
          warn: n.WARN,
          error: n.ERROR,
          silent: n.SILENT,
        },
        L = n.INFO,
        M = {
          [n.DEBUG]: "log",
          [n.VERBOSE]: "log",
          [n.INFO]: "info",
          [n.WARN]: "warn",
          [n.ERROR]: "error",
        },
        F = (e, t, ...n) => {
          if (!(t < e.logLevel)) {
            var r = new Date().toISOString(),
              i = M[t];
            if (!i)
              throw new Error(
                `Attempted to log a message with an invalid logType (value: ${t})`
              );
            console[i](`[${r}]  ${e.name}:`, ...n);
          }
        };
      class q {
        constructor(e) {
          (this.name = e),
            (this._logLevel = L),
            (this._logHandler = F),
            (this._userLogHandler = null);
        }
        get logLevel() {
          return this._logLevel;
        }
        set logLevel(e) {
          if (!(e in n))
            throw new TypeError(
              `Invalid value "${e}" assigned to \`logLevel\``
            );
          this._logLevel = e;
        }
        setLogLevel(e) {
          this._logLevel = "string" == typeof e ? O[e] : e;
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
          this._userLogHandler && this._userLogHandler(this, n.DEBUG, ...e),
            this._logHandler(this, n.DEBUG, ...e);
        }
        log(...e) {
          this._userLogHandler && this._userLogHandler(this, n.VERBOSE, ...e),
            this._logHandler(this, n.VERBOSE, ...e);
        }
        info(...e) {
          this._userLogHandler && this._userLogHandler(this, n.INFO, ...e),
            this._logHandler(this, n.INFO, ...e);
        }
        warn(...e) {
          this._userLogHandler && this._userLogHandler(this, n.WARN, ...e),
            this._logHandler(this, n.WARN, ...e);
        }
        error(...e) {
          this._userLogHandler && this._userLogHandler(this, n.ERROR, ...e),
            this._logHandler(this, n.ERROR, ...e);
        }
      }
      const W = "@firebase/database";
      let U = "";
      function B(e) {
        U = e;
      }
      class j {
        constructor(e) {
          (this.domStorage_ = e), (this.prefix_ = "firebase:");
        }
        set(e, t) {
          null == t
            ? this.domStorage_.removeItem(this.prefixedName_(e))
            : this.domStorage_.setItem(this.prefixedName_(e), m(t));
        }
        get(e) {
          var t = this.domStorage_.getItem(this.prefixedName_(e));
          return null == t ? null : g(t);
        }
        remove(e) {
          this.domStorage_.removeItem(this.prefixedName_(e));
        }
        prefixedName_(e) {
          return this.prefix_ + e;
        }
        toString() {
          return this.domStorage_.toString();
        }
      }
      class V {
        constructor() {
          (this.cache_ = {}), (this.isInMemoryStorage = !0);
        }
        set(e, t) {
          null == t ? delete this.cache_[e] : (this.cache_[e] = t);
        }
        get(e) {
          return y(this.cache_, e) ? this.cache_[e] : null;
        }
        remove(e) {
          delete this.cache_[e];
        }
      }
      function z(e) {
        try {
          if ("undefined" != typeof window && void 0 !== window[e]) {
            const t = window[e];
            return (
              t.setItem("firebase:sentinel", "cache"),
              t.removeItem("firebase:sentinel"),
              new j(t)
            );
          }
        } catch (e) {}
        return new V();
      }
      var H, Q, Y, K, $, G, J;
      function X(e) {
        var t = (function (t) {
          const n = [];
          let r = 0;
          for (let o = 0; o < t.length; o++) {
            let e = t.charCodeAt(o);
            var i, s;
            55296 <= e &&
              e <= 56319 &&
              ((i = e - 55296),
              o++,
              p(o < t.length, "Surrogate pair missing trail surrogate."),
              (s = t.charCodeAt(o) - 56320),
              (e = 65536 + (i << 10) + s)),
              e < 128
                ? (n[r++] = e)
                : (e < 2048
                    ? (n[r++] = (e >> 6) | 192)
                    : (e < 65536
                        ? (n[r++] = (e >> 12) | 224)
                        : ((n[r++] = (e >> 18) | 240),
                          (n[r++] = ((e >> 12) & 63) | 128)),
                      (n[r++] = ((e >> 6) & 63) | 128)),
                  (n[r++] = (63 & e) | 128));
          }
          return n;
        })(e);
        const n = new T();
        return n.update(t), (t = n.digest()), o.encodeByteArray(t);
      }
      const Z = z("localStorage"),
        ee = z("sessionStorage"),
        te = new q("@firebase/database"),
        ne = (function () {
          let e = 1;
          return function () {
            return e++;
          };
        })(),
        re = function (...e) {
          let t = "";
          for (let r = 0; r < e.length; r++) {
            var n = e[r];
            Array.isArray(n) ||
            (n && "object" == typeof n && "number" == typeof n.length)
              ? (t += re.apply(null, n))
              : (t += "object" == typeof n ? m(n) : n),
              (t += " ");
          }
          return t;
        };
      let ie = null,
        se = !0;
      function oe(t) {
        return function (...e) {
          _e(t, ...e);
        };
      }
      function ae(...e) {
        var t = "FIREBASE INTERNAL ERROR: " + re(...e);
        te.error(t);
      }
      function le(e, t) {
        return e === t ? 0 : e < t ? -1 : 1;
      }
      function he(e, t) {
        if (t && e in t) return t[e];
        throw new Error("Missing required key (" + e + ") in object: " + m(t));
      }
      function ce(e) {
        if ("object" != typeof e || null === e) return m(e);
        const t = [];
        for (const r in e) t.push(r);
        t.sort();
        let n = "{";
        for (let i = 0; i < t.length; i++)
          0 !== i && (n += ","), (n += m(t[i])), (n += ":"), (n += ce(e[t[i]]));
        return (n += "}"), n;
      }
      function ue(e, t) {
        var n = e.length;
        if (n <= t) return [e];
        const r = [];
        for (let i = 0; i < n; i += t)
          i + t > n ? r.push(e.substring(i, n)) : r.push(e.substring(i, i + t));
        return r;
      }
      const de = function (e, t) {
          p(
            !t || !0 === e || !1 === e,
            "Can't turn on custom loggers persistently."
          ),
            !0 === e
              ? ((te.logLevel = n.VERBOSE),
                (ie = te.log.bind(te)),
                t && ee.set("logging_enabled", !0))
              : "function" == typeof e
              ? (ie = e)
              : ((ie = null), ee.remove("logging_enabled"));
        },
        _e = function (...e) {
          var t;
          !0 === se &&
            ((se = !1),
            null === ie && !0 === ee.get("logging_enabled") && de(!0)),
            ie && ((t = re.apply(null, e)), ie(t));
        },
        pe = function (...e) {
          var t = `FIREBASE FATAL ERROR: ${re(...e)}`;
          throw (te.error(t), new Error(t));
        },
        fe = function (...e) {
          var t = "FIREBASE WARNING: " + re(...e);
          te.warn(t);
        },
        ge = function () {
          "undefined" != typeof window &&
            window.location &&
            window.location.protocol &&
            -1 !== window.location.protocol.indexOf("https:") &&
            fe(
              "Insecure Firebase access from a secure page. Please use https in calls to new Firebase()."
            );
        },
        me = function (e) {
          return (
            "number" == typeof e &&
            (e != e ||
              e === Number.POSITIVE_INFINITY ||
              e === Number.NEGATIVE_INFINITY)
          );
        },
        ve = "[MIN_NAME]",
        ye = "[MAX_NAME]",
        we = function (e, t) {
          if (e === t) return 0;
          if (e === ve || t === ye) return -1;
          if (t === ve || e === ye) return 1;
          var n = ke(e),
            r = ke(t);
          return null !== n
            ? null !== r
              ? n - r == 0
                ? e.length - t.length
                : n - r
              : -1
            : null === r && e < t
            ? -1
            : 1;
        };
      function Ce(e, t) {
        for (const n in e) e.hasOwnProperty(n) && t(n, e[n]);
      }
      function be(e) {
        p(!me(e), "Invalid JSON number");
        let t, n, r, i, s;
        0 === e
          ? ((n = 0), (r = 0), (t = 1 / e == -1 / 0 ? 1 : 0))
          : ((t = e < 0),
            (e = Math.abs(e)),
            (r =
              e >= Math.pow(2, -1022)
                ? ((i = Math.min(Math.floor(Math.log(e) / Math.LN2), 1023)),
                  (n = i + 1023),
                  Math.round(e * Math.pow(2, 52 - i) - Math.pow(2, 52)))
                : ((n = 0), Math.round(e / Math.pow(2, -1074)))));
        const o = [];
        for (s = 52; s; --s) o.push(r % 2 ? 1 : 0), (r = Math.floor(r / 2));
        for (s = 11; s; --s) o.push(n % 2 ? 1 : 0), (n = Math.floor(n / 2));
        o.push(t ? 1 : 0), o.reverse();
        const a = o.join("");
        let l = "";
        for (s = 0; s < 64; s += 8) {
          let e = parseInt(a.substr(s, 8), 2).toString(16);
          1 === e.length && (e = "0" + e), (l += e);
        }
        return l.toLowerCase();
      }
      function Te(e, t) {
        const n = setTimeout(e, t);
        return "object" == typeof n && n.unref && n.unref(), n;
      }
      const Ie = new RegExp("^-?(0*)\\d{1,10}$"),
        Ee = -2147483648,
        Se = 2147483647,
        ke = function (e) {
          if (Ie.test(e)) {
            var t = Number(e);
            if (t >= Ee && t <= Se) return t;
          }
          return null;
        },
        Ne = function (e) {
          try {
            e();
          } catch (t) {
            setTimeout(() => {
              var e = t.stack || "";
              throw (fe("Exception was thrown by user callback.", e), t);
            }, Math.floor(0));
          }
        };
      class Pe {
        constructor(e, t) {
          (this.appName_ = e),
            (this.appCheckProvider = t),
            (this.appCheck =
              null == t ? void 0 : t.getImmediate({ optional: !0 })),
            this.appCheck ||
              (null != t && t.get().then((e) => (this.appCheck = e)));
        }
        getToken(n) {
          return this.appCheck
            ? this.appCheck.getToken(n)
            : new Promise((e, t) => {
                setTimeout(() => {
                  this.appCheck ? this.getToken(n).then(e, t) : e(null);
                }, 0);
              });
        }
        addTokenChangeListener(t) {
          var e;
          null !== (e = this.appCheckProvider) &&
            void 0 !== e &&
            e.get().then((e) => e.addTokenListener(t));
        }
        notifyForInvalidToken() {
          fe(
            `Provided AppCheck credentials for the app named "${this.appName_}" ` +
              "are invalid. This usually indicates your app was not initialized correctly."
          );
        }
      }
      class Re {
        constructor(e, t, n) {
          (this.appName_ = e),
            (this.firebaseOptions_ = t),
            (this.authProvider_ = n),
            (this.auth_ = null),
            (this.auth_ = n.getImmediate({ optional: !0 })),
            this.auth_ || n.onInit((e) => (this.auth_ = e));
        }
        getToken(n) {
          return this.auth_
            ? this.auth_
                .getToken(n)
                .catch((e) =>
                  e && "auth/token-not-initialized" === e.code
                    ? (_e(
                        "Got auth/token-not-initialized error.  Treating as null token."
                      ),
                      null)
                    : Promise.reject(e)
                )
            : new Promise((e, t) => {
                setTimeout(() => {
                  this.auth_ ? this.getToken(n).then(e, t) : e(null);
                }, 0);
              });
        }
        addTokenChangeListener(t) {
          this.auth_
            ? this.auth_.addAuthTokenListener(t)
            : this.authProvider_.get().then((e) => e.addAuthTokenListener(t));
        }
        removeTokenChangeListener(t) {
          this.authProvider_.get().then((e) => e.removeAuthTokenListener(t));
        }
        notifyForInvalidToken() {
          let e =
            'Provided authentication credentials for the app named "' +
            this.appName_ +
            '" are invalid. This usually indicates your app was not initialized correctly. ';
          "credential" in this.firebaseOptions_
            ? (e +=
                'Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.')
            : "serviceAccount" in this.firebaseOptions_
            ? (e +=
                'Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.')
            : (e +=
                'Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.'),
            fe(e);
        }
      }
      class xe {
        constructor(e) {
          this.accessToken = e;
        }
        getToken(e) {
          return Promise.resolve({ accessToken: this.accessToken });
        }
        addTokenChangeListener(e) {
          e(this.accessToken);
        }
        removeTokenChangeListener(e) {}
        notifyForInvalidToken() {}
      }
      xe.OWNER = "owner";
      const De =
          /(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,
        Ae = "websocket",
        Oe = "long_polling";
      class Le {
        constructor(e, t, n, r, i = !1, s = "", o = !1) {
          (this.secure = t),
            (this.namespace = n),
            (this.webSocketOnly = r),
            (this.nodeAdmin = i),
            (this.persistenceKey = s),
            (this.includeNamespaceInQueryParams = o),
            (this._host = e.toLowerCase()),
            (this._domain = this._host.substr(this._host.indexOf(".") + 1)),
            (this.internalHost = Z.get("host:" + e) || this._host);
        }
        isCacheableHost() {
          return "s-" === this.internalHost.substr(0, 2);
        }
        isCustomHost() {
          return (
            "firebaseio.com" !== this._domain &&
            "firebaseio-demo.com" !== this._domain
          );
        }
        get host() {
          return this._host;
        }
        set host(e) {
          e !== this.internalHost &&
            ((this.internalHost = e),
            this.isCacheableHost() &&
              Z.set("host:" + this._host, this.internalHost));
        }
        toString() {
          let e = this.toURLString();
          return (
            this.persistenceKey && (e += "<" + this.persistenceKey + ">"), e
          );
        }
        toURLString() {
          var e = this.secure ? "https://" : "http://",
            t = this.includeNamespaceInQueryParams
              ? `?ns=${this.namespace}`
              : "";
          return `${e}${this.host}/${t}`;
        }
      }
      function Me(e, t, n) {
        p("string" == typeof t, "typeof type must == string"),
          p("object" == typeof n, "typeof params must == object");
        let r;
        if (t === Ae)
          r = (e.secure ? "wss://" : "ws://") + e.internalHost + "/.ws?";
        else {
          if (t !== Oe) throw new Error("Unknown connection type: " + t);
          r = (e.secure ? "https://" : "http://") + e.internalHost + "/.lp?";
        }
        ((t = e).host !== t.internalHost ||
          t.isCustomHost() ||
          t.includeNamespaceInQueryParams) &&
          (n.ns = e.namespace);
        const i = [];
        return (
          Ce(n, (e, t) => {
            i.push(e + "=" + t);
          }),
          r + i.join("&")
        );
      }
      class Fe {
        constructor() {
          this.counters_ = {};
        }
        incrementCounter(e, t = 1) {
          y(this.counters_, e) || (this.counters_[e] = 0),
            (this.counters_[e] += t);
        }
        get() {
          return h(this.counters_);
        }
      }
      const qe = {},
        We = {};
      function Ue(e) {
        var t = e.toString();
        return qe[t] || (qe[t] = new Fe()), qe[t];
      }
      class Be {
        constructor(e) {
          (this.onMessage_ = e),
            (this.pendingResponses = []),
            (this.currentResponseNum = 0),
            (this.closeAfterResponse = -1),
            (this.onClose = null);
        }
        closeAfter(e, t) {
          (this.closeAfterResponse = e),
            (this.onClose = t),
            this.closeAfterResponse < this.currentResponseNum &&
              (this.onClose(), (this.onClose = null));
        }
        handleResponse(e, t) {
          for (
            this.pendingResponses[e] = t;
            this.pendingResponses[this.currentResponseNum];

          ) {
            const n = this.pendingResponses[this.currentResponseNum];
            delete this.pendingResponses[this.currentResponseNum];
            for (let e = 0; e < n.length; ++e)
              n[e] &&
                Ne(() => {
                  this.onMessage_(n[e]);
                });
            if (this.currentResponseNum === this.closeAfterResponse) {
              this.onClose && (this.onClose(), (this.onClose = null));
              break;
            }
            this.currentResponseNum++;
          }
        }
      }
      class je {
        constructor(e, t, n, r, i, s, o) {
          (this.connId = e),
            (this.repoInfo = t),
            (this.applicationId = n),
            (this.appCheckToken = r),
            (this.authToken = i),
            (this.transportSessionId = s),
            (this.lastSessionId = o),
            (this.bytesSent = 0),
            (this.bytesReceived = 0),
            (this.everConnected_ = !1),
            (this.log_ = oe(e)),
            (this.stats_ = Ue(t)),
            (this.urlFn = (e) => (
              this.appCheckToken && (e.ac = this.appCheckToken), Me(t, Oe, e)
            ));
        }
        open(e, t) {
          (this.curSegmentNum = 0),
            (this.onDisconnect_ = t),
            (this.myPacketOrderer = new Be(e)),
            (this.isClosed_ = !1),
            (this.connectTimeoutTimer_ = setTimeout(() => {
              this.log_("Timed out trying to connect."),
                this.onClosed_(),
                (this.connectTimeoutTimer_ = null);
            }, Math.floor(3e4))),
            (function (t) {
              if ("complete" === document.readyState) t();
              else {
                let e = !1;
                const n = function () {
                  document.body
                    ? e || ((e = !0), t())
                    : setTimeout(n, Math.floor(10));
                };
                document.addEventListener
                  ? (document.addEventListener("DOMContentLoaded", n, !1),
                    window.addEventListener("load", n, !1))
                  : document.attachEvent &&
                    (document.attachEvent("onreadystatechange", () => {
                      "complete" === document.readyState && n();
                    }),
                    window.attachEvent("onload", n));
              }
            })(() => {
              if (!this.isClosed_) {
                this.scriptTagHolder = new Ve(
                  (...e) => {
                    var [t, n, r] = e;
                    if ((this.incrementIncomingBytes_(e), this.scriptTagHolder))
                      if (
                        (this.connectTimeoutTimer_ &&
                          (clearTimeout(this.connectTimeoutTimer_),
                          (this.connectTimeoutTimer_ = null)),
                        (this.everConnected_ = !0),
                        "start" === t)
                      )
                        (this.id = n), (this.password = r);
                      else {
                        if ("close" !== t)
                          throw new Error(
                            "Unrecognized command received: " + t
                          );
                        n
                          ? ((this.scriptTagHolder.sendNewPolls = !1),
                            this.myPacketOrderer.closeAfter(n, () => {
                              this.onClosed_();
                            }))
                          : this.onClosed_();
                      }
                  },
                  (...e) => {
                    var [t, n] = e;
                    this.incrementIncomingBytes_(e),
                      this.myPacketOrderer.handleResponse(t, n);
                  },
                  () => {
                    this.onClosed_();
                  },
                  this.urlFn
                );
                const t = { start: "t" };
                (t.ser = Math.floor(1e8 * Math.random())),
                  this.scriptTagHolder.uniqueCallbackIdentifier &&
                    (t.cb = this.scriptTagHolder.uniqueCallbackIdentifier),
                  (t.v = "5"),
                  this.transportSessionId && (t.s = this.transportSessionId),
                  this.lastSessionId && (t.ls = this.lastSessionId),
                  this.applicationId && (t.p = this.applicationId),
                  this.appCheckToken && (t.ac = this.appCheckToken),
                  "undefined" != typeof location &&
                    location.hostname &&
                    De.test(location.hostname) &&
                    (t.r = "f");
                var e = this.urlFn(t);
                this.log_("Connecting via long-poll to " + e),
                  this.scriptTagHolder.addTag(e, () => {});
              }
            });
        }
        start() {
          this.scriptTagHolder.startLongPoll(this.id, this.password),
            this.addDisconnectPingFrame(this.id, this.password);
        }
        static forceAllow() {
          je.forceAllow_ = !0;
        }
        static forceDisallow() {
          je.forceDisallow_ = !0;
        }
        static isAvailable() {
          return (
            !!je.forceAllow_ ||
            !(
              je.forceDisallow_ ||
              "undefined" == typeof document ||
              null == document.createElement ||
              ("object" == typeof window &&
                window.chrome &&
                window.chrome.extension &&
                !/^chrome/.test(window.location.href)) ||
              ("object" == typeof Windows && "object" == typeof Windows.UI)
            )
          );
        }
        markConnectionHealthy() {}
        shutdown_() {
          (this.isClosed_ = !0),
            this.scriptTagHolder &&
              (this.scriptTagHolder.close(), (this.scriptTagHolder = null)),
            this.myDisconnFrame &&
              (document.body.removeChild(this.myDisconnFrame),
              (this.myDisconnFrame = null)),
            this.connectTimeoutTimer_ &&
              (clearTimeout(this.connectTimeoutTimer_),
              (this.connectTimeoutTimer_ = null));
        }
        onClosed_() {
          this.isClosed_ ||
            (this.log_("Longpoll is closing itself"),
            this.shutdown_(),
            this.onDisconnect_ &&
              (this.onDisconnect_(this.everConnected_),
              (this.onDisconnect_ = null)));
        }
        close() {
          this.isClosed_ ||
            (this.log_("Longpoll is being closed."), this.shutdown_());
        }
        send(e) {
          var t = m(e);
          (this.bytesSent += t.length),
            this.stats_.incrementCounter("bytes_sent", t.length);
          var t = i(t),
            n = ue(t, 1840);
          for (let r = 0; r < n.length; r++)
            this.scriptTagHolder.enqueueSegment(
              this.curSegmentNum,
              n.length,
              n[r]
            ),
              this.curSegmentNum++;
        }
        addDisconnectPingFrame(e, t) {
          this.myDisconnFrame = document.createElement("iframe");
          const n = { dframe: "t" };
          (n.id = e),
            (n.pw = t),
            (this.myDisconnFrame.src = this.urlFn(n)),
            (this.myDisconnFrame.style.display = "none"),
            document.body.appendChild(this.myDisconnFrame);
        }
        incrementIncomingBytes_(e) {
          var t = m(e).length;
          (this.bytesReceived += t),
            this.stats_.incrementCounter("bytes_received", t);
        }
      }
      class Ve {
        constructor(t, n, e, r) {
          (this.onDisconnect = e),
            (this.urlFn = r),
            (this.outstandingRequests = new Set()),
            (this.pendingSegs = []),
            (this.currentSerial = Math.floor(1e8 * Math.random())),
            (this.sendNewPolls = !0);
          {
            (this.uniqueCallbackIdentifier = ne()),
              (window["pLPCommand" + this.uniqueCallbackIdentifier] = t),
              (window["pRTLPCB" + this.uniqueCallbackIdentifier] = n),
              (this.myIFrame = Ve.createIFrame_());
            let e = "";
            this.myIFrame.src &&
              "javascript:" ===
                this.myIFrame.src.substr(0, "javascript:".length) &&
              ((i = document.domain),
              (e = '<script>document.domain="' + i + '";</script>'));
            var i = "<html><body>" + e + "</body></html>";
            try {
              this.myIFrame.doc.open(),
                this.myIFrame.doc.write(i),
                this.myIFrame.doc.close();
            } catch (e) {
              _e("frame writing exception"), e.stack && _e(e.stack), _e(e);
            }
          }
        }
        static createIFrame_() {
          const t = document.createElement("iframe");
          if (((t.style.display = "none"), !document.body))
            throw "Document body has not initialized. Wait to initialize Firebase until after the document is ready.";
          document.body.appendChild(t);
          try {
            t.contentWindow.document || _e("No IE domain setting required");
          } catch (e) {
            var n = document.domain;
            t.src =
              "javascript:void((function(){document.open();document.domain='" +
              n +
              "';document.close();})())";
          }
          return (
            t.contentDocument
              ? (t.doc = t.contentDocument)
              : t.contentWindow
              ? (t.doc = t.contentWindow.document)
              : t.document && (t.doc = t.document),
            t
          );
        }
        close() {
          (this.alive = !1),
            this.myIFrame &&
              ((this.myIFrame.doc.body.innerHTML = ""),
              setTimeout(() => {
                null !== this.myIFrame &&
                  (document.body.removeChild(this.myIFrame),
                  (this.myIFrame = null));
              }, Math.floor(0)));
          const e = this.onDisconnect;
          e && ((this.onDisconnect = null), e());
        }
        startLongPoll(e, t) {
          for (
            this.myID = e, this.myPW = t, this.alive = !0;
            this.newRequest_();

          );
        }
        newRequest_() {
          if (
            this.alive &&
            this.sendNewPolls &&
            this.outstandingRequests.size <
              (0 < this.pendingSegs.length ? 2 : 1)
          ) {
            this.currentSerial++;
            const i = {};
            (i.id = this.myID),
              (i.pw = this.myPW),
              (i.ser = this.currentSerial);
            var n = this.urlFn(i);
            let e = "",
              t = 0;
            for (; 0 < this.pendingSegs.length; ) {
              if (!(this.pendingSegs[0].d.length + 30 + e.length <= 1870))
                break;
              var r = this.pendingSegs.shift();
              (e =
                e +
                "&seg" +
                t +
                "=" +
                r.seg +
                "&ts" +
                t +
                "=" +
                r.ts +
                "&d" +
                t +
                "=" +
                r.d),
                t++;
            }
            return (n += e), this.addLongPollTag_(n, this.currentSerial), !0;
          }
          return !1;
        }
        enqueueSegment(e, t, n) {
          this.pendingSegs.push({ seg: e, ts: t, d: n }),
            this.alive && this.newRequest_();
        }
        addLongPollTag_(e, t) {
          this.outstandingRequests.add(t);
          const n = () => {
              this.outstandingRequests.delete(t), this.newRequest_();
            },
            r = setTimeout(n, Math.floor(25e3));
          this.addTag(e, () => {
            clearTimeout(r), n();
          });
        }
        addTag(e, n) {
          setTimeout(() => {
            try {
              if (!this.sendNewPolls) return;
              const t = this.myIFrame.doc.createElement("script");
              (t.type = "text/javascript"),
                (t.async = !0),
                (t.src = e),
                (t.onload = t.onreadystatechange =
                  function () {
                    var e = t.readyState;
                    (e && "loaded" !== e && "complete" !== e) ||
                      ((t.onload = t.onreadystatechange = null),
                      t.parentNode && t.parentNode.removeChild(t),
                      n());
                  }),
                (t.onerror = () => {
                  _e("Long-poll script failed to load: " + e),
                    (this.sendNewPolls = !1),
                    this.close();
                }),
                this.myIFrame.doc.body.appendChild(t);
            } catch (e) {}
          }, Math.floor(1));
        }
      }
      let ze = null;
      "undefined" != typeof MozWebSocket
        ? (ze = MozWebSocket)
        : "undefined" != typeof WebSocket && (ze = WebSocket);
      class He {
        constructor(e, t, n, r, i, s, o) {
          (this.connId = e),
            (this.applicationId = n),
            (this.appCheckToken = r),
            (this.authToken = i),
            (this.keepaliveTimer = null),
            (this.frames = null),
            (this.totalFrames = 0),
            (this.bytesSent = 0),
            (this.bytesReceived = 0),
            (this.log_ = oe(this.connId)),
            (this.stats_ = Ue(t)),
            (this.connURL = He.connectionURL_(t, s, o, r, n)),
            (this.nodeAdmin = t.nodeAdmin);
        }
        static connectionURL_(e, t, n, r, i) {
          const s = { v: "5" };
          return (
            "undefined" != typeof location &&
              location.hostname &&
              De.test(location.hostname) &&
              (s.r = "f"),
            t && (s.s = t),
            n && (s.ls = n),
            r && (s.ac = r),
            i && (s.p = i),
            Me(e, Ae, s)
          );
        }
        open(e, t) {
          (this.onDisconnect = t),
            (this.onMessage = e),
            this.log_("Websocket connecting to " + this.connURL),
            (this.everConnected_ = !1),
            Z.set("previous_websocket_failure", !0);
          try {
            f(), (this.mySock = new ze(this.connURL, [], void 0));
          } catch (e) {
            this.log_("Error instantiating WebSocket.");
            var n = e.message || e.data;
            return n && this.log_(n), void this.onClosed_();
          }
          (this.mySock.onopen = () => {
            this.log_("Websocket connected."), (this.everConnected_ = !0);
          }),
            (this.mySock.onclose = () => {
              this.log_("Websocket connection was disconnected."),
                (this.mySock = null),
                this.onClosed_();
            }),
            (this.mySock.onmessage = (e) => {
              this.handleIncomingFrame(e);
            }),
            (this.mySock.onerror = (e) => {
              this.log_("WebSocket error.  Closing connection.");
              var t = e.message || e.data;
              t && this.log_(t), this.onClosed_();
            });
        }
        start() {}
        static forceDisallow() {
          He.forceDisallow_ = !0;
        }
        static isAvailable() {
          let e = !1;
          var t;
          return (
            "undefined" == typeof navigator ||
              !navigator.userAgent ||
              ((t = navigator.userAgent.match(
                /Android ([0-9]{0,}\.[0-9]{0,})/
              )) &&
                1 < t.length &&
                parseFloat(t[1]) < 4.4 &&
                (e = !0)),
            !e && null !== ze && !He.forceDisallow_
          );
        }
        static previouslyFailed() {
          return (
            Z.isInMemoryStorage || !0 === Z.get("previous_websocket_failure")
          );
        }
        markConnectionHealthy() {
          Z.remove("previous_websocket_failure");
        }
        appendFrame_(e) {
          var t;
          this.frames.push(e),
            this.frames.length === this.totalFrames &&
              ((t = this.frames.join("")),
              (this.frames = null),
              (t = g(t)),
              this.onMessage(t));
        }
        handleNewFrameCount_(e) {
          (this.totalFrames = e), (this.frames = []);
        }
        extractFrameCount_(e) {
          if (
            (p(null === this.frames, "We already have a frame buffer"),
            e.length <= 6)
          ) {
            var t = Number(e);
            if (!isNaN(t)) return this.handleNewFrameCount_(t), null;
          }
          return this.handleNewFrameCount_(1), e;
        }
        handleIncomingFrame(e) {
          var t;
          null !== this.mySock &&
            ((t = e.data),
            (this.bytesReceived += t.length),
            this.stats_.incrementCounter("bytes_received", t.length),
            this.resetKeepAlive(),
            null !== this.frames
              ? this.appendFrame_(t)
              : null !== (t = this.extractFrameCount_(t)) &&
                this.appendFrame_(t));
        }
        send(e) {
          this.resetKeepAlive();
          var t = m(e);
          (this.bytesSent += t.length),
            this.stats_.incrementCounter("bytes_sent", t.length);
          var n = ue(t, 16384);
          1 < n.length && this.sendString_(String(n.length));
          for (let r = 0; r < n.length; r++) this.sendString_(n[r]);
        }
        shutdown_() {
          (this.isClosed_ = !0),
            this.keepaliveTimer &&
              (clearInterval(this.keepaliveTimer),
              (this.keepaliveTimer = null)),
            this.mySock && (this.mySock.close(), (this.mySock = null));
        }
        onClosed_() {
          this.isClosed_ ||
            (this.log_("WebSocket is closing itself"),
            this.shutdown_(),
            this.onDisconnect &&
              (this.onDisconnect(this.everConnected_),
              (this.onDisconnect = null)));
        }
        close() {
          this.isClosed_ ||
            (this.log_("WebSocket is being closed"), this.shutdown_());
        }
        resetKeepAlive() {
          clearInterval(this.keepaliveTimer),
            (this.keepaliveTimer = setInterval(() => {
              this.mySock && this.sendString_("0"), this.resetKeepAlive();
            }, Math.floor(45e3)));
        }
        sendString_(e) {
          try {
            this.mySock.send(e);
          } catch (e) {
            this.log_(
              "Exception thrown from WebSocket.send():",
              e.message || e.data,
              "Closing connection."
            ),
              setTimeout(this.onClosed_.bind(this), 0);
          }
        }
      }
      (He.responsesRequiredToBeHealthy = 2), (He.healthyTimeout = 3e4);
      class Qe {
        constructor(e) {
          this.initTransports_(e);
        }
        static get ALL_TRANSPORTS() {
          return [je, He];
        }
        static get IS_TRANSPORT_INITIALIZED() {
          return this.globalTransportInitialized_;
        }
        initTransports_(e) {
          var t = He && He.isAvailable();
          let n = t && !He.previouslyFailed();
          if (
            (e.webSocketOnly &&
              (t ||
                fe(
                  "wss:// URL used, but browser isn't known to support websockets.  Trying anyway."
                ),
              (n = !0)),
            n)
          )
            this.transports_ = [He];
          else {
            const r = (this.transports_ = []);
            for (const i of Qe.ALL_TRANSPORTS)
              i && i.isAvailable() && r.push(i);
            Qe.globalTransportInitialized_ = !0;
          }
        }
        initialTransport() {
          if (0 < this.transports_.length) return this.transports_[0];
          throw new Error("No transports available");
        }
        upgradeTransport() {
          return 1 < this.transports_.length ? this.transports_[1] : null;
        }
      }
      Qe.globalTransportInitialized_ = !1;
      class Ye {
        constructor(e, t, n, r, i, s, o, a, l, h) {
          (this.id = e),
            (this.repoInfo_ = t),
            (this.applicationId_ = n),
            (this.appCheckToken_ = r),
            (this.authToken_ = i),
            (this.onMessage_ = s),
            (this.onReady_ = o),
            (this.onDisconnect_ = a),
            (this.onKill_ = l),
            (this.lastSessionId = h),
            (this.connectionCount = 0),
            (this.pendingDataMessages = []),
            (this.state_ = 0),
            (this.log_ = oe("c:" + this.id + ":")),
            (this.transportManager_ = new Qe(t)),
            this.log_("Connection created"),
            this.start_();
        }
        start_() {
          const e = this.transportManager_.initialTransport();
          (this.conn_ = new e(
            this.nextTransportId_(),
            this.repoInfo_,
            this.applicationId_,
            this.appCheckToken_,
            this.authToken_,
            null,
            this.lastSessionId
          )),
            (this.primaryResponsesRequired_ =
              e.responsesRequiredToBeHealthy || 0);
          const t = this.connReceiver_(this.conn_),
            n = this.disconnReceiver_(this.conn_);
          (this.tx_ = this.conn_),
            (this.rx_ = this.conn_),
            (this.secondaryConn_ = null),
            (this.isHealthy_ = !1),
            setTimeout(() => {
              this.conn_ && this.conn_.open(t, n);
            }, Math.floor(0));
          var r = e.healthyTimeout || 0;
          0 < r &&
            (this.healthyTimeout_ = Te(() => {
              (this.healthyTimeout_ = null),
                this.isHealthy_ ||
                  (this.conn_ && 102400 < this.conn_.bytesReceived
                    ? (this.log_(
                        "Connection exceeded healthy timeout but has received " +
                          this.conn_.bytesReceived +
                          " bytes.  Marking connection healthy."
                      ),
                      (this.isHealthy_ = !0),
                      this.conn_.markConnectionHealthy())
                    : this.conn_ && 10240 < this.conn_.bytesSent
                    ? this.log_(
                        "Connection exceeded healthy timeout but has sent " +
                          this.conn_.bytesSent +
                          " bytes.  Leaving connection alive."
                      )
                    : (this.log_("Closing unhealthy connection after timeout."),
                      this.close()));
            }, Math.floor(r)));
        }
        nextTransportId_() {
          return "c:" + this.id + ":" + this.connectionCount++;
        }
        disconnReceiver_(t) {
          return (e) => {
            t === this.conn_
              ? this.onConnectionLost_(e)
              : t === this.secondaryConn_
              ? (this.log_("Secondary connection lost."),
                this.onSecondaryConnectionLost_())
              : this.log_("closing an old connection");
          };
        }
        connReceiver_(t) {
          return (e) => {
            2 !== this.state_ &&
              (t === this.rx_
                ? this.onPrimaryMessageReceived_(e)
                : t === this.secondaryConn_
                ? this.onSecondaryMessageReceived_(e)
                : this.log_("message on old connection"));
          };
        }
        sendRequest(e) {
          this.sendData_({ t: "d", d: e });
        }
        tryCleanupConnection() {
          this.tx_ === this.secondaryConn_ &&
            this.rx_ === this.secondaryConn_ &&
            (this.log_(
              "cleaning up and promoting a connection: " +
                this.secondaryConn_.connId
            ),
            (this.conn_ = this.secondaryConn_),
            (this.secondaryConn_ = null));
        }
        onSecondaryControl_(e) {
          var t;
          "t" in e &&
            ("a" === (t = e.t)
              ? this.upgradeIfSecondaryHealthy_()
              : "r" === t
              ? (this.log_("Got a reset on secondary, closing it"),
                this.secondaryConn_.close(),
                (this.tx_ !== this.secondaryConn_ &&
                  this.rx_ !== this.secondaryConn_) ||
                  this.close())
              : "o" === t &&
                (this.log_("got pong on secondary."),
                this.secondaryResponsesRequired_--,
                this.upgradeIfSecondaryHealthy_()));
        }
        onSecondaryMessageReceived_(e) {
          var t = he("t", e),
            n = he("d", e);
          if ("c" === t) this.onSecondaryControl_(n);
          else {
            if ("d" !== t) throw new Error("Unknown protocol layer: " + t);
            this.pendingDataMessages.push(n);
          }
        }
        upgradeIfSecondaryHealthy_() {
          this.secondaryResponsesRequired_ <= 0
            ? (this.log_("Secondary connection is healthy."),
              (this.isHealthy_ = !0),
              this.secondaryConn_.markConnectionHealthy(),
              this.proceedWithUpgrade_())
            : (this.log_("sending ping on secondary."),
              this.secondaryConn_.send({ t: "c", d: { t: "p", d: {} } }));
        }
        proceedWithUpgrade_() {
          this.secondaryConn_.start(),
            this.log_("sending client ack on secondary"),
            this.secondaryConn_.send({ t: "c", d: { t: "a", d: {} } }),
            this.log_("Ending transmission on primary"),
            this.conn_.send({ t: "c", d: { t: "n", d: {} } }),
            (this.tx_ = this.secondaryConn_),
            this.tryCleanupConnection();
        }
        onPrimaryMessageReceived_(e) {
          var t = he("t", e),
            n = he("d", e);
          "c" === t ? this.onControl_(n) : "d" === t && this.onDataMessage_(n);
        }
        onDataMessage_(e) {
          this.onPrimaryResponse_(), this.onMessage_(e);
        }
        onPrimaryResponse_() {
          this.isHealthy_ ||
            (this.primaryResponsesRequired_--,
            this.primaryResponsesRequired_ <= 0 &&
              (this.log_("Primary connection is healthy."),
              (this.isHealthy_ = !0),
              this.conn_.markConnectionHealthy()));
        }
        onControl_(e) {
          var t = he("t", e);
          if ("d" in e) {
            var n = e.d;
            if ("h" === t) this.onHandshake_(n);
            else if ("n" === t) {
              this.log_("recvd end transmission on primary"),
                (this.rx_ = this.secondaryConn_);
              for (let e = 0; e < this.pendingDataMessages.length; ++e)
                this.onDataMessage_(this.pendingDataMessages[e]);
              (this.pendingDataMessages = []), this.tryCleanupConnection();
            } else
              "s" === t
                ? this.onConnectionShutdown_(n)
                : "r" === t
                ? this.onReset_(n)
                : "e" === t
                ? ae("Server Error: " + n)
                : "o" === t
                ? (this.log_("got pong on primary."),
                  this.onPrimaryResponse_(),
                  this.sendPingOnPrimaryIfNecessary_())
                : ae("Unknown control packet command: " + t);
          }
        }
        onHandshake_(e) {
          var t = e.ts,
            n = e.v,
            r = e.h;
          (this.sessionId = e.s),
            (this.repoInfo_.host = r),
            0 === this.state_ &&
              (this.conn_.start(),
              this.onConnectionEstablished_(this.conn_, t),
              "5" !== n && fe("Protocol version mismatch detected"),
              this.tryStartUpgrade_());
        }
        tryStartUpgrade_() {
          var e = this.transportManager_.upgradeTransport();
          e && this.startUpgrade_(e);
        }
        startUpgrade_(e) {
          (this.secondaryConn_ = new e(
            this.nextTransportId_(),
            this.repoInfo_,
            this.applicationId_,
            this.appCheckToken_,
            this.authToken_,
            this.sessionId
          )),
            (this.secondaryResponsesRequired_ =
              e.responsesRequiredToBeHealthy || 0);
          var t = this.connReceiver_(this.secondaryConn_),
            n = this.disconnReceiver_(this.secondaryConn_);
          this.secondaryConn_.open(t, n),
            Te(() => {
              this.secondaryConn_ &&
                (this.log_("Timed out trying to upgrade."),
                this.secondaryConn_.close());
            }, Math.floor(6e4));
        }
        onReset_(e) {
          this.log_("Reset packet received.  New host: " + e),
            (this.repoInfo_.host = e),
            1 === this.state_
              ? this.close()
              : (this.closeConnections_(), this.start_());
        }
        onConnectionEstablished_(e, t) {
          this.log_("Realtime connection established."),
            (this.conn_ = e),
            (this.state_ = 1),
            this.onReady_ &&
              (this.onReady_(t, this.sessionId), (this.onReady_ = null)),
            0 === this.primaryResponsesRequired_
              ? (this.log_("Primary connection is healthy."),
                (this.isHealthy_ = !0))
              : Te(() => {
                  this.sendPingOnPrimaryIfNecessary_();
                }, Math.floor(5e3));
        }
        sendPingOnPrimaryIfNecessary_() {
          this.isHealthy_ ||
            1 !== this.state_ ||
            (this.log_("sending ping on primary."),
            this.sendData_({ t: "c", d: { t: "p", d: {} } }));
        }
        onSecondaryConnectionLost_() {
          var e = this.secondaryConn_;
          (this.secondaryConn_ = null),
            (this.tx_ !== e && this.rx_ !== e) || this.close();
        }
        onConnectionLost_(e) {
          (this.conn_ = null),
            e || 0 !== this.state_
              ? 1 === this.state_ && this.log_("Realtime connection lost.")
              : (this.log_("Realtime connection failed."),
                this.repoInfo_.isCacheableHost() &&
                  (Z.remove("host:" + this.repoInfo_.host),
                  (this.repoInfo_.internalHost = this.repoInfo_.host))),
            this.close();
        }
        onConnectionShutdown_(e) {
          this.log_("Connection shutdown command received. Shutting down..."),
            this.onKill_ && (this.onKill_(e), (this.onKill_ = null)),
            (this.onDisconnect_ = null),
            this.close();
        }
        sendData_(e) {
          if (1 !== this.state_) throw "Connection is not connected";
          this.tx_.send(e);
        }
        close() {
          2 !== this.state_ &&
            (this.log_("Closing realtime connection."),
            (this.state_ = 2),
            this.closeConnections_(),
            this.onDisconnect_ &&
              (this.onDisconnect_(), (this.onDisconnect_ = null)));
        }
        closeConnections_() {
          this.log_("Shutting down all connections"),
            this.conn_ && (this.conn_.close(), (this.conn_ = null)),
            this.secondaryConn_ &&
              (this.secondaryConn_.close(), (this.secondaryConn_ = null)),
            this.healthyTimeout_ &&
              (clearTimeout(this.healthyTimeout_),
              (this.healthyTimeout_ = null));
        }
      }
      class Ke {
        put(e, t, n, r) {}
        merge(e, t, n, r) {}
        refreshAuthToken(e) {}
        refreshAppCheckToken(e) {}
        onDisconnectPut(e, t, n) {}
        onDisconnectMerge(e, t, n) {}
        onDisconnectCancel(e, t) {}
        reportStats(e) {}
      }
      class $e {
        constructor(e) {
          (this.allowedEvents_ = e),
            (this.listeners_ = {}),
            p(Array.isArray(e) && 0 < e.length, "Requires a non-empty array");
        }
        trigger(t, ...n) {
          if (Array.isArray(this.listeners_[t])) {
            const r = [...this.listeners_[t]];
            for (let e = 0; e < r.length; e++)
              r[e].callback.apply(r[e].context, n);
          }
        }
        on(e, t, n) {
          this.validateEventType_(e),
            (this.listeners_[e] = this.listeners_[e] || []),
            this.listeners_[e].push({ callback: t, context: n });
          var r = this.getInitialEvent(e);
          r && t.apply(n, r);
        }
        off(e, t, n) {
          this.validateEventType_(e);
          const r = this.listeners_[e] || [];
          for (let i = 0; i < r.length; i++)
            if (r[i].callback === t && (!n || n === r[i].context))
              return void r.splice(i, 1);
        }
        validateEventType_(t) {
          p(
            this.allowedEvents_.find((e) => e === t),
            "Unknown event: " + t
          );
        }
      }
      class Ge extends $e {
        constructor() {
          super(["online"]),
            (this.online_ = !0),
            "undefined" == typeof window ||
              void 0 === window.addEventListener ||
              _() ||
              (window.addEventListener(
                "online",
                () => {
                  this.online_ ||
                    ((this.online_ = !0), this.trigger("online", !0));
                },
                !1
              ),
              window.addEventListener(
                "offline",
                () => {
                  this.online_ &&
                    ((this.online_ = !1), this.trigger("online", !1));
                },
                !1
              ));
        }
        static getInstance() {
          return new Ge();
        }
        getInitialEvent(e) {
          return p("online" === e, "Unknown event type: " + e), [this.online_];
        }
        currentlyOnline() {
          return this.online_;
        }
      }
      class Je {
        constructor(n, e) {
          if (void 0 === e) {
            this.pieces_ = n.split("/");
            let e = 0;
            for (let t = 0; t < this.pieces_.length; t++)
              0 < this.pieces_[t].length &&
                ((this.pieces_[e] = this.pieces_[t]), e++);
            (this.pieces_.length = e), (this.pieceNum_ = 0);
          } else (this.pieces_ = n), (this.pieceNum_ = e);
        }
        toString() {
          let e = "";
          for (let t = this.pieceNum_; t < this.pieces_.length; t++)
            "" !== this.pieces_[t] && (e += "/" + this.pieces_[t]);
          return e || "/";
        }
      }
      function Xe() {
        return new Je("");
      }
      function Ze(e) {
        return e.pieceNum_ >= e.pieces_.length ? null : e.pieces_[e.pieceNum_];
      }
      function et(e) {
        return e.pieces_.length - e.pieceNum_;
      }
      function tt(e) {
        let t = e.pieceNum_;
        return t < e.pieces_.length && t++, new Je(e.pieces_, t);
      }
      function nt(e) {
        return e.pieceNum_ < e.pieces_.length
          ? e.pieces_[e.pieces_.length - 1]
          : null;
      }
      function rt(e, t = 0) {
        return e.pieces_.slice(e.pieceNum_ + t);
      }
      function it(e) {
        if (e.pieceNum_ >= e.pieces_.length) return null;
        const t = [];
        for (let n = e.pieceNum_; n < e.pieces_.length - 1; n++)
          t.push(e.pieces_[n]);
        return new Je(t, 0);
      }
      function st(e, t) {
        const n = [];
        for (let i = e.pieceNum_; i < e.pieces_.length; i++)
          n.push(e.pieces_[i]);
        if (t instanceof Je)
          for (let e = t.pieceNum_; e < t.pieces_.length; e++)
            n.push(t.pieces_[e]);
        else {
          var r = t.split("/");
          for (let e = 0; e < r.length; e++) 0 < r[e].length && n.push(r[e]);
        }
        return new Je(n, 0);
      }
      function ot(e) {
        return e.pieceNum_ >= e.pieces_.length;
      }
      function at(e, t) {
        var n = Ze(e),
          r = Ze(t);
        if (null === n) return t;
        if (n === r) return at(tt(e), tt(t));
        throw new Error(
          "INTERNAL ERROR: innerPath (" +
            t +
            ") is not within outerPath (" +
            e +
            ")"
        );
      }
      function lt(e, t) {
        var n = rt(e, 0),
          r = rt(t, 0);
        for (let s = 0; s < n.length && s < r.length; s++) {
          var i = we(n[s], r[s]);
          if (0 !== i) return i;
        }
        return n.length === r.length ? 0 : n.length < r.length ? -1 : 1;
      }
      function ht(e, t) {
        if (et(e) !== et(t)) return !1;
        for (
          let n = e.pieceNum_, r = t.pieceNum_;
          n <= e.pieces_.length;
          n++, r++
        )
          if (e.pieces_[n] !== t.pieces_[r]) return !1;
        return !0;
      }
      function ct(e, t) {
        let n = e.pieceNum_,
          r = t.pieceNum_;
        if (et(e) > et(t)) return !1;
        for (; n < e.pieces_.length; ) {
          if (e.pieces_[n] !== t.pieces_[r]) return !1;
          ++n, ++r;
        }
        return !0;
      }
      class ut {
        constructor(e, t) {
          (this.errorPrefix_ = t),
            (this.parts_ = rt(e, 0)),
            (this.byteLength_ = Math.max(1, this.parts_.length));
          for (let n = 0; n < this.parts_.length; n++)
            this.byteLength_ += N(this.parts_[n]);
          dt(this);
        }
      }
      function dt(e) {
        if (768 < e.byteLength_)
          throw new Error(
            e.errorPrefix_ +
              "has a key path longer than 768 bytes (" +
              e.byteLength_ +
              ")."
          );
        if (32 < e.parts_.length)
          throw new Error(
            e.errorPrefix_ +
              "path specified exceeds the maximum depth that can be written (32) or object contains a cycle " +
              _t(e)
          );
      }
      function _t(e) {
        return 0 === e.parts_.length
          ? ""
          : "in property '" + e.parts_.join(".") + "'";
      }
      class pt extends $e {
        constructor() {
          super(["visible"]);
          let t, e;
          "undefined" != typeof document &&
            void 0 !== document.addEventListener &&
            (void 0 !== document.hidden
              ? ((e = "visibilitychange"), (t = "hidden"))
              : void 0 !== document.mozHidden
              ? ((e = "mozvisibilitychange"), (t = "mozHidden"))
              : void 0 !== document.msHidden
              ? ((e = "msvisibilitychange"), (t = "msHidden"))
              : void 0 !== document.webkitHidden &&
                ((e = "webkitvisibilitychange"), (t = "webkitHidden"))),
            (this.visible_ = !0),
            e &&
              document.addEventListener(
                e,
                () => {
                  var e = !document[t];
                  e !== this.visible_ &&
                    ((this.visible_ = e), this.trigger("visible", e));
                },
                !1
              );
        }
        static getInstance() {
          return new pt();
        }
        getInitialEvent(e) {
          return (
            p("visible" === e, "Unknown event type: " + e), [this.visible_]
          );
        }
      }
      class ft extends Ke {
        constructor(e, t, n, r, i, s, o, a) {
          if (
            (super(),
            (this.repoInfo_ = e),
            (this.applicationId_ = t),
            (this.onDataUpdate_ = n),
            (this.onConnectStatus_ = r),
            (this.onServerInfoUpdate_ = i),
            (this.authTokenProvider_ = s),
            (this.appCheckTokenProvider_ = o),
            (this.authOverride_ = a),
            (this.id = ft.nextPersistentConnectionId_++),
            (this.log_ = oe("p:" + this.id + ":")),
            (this.interruptReasons_ = {}),
            (this.listens = new Map()),
            (this.outstandingPuts_ = []),
            (this.outstandingGets_ = []),
            (this.outstandingPutCount_ = 0),
            (this.outstandingGetCount_ = 0),
            (this.onDisconnectRequestQueue_ = []),
            (this.connected_ = !1),
            (this.reconnectDelay_ = 1e3),
            (this.maxReconnectDelay_ = 3e5),
            (this.securityDebugCallback_ = null),
            (this.lastSessionId = null),
            (this.establishConnectionTimer_ = null),
            (this.visible_ = !1),
            (this.requestCBHash_ = {}),
            (this.requestNumber_ = 0),
            (this.realtime_ = null),
            (this.authToken_ = null),
            (this.appCheckToken_ = null),
            (this.forceTokenRefresh_ = !1),
            (this.invalidAuthTokenCount_ = 0),
            (this.invalidAppCheckTokenCount_ = 0),
            (this.firstConnection_ = !0),
            (this.lastConnectionAttemptTime_ = null),
            (this.lastConnectionEstablishedTime_ = null),
            a && !f())
          )
            throw new Error(
              "Auth override specified in options, but not supported on non Node.js platforms"
            );
          pt.getInstance().on("visible", this.onVisible_, this),
            -1 === e.host.indexOf("fblocal") &&
              Ge.getInstance().on("online", this.onOnline_, this);
        }
        sendRequest(e, t, n) {
          var r = ++this.requestNumber_,
            i = { r: r, a: e, b: t };
          this.log_(m(i)),
            p(
              this.connected_,
              "sendRequest call when we're not connected not allowed."
            ),
            this.realtime_.sendRequest(i),
            n && (this.requestCBHash_[r] = n);
        }
        get(e) {
          this.initConnection_();
          const n = new d(),
            r = { p: e._path.toString(), q: e._queryObject },
            t = {
              action: "g",
              request: r,
              onComplete: (e) => {
                var t = e.d;
                "ok" === e.s
                  ? (this.onDataUpdate_(r.p, t, !1, null), n.resolve(t))
                  : n.reject(t);
              },
            };
          this.outstandingGets_.push(t), this.outstandingGetCount_++;
          const i = this.outstandingGets_.length - 1;
          return (
            this.connected_ ||
              setTimeout(() => {
                var e = this.outstandingGets_[i];
                void 0 !== e &&
                  t === e &&
                  (delete this.outstandingGets_[i],
                  this.outstandingGetCount_--,
                  0 === this.outstandingGetCount_ &&
                    (this.outstandingGets_ = []),
                  this.log_("get " + i + " timed out on connection"),
                  n.reject(new Error("Client is offline.")));
              }, 3e3),
            this.connected_ && this.sendGet_(i),
            n.promise
          );
        }
        listen(e, t, n, r) {
          this.initConnection_();
          var i = e._queryIdentifier,
            s = e._path.toString();
          this.log_("Listen called for " + s + " " + i),
            this.listens.has(s) || this.listens.set(s, new Map()),
            p(
              e._queryParams.isDefault() || !e._queryParams.loadsAllData(),
              "listen() called for non-default but complete query"
            ),
            p(
              !this.listens.get(s).has(i),
              "listen() called twice for same path/queryId."
            );
          var o = { onComplete: r, hashFn: t, query: e, tag: n };
          this.listens.get(s).set(i, o), this.connected_ && this.sendListen_(o);
        }
        sendGet_(t) {
          const n = this.outstandingGets_[t];
          this.sendRequest("g", n.request, (e) => {
            delete this.outstandingGets_[t],
              this.outstandingGetCount_--,
              0 === this.outstandingGetCount_ && (this.outstandingGets_ = []),
              n.onComplete && n.onComplete(e);
          });
        }
        sendListen_(r) {
          const i = r.query,
            s = i._path.toString(),
            o = i._queryIdentifier;
          this.log_("Listen on " + s + " for " + o);
          const e = { p: s };
          r.tag && ((e.q = i._queryObject), (e.t = r.tag)),
            (e.h = r.hashFn()),
            this.sendRequest("q", e, (e) => {
              var t = e.d,
                n = e.s;
              ft.warnOnListenWarnings_(t, i),
                (this.listens.get(s) && this.listens.get(s).get(o)) === r &&
                  (this.log_("listen response", e),
                  "ok" !== n && this.removeListen_(s, o),
                  r.onComplete && r.onComplete(n, t));
            });
        }
        static warnOnListenWarnings_(e, t) {
          if (e && "object" == typeof e && y(e, "w")) {
            const i = w(e, "w");
            var n, r;
            Array.isArray(i) &&
              ~i.indexOf("no_index") &&
              ((n =
                '".indexOn": "' + t._queryParams.getIndex().toString() + '"'),
              (r = t._path.toString()),
              fe(
                "Using an unspecified index. Your data will be downloaded and " +
                  `filtered on the client. Consider adding ${n} at ` +
                  `${r} to your security rules for better performance.`
              ));
          }
        }
        refreshAuthToken(e) {
          (this.authToken_ = e),
            this.log_("Auth token refreshed"),
            this.authToken_
              ? this.tryAuth()
              : this.connected_ && this.sendRequest("unauth", {}, () => {}),
            this.reduceReconnectDelayIfAdminCredential_(e);
        }
        reduceReconnectDelayIfAdminCredential_(e) {
          var t;
          ((e && 40 === e.length) ||
            ((e = e),
            "object" == typeof (t = v(e).claims) && !0 === t.admin)) &&
            (this.log_(
              "Admin auth credential detected.  Reducing max reconnect time."
            ),
            (this.maxReconnectDelay_ = 3e4));
        }
        refreshAppCheckToken(e) {
          (this.appCheckToken_ = e),
            this.log_("App check token refreshed"),
            this.appCheckToken_
              ? this.tryAppCheck()
              : this.connected_ && this.sendRequest("unappeck", {}, () => {});
        }
        tryAuth() {
          if (this.connected_ && this.authToken_) {
            const r = this.authToken_;
            var e = (function (e) {
              const t = v(e),
                n = t.claims;
              return !!n && "object" == typeof n && n.hasOwnProperty("iat");
            })(r)
              ? "auth"
              : "gauth";
            const t = { cred: r };
            null === this.authOverride_
              ? (t.noauth = !0)
              : "object" == typeof this.authOverride_ &&
                (t.authvar = this.authOverride_),
              this.sendRequest(e, t, (e) => {
                var t = e.s,
                  n = e.d || "error";
                this.authToken_ === r &&
                  ("ok" === t
                    ? (this.invalidAuthTokenCount_ = 0)
                    : this.onAuthRevoked_(t, n));
              });
          }
        }
        tryAppCheck() {
          this.connected_ &&
            this.appCheckToken_ &&
            this.sendRequest(
              "appcheck",
              { token: this.appCheckToken_ },
              (e) => {
                var t = e.s,
                  n = e.d || "error";
                "ok" === t
                  ? (this.invalidAppCheckTokenCount_ = 0)
                  : this.onAppCheckRevoked_(t, n);
              }
            );
        }
        unlisten(e, t) {
          var n = e._path.toString(),
            r = e._queryIdentifier;
          this.log_("Unlisten called for " + n + " " + r),
            p(
              e._queryParams.isDefault() || !e._queryParams.loadsAllData(),
              "unlisten() called for non-default but complete query"
            ),
            this.removeListen_(n, r) &&
              this.connected_ &&
              this.sendUnlisten_(n, r, e._queryObject, t);
        }
        sendUnlisten_(e, t, n, r) {
          this.log_("Unlisten on " + e + " for " + t);
          const i = { p: e };
          r && ((i.q = n), (i.t = r)), this.sendRequest("n", i);
        }
        onDisconnectPut(e, t, n) {
          this.initConnection_(),
            this.connected_
              ? this.sendOnDisconnect_("o", e, t, n)
              : this.onDisconnectRequestQueue_.push({
                  pathString: e,
                  action: "o",
                  data: t,
                  onComplete: n,
                });
        }
        onDisconnectMerge(e, t, n) {
          this.initConnection_(),
            this.connected_
              ? this.sendOnDisconnect_("om", e, t, n)
              : this.onDisconnectRequestQueue_.push({
                  pathString: e,
                  action: "om",
                  data: t,
                  onComplete: n,
                });
        }
        onDisconnectCancel(e, t) {
          this.initConnection_(),
            this.connected_
              ? this.sendOnDisconnect_("oc", e, null, t)
              : this.onDisconnectRequestQueue_.push({
                  pathString: e,
                  action: "oc",
                  data: null,
                  onComplete: t,
                });
        }
        sendOnDisconnect_(e, t, n, r) {
          var i = { p: t, d: n };
          this.log_("onDisconnect " + e, i),
            this.sendRequest(e, i, (e) => {
              r &&
                setTimeout(() => {
                  r(e.s, e.d);
                }, Math.floor(0));
            });
        }
        put(e, t, n, r) {
          this.putInternal("p", e, t, n, r);
        }
        merge(e, t, n, r) {
          this.putInternal("m", e, t, n, r);
        }
        putInternal(e, t, n, r, i) {
          this.initConnection_();
          const s = { p: t, d: n };
          void 0 !== i && (s.h = i),
            this.outstandingPuts_.push({
              action: e,
              request: s,
              onComplete: r,
            }),
            this.outstandingPutCount_++;
          var o = this.outstandingPuts_.length - 1;
          this.connected_ ? this.sendPut_(o) : this.log_("Buffering put: " + t);
        }
        sendPut_(t) {
          const n = this.outstandingPuts_[t].action;
          var e = this.outstandingPuts_[t].request;
          const r = this.outstandingPuts_[t].onComplete;
          (this.outstandingPuts_[t].queued = this.connected_),
            this.sendRequest(n, e, (e) => {
              this.log_(n + " response", e),
                delete this.outstandingPuts_[t],
                this.outstandingPutCount_--,
                0 === this.outstandingPutCount_ && (this.outstandingPuts_ = []),
                r && r(e.s, e.d);
            });
        }
        reportStats(e) {
          var t;
          this.connected_ &&
            (this.log_("reportStats", (t = { c: e })),
            this.sendRequest("s", t, (e) => {
              var t;
              "ok" !== e.s &&
                ((t = e.d),
                this.log_("reportStats", "Error sending stats: " + t));
            }));
        }
        onDataMessage_(e) {
          if ("r" in e) {
            this.log_("from server: " + m(e));
            var t = e.r;
            const n = this.requestCBHash_[t];
            n && (delete this.requestCBHash_[t], n(e.b));
          } else {
            if ("error" in e)
              throw "A server-side error has occurred: " + e.error;
            "a" in e && this.onDataPush_(e.a, e.b);
          }
        }
        onDataPush_(e, t) {
          this.log_("handleServerMessage", e, t),
            "d" === e
              ? this.onDataUpdate_(t.p, t.d, !1, t.t)
              : "m" === e
              ? this.onDataUpdate_(t.p, t.d, !0, t.t)
              : "c" === e
              ? this.onListenRevoked_(t.p, t.q)
              : "ac" === e
              ? this.onAuthRevoked_(t.s, t.d)
              : "apc" === e
              ? this.onAppCheckRevoked_(t.s, t.d)
              : "sd" === e
              ? this.onSecurityDebugPacket_(t)
              : ae(
                  "Unrecognized action received from server: " +
                    m(e) +
                    "\nAre you using the latest client?"
                );
        }
        onReady_(e, t) {
          this.log_("connection ready"),
            (this.connected_ = !0),
            (this.lastConnectionEstablishedTime_ = new Date().getTime()),
            this.handleTimestamp_(e),
            (this.lastSessionId = t),
            this.firstConnection_ && this.sendConnectStats_(),
            this.restoreState_(),
            (this.firstConnection_ = !1),
            this.onConnectStatus_(!0);
        }
        scheduleConnect_(e) {
          p(
            !this.realtime_,
            "Scheduling a connect when we're already connected/ing?"
          ),
            this.establishConnectionTimer_ &&
              clearTimeout(this.establishConnectionTimer_),
            (this.establishConnectionTimer_ = setTimeout(() => {
              (this.establishConnectionTimer_ = null),
                this.establishConnection_();
            }, Math.floor(e)));
        }
        initConnection_() {
          !this.realtime_ && this.firstConnection_ && this.scheduleConnect_(0);
        }
        onVisible_(e) {
          e &&
            !this.visible_ &&
            this.reconnectDelay_ === this.maxReconnectDelay_ &&
            (this.log_("Window became visible.  Reducing delay."),
            (this.reconnectDelay_ = 1e3),
            this.realtime_ || this.scheduleConnect_(0)),
            (this.visible_ = e);
        }
        onOnline_(e) {
          e
            ? (this.log_("Browser went online."),
              (this.reconnectDelay_ = 1e3),
              this.realtime_ || this.scheduleConnect_(0))
            : (this.log_("Browser went offline.  Killing connection."),
              this.realtime_ && this.realtime_.close());
        }
        onRealtimeDisconnect_() {
          var e;
          this.log_("data client disconnected"),
            (this.connected_ = !1),
            (this.realtime_ = null),
            this.cancelSentTransactions_(),
            (this.requestCBHash_ = {}),
            this.shouldReconnect_() &&
              (this.visible_
                ? this.lastConnectionEstablishedTime_ &&
                  (3e4 <
                    new Date().getTime() -
                      this.lastConnectionEstablishedTime_ &&
                    (this.reconnectDelay_ = 1e3),
                  (this.lastConnectionEstablishedTime_ = null))
                : (this.log_("Window isn't visible.  Delaying reconnect."),
                  (this.reconnectDelay_ = this.maxReconnectDelay_),
                  (this.lastConnectionAttemptTime_ = new Date().getTime())),
              (e = new Date().getTime() - this.lastConnectionAttemptTime_),
              (e = Math.max(0, this.reconnectDelay_ - e)),
              (e = Math.random() * e),
              this.log_("Trying to reconnect in " + e + "ms"),
              this.scheduleConnect_(e),
              (this.reconnectDelay_ = Math.min(
                this.maxReconnectDelay_,
                1.3 * this.reconnectDelay_
              ))),
            this.onConnectStatus_(!1);
        }
        async establishConnection_() {
          if (this.shouldReconnect_()) {
            this.log_("Making a connection attempt"),
              (this.lastConnectionAttemptTime_ = new Date().getTime()),
              (this.lastConnectionEstablishedTime_ = null);
            var e = this.onDataMessage_.bind(this),
              r = this.onReady_.bind(this);
            const c = this.onRealtimeDisconnect_.bind(this);
            var i = this.id + ":" + ft.nextConnectionId_++,
              s = this.lastSessionId;
            let t = !1,
              n = null;
            var o = function () {
              n ? n.close() : ((t = !0), c());
            };
            this.realtime_ = {
              close: o,
              sendRequest: function (e) {
                p(n, "sendRequest call when we're not connected not allowed."),
                  n.sendRequest(e);
              },
            };
            var a = this.forceTokenRefresh_;
            this.forceTokenRefresh_ = !1;
            try {
              var [l, h] = await Promise.all([
                this.authTokenProvider_.getToken(a),
                this.appCheckTokenProvider_.getToken(a),
              ]);
              t
                ? _e("getToken() completed but was canceled")
                : (_e("getToken() completed. Creating connection."),
                  (this.authToken_ = l && l.accessToken),
                  (this.appCheckToken_ = h && h.token),
                  (n = new Ye(
                    i,
                    this.repoInfo_,
                    this.applicationId_,
                    this.appCheckToken_,
                    this.authToken_,
                    e,
                    r,
                    c,
                    (e) => {
                      fe(e + " (" + this.repoInfo_.toString() + ")"),
                        this.interrupt("server_kill");
                    },
                    s
                  )));
            } catch (e) {
              this.log_("Failed to get token: " + e),
                t || (this.repoInfo_.nodeAdmin && fe(e), o());
            }
          }
        }
        interrupt(e) {
          _e("Interrupting connection for reason: " + e),
            (this.interruptReasons_[e] = !0),
            this.realtime_
              ? this.realtime_.close()
              : (this.establishConnectionTimer_ &&
                  (clearTimeout(this.establishConnectionTimer_),
                  (this.establishConnectionTimer_ = null)),
                this.connected_ && this.onRealtimeDisconnect_());
        }
        resume(e) {
          _e("Resuming connection for reason: " + e),
            delete this.interruptReasons_[e],
            C(this.interruptReasons_) &&
              ((this.reconnectDelay_ = 1e3),
              this.realtime_ || this.scheduleConnect_(0));
        }
        handleTimestamp_(e) {
          var t = e - new Date().getTime();
          this.onServerInfoUpdate_({ serverTimeOffset: t });
        }
        cancelSentTransactions_() {
          for (let e = 0; e < this.outstandingPuts_.length; e++) {
            const t = this.outstandingPuts_[e];
            t &&
              "h" in t.request &&
              t.queued &&
              (t.onComplete && t.onComplete("disconnect"),
              delete this.outstandingPuts_[e],
              this.outstandingPutCount_--);
          }
          0 === this.outstandingPutCount_ && (this.outstandingPuts_ = []);
        }
        onListenRevoked_(e, t) {
          let n;
          n = t ? t.map((e) => ce(e)).join("$") : "default";
          const r = this.removeListen_(e, n);
          r && r.onComplete && r.onComplete("permission_denied");
        }
        removeListen_(e, t) {
          var n = new Je(e).toString();
          let r;
          if (this.listens.has(n)) {
            const i = this.listens.get(n);
            (r = i.get(t)), i.delete(t), 0 === i.size && this.listens.delete(n);
          } else r = void 0;
          return r;
        }
        onAuthRevoked_(e, t) {
          _e("Auth token revoked: " + e + "/" + t),
            (this.authToken_ = null),
            (this.forceTokenRefresh_ = !0),
            this.realtime_.close(),
            ("invalid_token" !== e && "permission_denied" !== e) ||
              (this.invalidAuthTokenCount_++,
              3 <= this.invalidAuthTokenCount_ &&
                ((this.reconnectDelay_ = 3e4),
                this.authTokenProvider_.notifyForInvalidToken()));
        }
        onAppCheckRevoked_(e, t) {
          _e("App check token revoked: " + e + "/" + t),
            (this.appCheckToken_ = null),
            (this.forceTokenRefresh_ = !0),
            ("invalid_token" !== e && "permission_denied" !== e) ||
              (this.invalidAppCheckTokenCount_++,
              3 <= this.invalidAppCheckTokenCount_ &&
                this.appCheckTokenProvider_.notifyForInvalidToken());
        }
        onSecurityDebugPacket_(e) {
          this.securityDebugCallback_
            ? this.securityDebugCallback_(e)
            : "msg" in e &&
              console.log("FIREBASE: " + e.msg.replace("\n", "\nFIREBASE: "));
        }
        restoreState_() {
          this.tryAuth(), this.tryAppCheck();
          for (const t of this.listens.values())
            for (const n of t.values()) this.sendListen_(n);
          for (let r = 0; r < this.outstandingPuts_.length; r++)
            this.outstandingPuts_[r] && this.sendPut_(r);
          for (; this.onDisconnectRequestQueue_.length; ) {
            var e = this.onDisconnectRequestQueue_.shift();
            this.sendOnDisconnect_(
              e.action,
              e.pathString,
              e.data,
              e.onComplete
            );
          }
          for (let i = 0; i < this.outstandingGets_.length; i++)
            this.outstandingGets_[i] && this.sendGet_(i);
        }
        sendConnectStats_() {
          const e = {};
          (e["sdk.js." + U.replace(/\./g, "-")] = 1),
            _()
              ? (e["framework.cordova"] = 1)
              : "object" == typeof navigator &&
                "ReactNative" === navigator.product &&
                (e["framework.reactnative"] = 1),
            this.reportStats(e);
        }
        shouldReconnect_() {
          var e = Ge.getInstance().currentlyOnline();
          return C(this.interruptReasons_) && e;
        }
      }
      (ft.nextPersistentConnectionId_ = 0), (ft.nextConnectionId_ = 0);
      class gt {
        constructor(e, t) {
          (this.name = e), (this.node = t);
        }
        static Wrap(e, t) {
          return new gt(e, t);
        }
      }
      class mt {
        getCompare() {
          return this.compare.bind(this);
        }
        indexedValueChanged(e, t) {
          var n = new gt(ve, e),
            r = new gt(ve, t);
          return 0 !== this.compare(n, r);
        }
        minPost() {
          return gt.MIN;
        }
      }
      let vt;
      class yt extends mt {
        static get __EMPTY_NODE() {
          return vt;
        }
        static set __EMPTY_NODE(e) {
          vt = e;
        }
        compare(e, t) {
          return we(e.name, t.name);
        }
        isDefinedOn(e) {
          throw c("KeyIndex.isDefinedOn not expected to be called.");
        }
        indexedValueChanged(e, t) {
          return !1;
        }
        minPost() {
          return gt.MIN;
        }
        maxPost() {
          return new gt(ye, vt);
        }
        makePost(e, t) {
          return (
            p(
              "string" == typeof e,
              "KeyIndex indexValue must always be a string."
            ),
            new gt(e, vt)
          );
        }
        toString() {
          return ".key";
        }
      }
      const wt = new yt();
      class Ct {
        constructor(e, t, n, r, i = null) {
          (this.isReverse_ = r),
            (this.resultGenerator_ = i),
            (this.nodeStack_ = []);
          let s = 1;
          for (; !e.isEmpty(); )
            if (((s = t ? n(e.key, t) : 1), r && (s *= -1), s < 0))
              e = this.isReverse_ ? e.left : e.right;
            else {
              if (0 === s) {
                this.nodeStack_.push(e);
                break;
              }
              this.nodeStack_.push(e), (e = this.isReverse_ ? e.right : e.left);
            }
        }
        getNext() {
          if (0 === this.nodeStack_.length) return null;
          let e = this.nodeStack_.pop(),
            t;
          if (
            ((t = this.resultGenerator_
              ? this.resultGenerator_(e.key, e.value)
              : { key: e.key, value: e.value }),
            this.isReverse_)
          )
            for (e = e.left; !e.isEmpty(); )
              this.nodeStack_.push(e), (e = e.right);
          else
            for (e = e.right; !e.isEmpty(); )
              this.nodeStack_.push(e), (e = e.left);
          return t;
        }
        hasNext() {
          return 0 < this.nodeStack_.length;
        }
        peek() {
          if (0 === this.nodeStack_.length) return null;
          var e = this.nodeStack_[this.nodeStack_.length - 1];
          return this.resultGenerator_
            ? this.resultGenerator_(e.key, e.value)
            : { key: e.key, value: e.value };
        }
      }
      class bt {
        constructor(e, t, n, r, i) {
          (this.key = e),
            (this.value = t),
            (this.color = null != n ? n : bt.RED),
            (this.left = null != r ? r : Tt.EMPTY_NODE),
            (this.right = null != i ? i : Tt.EMPTY_NODE);
        }
        copy(e, t, n, r, i) {
          return new bt(
            null != e ? e : this.key,
            null != t ? t : this.value,
            null != n ? n : this.color,
            null != r ? r : this.left,
            null != i ? i : this.right
          );
        }
        count() {
          return this.left.count() + 1 + this.right.count();
        }
        isEmpty() {
          return !1;
        }
        inorderTraversal(e) {
          return (
            this.left.inorderTraversal(e) ||
            !!e(this.key, this.value) ||
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
        min_() {
          return this.left.isEmpty() ? this : this.left.min_();
        }
        minKey() {
          return this.min_().key;
        }
        maxKey() {
          return this.right.isEmpty() ? this.key : this.right.maxKey();
        }
        insert(e, t, n) {
          let r = this;
          var i = n(e, r.key);
          return (
            (r =
              i < 0
                ? r.copy(null, null, null, r.left.insert(e, t, n), null)
                : 0 === i
                ? r.copy(null, t, null, null, null)
                : r.copy(null, null, null, null, r.right.insert(e, t, n))),
            r.fixUp_()
          );
        }
        removeMin_() {
          if (this.left.isEmpty()) return Tt.EMPTY_NODE;
          let e = this;
          return (
            e.left.isRed_() || e.left.left.isRed_() || (e = e.moveRedLeft_()),
            (e = e.copy(null, null, null, e.left.removeMin_(), null)),
            e.fixUp_()
          );
        }
        remove(e, t) {
          let n, r;
          if (((n = this), t(e, n.key) < 0))
            n.left.isEmpty() ||
              n.left.isRed_() ||
              n.left.left.isRed_() ||
              (n = n.moveRedLeft_()),
              (n = n.copy(null, null, null, n.left.remove(e, t), null));
          else {
            if (
              (n.left.isRed_() && (n = n.rotateRight_()),
              n.right.isEmpty() ||
                n.right.isRed_() ||
                n.right.left.isRed_() ||
                (n = n.moveRedRight_()),
              0 === t(e, n.key))
            ) {
              if (n.right.isEmpty()) return Tt.EMPTY_NODE;
              (r = n.right.min_()),
                (n = n.copy(r.key, r.value, null, null, n.right.removeMin_()));
            }
            n = n.copy(null, null, null, null, n.right.remove(e, t));
          }
          return n.fixUp_();
        }
        isRed_() {
          return this.color;
        }
        fixUp_() {
          let e = this;
          return (
            e.right.isRed_() && !e.left.isRed_() && (e = e.rotateLeft_()),
            e.left.isRed_() && e.left.left.isRed_() && (e = e.rotateRight_()),
            e.left.isRed_() && e.right.isRed_() && (e = e.colorFlip_()),
            e
          );
        }
        moveRedLeft_() {
          let e = this.colorFlip_();
          return (
            e.right.left.isRed_() &&
              ((e = e.copy(null, null, null, null, e.right.rotateRight_())),
              (e = e.rotateLeft_()),
              (e = e.colorFlip_())),
            e
          );
        }
        moveRedRight_() {
          let e = this.colorFlip_();
          return (
            e.left.left.isRed_() &&
              ((e = e.rotateRight_()), (e = e.colorFlip_())),
            e
          );
        }
        rotateLeft_() {
          var e = this.copy(null, null, bt.RED, null, this.right.left);
          return this.right.copy(null, null, this.color, e, null);
        }
        rotateRight_() {
          var e = this.copy(null, null, bt.RED, this.left.right, null);
          return this.left.copy(null, null, this.color, null, e);
        }
        colorFlip_() {
          var e = this.left.copy(null, null, !this.left.color, null, null),
            t = this.right.copy(null, null, !this.right.color, null, null);
          return this.copy(null, null, !this.color, e, t);
        }
        checkMaxDepth_() {
          var e = this.check_();
          return Math.pow(2, e) <= this.count() + 1;
        }
        check_() {
          if (this.isRed_() && this.left.isRed_())
            throw new Error(
              "Red node has red child(" + this.key + "," + this.value + ")"
            );
          if (this.right.isRed_())
            throw new Error(
              "Right child of (" + this.key + "," + this.value + ") is red"
            );
          var e = this.left.check_();
          if (e !== this.right.check_()) throw new Error("Black depths differ");
          return e + (this.isRed_() ? 0 : 1);
        }
      }
      (bt.RED = !0), (bt.BLACK = !1);
      class Tt {
        constructor(e, t = Tt.EMPTY_NODE) {
          (this.comparator_ = e), (this.root_ = t);
        }
        insert(e, t) {
          return new Tt(
            this.comparator_,
            this.root_
              .insert(e, t, this.comparator_)
              .copy(null, null, bt.BLACK, null, null)
          );
        }
        remove(e) {
          return new Tt(
            this.comparator_,
            this.root_
              .remove(e, this.comparator_)
              .copy(null, null, bt.BLACK, null, null)
          );
        }
        get(e) {
          var t;
          let n = this.root_;
          for (; !n.isEmpty(); ) {
            if (0 === (t = this.comparator_(e, n.key))) return n.value;
            t < 0 ? (n = n.left) : 0 < t && (n = n.right);
          }
          return null;
        }
        getPredecessorKey(e) {
          let t,
            n = this.root_,
            r = null;
          for (; !n.isEmpty(); ) {
            if (0 === (t = this.comparator_(e, n.key))) {
              if (n.left.isEmpty()) return r ? r.key : null;
              for (n = n.left; !n.right.isEmpty(); ) n = n.right;
              return n.key;
            }
            t < 0 ? (n = n.left) : 0 < t && ((r = n), (n = n.right));
          }
          throw new Error(
            "Attempted to find predecessor key for a nonexistent key.  What gives?"
          );
        }
        isEmpty() {
          return this.root_.isEmpty();
        }
        count() {
          return this.root_.count();
        }
        minKey() {
          return this.root_.minKey();
        }
        maxKey() {
          return this.root_.maxKey();
        }
        inorderTraversal(e) {
          return this.root_.inorderTraversal(e);
        }
        reverseTraversal(e) {
          return this.root_.reverseTraversal(e);
        }
        getIterator(e) {
          return new Ct(this.root_, null, this.comparator_, !1, e);
        }
        getIteratorFrom(e, t) {
          return new Ct(this.root_, e, this.comparator_, !1, t);
        }
        getReverseIteratorFrom(e, t) {
          return new Ct(this.root_, e, this.comparator_, !0, t);
        }
        getReverseIterator(e) {
          return new Ct(this.root_, null, this.comparator_, !0, e);
        }
      }
      function It(e, t) {
        return we(e.name, t.name);
      }
      function Et(e, t) {
        return we(e, t);
      }
      Tt.EMPTY_NODE = new (class {
        copy(e, t, n, r, i) {
          return this;
        }
        insert(e, t, n) {
          return new bt(e, t, null);
        }
        remove(e, t) {
          return this;
        }
        count() {
          return 0;
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
        check_() {
          return 0;
        }
        isRed_() {
          return !1;
        }
      })();
      let St;
      function kt(e) {
        return "number" == typeof e ? "number:" + be(e) : "string:" + e;
      }
      function Nt(e) {
        var t;
        e.isLeafNode()
          ? ((t = e.val()),
            p(
              "string" == typeof t ||
                "number" == typeof t ||
                ("object" == typeof t && y(t, ".sv")),
              "Priority must be a string or number."
            ))
          : p(e === St || e.isEmpty(), "priority of unexpected type."),
          p(
            e === St || e.getPriority().isEmpty(),
            "Priority nodes can't have a priority of their own."
          );
      }
      let Pt;
      class Rt {
        constructor(e, t = Rt.__childrenNodeConstructor.EMPTY_NODE) {
          (this.value_ = e),
            (this.priorityNode_ = t),
            (this.lazyHash_ = null),
            p(
              void 0 !== this.value_ && null !== this.value_,
              "LeafNode shouldn't be created with null/undefined value."
            ),
            Nt(this.priorityNode_);
        }
        static set __childrenNodeConstructor(e) {
          Pt = e;
        }
        static get __childrenNodeConstructor() {
          return Pt;
        }
        isLeafNode() {
          return !0;
        }
        getPriority() {
          return this.priorityNode_;
        }
        updatePriority(e) {
          return new Rt(this.value_, e);
        }
        getImmediateChild(e) {
          return ".priority" === e
            ? this.priorityNode_
            : Rt.__childrenNodeConstructor.EMPTY_NODE;
        }
        getChild(e) {
          return ot(e)
            ? this
            : ".priority" === Ze(e)
            ? this.priorityNode_
            : Rt.__childrenNodeConstructor.EMPTY_NODE;
        }
        hasChild() {
          return !1;
        }
        getPredecessorChildName(e, t) {
          return null;
        }
        updateImmediateChild(e, t) {
          return ".priority" === e
            ? this.updatePriority(t)
            : t.isEmpty() && ".priority" !== e
            ? this
            : Rt.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(
                e,
                t
              ).updatePriority(this.priorityNode_);
        }
        updateChild(e, t) {
          var n = Ze(e);
          return null === n
            ? t
            : t.isEmpty() && ".priority" !== n
            ? this
            : (p(
                ".priority" !== n || 1 === et(e),
                ".priority must be the last token in a path"
              ),
              this.updateImmediateChild(
                n,
                Rt.__childrenNodeConstructor.EMPTY_NODE.updateChild(tt(e), t)
              ));
        }
        isEmpty() {
          return !1;
        }
        numChildren() {
          return 0;
        }
        forEachChild(e, t) {
          return !1;
        }
        val(e) {
          return e && !this.getPriority().isEmpty()
            ? {
                ".value": this.getValue(),
                ".priority": this.getPriority().val(),
              }
            : this.getValue();
        }
        hash() {
          if (null === this.lazyHash_) {
            let e = "";
            this.priorityNode_.isEmpty() ||
              (e += "priority:" + kt(this.priorityNode_.val()) + ":");
            var t = typeof this.value_;
            (e += t + ":"),
              (e += "number" == t ? be(this.value_) : this.value_),
              (this.lazyHash_ = X(e));
          }
          return this.lazyHash_;
        }
        getValue() {
          return this.value_;
        }
        compareTo(e) {
          return e === Rt.__childrenNodeConstructor.EMPTY_NODE
            ? 1
            : e instanceof Rt.__childrenNodeConstructor
            ? -1
            : (p(e.isLeafNode(), "Unknown node type"),
              this.compareToLeafNode_(e));
        }
        compareToLeafNode_(e) {
          var t = typeof e.value_,
            n = typeof this.value_,
            r = Rt.VALUE_TYPE_ORDER.indexOf(t),
            i = Rt.VALUE_TYPE_ORDER.indexOf(n);
          return (
            p(0 <= r, "Unknown leaf type: " + t),
            p(0 <= i, "Unknown leaf type: " + n),
            r === i
              ? "object" == n
                ? 0
                : this.value_ < e.value_
                ? -1
                : this.value_ === e.value_
                ? 0
                : 1
              : i - r
          );
        }
        withIndex() {
          return this;
        }
        isIndexed() {
          return !0;
        }
        equals(e) {
          return (
            e === this ||
            (!!e.isLeafNode() &&
              this.value_ === e.value_ &&
              this.priorityNode_.equals(e.priorityNode_))
          );
        }
      }
      Rt.VALUE_TYPE_ORDER = ["object", "boolean", "number", "string"];
      let xt, Dt;
      const At = new (class extends mt {
          compare(e, t) {
            const n = e.node.getPriority();
            var r = t.node.getPriority(),
              r = n.compareTo(r);
            return 0 === r ? we(e.name, t.name) : r;
          }
          isDefinedOn(e) {
            return !e.getPriority().isEmpty();
          }
          indexedValueChanged(e, t) {
            return !e.getPriority().equals(t.getPriority());
          }
          minPost() {
            return gt.MIN;
          }
          maxPost() {
            return new gt(ye, new Rt("[PRIORITY-POST]", Dt));
          }
          makePost(e, t) {
            var n = xt(e);
            return new gt(t, new Rt("[PRIORITY-POST]", n));
          }
          toString() {
            return ".priority";
          }
        })(),
        Ot = Math.log(2);
      class Lt {
        constructor(e) {
          var t;
          (this.count = ((t = e + 1), parseInt(Math.log(t) / Ot, 10))),
            (this.current_ = this.count - 1);
          var n,
            r = ((n = this.count), parseInt(Array(n + 1).join("1"), 2));
          this.bits_ = (e + 1) & r;
        }
        nextBitIsOne() {
          var e = !(this.bits_ & (1 << this.current_));
          return this.current_--, e;
        }
      }
      function Mt(l, e, h, t) {
        l.sort(e);
        const c = function (e, t) {
          var n = t - e;
          let r, i;
          if (0 == n) return null;
          if (1 == n)
            return (
              (r = l[e]),
              (i = h ? h(r) : r),
              new bt(i, r.node, bt.BLACK, null, null)
            );
          var s = parseInt(n / 2, 10) + e,
            o = c(e, s),
            n = c(s + 1, t);
          return (
            (r = l[s]), (i = h ? h(r) : r), new bt(i, r.node, bt.BLACK, o, n)
          );
        };
        var n = (function (e) {
          let s = null,
            o = null,
            a = l.length;
          function t(e, t) {
            var n = a - e,
              r = a;
            a -= e;
            var i = c(1 + n, r),
              r = l[n],
              n = h ? h(r) : r;
            !(function (e) {
              if (s) {
                s.left = e;
                s = e;
              } else {
                o = e;
                s = e;
              }
            })(new bt(n, r.node, t, null, i));
          }
          for (let i = 0; i < e.count; ++i) {
            var n = e.nextBitIsOne(),
              r = Math.pow(2, e.count - (i + 1));
            n ? t(r, bt.BLACK) : (t(r, bt.BLACK), t(r, bt.RED));
          }
          return o;
        })(new Lt(l.length));
        return new Tt(t || e, n);
      }
      let Ft;
      const qt = {};
      class Wt {
        constructor(e, t) {
          (this.indexes_ = e), (this.indexSet_ = t);
        }
        static get Default() {
          return (
            p((qt, At), "ChildrenNode.ts has not been loaded"),
            (Ft = Ft || new Wt({ ".priority": qt }, { ".priority": At })),
            Ft
          );
        }
        get(e) {
          var t = w(this.indexes_, e);
          if (!t) throw new Error("No index defined for " + e);
          return t instanceof Tt ? t : null;
        }
        hasIndex(e) {
          return y(this.indexSet_, e.toString());
        }
        addIndex(e, t) {
          p(
            e !== wt,
            "KeyIndex always exists and isn't meant to be added to the IndexMap."
          );
          const n = [];
          let r = !1;
          const i = t.getIterator(gt.Wrap);
          let s = i.getNext();
          for (; s; )
            (r = r || e.isDefinedOn(s.node)), n.push(s), (s = i.getNext());
          let o;
          o = r ? Mt(n, e.getCompare()) : qt;
          var a = e.toString();
          const l = Object.assign({}, this.indexSet_);
          l[a] = e;
          const h = Object.assign({}, this.indexes_);
          return (h[a] = o), new Wt(h, l);
        }
        addToIndexes(o, a) {
          var e = b(this.indexes_, (t, e) => {
            const n = w(this.indexSet_, e);
            if ((p(n, "Missing index implementation for " + e), t === qt)) {
              if (n.isDefinedOn(o.node)) {
                const i = [],
                  s = a.getIterator(gt.Wrap);
                let e = s.getNext();
                for (; e; ) e.name !== o.name && i.push(e), (e = s.getNext());
                return i.push(o), Mt(i, n.getCompare());
              }
              return qt;
            }
            {
              var r = a.get(o.name);
              let e = t;
              return (
                r && (e = e.remove(new gt(o.name, r))), e.insert(o, o.node)
              );
            }
          });
          return new Wt(e, this.indexSet_);
        }
        removeFromIndexes(n, r) {
          var e = b(this.indexes_, (e) => {
            if (e === qt) return e;
            var t = r.get(n.name);
            return t ? e.remove(new gt(n.name, t)) : e;
          });
          return new Wt(e, this.indexSet_);
        }
      }
      let Ut;
      class Bt {
        constructor(e, t, n) {
          (this.children_ = e),
            (this.priorityNode_ = t),
            (this.indexMap_ = n),
            (this.lazyHash_ = null),
            this.priorityNode_ && Nt(this.priorityNode_),
            this.children_.isEmpty() &&
              p(
                !this.priorityNode_ || this.priorityNode_.isEmpty(),
                "An empty node cannot have a priority"
              );
        }
        static get EMPTY_NODE() {
          return (Ut = Ut || new Bt(new Tt(Et), null, Wt.Default));
        }
        isLeafNode() {
          return !1;
        }
        getPriority() {
          return this.priorityNode_ || Ut;
        }
        updatePriority(e) {
          return this.children_.isEmpty()
            ? this
            : new Bt(this.children_, e, this.indexMap_);
        }
        getImmediateChild(e) {
          if (".priority" === e) return this.getPriority();
          var t = this.children_.get(e);
          return null === t ? Ut : t;
        }
        getChild(e) {
          var t = Ze(e);
          return null === t ? this : this.getImmediateChild(t).getChild(tt(e));
        }
        hasChild(e) {
          return null !== this.children_.get(e);
        }
        updateImmediateChild(n, r) {
          if (
            (p(r, "We should always be passing snapshot nodes"),
            ".priority" === n)
          )
            return this.updatePriority(r);
          {
            var i = new gt(n, r);
            let e, t;
            t = r.isEmpty()
              ? ((e = this.children_.remove(n)),
                this.indexMap_.removeFromIndexes(i, this.children_))
              : ((e = this.children_.insert(n, r)),
                this.indexMap_.addToIndexes(i, this.children_));
            i = e.isEmpty() ? Ut : this.priorityNode_;
            return new Bt(e, i, t);
          }
        }
        updateChild(e, t) {
          var n = Ze(e);
          if (null === n) return t;
          p(
            ".priority" !== Ze(e) || 1 === et(e),
            ".priority must be the last token in a path"
          );
          var r = this.getImmediateChild(n).updateChild(tt(e), t);
          return this.updateImmediateChild(n, r);
        }
        isEmpty() {
          return this.children_.isEmpty();
        }
        numChildren() {
          return this.children_.count();
        }
        val(n) {
          if (this.isEmpty()) return null;
          const r = {};
          let i = 0,
            s = 0,
            o = !0;
          if (
            (this.forEachChild(At, (e, t) => {
              (r[e] = t.val(n)),
                i++,
                o && Bt.INTEGER_REGEXP_.test(e)
                  ? (s = Math.max(s, Number(e)))
                  : (o = !1);
            }),
            !n && o && s < 2 * i)
          ) {
            const e = [];
            for (const t in r) e[t] = r[t];
            return e;
          }
          return (
            n &&
              !this.getPriority().isEmpty() &&
              (r[".priority"] = this.getPriority().val()),
            r
          );
        }
        hash() {
          if (null === this.lazyHash_) {
            let r = "";
            this.getPriority().isEmpty() ||
              (r += "priority:" + kt(this.getPriority().val()) + ":"),
              this.forEachChild(At, (e, t) => {
                var n = t.hash();
                "" !== n && (r += ":" + e + ":" + n);
              }),
              (this.lazyHash_ = "" === r ? "" : X(r));
          }
          return this.lazyHash_;
        }
        getPredecessorChildName(e, t, n) {
          const r = this.resolveIndex_(n);
          if (r) {
            var i = r.getPredecessorKey(new gt(e, t));
            return i ? i.name : null;
          }
          return this.children_.getPredecessorKey(e);
        }
        getFirstChildName(e) {
          const t = this.resolveIndex_(e);
          if (t) {
            var n = t.minKey();
            return n && n.name;
          }
          return this.children_.minKey();
        }
        getFirstChild(e) {
          var t = this.getFirstChildName(e);
          return t ? new gt(t, this.children_.get(t)) : null;
        }
        getLastChildName(e) {
          const t = this.resolveIndex_(e);
          if (t) {
            var n = t.maxKey();
            return n && n.name;
          }
          return this.children_.maxKey();
        }
        getLastChild(e) {
          var t = this.getLastChildName(e);
          return t ? new gt(t, this.children_.get(t)) : null;
        }
        forEachChild(e, t) {
          const n = this.resolveIndex_(e);
          return n
            ? n.inorderTraversal((e) => t(e.name, e.node))
            : this.children_.inorderTraversal(t);
        }
        getIterator(e) {
          return this.getIteratorFrom(e.minPost(), e);
        }
        getIteratorFrom(t, n) {
          const e = this.resolveIndex_(n);
          if (e) return e.getIteratorFrom(t, (e) => e);
          {
            const r = this.children_.getIteratorFrom(t.name, gt.Wrap);
            let e = r.peek();
            for (; null != e && n.compare(e, t) < 0; )
              r.getNext(), (e = r.peek());
            return r;
          }
        }
        getReverseIterator(e) {
          return this.getReverseIteratorFrom(e.maxPost(), e);
        }
        getReverseIteratorFrom(t, n) {
          const e = this.resolveIndex_(n);
          if (e) return e.getReverseIteratorFrom(t, (e) => e);
          {
            const r = this.children_.getReverseIteratorFrom(t.name, gt.Wrap);
            let e = r.peek();
            for (; null != e && 0 < n.compare(e, t); )
              r.getNext(), (e = r.peek());
            return r;
          }
        }
        compareTo(e) {
          return this.isEmpty()
            ? e.isEmpty()
              ? 0
              : -1
            : e.isLeafNode() || e.isEmpty()
            ? 1
            : e === Vt
            ? -1
            : 0;
        }
        withIndex(e) {
          if (e === wt || this.indexMap_.hasIndex(e)) return this;
          var t = this.indexMap_.addIndex(e, this.children_);
          return new Bt(this.children_, this.priorityNode_, t);
        }
        isIndexed(e) {
          return e === wt || this.indexMap_.hasIndex(e);
        }
        equals(e) {
          if (e === this) return !0;
          if (e.isLeafNode()) return !1;
          {
            const n = e;
            if (this.getPriority().equals(n.getPriority())) {
              if (this.children_.count() !== n.children_.count()) return !1;
              {
                const r = this.getIterator(At),
                  i = n.getIterator(At);
                let e = r.getNext(),
                  t = i.getNext();
                for (; e && t; ) {
                  if (e.name !== t.name || !e.node.equals(t.node)) return !1;
                  (e = r.getNext()), (t = i.getNext());
                }
                return null === e && null === t;
              }
            }
            return !1;
          }
        }
        resolveIndex_(e) {
          return e === wt ? null : this.indexMap_.get(e.toString());
        }
      }
      Bt.INTEGER_REGEXP_ = /^(0|[1-9]\d*)$/;
      class jt extends Bt {
        constructor() {
          super(new Tt(Et), Bt.EMPTY_NODE, Wt.Default);
        }
        compareTo(e) {
          return e === this ? 0 : 1;
        }
        equals(e) {
          return e === this;
        }
        getPriority() {
          return this;
        }
        getImmediateChild(e) {
          return Bt.EMPTY_NODE;
        }
        isEmpty() {
          return !1;
        }
      }
      const Vt = new jt();
      Object.defineProperties(gt, {
        MIN: { value: new gt(ve, Bt.EMPTY_NODE) },
        MAX: { value: new gt(ye, Vt) },
      }),
        (yt.__EMPTY_NODE = Bt.EMPTY_NODE),
        (Rt.__childrenNodeConstructor = Bt),
        (H = Vt),
        (St = H),
        (Q = Vt),
        (Dt = Q);
      const zt = !0;
      function Ht(i, e = null) {
        if (null === i) return Bt.EMPTY_NODE;
        if (
          ("object" == typeof i && ".priority" in i && (e = i[".priority"]),
          p(
            null === e ||
              "string" == typeof e ||
              "number" == typeof e ||
              ("object" == typeof e && ".sv" in e),
            "Invalid priority type found: " + typeof e
          ),
          "object" !=
            typeof (i =
              "object" == typeof i && ".value" in i && null !== i[".value"]
                ? i[".value"]
                : i) || ".sv" in i)
        ) {
          var t = i;
          return new Rt(t, Ht(e));
        }
        if (i instanceof Array || !zt) {
          let r = Bt.EMPTY_NODE;
          return (
            Ce(i, (e, t) => {
              if (y(i, e) && "." !== e.substring(0, 1)) {
                const n = Ht(t);
                (!n.isLeafNode() && n.isEmpty()) ||
                  (r = r.updateImmediateChild(e, n));
              }
            }),
            r.updatePriority(Ht(e))
          );
        }
        {
          const s = [];
          let r = !1;
          if (
            (Ce(i, (e, t) => {
              if ("." !== e.substring(0, 1)) {
                const n = Ht(t);
                n.isEmpty() ||
                  ((r = r || !n.getPriority().isEmpty()), s.push(new gt(e, n)));
              }
            }),
            0 === s.length)
          )
            return Bt.EMPTY_NODE;
          var n = Mt(s, It, (e) => e.name, Et);
          if (r) {
            t = Mt(s, At.getCompare());
            return new Bt(
              n,
              Ht(e),
              new Wt({ ".priority": t }, { ".priority": At })
            );
          }
          return new Bt(n, Ht(e), Wt.Default);
        }
      }
      xt = Ht;
      class Qt extends mt {
        constructor(e) {
          super(),
            (this.indexPath_ = e),
            p(
              !ot(e) && ".priority" !== Ze(e),
              "Can't create PathIndex with empty path or .priority key"
            );
        }
        extractChild(e) {
          return e.getChild(this.indexPath_);
        }
        isDefinedOn(e) {
          return !e.getChild(this.indexPath_).isEmpty();
        }
        compare(e, t) {
          const n = this.extractChild(e.node);
          var r = this.extractChild(t.node),
            r = n.compareTo(r);
          return 0 === r ? we(e.name, t.name) : r;
        }
        makePost(e, t) {
          var n = Ht(e),
            n = Bt.EMPTY_NODE.updateChild(this.indexPath_, n);
          return new gt(t, n);
        }
        maxPost() {
          var e = Bt.EMPTY_NODE.updateChild(this.indexPath_, Vt);
          return new gt(ye, e);
        }
        toString() {
          return rt(this.indexPath_, 0).join("/");
        }
      }
      function Yt(e) {
        if (e === "" + Se) return Jt;
        var t = ke(e);
        if (null != t) return "" + (t + 1);
        const n = new Array(e.length);
        for (let i = 0; i < n.length; i++) n[i] = e.charAt(i);
        if (n.length < Zt) return n.push(Jt), n.join("");
        let r = n.length - 1;
        for (; 0 <= r && n[r] === Xt; ) r--;
        return -1 === r
          ? ye
          : ((t = n[r]),
            (t = Gt.charAt(Gt.indexOf(t) + 1)),
            (n[r] = t),
            n.slice(0, r + 1).join(""));
      }
      function Kt(e) {
        if (e === "" + Ee) return ve;
        var t = ke(e);
        if (null != t) return "" + (t - 1);
        const n = new Array(e.length);
        for (let r = 0; r < n.length; r++) n[r] = e.charAt(r);
        return n[n.length - 1] === Jt
          ? 1 === n.length
            ? "" + Se
            : (delete n[n.length - 1], n.join(""))
          : ((n[n.length - 1] = Gt.charAt(Gt.indexOf(n[n.length - 1]) - 1)),
            n.join("") + Xt.repeat(Zt - n.length));
      }
      const $t = new (class extends mt {
          compare(e, t) {
            var n = e.node.compareTo(t.node);
            return 0 === n ? we(e.name, t.name) : n;
          }
          isDefinedOn(e) {
            return !0;
          }
          indexedValueChanged(e, t) {
            return !e.equals(t);
          }
          minPost() {
            return gt.MIN;
          }
          maxPost() {
            return gt.MAX;
          }
          makePost(e, t) {
            var n = Ht(e);
            return new gt(t, n);
          }
          toString() {
            return ".value";
          }
        })(),
        Gt = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",
        Jt = "-",
        Xt = "z",
        Zt = 786,
        en = (function () {
          let s = 0;
          const o = [];
          return function (e) {
            var t = e === s;
            s = e;
            let n;
            const r = new Array(8);
            for (n = 7; 0 <= n; n--)
              (r[n] = Gt.charAt(e % 64)), (e = Math.floor(e / 64));
            p(0 === e, "Cannot push at time == 0");
            let i = r.join("");
            if (t) {
              for (n = 11; 0 <= n && 63 === o[n]; n--) o[n] = 0;
              o[n]++;
            } else
              for (n = 0; n < 12; n++) o[n] = Math.floor(64 * Math.random());
            for (n = 0; n < 12; n++) i += Gt.charAt(o[n]);
            return p(20 === i.length, "nextPushId: Length should be 20."), i;
          };
        })();
      function tn(e) {
        return { type: "value", snapshotNode: e };
      }
      function nn(e, t) {
        return { type: "child_added", snapshotNode: t, childName: e };
      }
      function rn(e, t) {
        return { type: "child_removed", snapshotNode: t, childName: e };
      }
      function sn(e, t, n) {
        return {
          type: "child_changed",
          snapshotNode: t,
          childName: e,
          oldSnap: n,
        };
      }
      class on {
        constructor(e) {
          this.index_ = e;
        }
        updateChild(e, t, n, r, i, s) {
          p(
            e.isIndexed(this.index_),
            "A node must be indexed if only a child is updated"
          );
          const o = e.getImmediateChild(t);
          return o.getChild(r).equals(n.getChild(r)) &&
            o.isEmpty() === n.isEmpty()
            ? e
            : (null != s &&
                (n.isEmpty()
                  ? e.hasChild(t)
                    ? s.trackChildChange(rn(t, o))
                    : p(
                        e.isLeafNode(),
                        "A child remove without an old child only makes sense on a leaf node"
                      )
                  : o.isEmpty()
                  ? s.trackChildChange(nn(t, n))
                  : s.trackChildChange(sn(t, n, o))),
              e.isLeafNode() && n.isEmpty()
                ? e
                : e.updateImmediateChild(t, n).withIndex(this.index_));
        }
        updateFullNode(r, n, i) {
          return (
            null != i &&
              (r.isLeafNode() ||
                r.forEachChild(At, (e, t) => {
                  n.hasChild(e) || i.trackChildChange(rn(e, t));
                }),
              n.isLeafNode() ||
                n.forEachChild(At, (e, t) => {
                  if (r.hasChild(e)) {
                    const n = r.getImmediateChild(e);
                    n.equals(t) || i.trackChildChange(sn(e, t, n));
                  } else i.trackChildChange(nn(e, t));
                })),
            n.withIndex(this.index_)
          );
        }
        updatePriority(e, t) {
          return e.isEmpty() ? Bt.EMPTY_NODE : e.updatePriority(t);
        }
        filtersNodes() {
          return !1;
        }
        getIndexedFilter() {
          return this;
        }
        getIndex() {
          return this.index_;
        }
      }
      class an {
        constructor(e) {
          (this.indexedFilter_ = new on(e.getIndex())),
            (this.index_ = e.getIndex()),
            (this.startPost_ = an.getStartPost_(e)),
            (this.endPost_ = an.getEndPost_(e));
        }
        getStartPost() {
          return this.startPost_;
        }
        getEndPost() {
          return this.endPost_;
        }
        matches(e) {
          return (
            this.index_.compare(this.getStartPost(), e) <= 0 &&
            this.index_.compare(e, this.getEndPost()) <= 0
          );
        }
        updateChild(e, t, n, r, i, s) {
          return (
            this.matches(new gt(t, n)) || (n = Bt.EMPTY_NODE),
            this.indexedFilter_.updateChild(e, t, n, r, i, s)
          );
        }
        updateFullNode(e, t, n) {
          let r = (t = t.isLeafNode() ? Bt.EMPTY_NODE : t).withIndex(
            this.index_
          );
          r = r.updatePriority(Bt.EMPTY_NODE);
          const i = this;
          return (
            t.forEachChild(At, (e, t) => {
              i.matches(new gt(e, t)) ||
                (r = r.updateImmediateChild(e, Bt.EMPTY_NODE));
            }),
            this.indexedFilter_.updateFullNode(e, r, n)
          );
        }
        updatePriority(e, t) {
          return e;
        }
        filtersNodes() {
          return !0;
        }
        getIndexedFilter() {
          return this.indexedFilter_;
        }
        getIndex() {
          return this.index_;
        }
        static getStartPost_(e) {
          if (e.hasStart()) {
            var t = e.getIndexStartName();
            return e.getIndex().makePost(e.getIndexStartValue(), t);
          }
          return e.getIndex().minPost();
        }
        static getEndPost_(e) {
          if (e.hasEnd()) {
            var t = e.getIndexEndName();
            return e.getIndex().makePost(e.getIndexEndValue(), t);
          }
          return e.getIndex().maxPost();
        }
      }
      class ln {
        constructor(e) {
          (this.rangedFilter_ = new an(e)),
            (this.index_ = e.getIndex()),
            (this.limit_ = e.getLimit()),
            (this.reverse_ = !e.isViewFromLeft());
        }
        updateChild(e, t, n, r, i, s) {
          return (
            this.rangedFilter_.matches(new gt(t, n)) || (n = Bt.EMPTY_NODE),
            e.getImmediateChild(t).equals(n)
              ? e
              : e.numChildren() < this.limit_
              ? this.rangedFilter_
                  .getIndexedFilter()
                  .updateChild(e, t, n, r, i, s)
              : this.fullLimitUpdateChild_(e, t, n, i, s)
          );
        }
        updateFullNode(e, o, t) {
          let a;
          if (o.isLeafNode() || o.isEmpty())
            a = Bt.EMPTY_NODE.withIndex(this.index_);
          else if (
            2 * this.limit_ < o.numChildren() &&
            o.isIndexed(this.index_)
          ) {
            a = Bt.EMPTY_NODE.withIndex(this.index_);
            let t;
            t = this.reverse_
              ? o.getReverseIteratorFrom(
                  this.rangedFilter_.getEndPost(),
                  this.index_
                )
              : o.getIteratorFrom(
                  this.rangedFilter_.getStartPost(),
                  this.index_
                );
            let n = 0;
            for (; t.hasNext() && n < this.limit_; ) {
              var r = t.getNext();
              let e;
              if (
                ((e = this.reverse_
                  ? this.index_.compare(this.rangedFilter_.getStartPost(), r) <=
                    0
                  : this.index_.compare(r, this.rangedFilter_.getEndPost()) <=
                    0),
                !e)
              )
                break;
              (a = a.updateImmediateChild(r.name, r.node)), n++;
            }
          } else {
            (a = o.withIndex(this.index_)),
              (a = a.updatePriority(Bt.EMPTY_NODE));
            let e, t, n, r;
            if (this.reverse_) {
              (r = a.getReverseIterator(this.index_)),
                (e = this.rangedFilter_.getEndPost()),
                (t = this.rangedFilter_.getStartPost());
              const h = this.index_.getCompare();
              n = (e, t) => h(t, e);
            } else
              (r = a.getIterator(this.index_)),
                (e = this.rangedFilter_.getStartPost()),
                (t = this.rangedFilter_.getEndPost()),
                (n = this.index_.getCompare());
            let i = 0,
              s = !1;
            for (; r.hasNext(); ) {
              var l = r.getNext();
              !s && n(e, l) <= 0 && (s = !0),
                s && i < this.limit_ && n(l, t) <= 0
                  ? i++
                  : (a = a.updateImmediateChild(l.name, Bt.EMPTY_NODE));
            }
          }
          return this.rangedFilter_.getIndexedFilter().updateFullNode(e, a, t);
        }
        updatePriority(e, t) {
          return e;
        }
        filtersNodes() {
          return !0;
        }
        getIndexedFilter() {
          return this.rangedFilter_.getIndexedFilter();
        }
        getIndex() {
          return this.index_;
        }
        fullLimitUpdateChild_(e, t, n, r, i) {
          let s;
          if (this.reverse_) {
            const d = this.index_.getCompare();
            s = (e, t) => d(t, e);
          } else s = this.index_.getCompare();
          const o = e;
          p(o.numChildren() === this.limit_, "");
          var a = new gt(t, n),
            l = this.reverse_
              ? o.getFirstChild(this.index_)
              : o.getLastChild(this.index_),
            h = this.rangedFilter_.matches(a);
          if (o.hasChild(t)) {
            var c = o.getImmediateChild(t);
            let e = r.getChildAfterChild(this.index_, l, this.reverse_);
            for (; null != e && (e.name === t || o.hasChild(e.name)); )
              e = r.getChildAfterChild(this.index_, e, this.reverse_);
            var u = null == e ? 1 : s(e, a);
            if (h && !n.isEmpty() && 0 <= u)
              return (
                null != i && i.trackChildChange(sn(t, n, c)),
                o.updateImmediateChild(t, n)
              );
            {
              null != i && i.trackChildChange(rn(t, c));
              const _ = o.updateImmediateChild(t, Bt.EMPTY_NODE);
              return null != e && this.rangedFilter_.matches(e)
                ? (null != i && i.trackChildChange(nn(e.name, e.node)),
                  _.updateImmediateChild(e.name, e.node))
                : _;
            }
          }
          return !n.isEmpty() && h && 0 <= s(l, a)
            ? (null != i &&
                (i.trackChildChange(rn(l.name, l.node)),
                i.trackChildChange(nn(t, n))),
              o
                .updateImmediateChild(t, n)
                .updateImmediateChild(l.name, Bt.EMPTY_NODE))
            : e;
        }
      }
      class hn {
        constructor() {
          (this.limitSet_ = !1),
            (this.startSet_ = !1),
            (this.startNameSet_ = !1),
            (this.startAfterSet_ = !1),
            (this.endSet_ = !1),
            (this.endNameSet_ = !1),
            (this.endBeforeSet_ = !1),
            (this.limit_ = 0),
            (this.viewFrom_ = ""),
            (this.indexStartValue_ = null),
            (this.indexStartName_ = ""),
            (this.indexEndValue_ = null),
            (this.indexEndName_ = ""),
            (this.index_ = At);
        }
        hasStart() {
          return this.startSet_;
        }
        hasStartAfter() {
          return this.startAfterSet_;
        }
        hasEndBefore() {
          return this.endBeforeSet_;
        }
        isViewFromLeft() {
          return "" === this.viewFrom_
            ? this.startSet_
            : "l" === this.viewFrom_;
        }
        getIndexStartValue() {
          return (
            p(this.startSet_, "Only valid if start has been set"),
            this.indexStartValue_
          );
        }
        getIndexStartName() {
          return (
            p(this.startSet_, "Only valid if start has been set"),
            this.startNameSet_ ? this.indexStartName_ : ve
          );
        }
        hasEnd() {
          return this.endSet_;
        }
        getIndexEndValue() {
          return (
            p(this.endSet_, "Only valid if end has been set"),
            this.indexEndValue_
          );
        }
        getIndexEndName() {
          return (
            p(this.endSet_, "Only valid if end has been set"),
            this.endNameSet_ ? this.indexEndName_ : ye
          );
        }
        hasLimit() {
          return this.limitSet_;
        }
        hasAnchoredLimit() {
          return this.limitSet_ && "" !== this.viewFrom_;
        }
        getLimit() {
          return (
            p(this.limitSet_, "Only valid if limit has been set"), this.limit_
          );
        }
        getIndex() {
          return this.index_;
        }
        loadsAllData() {
          return !(this.startSet_ || this.endSet_ || this.limitSet_);
        }
        isDefault() {
          return this.loadsAllData() && this.index_ === At;
        }
        copy() {
          const e = new hn();
          return (
            (e.limitSet_ = this.limitSet_),
            (e.limit_ = this.limit_),
            (e.startSet_ = this.startSet_),
            (e.indexStartValue_ = this.indexStartValue_),
            (e.startNameSet_ = this.startNameSet_),
            (e.indexStartName_ = this.indexStartName_),
            (e.endSet_ = this.endSet_),
            (e.indexEndValue_ = this.indexEndValue_),
            (e.endNameSet_ = this.endNameSet_),
            (e.indexEndName_ = this.indexEndName_),
            (e.index_ = this.index_),
            (e.viewFrom_ = this.viewFrom_),
            e
          );
        }
      }
      function cn(e, t, n) {
        const r = e.copy();
        return (
          (r.startSet_ = !0),
          void 0 === t && (t = null),
          (r.indexStartValue_ = t),
          null != n
            ? ((r.startNameSet_ = !0), (r.indexStartName_ = n))
            : ((r.startNameSet_ = !1), (r.indexStartName_ = "")),
          r
        );
      }
      function un(e, t, n) {
        const r = e.copy();
        return (
          (r.endSet_ = !0),
          void 0 === t && (t = null),
          (r.indexEndValue_ = t),
          void 0 !== n
            ? ((r.endNameSet_ = !0), (r.indexEndName_ = n))
            : ((r.endNameSet_ = !1), (r.indexEndName_ = "")),
          r
        );
      }
      function dn(e, t) {
        const n = e.copy();
        return (n.index_ = t), n;
      }
      function _n(e) {
        const t = {};
        if (e.isDefault()) return t;
        let n;
        return (
          (n =
            e.index_ === At
              ? "$priority"
              : e.index_ === $t
              ? "$value"
              : e.index_ === wt
              ? "$key"
              : (p(e.index_ instanceof Qt, "Unrecognized index type!"),
                e.index_.toString())),
          (t.orderBy = m(n)),
          e.startSet_ &&
            ((t.startAt = m(e.indexStartValue_)),
            e.startNameSet_ && (t.startAt += "," + m(e.indexStartName_))),
          e.endSet_ &&
            ((t.endAt = m(e.indexEndValue_)),
            e.endNameSet_ && (t.endAt += "," + m(e.indexEndName_))),
          e.limitSet_ &&
            (e.isViewFromLeft()
              ? (t.limitToFirst = e.limit_)
              : (t.limitToLast = e.limit_)),
          t
        );
      }
      function pn(t) {
        const n = {};
        if (
          (t.startSet_ &&
            ((n.sp = t.indexStartValue_),
            t.startNameSet_ && (n.sn = t.indexStartName_)),
          t.endSet_ &&
            ((n.ep = t.indexEndValue_),
            t.endNameSet_ && (n.en = t.indexEndName_)),
          t.limitSet_)
        ) {
          n.l = t.limit_;
          let e = t.viewFrom_;
          "" === e && (e = t.isViewFromLeft() ? "l" : "r"), (n.vf = e);
        }
        return t.index_ !== At && (n.i = t.index_.toString()), n;
      }
      class fn extends Ke {
        constructor(e, t, n, r) {
          super(),
            (this.repoInfo_ = e),
            (this.onDataUpdate_ = t),
            (this.authTokenProvider_ = n),
            (this.appCheckTokenProvider_ = r),
            (this.log_ = oe("p:rest:")),
            (this.listens_ = {});
        }
        reportStats(e) {
          throw new Error("Method not implemented.");
        }
        static getListenId_(e, t) {
          return void 0 !== t
            ? "tag$" + t
            : (p(
                e._queryParams.isDefault(),
                "should have a tag if it's not a default query."
              ),
              e._path.toString());
        }
        listen(e, t, r, i) {
          const s = e._path.toString();
          this.log_("Listen called for " + s + " " + e._queryIdentifier);
          const o = fn.getListenId_(e, r),
            a = {};
          this.listens_[o] = a;
          var n = _n(e._queryParams);
          this.restRequest_(s + ".json", n, (t, e) => {
            let n = e;
            if (
              (null === (t = 404 === t ? (n = null) : t) &&
                this.onDataUpdate_(s, n, !1, r),
              w(this.listens_, o) === a)
            ) {
              let e;
              (e = t
                ? 401 === t
                  ? "permission_denied"
                  : "rest_error:" + t
                : "ok"),
                i(e, null);
            }
          });
        }
        unlisten(e, t) {
          var n = fn.getListenId_(e, t);
          delete this.listens_[n];
        }
        get(e) {
          var t = _n(e._queryParams);
          const r = e._path.toString(),
            i = new d();
          return (
            this.restRequest_(r + ".json", t, (e, t) => {
              let n = t;
              null === (e = 404 === e ? (n = null) : e)
                ? (this.onDataUpdate_(r, n, !1, null), i.resolve(n))
                : i.reject(new Error(n));
            }),
            i.promise
          );
        }
        refreshAuthToken(e) {}
        restRequest_(i, s = {}, o) {
          return (
            (s.format = "export"),
            Promise.all([
              this.authTokenProvider_.getToken(!1),
              this.appCheckTokenProvider_.getToken(!1),
            ]).then(([e, t]) => {
              e && e.accessToken && (s.auth = e.accessToken),
                t && t.token && (s.ac = t.token);
              const n =
                (this.repoInfo_.secure ? "https://" : "http://") +
                this.repoInfo_.host +
                i +
                "?ns=" +
                this.repoInfo_.namespace +
                (function (e) {
                  const t = [];
                  for (const [n, r] of Object.entries(e))
                    Array.isArray(r)
                      ? r.forEach((e) => {
                          t.push(
                            encodeURIComponent(n) + "=" + encodeURIComponent(e)
                          );
                        })
                      : t.push(
                          encodeURIComponent(n) + "=" + encodeURIComponent(r)
                        );
                  return t.length ? "&" + t.join("&") : "";
                })(s);
              this.log_("Sending REST request for " + n);
              const r = new XMLHttpRequest();
              (r.onreadystatechange = () => {
                if (o && 4 === r.readyState) {
                  this.log_(
                    "REST Response for " + n + " received. status:",
                    r.status,
                    "response:",
                    r.responseText
                  );
                  let e = null;
                  if (200 <= r.status && r.status < 300) {
                    try {
                      e = g(r.responseText);
                    } catch (e) {
                      fe(
                        "Failed to parse JSON response for " +
                          n +
                          ": " +
                          r.responseText
                      );
                    }
                    o(null, e);
                  } else
                    401 !== r.status &&
                      404 !== r.status &&
                      fe(
                        "Got unsuccessful REST response for " +
                          n +
                          " Status: " +
                          r.status
                      ),
                      o(r.status);
                  o = null;
                }
              }),
                r.open("GET", n, !0),
                r.send();
            })
          );
        }
      }
      class gn {
        constructor() {
          this.rootNode_ = Bt.EMPTY_NODE;
        }
        getNode(e) {
          return this.rootNode_.getChild(e);
        }
        updateSnapshot(e, t) {
          this.rootNode_ = this.rootNode_.updateChild(e, t);
        }
      }
      function mn() {
        return { value: null, children: new Map() };
      }
      function vn(e, t, n) {
        var r;
        ot(t)
          ? ((e.value = n), e.children.clear())
          : null !== e.value
          ? (e.value = e.value.updateChild(t, n))
          : ((r = Ze(t)),
            e.children.has(r) || e.children.set(r, mn()),
            vn(e.children.get(r), (t = tt(t)), n));
      }
      function yn(e, n, r) {
        var i;
        null !== e.value
          ? r(n, e.value)
          : ((i = (e, t) => {
              yn(t, new Je(n.toString() + "/" + e), r);
            }),
            e.children.forEach((e, t) => {
              i(t, e);
            }));
      }
      class wn {
        constructor(e) {
          (this.collection_ = e), (this.last_ = null);
        }
        get() {
          var e = this.collection_.get();
          const n = Object.assign({}, e);
          return (
            this.last_ &&
              Ce(this.last_, (e, t) => {
                n[e] = n[e] - t;
              }),
            (this.last_ = e),
            n
          );
        }
      }
      class Cn {
        constructor(e, t) {
          (this.server_ = t),
            (this.statsToReport_ = {}),
            (this.statsListener_ = new wn(e));
          var n = 1e4 + 2e4 * Math.random();
          Te(this.reportStats_.bind(this), Math.floor(n));
        }
        reportStats_() {
          var e = this.statsListener_.get();
          const n = {};
          let r = !1;
          Ce(e, (e, t) => {
            0 < t && y(this.statsToReport_, e) && ((n[e] = t), (r = !0));
          }),
            r && this.server_.reportStats(n),
            Te(
              this.reportStats_.bind(this),
              Math.floor(2 * Math.random() * 3e5)
            );
        }
      }
      function bn() {
        return { fromUser: !0, fromServer: !1, queryId: null, tagged: !1 };
      }
      function Tn() {
        return { fromUser: !1, fromServer: !0, queryId: null, tagged: !1 };
      }
      function In(e) {
        return { fromUser: !1, fromServer: !0, queryId: e, tagged: !0 };
      }
      ((K = Y = Y || {})[(K.OVERWRITE = 0)] = "OVERWRITE"),
        (K[(K.MERGE = 1)] = "MERGE"),
        (K[(K.ACK_USER_WRITE = 2)] = "ACK_USER_WRITE"),
        (K[(K.LISTEN_COMPLETE = 3)] = "LISTEN_COMPLETE");
      class En {
        constructor(e, t, n) {
          (this.path = e),
            (this.affectedTree = t),
            (this.revert = n),
            (this.type = Y.ACK_USER_WRITE),
            (this.source = bn());
        }
        operationForChild(e) {
          if (ot(this.path)) {
            if (null != this.affectedTree.value)
              return (
                p(
                  this.affectedTree.children.isEmpty(),
                  "affectedTree should not have overlapping affected paths."
                ),
                this
              );
            var t = this.affectedTree.subtree(new Je(e));
            return new En(Xe(), t, this.revert);
          }
          return (
            p(
              Ze(this.path) === e,
              "operationForChild called for unrelated child."
            ),
            new En(tt(this.path), this.affectedTree, this.revert)
          );
        }
      }
      class Sn {
        constructor(e, t) {
          (this.source = e), (this.path = t), (this.type = Y.LISTEN_COMPLETE);
        }
        operationForChild(e) {
          return ot(this.path)
            ? new Sn(this.source, Xe())
            : new Sn(this.source, tt(this.path));
        }
      }
      class kn {
        constructor(e, t, n) {
          (this.source = e),
            (this.path = t),
            (this.snap = n),
            (this.type = Y.OVERWRITE);
        }
        operationForChild(e) {
          return ot(this.path)
            ? new kn(this.source, Xe(), this.snap.getImmediateChild(e))
            : new kn(this.source, tt(this.path), this.snap);
        }
      }
      class Nn {
        constructor(e, t, n) {
          (this.source = e),
            (this.path = t),
            (this.children = n),
            (this.type = Y.MERGE);
        }
        operationForChild(e) {
          if (ot(this.path)) {
            const t = this.children.subtree(new Je(e));
            return t.isEmpty()
              ? null
              : t.value
              ? new kn(this.source, Xe(), t.value)
              : new Nn(this.source, Xe(), t);
          }
          return (
            p(
              Ze(this.path) === e,
              "Can't get a merge for a child not on the path of the operation"
            ),
            new Nn(this.source, tt(this.path), this.children)
          );
        }
        toString() {
          return (
            "Operation(" +
            this.path +
            ": " +
            this.source.toString() +
            " merge: " +
            this.children.toString() +
            ")"
          );
        }
      }
      class Pn {
        constructor(e, t, n) {
          (this.node_ = e), (this.fullyInitialized_ = t), (this.filtered_ = n);
        }
        isFullyInitialized() {
          return this.fullyInitialized_;
        }
        isFiltered() {
          return this.filtered_;
        }
        isCompleteForPath(e) {
          if (ot(e)) return this.isFullyInitialized() && !this.filtered_;
          var t = Ze(e);
          return this.isCompleteForChild(t);
        }
        isCompleteForChild(e) {
          return (
            (this.isFullyInitialized() && !this.filtered_) ||
            this.node_.hasChild(e)
          );
        }
        getNode() {
          return this.node_;
        }
      }
      class Rn {
        constructor(e) {
          (this.query_ = e),
            (this.index_ = this.query_._queryParams.getIndex());
        }
      }
      function xn(n, e, t, r) {
        var i = [];
        const s = [];
        return (
          e.forEach((e) => {
            var t;
            "child_changed" === e.type &&
              n.index_.indexedValueChanged(e.oldSnap, e.snapshotNode) &&
              s.push(
                ((t = e.childName),
                {
                  type: "child_moved",
                  snapshotNode: e.snapshotNode,
                  childName: t,
                })
              );
          }),
          Dn(n, i, "child_removed", e, r, t),
          Dn(n, i, "child_added", e, r, t),
          Dn(n, i, "child_moved", s, r, t),
          Dn(n, i, "child_changed", e, r, t),
          Dn(n, i, "value", e, r, t),
          i
        );
      }
      function Dn(s, o, t, e, a, l) {
        const n = e.filter((e) => e.type === t);
        n.sort((e, t) =>
          (function (e, t, n) {
            if (null == t.childName || null == n.childName)
              throw c("Should only compare child_ events.");
            var r = new gt(t.childName, t.snapshotNode),
              i = new gt(n.childName, n.snapshotNode);
            return e.index_.compare(r, i);
          })(s, e, t)
        ),
          n.forEach((t) => {
            const n =
              ((e = s),
              (i = l),
              "value" === (r = t).type ||
                "child_removed" === r.type ||
                (r.prevName = i.getPredecessorChildName(
                  r.childName,
                  r.snapshotNode,
                  e.index_
                )),
              r);
            var e, r, i;
            a.forEach((e) => {
              e.respondsTo(t.type) && o.push(e.createEvent(n, s.query_));
            });
          });
      }
      function An(e, t) {
        return { eventCache: e, serverCache: t };
      }
      function On(e, t, n, r) {
        return An(new Pn(t, n, r), e.serverCache);
      }
      function Ln(e, t, n, r) {
        return An(e.eventCache, new Pn(t, n, r));
      }
      function Mn(e) {
        return e.eventCache.isFullyInitialized()
          ? e.eventCache.getNode()
          : null;
      }
      function Fn(e) {
        return e.serverCache.isFullyInitialized()
          ? e.serverCache.getNode()
          : null;
      }
      let qn;
      class Wn {
        constructor(e, t = ((qn = qn || new Tt(le)), qn)) {
          (this.value = e), (this.children = t);
        }
        static fromObject(e) {
          let n = new Wn(null);
          return (
            Ce(e, (e, t) => {
              n = n.set(new Je(e), t);
            }),
            n
          );
        }
        isEmpty() {
          return null === this.value && this.children.isEmpty();
        }
        findRootMostMatchingPathAndValue(e, t) {
          if (null != this.value && t(this.value))
            return { path: Xe(), value: this.value };
          if (ot(e)) return null;
          {
            var n = Ze(e);
            const i = this.children.get(n);
            if (null === i) return null;
            var r = i.findRootMostMatchingPathAndValue(tt(e), t);
            return null == r
              ? null
              : { path: st(new Je(n), r.path), value: r.value };
          }
        }
        findRootMostValueAndPath(e) {
          return this.findRootMostMatchingPathAndValue(e, () => !0);
        }
        subtree(e) {
          if (ot(e)) return this;
          {
            var t = Ze(e);
            const n = this.children.get(t);
            return null !== n ? n.subtree(tt(e)) : new Wn(null);
          }
        }
        set(e, t) {
          if (ot(e)) return new Wn(t, this.children);
          {
            var n = Ze(e);
            const i = this.children.get(n) || new Wn(null);
            var r = i.set(tt(e), t),
              r = this.children.insert(n, r);
            return new Wn(this.value, r);
          }
        }
        remove(t) {
          if (ot(t))
            return this.children.isEmpty()
              ? new Wn(null)
              : new Wn(null, this.children);
          {
            var n = Ze(t);
            const r = this.children.get(n);
            if (r) {
              const i = r.remove(tt(t));
              let e;
              return (
                (e = i.isEmpty()
                  ? this.children.remove(n)
                  : this.children.insert(n, i)),
                null === this.value && e.isEmpty()
                  ? new Wn(null)
                  : new Wn(this.value, e)
              );
            }
            return this;
          }
        }
        get(e) {
          if (ot(e)) return this.value;
          {
            var t = Ze(e);
            const n = this.children.get(t);
            return n ? n.get(tt(e)) : null;
          }
        }
        setTree(t, n) {
          if (ot(t)) return n;
          {
            var r = Ze(t);
            const i = this.children.get(r) || new Wn(null),
              s = i.setTree(tt(t), n);
            let e;
            return (
              (e = s.isEmpty()
                ? this.children.remove(r)
                : this.children.insert(r, s)),
              new Wn(this.value, e)
            );
          }
        }
        fold(e) {
          return this.fold_(Xe(), e);
        }
        fold_(n, r) {
          const i = {};
          return (
            this.children.inorderTraversal((e, t) => {
              i[e] = t.fold_(st(n, e), r);
            }),
            r(n, this.value, i)
          );
        }
        findOnPath(e, t) {
          return this.findOnPath_(e, Xe(), t);
        }
        findOnPath_(e, t, n) {
          var r = !!this.value && n(t, this.value);
          if (r) return r;
          if (ot(e)) return null;
          {
            r = Ze(e);
            const i = this.children.get(r);
            return i ? i.findOnPath_(tt(e), st(t, r), n) : null;
          }
        }
        foreachOnPath(e, t) {
          return this.foreachOnPath_(e, Xe(), t);
        }
        foreachOnPath_(e, t, n) {
          if (ot(e)) return this;
          {
            this.value && n(t, this.value);
            var r = Ze(e);
            const i = this.children.get(r);
            return i ? i.foreachOnPath_(tt(e), st(t, r), n) : new Wn(null);
          }
        }
        foreach(e) {
          this.foreach_(Xe(), e);
        }
        foreach_(n, r) {
          this.children.inorderTraversal((e, t) => {
            t.foreach_(st(n, e), r);
          }),
            this.value && r(n, this.value);
        }
        foreachChild(n) {
          this.children.inorderTraversal((e, t) => {
            t.value && n(e, t.value);
          });
        }
      }
      class Un {
        constructor(e) {
          this.writeTree_ = e;
        }
        static empty() {
          return new Un(new Wn(null));
        }
      }
      function Bn(t, n, r) {
        if (ot(n)) return new Un(new Wn(r));
        var i = t.writeTree_.findRootMostValueAndPath(n);
        if (null != i) {
          var s = i.path;
          let e = i.value;
          i = at(s, n);
          return (e = e.updateChild(i, r)), new Un(t.writeTree_.set(s, e));
        }
        (s = new Wn(r)), (s = t.writeTree_.setTree(n, s));
        return new Un(s);
      }
      function jn(e, n, t) {
        let r = e;
        return (
          Ce(t, (e, t) => {
            r = Bn(r, st(n, e), t);
          }),
          r
        );
      }
      function Vn(e, t) {
        if (ot(t)) return Un.empty();
        var n = e.writeTree_.setTree(t, new Wn(null));
        return new Un(n);
      }
      function zn(e, t) {
        return null != Hn(e, t);
      }
      function Hn(e, t) {
        var n = e.writeTree_.findRootMostValueAndPath(t);
        return null != n
          ? e.writeTree_.get(n.path).getChild(at(n.path, t))
          : null;
      }
      function Qn(e) {
        const n = [],
          t = e.writeTree_.value;
        return (
          null != t
            ? t.isLeafNode() ||
              t.forEachChild(At, (e, t) => {
                n.push(new gt(e, t));
              })
            : e.writeTree_.children.inorderTraversal((e, t) => {
                null != t.value && n.push(new gt(e, t.value));
              }),
          n
        );
      }
      function Yn(e, t) {
        if (ot(t)) return e;
        var n = Hn(e, t);
        return null != n ? new Un(new Wn(n)) : new Un(e.writeTree_.subtree(t));
      }
      function Kn(e) {
        return e.writeTree_.isEmpty();
      }
      function $n(e, t) {
        return (function r(i, e, s) {
          {
            if (null != e.value) return s.updateChild(i, e.value);
            {
              let n = null;
              return (
                e.children.inorderTraversal((e, t) => {
                  ".priority" === e
                    ? (p(
                        null !== t.value,
                        "Priority writes must always be leaf nodes"
                      ),
                      (n = t.value))
                    : (s = r(st(i, e), t, s));
                }),
                (s =
                  !s.getChild(i).isEmpty() && null !== n
                    ? s.updateChild(st(i, ".priority"), n)
                    : s)
              );
            }
          }
        })(Xe(), e.writeTree_, t);
      }
      function Gn(e, t) {
        return lr(t, e);
      }
      function Jn(t, n) {
        var e,
          r = t.allWrites.findIndex((e) => e.writeId === n);
        p(0 <= r, "removeWrite called with nonexistent writeId.");
        const i = t.allWrites[r];
        t.allWrites.splice(r, 1);
        let s = i.visible,
          o = !1,
          a = t.allWrites.length - 1;
        for (; s && 0 <= a; ) {
          var l = t.allWrites[a];
          l.visible &&
            (a >= r &&
            (function (e, t) {
              {
                if (e.snap) return ct(e.path, t);
                for (const n in e.children)
                  if (e.children.hasOwnProperty(n) && ct(st(e.path, n), t))
                    return !0;
                return !1;
              }
            })(l, i.path)
              ? (s = !1)
              : ct(i.path, l.path) && (o = !0)),
            a--;
        }
        return (
          !!s &&
          (o
            ? (((e = t).visibleWrites = Zn(e.allWrites, Xn, Xe())),
              0 < e.allWrites.length
                ? (e.lastWriteId = e.allWrites[e.allWrites.length - 1].writeId)
                : (e.lastWriteId = -1))
            : i.snap
            ? (t.visibleWrites = Vn(t.visibleWrites, i.path))
            : Ce(i.children, (e) => {
                t.visibleWrites = Vn(t.visibleWrites, st(i.path, e));
              }),
          !0)
        );
      }
      function Xn(e) {
        return e.visible;
      }
      function Zn(e, t, n) {
        let r = Un.empty();
        for (let s = 0; s < e.length; ++s) {
          const o = e[s];
          if (t(o)) {
            var i = o.path;
            let e;
            if (o.snap)
              ct(n, i)
                ? ((e = at(n, i)), (r = Bn(r, e, o.snap)))
                : ct(i, n) &&
                  ((e = at(i, n)), (r = Bn(r, Xe(), o.snap.getChild(e))));
            else {
              if (!o.children)
                throw c("WriteRecord should have .snap or .children");
              if (ct(n, i)) (e = at(n, i)), (r = jn(r, e, o.children));
              else if (ct(i, n))
                if (((e = at(i, n)), ot(e))) r = jn(r, Xe(), o.children);
                else {
                  const a = w(o.children, Ze(e));
                  a && ((i = a.getChild(tt(e))), (r = Bn(r, Xe(), i)));
                }
            }
          }
        }
        return r;
      }
      function er(e, t, n, r, i) {
        if (r || i) {
          var s = Yn(e.visibleWrites, t);
          if (!i && Kn(s)) return n;
          if (i || null != n || zn(s, Xe()))
            return $n(
              Zn(
                e.allWrites,
                function (e) {
                  return (
                    (e.visible || i) &&
                    (!r || !~r.indexOf(e.writeId)) &&
                    (ct(e.path, t) || ct(t, e.path))
                  );
                },
                t
              ),
              n || Bt.EMPTY_NODE
            );
          return null;
        }
        s = Hn(e.visibleWrites, t);
        if (null != s) return s;
        s = Yn(e.visibleWrites, t);
        return Kn(s)
          ? n
          : null != n || zn(s, Xe())
          ? $n(s, n || Bt.EMPTY_NODE)
          : null;
      }
      function tr(e, t, n, r) {
        return er(e.writeTree, e.treePath, t, n, r);
      }
      function nr(e, t) {
        return (function (e, t, n) {
          let r = Bt.EMPTY_NODE;
          const i = Hn(e.visibleWrites, t);
          if (i)
            return (
              i.isLeafNode() ||
                i.forEachChild(At, (e, t) => {
                  r = r.updateImmediateChild(e, t);
                }),
              r
            );
          if (n) {
            const s = Yn(e.visibleWrites, t);
            return (
              n.forEachChild(At, (e, t) => {
                var n = $n(Yn(s, new Je(e)), t);
                r = r.updateImmediateChild(e, n);
              }),
              Qn(s).forEach((e) => {
                r = r.updateImmediateChild(e.name, e.node);
              }),
              r
            );
          }
          return (
            Qn(Yn(e.visibleWrites, t)).forEach((e) => {
              r = r.updateImmediateChild(e.name, e.node);
            }),
            r
          );
        })(e.writeTree, e.treePath, t);
      }
      function rr(e, t, n, r) {
        return (function (e, t, n, r, i) {
          p(
            r || i,
            "Either existingEventSnap or existingServerSnap must exist"
          );
          var s = st(t, n);
          return zn(e.visibleWrites, s)
            ? null
            : Kn((s = Yn(e.visibleWrites, s)))
            ? i.getChild(n)
            : $n(s, i.getChild(n));
        })(e.writeTree, e.treePath, t, n, r);
      }
      function ir(e, t) {
        return (
          (n = e.writeTree), (t = st(e.treePath, t)), Hn(n.visibleWrites, t)
        );
        var n;
      }
      function sr(e, t, n, r, i, s) {
        return (function (e, t, n, r, i, s, o) {
          let a;
          var l = Yn(e.visibleWrites, t),
            h = Hn(l, Xe());
          if (null != h) a = h;
          else {
            if (null == n) return [];
            a = $n(l, n);
          }
          if (((a = a.withIndex(o)), a.isEmpty() || a.isLeafNode())) return [];
          {
            const c = [],
              u = o.getCompare(),
              d = s ? a.getReverseIteratorFrom(r, o) : a.getIteratorFrom(r, o);
            let e = d.getNext();
            for (; e && c.length < i; )
              0 !== u(e, r) && c.push(e), (e = d.getNext());
            return c;
          }
        })(e.writeTree, e.treePath, t, n, r, i, s);
      }
      function or(e, t, n) {
        return (
          (r = e.writeTree),
          (e = e.treePath),
          (n = n),
          (i = st(e, (t = t))),
          null != (s = Hn(r.visibleWrites, i))
            ? s
            : n.isCompleteForChild(t)
            ? $n(Yn(r.visibleWrites, i), n.getNode().getImmediateChild(t))
            : null
        );
        var r, i, s;
      }
      function ar(e, t) {
        return lr(st(e.treePath, t), e.writeTree);
      }
      function lr(e, t) {
        return { treePath: e, writeTree: t };
      }
      class hr {
        constructor() {
          this.changeMap = new Map();
        }
        trackChildChange(e) {
          var t = e.type,
            n = e.childName;
          p(
            "child_added" === t ||
              "child_changed" === t ||
              "child_removed" === t,
            "Only child changes supported for tracking"
          ),
            p(
              ".priority" !== n,
              "Only non-priority child changes can be tracked."
            );
          var r = this.changeMap.get(n);
          if (r) {
            var i = r.type;
            if ("child_added" === t && "child_removed" === i)
              this.changeMap.set(n, sn(n, e.snapshotNode, r.snapshotNode));
            else if ("child_removed" === t && "child_added" === i)
              this.changeMap.delete(n);
            else if ("child_removed" === t && "child_changed" === i)
              this.changeMap.set(n, rn(n, r.oldSnap));
            else if ("child_changed" === t && "child_added" === i)
              this.changeMap.set(n, nn(n, e.snapshotNode));
            else {
              if ("child_changed" !== t || "child_changed" !== i)
                throw c(
                  "Illegal combination of changes: " +
                    e +
                    " occurred after " +
                    r
                );
              this.changeMap.set(n, sn(n, e.snapshotNode, r.oldSnap));
            }
          } else this.changeMap.set(n, e);
        }
        getChanges() {
          return Array.from(this.changeMap.values());
        }
      }
      const cr = new (class {
        getCompleteChild(e) {
          return null;
        }
        getChildAfterChild(e, t, n) {
          return null;
        }
      })();
      class ur {
        constructor(e, t, n = null) {
          (this.writes_ = e),
            (this.viewCache_ = t),
            (this.optCompleteServerCache_ = n);
        }
        getCompleteChild(e) {
          const t = this.viewCache_.eventCache;
          if (t.isCompleteForChild(e)) return t.getNode().getImmediateChild(e);
          var n =
            null != this.optCompleteServerCache_
              ? new Pn(this.optCompleteServerCache_, !0, !1)
              : this.viewCache_.serverCache;
          return or(this.writes_, e, n);
        }
        getChildAfterChild(e, t, n) {
          var r =
              null != this.optCompleteServerCache_
                ? this.optCompleteServerCache_
                : Fn(this.viewCache_),
            r = sr(this.writes_, r, t, 1, n, e);
          return 0 === r.length ? null : r[0];
        }
      }
      function dr(e, t, n, r, i) {
        const s = new hr();
        let o, a;
        if (n.type === Y.OVERWRITE) {
          var l = n;
          o = l.source.fromUser
            ? fr(e, t, l.path, l.snap, r, i, s)
            : (p(l.source.fromServer, "Unknown source."),
              (a =
                l.source.tagged || (t.serverCache.isFiltered() && !ot(l.path))),
              pr(e, t, l.path, l.snap, r, i, a, s));
        } else if (n.type === Y.MERGE) {
          l = n;
          o = l.source.fromUser
            ? (function (r, i, s, e, o, a, l) {
                let h = i;
                return (
                  e.foreach((e, t) => {
                    var n = st(s, e);
                    gr(i, Ze(n)) && (h = fr(r, h, n, t, o, a, l));
                  }),
                  e.foreach((e, t) => {
                    var n = st(s, e);
                    gr(i, Ze(n)) || (h = fr(r, h, n, t, o, a, l));
                  }),
                  h
                );
              })(e, t, l.path, l.children, r, i, s)
            : (p(l.source.fromServer, "Unknown source."),
              (a = l.source.tagged || t.serverCache.isFiltered()),
              vr(e, t, l.path, l.children, r, i, a, s));
        } else if (n.type === Y.ACK_USER_WRITE) {
          var h = n;
          o = h.revert
            ? (function (n, r, i, s, e, o) {
                let a;
                {
                  if (null != ir(s, i)) return r;
                  {
                    var l = new ur(s, r, e);
                    const c = r.eventCache.getNode();
                    let t;
                    if (ot(i) || ".priority" === Ze(i)) {
                      let e;
                      (e = r.serverCache.isFullyInitialized()
                        ? tr(s, Fn(r))
                        : ((h = r.serverCache.getNode()),
                          p(
                            h instanceof Bt,
                            "serverChildren would be complete if leaf node"
                          ),
                          nr(s, h))),
                        (e = e),
                        (t = n.filter.updateFullNode(c, e, o));
                    } else {
                      var h = Ze(i);
                      let e = or(s, h, r.serverCache);
                      null == e &&
                        r.serverCache.isCompleteForChild(h) &&
                        (e = c.getImmediateChild(h)),
                        (t =
                          null != e
                            ? n.filter.updateChild(c, h, e, tt(i), l, o)
                            : r.eventCache.getNode().hasChild(h)
                            ? n.filter.updateChild(
                                c,
                                h,
                                Bt.EMPTY_NODE,
                                tt(i),
                                l,
                                o
                              )
                            : c),
                        t.isEmpty() &&
                          r.serverCache.isFullyInitialized() &&
                          ((a = tr(s, Fn(r))),
                          a.isLeafNode() &&
                            (t = n.filter.updateFullNode(t, a, o)));
                    }
                    return (
                      (a =
                        r.serverCache.isFullyInitialized() ||
                        null != ir(s, Xe())),
                      On(r, t, a, n.filter.filtersNodes())
                    );
                  }
                }
              })(e, t, h.path, r, i, s)
            : (function (e, t, i, n, s, o, a) {
                if (null != ir(s, i)) return t;
                const l = t.serverCache.isFiltered(),
                  h = t.serverCache;
                {
                  if (null != n.value) {
                    if (
                      (ot(i) && h.isFullyInitialized()) ||
                      h.isCompleteForPath(i)
                    )
                      return pr(e, t, i, h.getNode().getChild(i), s, o, l, a);
                    if (ot(i)) {
                      let n = new Wn(null);
                      return (
                        h.getNode().forEachChild(wt, (e, t) => {
                          n = n.set(new Je(e), t);
                        }),
                        vr(e, t, i, n, s, o, l, a)
                      );
                    }
                    return t;
                  }
                  {
                    let r = new Wn(null);
                    return (
                      n.foreach((e, t) => {
                        var n = st(i, e);
                        h.isCompleteForPath(n) &&
                          (r = r.set(e, h.getNode().getChild(n)));
                      }),
                      vr(e, t, i, r, s, o, l, a)
                    );
                  }
                }
              })(e, t, h.path, h.affectedTree, r, i, s);
        } else {
          if (n.type !== Y.LISTEN_COMPLETE)
            throw c("Unknown operation type: " + n.type);
          o = (function (e, t, n, r, i) {
            const s = t.serverCache,
              o = Ln(
                t,
                s.getNode(),
                s.isFullyInitialized() || ot(n),
                s.isFiltered()
              );
            return _r(e, o, n, r, cr, i);
          })(e, t, n.path, r, s);
        }
        h = s.getChanges();
        return (
          (function (e, t, n) {
            const r = t.eventCache;
            if (r.isFullyInitialized()) {
              var i = r.getNode().isLeafNode() || r.getNode().isEmpty();
              const s = Mn(e);
              (0 < n.length ||
                !e.eventCache.isFullyInitialized() ||
                (i && !r.getNode().equals(s)) ||
                !r.getNode().getPriority().equals(s.getPriority())) &&
                n.push(tn(Mn(t)));
            }
          })(t, o, h),
          { viewCache: o, changes: h }
        );
      }
      function _r(r, i, s, o, a, l) {
        const h = i.eventCache;
        if (null != ir(o, s)) return i;
        {
          let t, n;
          if (ot(s)) {
            var e;
            p(
              i.serverCache.isFullyInitialized(),
              "If change path is empty, we must have complete server data"
            ),
              (t = i.serverCache.isFiltered()
                ? ((e = nr(o, (e = Fn(i)) instanceof Bt ? e : Bt.EMPTY_NODE)),
                  r.filter.updateFullNode(i.eventCache.getNode(), e, l))
                : ((c = tr(o, Fn(i))),
                  r.filter.updateFullNode(i.eventCache.getNode(), c, l)));
          } else {
            var c = Ze(s);
            if (".priority" === c) {
              p(
                1 === et(s),
                "Can't have a priority with additional path components"
              );
              var u = h.getNode();
              n = i.serverCache.getNode();
              var d = rr(o, s, u, n);
              t = null != d ? r.filter.updatePriority(u, d) : h.getNode();
            } else {
              u = tt(s);
              let e;
              (e = h.isCompleteForChild(c)
                ? ((n = i.serverCache.getNode()),
                  null != (d = rr(o, s, h.getNode(), n))
                    ? h.getNode().getImmediateChild(c).updateChild(u, d)
                    : h.getNode().getImmediateChild(c))
                : or(o, c, i.serverCache)),
                (t =
                  null != e
                    ? r.filter.updateChild(h.getNode(), c, e, u, a, l)
                    : h.getNode());
            }
          }
          return On(
            i,
            t,
            h.isFullyInitialized() || ot(s),
            r.filter.filtersNodes()
          );
        }
      }
      function pr(e, t, n, r, i, s, o, a) {
        const l = t.serverCache;
        let h;
        const c = o ? e.filter : e.filter.getIndexedFilter();
        if (ot(n)) h = c.updateFullNode(l.getNode(), r, null);
        else if (c.filtersNodes() && !l.isFiltered()) {
          var u = l.getNode().updateChild(n, r);
          h = c.updateFullNode(l.getNode(), u, null);
        } else {
          var d = Ze(n);
          if (!l.isCompleteForPath(n) && 1 < et(n)) return t;
          var _ = tt(n);
          const p = l.getNode().getImmediateChild(d);
          u = p.updateChild(_, r);
          h =
            ".priority" === d
              ? c.updatePriority(l.getNode(), u)
              : c.updateChild(l.getNode(), d, u, _, cr, null);
        }
        _ = Ln(t, h, l.isFullyInitialized() || ot(n), c.filtersNodes());
        return _r(e, _, n, i, new ur(i, _, s), a);
      }
      function fr(t, n, r, i, e, s, o) {
        const a = n.eventCache;
        let l, h;
        const c = new ur(e, n, s);
        if (ot(r))
          (h = t.filter.updateFullNode(n.eventCache.getNode(), i, o)),
            (l = On(n, h, !0, t.filter.filtersNodes()));
        else {
          var u = Ze(r);
          if (".priority" === u)
            (h = t.filter.updatePriority(n.eventCache.getNode(), i)),
              (l = On(n, h, a.isFullyInitialized(), a.isFiltered()));
          else {
            var d = tt(r);
            const _ = a.getNode().getImmediateChild(u);
            let e;
            if (ot(d)) e = i;
            else {
              const p = c.getCompleteChild(u);
              e =
                null != p
                  ? ".priority" === nt(d) && p.getChild(it(d)).isEmpty()
                    ? p
                    : p.updateChild(d, i)
                  : Bt.EMPTY_NODE;
            }
            l = _.equals(e)
              ? n
              : On(
                  n,
                  t.filter.updateChild(a.getNode(), u, e, d, c, o),
                  a.isFullyInitialized(),
                  t.filter.filtersNodes()
                );
          }
        }
        return l;
      }
      function gr(e, t) {
        return e.eventCache.isCompleteForChild(t);
      }
      function mr(e, n, t) {
        return (
          t.foreach((e, t) => {
            n = n.updateChild(e, t);
          }),
          n
        );
      }
      function vr(r, i, e, t, s, o, a, l) {
        if (
          i.serverCache.getNode().isEmpty() &&
          !i.serverCache.isFullyInitialized()
        )
          return i;
        let h = i,
          n;
        n = ot(e) ? t : new Wn(null).setTree(e, t);
        const c = i.serverCache.getNode();
        return (
          n.children.inorderTraversal((e, t) => {
            var n;
            c.hasChild(e) &&
              ((n = mr(0, i.serverCache.getNode().getImmediateChild(e), t)),
              (h = pr(r, h, new Je(e), n, s, o, a, l)));
          }),
          n.children.inorderTraversal((e, t) => {
            var n = !i.serverCache.isCompleteForChild(e) && void 0 === t.value;
            c.hasChild(e) ||
              n ||
              ((n = mr(0, i.serverCache.getNode().getImmediateChild(e), t)),
              (h = pr(r, h, new Je(e), n, s, o, a, l)));
          }),
          h
        );
      }
      class yr {
        constructor(e, t) {
          (this.query_ = e), (this.eventRegistrations_ = []);
          const n = this.query_._queryParams,
            r = new on(n.getIndex()),
            i = (e = n).loadsAllData()
              ? new on(e.getIndex())
              : new (e.hasLimit() ? ln : an)(e);
          this.processor_ = { filter: i };
          const s = t.serverCache,
            o = t.eventCache;
          var a = r.updateFullNode(Bt.EMPTY_NODE, s.getNode(), null),
            l = i.updateFullNode(Bt.EMPTY_NODE, o.getNode(), null),
            a = new Pn(a, s.isFullyInitialized(), r.filtersNodes()),
            l = new Pn(l, o.isFullyInitialized(), i.filtersNodes());
          (this.viewCache_ = An(l, a)),
            (this.eventGenerator_ = new Rn(this.query_));
        }
        get query() {
          return this.query_;
        }
      }
      function wr(e) {
        return 0 === e.eventRegistrations_.length;
      }
      function Cr(n, r, i) {
        const s = [];
        if (i) {
          p(null == r, "A cancel should cancel all event registrations.");
          const o = n.query._path;
          n.eventRegistrations_.forEach((e) => {
            var t = e.createCancelEvent(i, o);
            t && s.push(t);
          });
        }
        if (r) {
          let e = [];
          for (let t = 0; t < n.eventRegistrations_.length; ++t) {
            const a = n.eventRegistrations_[t];
            if (a.matches(r)) {
              if (r.hasAnyCallback()) {
                e = e.concat(n.eventRegistrations_.slice(t + 1));
                break;
              }
            } else e.push(a);
          }
          n.eventRegistrations_ = e;
        } else n.eventRegistrations_ = [];
        return s;
      }
      function br(e, t, n, r) {
        t.type === Y.MERGE &&
          null !== t.source.queryId &&
          (p(
            Fn(e.viewCache_),
            "We should always have a full cache before handling merges"
          ),
          p(
            Mn(e.viewCache_),
            "Missing event cache, even though we have a server cache"
          ));
        const i = e.viewCache_,
          s = dr(e.processor_, i, t, n, r);
        return (
          (n = e.processor_),
          (r = s.viewCache),
          p(
            r.eventCache.getNode().isIndexed(n.filter.getIndex()),
            "Event snap not indexed"
          ),
          p(
            r.serverCache.getNode().isIndexed(n.filter.getIndex()),
            "Server snap not indexed"
          ),
          p(
            s.viewCache.serverCache.isFullyInitialized() ||
              !i.serverCache.isFullyInitialized(),
            "Once a server snap is complete, it should never go back"
          ),
          (e.viewCache_ = s.viewCache),
          Tr(e, s.changes, s.viewCache.eventCache.getNode(), null)
        );
      }
      function Tr(e, t, n, r) {
        var i = r ? [r] : e.eventRegistrations_;
        return xn(e.eventGenerator_, t, n, i);
      }
      let Ir;
      class Er {
        constructor() {
          this.views = new Map();
        }
      }
      function Sr(t, n, r, i) {
        var e = n.source.queryId;
        if (null !== e) {
          e = t.views.get(e);
          return (
            p(null != e, "SyncTree gave us an op for an invalid query."),
            br(e, n, r, i)
          );
        }
        {
          let e = [];
          for (const s of t.views.values()) e = e.concat(br(s, n, r, i));
          return e;
        }
      }
      function kr(e, n, r, i, s) {
        var o = n._queryIdentifier,
          o = e.views.get(o);
        if (o) return o;
        {
          let e = tr(r, s ? i : null),
            t = !1;
          t = !!e || ((e = i instanceof Bt ? nr(r, i) : Bt.EMPTY_NODE), !1);
          o = An(new Pn(e, t, !1), new Pn(i, s, !1));
          return new yr(n, o);
        }
      }
      function Nr(e, t, n, r, i, s) {
        var o = kr(e, t, r, i, s);
        return (
          e.views.has(t._queryIdentifier) || e.views.set(t._queryIdentifier, o),
          o.eventRegistrations_.push(n),
          (function (e, t) {
            const n = e.viewCache_.eventCache,
              r = [];
            if (!n.getNode().isLeafNode()) {
              const i = n.getNode();
              i.forEachChild(At, (e, t) => {
                r.push(nn(e, t));
              });
            }
            return (
              n.isFullyInitialized() && r.push(tn(n.getNode())),
              Tr(e, r, n.getNode(), t)
            );
          })(o, n)
        );
      }
      function Pr(e, t, n, r) {
        var i = t._queryIdentifier;
        const s = [];
        let o = [];
        var a = Or(e);
        if ("default" === i)
          for (var [l, h] of e.views.entries())
            (o = o.concat(Cr(h, n, r))),
              wr(h) &&
                (e.views.delete(l),
                h.query._queryParams.loadsAllData() || s.push(h.query));
        else {
          const c = e.views.get(i);
          c &&
            ((o = o.concat(Cr(c, n, r))),
            wr(c) &&
              (e.views.delete(i),
              c.query._queryParams.loadsAllData() || s.push(c.query)));
        }
        return (
          a &&
            !Or(e) &&
            s.push(
              (p(Ir, "Reference.ts has not been loaded"),
              new Ir(t._repo, t._path))
            ),
          { removed: s, events: o }
        );
      }
      function Rr(e) {
        const t = [];
        for (const n of e.views.values())
          n.query._queryParams.loadsAllData() || t.push(n);
        return t;
      }
      function xr(e, t) {
        let n = null;
        for (const r of e.views.values())
          n =
            n ||
            (function (e, t) {
              const n = Fn(e.viewCache_);
              return n &&
                (e.query._queryParams.loadsAllData() ||
                  (!ot(t) && !n.getImmediateChild(Ze(t)).isEmpty()))
                ? n.getChild(t)
                : null;
            })(r, t);
        return n;
      }
      function Dr(e, t) {
        const n = t._queryParams;
        if (n.loadsAllData()) return Lr(e);
        var r = t._queryIdentifier;
        return e.views.get(r);
      }
      function Ar(e, t) {
        return null != Dr(e, t);
      }
      function Or(e) {
        return null != Lr(e);
      }
      function Lr(e) {
        for (const t of e.views.values())
          if (t.query._queryParams.loadsAllData()) return t;
        return null;
      }
      let Mr;
      let Fr = 1;
      class qr {
        constructor(e) {
          (this.listenProvider_ = e),
            (this.syncPointTree_ = new Wn(null)),
            (this.pendingWriteTree_ = {
              visibleWrites: Un.empty(),
              allWrites: [],
              lastWriteId: -1,
            }),
            (this.tagToQueryMap = new Map()),
            (this.queryToTagMap = new Map());
        }
      }
      function Wr(e, t, n, r, i) {
        var s, o, a, l;
        return (
          (s = e.pendingWriteTree_),
          (o = t),
          (a = n),
          (l = r),
          (r = i),
          p(l > s.lastWriteId, "Stacking an older write on top of newer ones"),
          s.allWrites.push({
            path: o,
            snap: a,
            writeId: l,
            visible: (r = void 0 === r ? !0 : r),
          }),
          r && (s.visibleWrites = Bn(s.visibleWrites, o, a)),
          (s.lastWriteId = l),
          i ? Yr(e, new kn(bn(), t, n)) : []
        );
      }
      function Ur(e, t, n, r) {
        var i, s, o;
        (i = e.pendingWriteTree_),
          (s = t),
          (o = n),
          (r = r),
          p(r > i.lastWriteId, "Stacking an older merge on top of newer ones"),
          i.allWrites.push({ path: s, children: o, writeId: r, visible: !0 }),
          (i.visibleWrites = jn(i.visibleWrites, s, o)),
          (i.lastWriteId = r);
        var a = Wn.fromObject(n);
        return Yr(e, new Nn(bn(), t, a));
      }
      function Br(e, t, n = !1) {
        var r = (function (e, t) {
          for (let r = 0; r < e.allWrites.length; r++) {
            var n = e.allWrites[r];
            if (n.writeId === t) return n;
          }
          return null;
        })(e.pendingWriteTree_, t);
        if (Jn(e.pendingWriteTree_, t)) {
          let t = new Wn(null);
          return (
            null != r.snap
              ? (t = t.set(Xe(), !0))
              : Ce(r.children, (e) => {
                  t = t.set(new Je(e), !0);
                }),
            Yr(e, new En(r.path, t, n))
          );
        }
        return [];
      }
      function jr(e, t, n) {
        return Yr(e, new kn(Tn(), t, n));
      }
      function Vr(n, e, t, r) {
        var i = e._path,
          s = n.syncPointTree_.get(i);
        let o = [];
        if (s && ("default" === e._queryIdentifier || Ar(s, e))) {
          var a = Pr(s, e, t, r);
          0 === s.views.size && (n.syncPointTree_ = n.syncPointTree_.remove(i));
          const u = a.removed;
          o = a.events;
          (s = -1 !== u.findIndex((e) => e._queryParams.loadsAllData())),
            (a = n.syncPointTree_.findOnPath(i, (e, t) => Or(t)));
          if (s && !a) {
            const d = n.syncPointTree_.subtree(i);
            if (!d.isEmpty()) {
              var l = d.fold((e, t, r) => {
                if (t && Or(t)) return [Lr(t)];
                {
                  let n = [];
                  return (
                    t && (n = Rr(t)),
                    Ce(r, (e, t) => {
                      n = n.concat(t);
                    }),
                    n
                  );
                }
              });
              for (let e = 0; e < l.length; ++e) {
                var h = l[e],
                  c = h.query,
                  h = $r(n, h);
                n.listenProvider_.startListening(
                  ti(c),
                  Gr(n, c),
                  h.hashFn,
                  h.onComplete
                );
              }
            }
          }
          !a &&
            0 < u.length &&
            !r &&
            (s
              ? n.listenProvider_.stopListening(ti(e), null)
              : u.forEach((e) => {
                  var t = n.queryToTagMap.get(Jr(e));
                  n.listenProvider_.stopListening(ti(e), t);
                })),
            (function (e, t) {
              for (let i = 0; i < t.length; ++i) {
                const s = t[i];
                var n, r;
                s._queryParams.loadsAllData() ||
                  ((n = Jr(s)),
                  (r = e.queryToTagMap.get(n)),
                  e.queryToTagMap.delete(n),
                  e.tagToQueryMap.delete(r));
              }
            })(n, u);
        }
        return o;
      }
      function zr(e, t, n) {
        const r = t._path;
        let i = null,
          s = !1;
        e.syncPointTree_.foreachOnPath(r, (e, t) => {
          var n = at(e, r);
          (i = i || xr(t, n)), (s = s || Or(t));
        });
        let o = e.syncPointTree_.get(r);
        o
          ? ((s = s || Or(o)), (i = i || xr(o, Xe())))
          : ((o = new Er()), (e.syncPointTree_ = e.syncPointTree_.set(r, o)));
        let a;
        if (null != i) a = !0;
        else {
          (a = !1), (i = Bt.EMPTY_NODE);
          const d = e.syncPointTree_.subtree(r);
          d.foreachChild((e, t) => {
            var n = xr(t, Xe());
            n && (i = i.updateImmediateChild(e, n));
          });
        }
        var l,
          h = Ar(o, t);
        h ||
          t._queryParams.loadsAllData() ||
          ((c = Jr(t)),
          p(!e.queryToTagMap.has(c), "View does not exist, but we have a tag"),
          (l = Fr++),
          e.queryToTagMap.set(c, l),
          e.tagToQueryMap.set(l, c));
        var c = Gn(e.pendingWriteTree_, r);
        let u = Nr(o, t, n, c, i, a);
        return (
          h ||
            s ||
            ((h = Dr(o, t)),
            (u = u.concat(
              (function (t, e, n) {
                const r = e._path,
                  i = Gr(t, e),
                  s = $r(t, n),
                  o = t.listenProvider_.startListening(
                    ti(e),
                    i,
                    s.hashFn,
                    s.onComplete
                  ),
                  a = t.syncPointTree_.subtree(r);
                if (i)
                  p(
                    !Or(a.value),
                    "If we're adding a query, it shouldn't be shadowed"
                  );
                else {
                  var l = a.fold((e, t, r) => {
                    if (!ot(e) && t && Or(t)) return [Lr(t).query];
                    {
                      let n = [];
                      return (
                        t && (n = n.concat(Rr(t).map((e) => e.query))),
                        Ce(r, (e, t) => {
                          n = n.concat(t);
                        }),
                        n
                      );
                    }
                  });
                  for (let e = 0; e < l.length; ++e) {
                    var h = l[e];
                    t.listenProvider_.stopListening(ti(h), Gr(t, h));
                  }
                }
                return o;
              })(e, t, h)
            ))),
          u
        );
      }
      function Hr(e, r, t) {
        var n = e.pendingWriteTree_,
          i = e.syncPointTree_.findOnPath(r, (e, t) => {
            var n = xr(t, at(e, r));
            if (n) return n;
          });
        return er(n, r, i, t, !0);
      }
      function Qr(e, t) {
        const r = t._path;
        let i = null;
        e.syncPointTree_.foreachOnPath(r, (e, t) => {
          var n = at(e, r);
          i = i || xr(t, n);
        });
        let n = e.syncPointTree_.get(r);
        n
          ? (i = i || xr(n, Xe()))
          : ((n = new Er()), (e.syncPointTree_ = e.syncPointTree_.set(r, n)));
        var s = null != i;
        const o = s ? new Pn(i, !0, !1) : null;
        var a = Gn(e.pendingWriteTree_, t._path);
        return Mn(kr(n, t, a, s ? o.getNode() : Bt.EMPTY_NODE, s).viewCache_);
      }
      function Yr(e, t) {
        return (function t(n, r, i, s) {
          {
            if (ot(n.path)) return Kr(n, r, i, s);
            {
              const o = r.get(Xe());
              null == i && null != o && (i = xr(o, Xe()));
              let e = [];
              const a = Ze(n.path),
                l = n.operationForChild(a),
                h = r.children.get(a);
              if (h && l) {
                const c = i ? i.getImmediateChild(a) : null,
                  u = ar(s, a);
                e = e.concat(t(l, h, c, u));
              }
              return o && (e = e.concat(Sr(o, n, s, i))), e;
            }
          }
        })(t, e.syncPointTree_, null, Gn(e.pendingWriteTree_, Xe()));
      }
      function Kr(s, e, o, a) {
        var t = e.get(Xe());
        null == o && null != t && (o = xr(t, Xe()));
        let l = [];
        return (
          e.children.inorderTraversal((e, t) => {
            var n = o ? o.getImmediateChild(e) : null,
              r = ar(a, e),
              i = s.operationForChild(e);
            i && (l = l.concat(Kr(i, t, n, r)));
          }),
          t && (l = l.concat(Sr(t, s, a, o))),
          l
        );
      }
      function $r(i, t) {
        const s = t.query,
          o = Gr(i, s);
        return {
          hashFn: () => {
            const e = t.viewCache_.serverCache.getNode() || Bt.EMPTY_NODE;
            return e.hash();
          },
          onComplete: (e) => {
            if ("ok" === e)
              return o
                ? (function (e, t, n) {
                    if ((s = Xr(e, n))) {
                      var r = Zr(s),
                        i = r.path,
                        s = r.queryId,
                        r = at(i, t);
                      return ei(e, i, new Sn(In(s), r));
                    }
                    return [];
                  })(i, s._path, o)
                : ((t = i), (n = s._path), Yr(t, new Sn(Tn(), n)));
            var t,
              n,
              r = (function (e, t) {
                let n = "Unknown Error";
                "too_big" === e
                  ? (n =
                      "The data requested exceeds the maximum size that can be accessed with a single request.")
                  : "permission_denied" === e
                  ? (n =
                      "Client doesn't have permission to access the desired data.")
                  : "unavailable" === e && (n = "The service is unavailable");
                const r = new Error(e + " at " + t._path.toString() + ": " + n);
                return (r.code = e.toUpperCase()), r;
              })(e, s);
            return Vr(i, s, null, r);
          },
        };
      }
      function Gr(e, t) {
        var n = Jr(t);
        return e.queryToTagMap.get(n);
      }
      function Jr(e) {
        return e._path.toString() + "$" + e._queryIdentifier;
      }
      function Xr(e, t) {
        return e.tagToQueryMap.get(t);
      }
      function Zr(e) {
        var t = e.indexOf("$");
        return (
          p(-1 !== t && t < e.length - 1, "Bad queryKey."),
          { queryId: e.substr(t + 1), path: new Je(e.substr(0, t)) }
        );
      }
      function ei(e, t, n) {
        var r = e.syncPointTree_.get(t);
        return (
          p(r, "Missing sync point for query tag that we're tracking"),
          Sr(r, n, Gn(e.pendingWriteTree_, t), null)
        );
      }
      function ti(e) {
        return e._queryParams.loadsAllData() && !e._queryParams.isDefault()
          ? (p(Mr, "Reference.ts has not been loaded"),
            new Mr(e._repo, e._path))
          : e;
      }
      class ni {
        constructor(e) {
          this.node_ = e;
        }
        getImmediateChild(e) {
          var t = this.node_.getImmediateChild(e);
          return new ni(t);
        }
        node() {
          return this.node_;
        }
      }
      class ri {
        constructor(e, t) {
          (this.syncTree_ = e), (this.path_ = t);
        }
        getImmediateChild(e) {
          var t = st(this.path_, e);
          return new ri(this.syncTree_, t);
        }
        node() {
          return Hr(this.syncTree_, this.path_);
        }
      }
      function ii(e) {
        return (
          ((e = e || {}).timestamp = e.timestamp || new Date().getTime()), e
        );
      }
      function si(e, t, n) {
        return e && "object" == typeof e
          ? (p(".sv" in e, "Unexpected leaf node or priority contents"),
            "string" == typeof e[".sv"]
              ? oi(e[".sv"], t, n)
              : "object" == typeof e[".sv"]
              ? ai(e[".sv"], t)
              : void p(
                  !1,
                  "Unexpected server value: " + JSON.stringify(e, null, 2)
                ))
          : e;
      }
      const oi = function (e, t, n) {
          if ("timestamp" === e) return n.timestamp;
          p(!1, "Unexpected server value: " + e);
        },
        ai = function (e, t, n) {
          e.hasOwnProperty("increment") ||
            p(!1, "Unexpected server value: " + JSON.stringify(e, null, 2));
          var r = e.increment;
          "number" != typeof r && p(!1, "Unexpected increment value: " + r);
          const i = t.node();
          if (
            (p(
              null !== i && void 0 !== i,
              "Expected ChildrenNode.EMPTY_NODE for nulls"
            ),
            !i.isLeafNode())
          )
            return r;
          const s = i;
          var o = s.getValue();
          return "number" != typeof o ? r : o + r;
        },
        li = function (e, t, n, r) {
          return ci(t, new ri(n, e), r);
        },
        hi = function (e, t, n) {
          return ci(e, new ni(t), n);
        };
      function ci(e, r, i) {
        var t = e.getPriority().val(),
          n = si(t, r.getImmediateChild(".priority"), i);
        let s;
        if (e.isLeafNode()) {
          const o = e;
          t = si(o.getValue(), r, i);
          return t !== o.getValue() || n !== o.getPriority().val()
            ? new Rt(t, Ht(n))
            : e;
        }
        {
          const a = e;
          return (
            (s = a),
            n !== a.getPriority().val() && (s = s.updatePriority(new Rt(n))),
            a.forEachChild(At, (e, t) => {
              var n = ci(t, r.getImmediateChild(e), i);
              n !== t && (s = s.updateImmediateChild(e, n));
            }),
            s
          );
        }
      }
      class ui {
        constructor(e = "", t = null, n = { children: {}, childCount: 0 }) {
          (this.name = e), (this.parent = t), (this.node = n);
        }
      }
      function di(e, t) {
        let n = t instanceof Je ? t : new Je(t),
          r = e,
          i = Ze(n);
        for (; null !== i; ) {
          var s = w(r.node.children, i) || { children: {}, childCount: 0 };
          (r = new ui(i, r, s)), (n = tt(n)), (i = Ze(n));
        }
        return r;
      }
      function _i(e) {
        return e.node.value;
      }
      function pi(e, t) {
        (e.node.value = t), vi(e);
      }
      function fi(e) {
        return 0 < e.node.childCount;
      }
      function gi(n, r) {
        Ce(n.node.children, (e, t) => {
          r(new ui(e, n, t));
        });
      }
      function mi(e) {
        return new Je(null === e.parent ? e.name : mi(e.parent) + "/" + e.name);
      }
      function vi(e) {
        var t, n, r, i;
        null !== e.parent &&
          ((t = e.parent),
          (n = e.name),
          (r = (function (e) {
            return void 0 === _i(e) && !fi(e);
          })((e = e))),
          (i = y(t.node.children, n)),
          r && i
            ? (delete t.node.children[n], t.node.childCount--, vi(t))
            : r ||
              i ||
              ((t.node.children[n] = e.node), t.node.childCount++, vi(t)));
      }
      function yi(e, t, n, r) {
        (r && void 0 === t) || Di(E(e, "value"), t, n);
      }
      function wi(e, t, r, n) {
        if (!n || void 0 !== t) {
          const i = E(e, "values");
          if (!t || "object" != typeof t || Array.isArray(t))
            throw new Error(
              i + " must be an object containing the children to replace."
            );
          const s = [];
          Ce(t, (e, t) => {
            const n = new Je(e);
            if ((Di(i, t, st(r, n)), ".priority" === nt(n) && !xi(t)))
              throw new Error(
                i +
                  "contains an invalid value for '" +
                  n.toString() +
                  "', which must be a valid Firebase priority (a string, finite number, server value, or null)."
              );
            s.push(n);
          }),
            (function (t, n) {
              let r, i;
              for (r = 0; r < n.length; r++) {
                i = n[r];
                var s = rt(i);
                for (let e = 0; e < s.length; e++)
                  if ((".priority" !== s[e] || e !== s.length - 1) && !Ni(s[e]))
                    throw new Error(
                      t +
                        "contains an invalid key (" +
                        s[e] +
                        ") in path " +
                        i.toString() +
                        '. Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"'
                    );
              }
              n.sort(lt);
              let e = null;
              for (r = 0; r < n.length; r++) {
                if (((i = n[r]), null !== e && ct(e, i)))
                  throw new Error(
                    t +
                      "contains a path " +
                      e.toString() +
                      " that is ancestor of another path " +
                      i.toString()
                  );
                e = i;
              }
            })(i, s);
        }
      }
      function Ci(e, t, n) {
        if (!n || void 0 !== t) {
          if (me(t))
            throw new Error(
              E(e, "priority") +
                "is " +
                t.toString() +
                ", but must be a valid Firebase priority (a string, finite number, server value, or null)."
            );
          if (!xi(t))
            throw new Error(
              E(e, "priority") +
                "must be a valid Firebase priority (a string, finite number, server value, or null)."
            );
        }
      }
      function bi(e, t, n, r) {
        if (!((r && void 0 === n) || Ni(n)))
          throw new Error(
            E(e, t) +
              'was an invalid key = "' +
              n +
              '".  Firebase keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]").'
          );
      }
      function Ti(e, t, n, r) {
        (n = n && n.replace(/^\/*\.info(\/|$)/, "/")), Ai(e, t, n, r);
      }
      function Ii(e, t) {
        if (".info" === Ze(t))
          throw new Error(e + " failed = Can't modify data under /.info/");
      }
      const Ei = /[\[\].#$\/\u0000-\u001F\u007F]/,
        Si = /[\[\].#$\u0000-\u001F\u007F]/,
        ki = 10485760,
        Ni = function (e) {
          return "string" == typeof e && 0 !== e.length && !Ei.test(e);
        },
        Pi = function (e) {
          return "string" == typeof e && 0 !== e.length && !Si.test(e);
        },
        Ri = function (e) {
          return (e = e && e.replace(/^\/*\.info(\/|$)/, "/")), Pi(e);
        },
        xi = function (e) {
          return (
            null === e ||
            "string" == typeof e ||
            ("number" == typeof e && !me(e)) ||
            (e && "object" == typeof e && y(e, ".sv"))
          );
        },
        Di = function (o, e, t) {
          const a = t instanceof Je ? new ut(t, o) : t;
          if (void 0 === e) throw new Error(o + "contains undefined " + _t(a));
          if ("function" == typeof e)
            throw new Error(
              o +
                "contains a function " +
                _t(a) +
                " with contents = " +
                e.toString()
            );
          if (me(e))
            throw new Error(o + "contains " + e.toString() + " " + _t(a));
          if ("string" == typeof e && e.length > ki / 3 && N(e) > ki)
            throw new Error(
              o +
                "contains a string greater than " +
                ki +
                " utf8 bytes " +
                _t(a) +
                " ('" +
                e.substring(0, 50) +
                "...')"
            );
          if (e && "object" == typeof e) {
            let i = !1,
              s = !1;
            if (
              (Ce(e, (e, t) => {
                if (".value" === e) i = !0;
                else if (".priority" !== e && ".sv" !== e && ((s = !0), !Ni(e)))
                  throw new Error(
                    o +
                      " contains an invalid key (" +
                      e +
                      ") " +
                      _t(a) +
                      '.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"'
                  );
                var n, r;
                (n = a),
                  (e = e),
                  0 < n.parts_.length && (n.byteLength_ += 1),
                  n.parts_.push(e),
                  (n.byteLength_ += N(e)),
                  dt(n),
                  Di(o, t, a),
                  (t = a),
                  (r = t.parts_.pop()),
                  (t.byteLength_ -= N(r)),
                  0 < t.parts_.length && --t.byteLength_;
              }),
              i && s)
            )
              throw new Error(
                o +
                  ' contains ".value" child ' +
                  _t(a) +
                  " in addition to actual children."
              );
          }
        },
        Ai = function (e, t, n, r) {
          if (!((r && void 0 === n) || Pi(n)))
            throw new Error(
              E(e, t) +
                'was an invalid path = "' +
                n +
                '". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"'
            );
        },
        Oi = function (e, t) {
          var n = t.path.toString();
          if (
            "string" != typeof t.repoInfo.host ||
            0 === t.repoInfo.host.length ||
            (!Ni(t.repoInfo.namespace) &&
              "localhost" !== t.repoInfo.host.split(":")[0]) ||
            (0 !== n.length && !Ri(n))
          )
            throw new Error(
              E(e, "url") +
                'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".'
            );
        };
      class Li {
        constructor() {
          (this.eventLists_ = []), (this.recursionDepth_ = 0);
        }
      }
      function Mi(e, t) {
        let n = null;
        for (let i = 0; i < t.length; i++) {
          const s = t[i];
          var r = s.getPath();
          null === n || ht(r, n.path) || (e.eventLists_.push(n), (n = null)),
            null === n && (n = { events: [], path: r }),
            n.events.push(s);
        }
        n && e.eventLists_.push(n);
      }
      function Fi(e, t, n) {
        Mi(e, n), Wi(e, (e) => ht(e, t));
      }
      function qi(e, t, n) {
        Mi(e, n), Wi(e, (e) => ct(e, t) || ct(t, e));
      }
      function Wi(e, t) {
        e.recursionDepth_++;
        let n = !0;
        for (let i = 0; i < e.eventLists_.length; i++) {
          var r = e.eventLists_[i];
          r &&
            (t(r.path)
              ? ((function (e) {
                  for (let n = 0; n < e.events.length; n++) {
                    const r = e.events[n];
                    var t;
                    null !== r &&
                      ((e.events[n] = null),
                      (t = r.getEventRunner()),
                      ie && _e("event: " + r.toString()),
                      Ne(t));
                  }
                })(e.eventLists_[i]),
                (e.eventLists_[i] = null))
              : (n = !1));
        }
        n && (e.eventLists_ = []), e.recursionDepth_--;
      }
      const Ui = "repo_interrupt",
        Bi = 25;
      class ji {
        constructor(e, t, n, r) {
          (this.repoInfo_ = e),
            (this.forceRestClient_ = t),
            (this.authTokenProvider_ = n),
            (this.appCheckProvider_ = r),
            (this.dataUpdateCount = 0),
            (this.statsListener_ = null),
            (this.eventQueue_ = new Li()),
            (this.nextWriteId_ = 1),
            (this.interceptServerDataCallback_ = null),
            (this.onDisconnect_ = mn()),
            (this.transactionQueueTree_ = new ui()),
            (this.persistentConnection_ = null),
            (this.key = this.repoInfo_.toURLString());
        }
        toString() {
          return (
            (this.repoInfo_.secure ? "https://" : "http://") +
            this.repoInfo_.host
          );
        }
      }
      function Vi(o, e, t) {
        if (
          ((o.stats_ = Ue(o.repoInfo_)),
          o.forceRestClient_ ||
            (function () {
              const e =
                ("object" == typeof window &&
                  window.navigator &&
                  window.navigator.userAgent) ||
                "";
              return (
                0 <=
                e.search(
                  /googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i
                )
              );
            })())
        )
          (o.server_ = new fn(
            o.repoInfo_,
            (e, t, n, r) => {
              Qi(o, e, t, n, r);
            },
            o.authTokenProvider_,
            o.appCheckProvider_
          )),
            setTimeout(() => Yi(o, !0), 0);
        else {
          if (null != t) {
            if ("object" != typeof t)
              throw new Error(
                "Only objects are supported for option databaseAuthVariableOverride"
              );
            try {
              m(t);
            } catch (e) {
              throw new Error("Invalid authOverride provided: " + e);
            }
          }
          (o.persistentConnection_ = new ft(
            o.repoInfo_,
            e,
            (e, t, n, r) => {
              Qi(o, e, t, n, r);
            },
            (e) => {
              Yi(o, e);
            },
            (e) => {
              var n;
              (n = o),
                Ce(e, (e, t) => {
                  Ki(n, e, t);
                });
            },
            o.authTokenProvider_,
            o.appCheckProvider_,
            t
          )),
            (o.server_ = o.persistentConnection_);
        }
        var n;
        o.authTokenProvider_.addTokenChangeListener((e) => {
          o.server_.refreshAuthToken(e);
        }),
          o.appCheckProvider_.addTokenChangeListener((e) => {
            o.server_.refreshAppCheckToken(e.token);
          }),
          (o.statsReporter_ =
            ((e = o.repoInfo_),
            (t = () => new Cn(o.stats_, o.server_)),
            (n = e.toString()),
            We[n] || (We[n] = t()),
            We[n])),
          (o.infoData_ = new gn()),
          (o.infoSyncTree_ = new qr({
            startListening: (e, t, n, r) => {
              let i = [];
              const s = o.infoData_.getNode(e._path);
              return (
                s.isEmpty() ||
                  ((i = jr(o.infoSyncTree_, e._path, s)),
                  setTimeout(() => {
                    r("ok");
                  }, 0)),
                i
              );
            },
            stopListening: () => {},
          })),
          Ki(o, "connected", !1),
          (o.serverSyncTree_ = new qr({
            startListening: (r, e, t, i) => (
              o.server_.listen(r, t, e, (e, t) => {
                var n = i(e, t);
                qi(o.eventQueue_, r._path, n);
              }),
              []
            ),
            stopListening: (e, t) => {
              o.server_.unlisten(e, t);
            },
          }));
      }
      function zi(e) {
        const t = e.infoData_.getNode(new Je(".info/serverTimeOffset"));
        var n = t.val() || 0;
        return new Date().getTime() + n;
      }
      function Hi(e) {
        return ii({ timestamp: zi(e) });
      }
      function Qi(e, t, n, r, i) {
        e.dataUpdateCount++;
        var s,
          o,
          a = new Je(t);
        n = e.interceptServerDataCallback_
          ? e.interceptServerDataCallback_(t, n)
          : n;
        let l = [];
        l = i
          ? r
            ? ((s = b(n, (e) => Ht(e))),
              (function (e, t, n, r) {
                if ((a = Xr(e, r))) {
                  var i = Zr(a),
                    s = i.path,
                    o = i.queryId,
                    a = at(s, t),
                    i = Wn.fromObject(n);
                  return ei(e, s, new Nn(In(o), a, i));
                }
                return [];
              })(e.serverSyncTree_, a, s, i))
            : ((s = Ht(n)),
              (function (e, t, n, r) {
                if (null == (s = Xr(e, r))) return [];
                var i = (o = Zr(s)).path,
                  s = o.queryId,
                  o = at(i, t);
                return ei(e, i, new kn(In(s), o, n));
              })(e.serverSyncTree_, a, s, i))
          : r
          ? ((o = b(n, (e) => Ht(e))),
            (t = e.serverSyncTree_),
            (i = a),
            (r = o),
            (o = Wn.fromObject(r)),
            Yr(t, new Nn(Tn(), i, o)))
          : ((o = Ht(n)), jr(e.serverSyncTree_, a, o));
        let h = a;
        0 < l.length && (h = ss(e, a)), qi(e.eventQueue_, h, l);
      }
      function Yi(e, t) {
        Ki(e, "connected", t),
          !1 === t &&
            (function (r) {
              ts(r, "onDisconnectEvents");
              const i = Hi(r),
                s = mn();
              yn(r.onDisconnect_, Xe(), (e, t) => {
                var n = li(e, t, r.serverSyncTree_, i);
                vn(s, e, n);
              });
              let o = [];
              yn(s, Xe(), (e, t) => {
                o = o.concat(jr(r.serverSyncTree_, e, t));
                var n = hs(r, e);
                ss(r, n);
              }),
                (r.onDisconnect_ = mn()),
                qi(r.eventQueue_, Xe(), o);
            })(e);
      }
      function Ki(e, t, n) {
        var r = new Je("/.info/" + t),
          i = Ht(n);
        e.infoData_.updateSnapshot(r, i);
        i = jr(e.infoSyncTree_, r, i);
        qi(e.eventQueue_, r, i);
      }
      function $i(e) {
        return e.nextWriteId_++;
      }
      function Gi(r, i, e, t, s) {
        ts(r, "set", { path: i.toString(), value: e, priority: t });
        var n = Hi(r);
        const o = Ht(e, t);
        var a = Hr(r.serverSyncTree_, i),
          n = hi(o, a, n);
        const l = $i(r);
        n = Wr(r.serverSyncTree_, i, n, l, !0);
        Mi(r.eventQueue_, n),
          r.server_.put(i.toString(), o.val(!0), (e, t) => {
            var n = "ok" === e;
            n || fe("set at " + i + " failed: " + e);
            n = Br(r.serverSyncTree_, l, !n);
            qi(r.eventQueue_, i, n), ns(0, s, e, t);
          });
        n = hs(r, i);
        ss(r, n), qi(r.eventQueue_, n, []);
      }
      function Ji(n, r, i) {
        n.server_.onDisconnectCancel(r.toString(), (e, t) => {
          "ok" === e &&
            !(function e(n, t) {
              if (ot(t)) return (n.value = null), n.children.clear(), !0;
              if (null !== n.value) {
                if (n.value.isLeafNode()) return !1;
                {
                  const i = n.value;
                  return (
                    (n.value = null),
                    i.forEachChild(At, (e, t) => {
                      vn(n, new Je(e), t);
                    }),
                    e(n, t)
                  );
                }
              }
              if (0 < n.children.size) {
                var r = Ze(t);
                return (
                  (t = tt(t)),
                  n.children.has(r) &&
                    e(n.children.get(r), t) &&
                    n.children.delete(r),
                  0 === n.children.size
                );
              }
              return !0;
            })(n.onDisconnect_, r),
            ns(0, i, e, t);
        });
      }
      function Xi(n, r, e, i) {
        const s = Ht(e);
        n.server_.onDisconnectPut(r.toString(), s.val(!0), (e, t) => {
          "ok" === e && vn(n.onDisconnect_, r, s), ns(0, i, e, t);
        });
      }
      function Zi(e, t, n) {
        let r;
        (r =
          ".info" === Ze(t._path)
            ? Vr(e.infoSyncTree_, t, n)
            : Vr(e.serverSyncTree_, t, n)),
          Fi(e.eventQueue_, t._path, r);
      }
      function es(e) {
        e.persistentConnection_ && e.persistentConnection_.interrupt(Ui);
      }
      function ts(e, ...t) {
        let n = "";
        e.persistentConnection_ && (n = e.persistentConnection_.id + ":"),
          _e(n, ...t);
      }
      function ns(e, r, i, s) {
        r &&
          Ne(() => {
            if ("ok" === i) r(null);
            else {
              var t = (i || "error").toUpperCase();
              let e = t;
              s && (e += ": " + s);
              const n = new Error(e);
              (n.code = t), r(n);
            }
          });
      }
      function rs(e, t, n) {
        return Hr(e.serverSyncTree_, t, n) || Bt.EMPTY_NODE;
      }
      function is(t, e = t.transactionQueueTree_) {
        if ((e || ls(t, e), _i(e))) {
          const n = as(t, e);
          p(0 < n.length, "Sending zero length transaction queue"),
            n.every((e) => 0 === e.status) &&
              (function (i, s, o) {
                const e = o.map((e) => e.currentWriteId),
                  t = rs(i, s, e);
                let n = t;
                var r = t.hash();
                for (let c = 0; c < o.length; c++) {
                  const u = o[c];
                  p(
                    0 === u.status,
                    "tryToSendTransactionQueue_: items in queue should all be run."
                  ),
                    (u.status = 1),
                    u.retryCount++;
                  var a = at(s, u.path);
                  n = n.updateChild(a, u.currentOutputSnapshotRaw);
                }
                const l = n.val(!0),
                  h = s;
                i.server_.put(
                  h.toString(),
                  l,
                  (t) => {
                    ts(i, "transaction put response", {
                      path: h.toString(),
                      status: t,
                    });
                    let n = [];
                    if ("ok" === t) {
                      const r = [];
                      for (let e = 0; e < o.length; e++)
                        (o[e].status = 2),
                          (n = n.concat(
                            Br(i.serverSyncTree_, o[e].currentWriteId)
                          )),
                          o[e].onComplete &&
                            r.push(() =>
                              o[e].onComplete(
                                null,
                                !0,
                                o[e].currentOutputSnapshotResolved
                              )
                            ),
                          o[e].unwatcher();
                      ls(i, di(i.transactionQueueTree_, s)),
                        is(i, i.transactionQueueTree_),
                        qi(i.eventQueue_, s, n);
                      for (let t = 0; t < r.length; t++) Ne(r[t]);
                    } else {
                      if ("datastale" === t)
                        for (let e = 0; e < o.length; e++)
                          3 === o[e].status
                            ? (o[e].status = 4)
                            : (o[e].status = 0);
                      else {
                        fe("transaction at " + h.toString() + " failed: " + t);
                        for (let e = 0; e < o.length; e++)
                          (o[e].status = 4), (o[e].abortReason = t);
                      }
                      ss(i, s);
                    }
                  },
                  r
                );
              })(t, mi(e), n);
        } else
          fi(e) &&
            gi(e, (e) => {
              is(t, e);
            });
      }
      function ss(e, t) {
        var n = os(e, t),
          r = mi(n);
        return (
          (function (i, s, o) {
            if (0 !== s.length) {
              const h = [];
              let n = [];
              const t = s.filter((e) => 0 === e.status),
                c = t.map((e) => e.currentWriteId);
              for (let r = 0; r < s.length; r++) {
                const u = s[r];
                var a = at(o, u.path);
                let e = !1,
                  t;
                if (
                  (p(
                    null !== a,
                    "rerunTransactionsUnderNode_: relativePath should not be null."
                  ),
                  4 === u.status)
                )
                  (e = !0),
                    (t = u.abortReason),
                    (n = n.concat(Br(i.serverSyncTree_, u.currentWriteId, !0)));
                else if (0 === u.status)
                  if (u.retryCount >= Bi)
                    (e = !0),
                      (t = "maxretry"),
                      (n = n.concat(
                        Br(i.serverSyncTree_, u.currentWriteId, !0)
                      ));
                  else {
                    const d = rs(i, u.path, c);
                    u.currentInputSnapshot = d;
                    var l = s[r].update(d.val());
                    if (void 0 !== l) {
                      Di("transaction failed: Data returned ", l, u.path);
                      let e = Ht(l);
                      ("object" == typeof l &&
                        null != l &&
                        y(l, ".priority")) ||
                        (e = e.updatePriority(d.getPriority()));
                      (a = u.currentWriteId), (l = Hi(i)), (l = hi(e, d, l));
                      (u.currentOutputSnapshotRaw = e),
                        (u.currentOutputSnapshotResolved = l),
                        (u.currentWriteId = $i(i)),
                        c.splice(c.indexOf(a), 1),
                        (n = n.concat(
                          Wr(
                            i.serverSyncTree_,
                            u.path,
                            l,
                            u.currentWriteId,
                            u.applyLocally
                          )
                        )),
                        (n = n.concat(Br(i.serverSyncTree_, a, !0)));
                    } else
                      (e = !0),
                        (t = "nodata"),
                        (n = n.concat(
                          Br(i.serverSyncTree_, u.currentWriteId, !0)
                        ));
                  }
                qi(i.eventQueue_, o, n),
                  (n = []),
                  e &&
                    ((s[r].status = 2),
                    (function (e) {
                      setTimeout(e, Math.floor(0));
                    })(s[r].unwatcher),
                    s[r].onComplete &&
                      ("nodata" === t
                        ? h.push(() =>
                            s[r].onComplete(null, !1, s[r].currentInputSnapshot)
                          )
                        : h.push(() =>
                            s[r].onComplete(new Error(t), !1, null)
                          )));
              }
              ls(i, i.transactionQueueTree_);
              for (let e = 0; e < h.length; e++) Ne(h[e]);
              is(i, i.transactionQueueTree_);
            }
          })(e, as(e, n), r),
          r
        );
      }
      function os(e, t) {
        let n,
          r = e.transactionQueueTree_;
        for (n = Ze(t); null !== n && void 0 === _i(r); )
          (r = di(r, n)), (t = tt(t)), (n = Ze(t));
        return r;
      }
      function as(e, t) {
        const n = [];
        return (
          (function t(n, e, r) {
            const i = _i(e);
            if (i) for (let e = 0; e < i.length; e++) r.push(i[e]);
            gi(e, (e) => {
              t(n, e, r);
            });
          })(e, t, n),
          n.sort((e, t) => e.order - t.order),
          n
        );
      }
      function ls(t, n) {
        const r = _i(n);
        if (r) {
          let e = 0;
          for (let t = 0; t < r.length; t++)
            2 !== r[t].status && ((r[e] = r[t]), e++);
          (r.length = e), pi(n, 0 < r.length ? r : void 0);
        }
        gi(n, (e) => {
          ls(t, e);
        });
      }
      function hs(t, e) {
        var n = mi(os(t, e)),
          r = di(t.transactionQueueTree_, e);
        return (
          (function (e, t, n) {
            let r = n ? e : e.parent;
            for (; null !== r; ) {
              if (t(r)) return;
              r = r.parent;
            }
          })(r, (e) => {
            cs(t, e);
          }),
          cs(t, r),
          (function t(e, n, r, i) {
            r && !i && n(e),
              gi(e, (e) => {
                t(e, n, !0, i);
              }),
              r && i && n(e);
          })(r, (e) => {
            cs(t, e);
          }),
          n
        );
      }
      function cs(i, s) {
        const o = _i(s);
        if (o) {
          const a = [];
          let e = [],
            t = -1;
          for (let n = 0; n < o.length; n++)
            3 === o[n].status ||
              (1 === o[n].status
                ? (p(
                    t === n - 1,
                    "All SENT items should be at beginning of queue."
                  ),
                  (t = n),
                  (o[n].status = 3),
                  (o[n].abortReason = "set"))
                : (p(
                    0 === o[n].status,
                    "Unexpected transaction status in abort"
                  ),
                  o[n].unwatcher(),
                  (e = e.concat(
                    Br(i.serverSyncTree_, o[n].currentWriteId, !0)
                  )),
                  o[n].onComplete &&
                    a.push(
                      o[n].onComplete.bind(null, new Error("set"), !1, null)
                    )));
          -1 === t ? pi(s, void 0) : (o.length = t + 1),
            qi(i.eventQueue_, mi(s), e);
          for (let r = 0; r < a.length; r++) Ne(a[r]);
        }
      }
      const us = function (e, t) {
          var n = ds(e),
            r = n.namespace;
          "firebase.com" === n.domain &&
            pe(
              n.host +
                " is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"
            ),
            (r && "undefined" !== r) ||
              "localhost" === n.domain ||
              pe(
                "Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"
              ),
            n.secure || ge();
          var i = "ws" === n.scheme || "wss" === n.scheme;
          return {
            repoInfo: new Le(n.host, n.secure, r, i, t, "", r !== n.subdomain),
            path: new Je(n.pathString),
          };
        },
        ds = function (r) {
          let i = "",
            s = "",
            o = "",
            a = "",
            l = "",
            h = !0,
            c = "https",
            u = 443;
          if ("string" == typeof r) {
            let e = r.indexOf("//");
            0 <= e && ((c = r.substring(0, e - 1)), (r = r.substring(e + 2)));
            let t = r.indexOf("/");
            -1 === t && (t = r.length);
            let n = r.indexOf("?");
            -1 === n && (n = r.length),
              (i = r.substring(0, Math.min(t, n))),
              t < n &&
                (a = (function (e) {
                  let t = "";
                  var n = e.split("/");
                  for (let r = 0; r < n.length; r++)
                    if (0 < n[r].length) {
                      let e = n[r];
                      try {
                        e = decodeURIComponent(e.replace(/\+/g, " "));
                      } catch (e) {}
                      t += "/" + e;
                    }
                  return t;
                })(r.substring(t, n)));
            var d,
              _ = (function (e) {
                const t = {};
                for (const r of (e =
                  "?" === e.charAt(0) ? e.substring(1) : e).split("&")) {
                  var n;
                  0 !== r.length &&
                    (2 === (n = r.split("=")).length
                      ? (t[decodeURIComponent(n[0])] = decodeURIComponent(n[1]))
                      : fe(`Invalid query segment '${r}' in query '${e}'`));
                }
                return t;
              })(r.substring(Math.min(r.length, n)));
            (e = i.indexOf(":")),
              0 <= e
                ? ((h = "https" === c || "wss" === c),
                  (u = parseInt(i.substring(e + 1), 10)))
                : (e = i.length);
            const p = i.slice(0, e);
            "localhost" === p.toLowerCase()
              ? (s = "localhost")
              : p.split(".").length <= 2
              ? (s = p)
              : ((d = i.indexOf(".")),
                (o = i.substring(0, d).toLowerCase()),
                (s = i.substring(d + 1)),
                (l = o)),
              "ns" in _ && (l = _.ns);
          }
          return {
            host: i,
            port: u,
            domain: s,
            subdomain: o,
            secure: h,
            scheme: c,
            pathString: a,
            namespace: l,
          };
        };
      class _s {
        constructor(e, t, n, r) {
          (this.eventType = e),
            (this.eventRegistration = t),
            (this.snapshot = n),
            (this.prevName = r);
        }
        getPath() {
          var e = this.snapshot.ref;
          return ("value" === this.eventType ? e : e.parent)._path;
        }
        getEventType() {
          return this.eventType;
        }
        getEventRunner() {
          return this.eventRegistration.getEventRunner(this);
        }
        toString() {
          return (
            this.getPath().toString() +
            ":" +
            this.eventType +
            ":" +
            m(this.snapshot.exportVal())
          );
        }
      }
      class ps {
        constructor(e, t, n) {
          (this.eventRegistration = e), (this.error = t), (this.path = n);
        }
        getPath() {
          return this.path;
        }
        getEventType() {
          return "cancel";
        }
        getEventRunner() {
          return this.eventRegistration.getEventRunner(this);
        }
        toString() {
          return this.path.toString() + ":cancel";
        }
      }
      class fs {
        constructor(e, t) {
          (this.snapshotCallback = e), (this.cancelCallback = t);
        }
        onValue(e, t) {
          this.snapshotCallback.call(null, e, t);
        }
        onCancel(e) {
          return (
            p(
              this.hasCancelCallback,
              "Raising a cancel event on a listener with no cancel callback"
            ),
            this.cancelCallback.call(null, e)
          );
        }
        get hasCancelCallback() {
          return !!this.cancelCallback;
        }
        matches(e) {
          return (
            this.snapshotCallback === e.snapshotCallback ||
            (void 0 !== this.snapshotCallback.userCallback &&
              this.snapshotCallback.userCallback ===
                e.snapshotCallback.userCallback &&
              this.snapshotCallback.context === e.snapshotCallback.context)
          );
        }
      }
      class gs {
        constructor(e, t) {
          (this._repo = e), (this._path = t);
        }
        cancel() {
          const e = new d();
          return (
            Ji(
              this._repo,
              this._path,
              e.wrapCallback(() => {})
            ),
            e.promise
          );
        }
        remove() {
          Ii("OnDisconnect.remove", this._path);
          const e = new d();
          return (
            Xi(
              this._repo,
              this._path,
              null,
              e.wrapCallback(() => {})
            ),
            e.promise
          );
        }
        set(e) {
          Ii("OnDisconnect.set", this._path),
            yi("OnDisconnect.set", e, this._path, !1);
          const t = new d();
          return (
            Xi(
              this._repo,
              this._path,
              e,
              t.wrapCallback(() => {})
            ),
            t.promise
          );
        }
        setWithPriority(e, t) {
          Ii("OnDisconnect.setWithPriority", this._path),
            yi("OnDisconnect.setWithPriority", e, this._path, !1),
            Ci("OnDisconnect.setWithPriority", t, !1);
          const n = new d();
          return (
            (function (n, r, e, t, i) {
              const s = Ht(e, t);
              n.server_.onDisconnectPut(r.toString(), s.val(!0), (e, t) => {
                "ok" === e && vn(n.onDisconnect_, r, s), ns(0, i, e, t);
              });
            })(
              this._repo,
              this._path,
              e,
              t,
              n.wrapCallback(() => {})
            ),
            n.promise
          );
        }
        update(e) {
          Ii("OnDisconnect.update", this._path),
            wi("OnDisconnect.update", e, this._path, !1);
          const t = new d();
          return (
            (function (r, i, n, s) {
              if (C(n))
                return (
                  _e(
                    "onDisconnect().update() called with empty data.  Don't do anything."
                  ),
                  ns(0, s, "ok", void 0)
                );
              r.server_.onDisconnectMerge(i.toString(), n, (e, t) => {
                "ok" === e &&
                  Ce(n, (e, t) => {
                    var n = Ht(t);
                    vn(r.onDisconnect_, st(i, e), n);
                  }),
                  ns(0, s, e, t);
              });
            })(
              this._repo,
              this._path,
              e,
              t.wrapCallback(() => {})
            ),
            t.promise
          );
        }
      }
      class ms {
        constructor(e, t, n, r) {
          (this._repo = e),
            (this._path = t),
            (this._queryParams = n),
            (this._orderByCalled = r);
        }
        get key() {
          return ot(this._path) ? null : nt(this._path);
        }
        get ref() {
          return new Cs(this._repo, this._path);
        }
        get _queryIdentifier() {
          var e = pn(this._queryParams),
            e = ce(e);
          return "{}" === e ? "default" : e;
        }
        get _queryObject() {
          return pn(this._queryParams);
        }
        isEqual(e) {
          if (!((e = P(e)) instanceof ms)) return !1;
          var t = this._repo === e._repo,
            n = ht(this._path, e._path),
            r = this._queryIdentifier === e._queryIdentifier;
          return t && n && r;
        }
        toJSON() {
          return this.toString();
        }
        toString() {
          return (
            this._repo.toString() +
            (function (e) {
              let t = "";
              for (let n = e.pieceNum_; n < e.pieces_.length; n++)
                "" !== e.pieces_[n] &&
                  (t += "/" + encodeURIComponent(String(e.pieces_[n])));
              return t || "/";
            })(this._path)
          );
        }
      }
      function vs(e, t) {
        if (!0 === e._orderByCalled)
          throw new Error(t + ": You can't combine multiple orderBy calls.");
      }
      function ys(e) {
        let t = null,
          n = null;
        if (
          (e.hasStart() && (t = e.getIndexStartValue()),
          e.hasEnd() && (n = e.getIndexEndValue()),
          e.getIndex() === wt)
        ) {
          var r =
              "Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().",
            i =
              "Query: When ordering by key, the argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() must be a string.";
          if (e.hasStart()) {
            if (e.getIndexStartName() !== ve) throw new Error(r);
            if ("string" != typeof t) throw new Error(i);
          }
          if (e.hasEnd()) {
            if (e.getIndexEndName() !== ye) throw new Error(r);
            if ("string" != typeof n) throw new Error(i);
          }
        } else if (e.getIndex() === At) {
          if ((null != t && !xi(t)) || (null != n && !xi(n)))
            throw new Error(
              "Query: When ordering by priority, the first argument passed to startAt(), startAfter() endAt(), endBefore(), or equalTo() must be a valid priority value (null, a number, or a string)."
            );
        } else if (
          (p(
            e.getIndex() instanceof Qt || e.getIndex() === $t,
            "unknown index type."
          ),
          (null != t && "object" == typeof t) ||
            (null != n && "object" == typeof n))
        )
          throw new Error(
            "Query: First argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() cannot be an object."
          );
      }
      function ws(e) {
        if (e.hasStart() && e.hasEnd() && e.hasLimit() && !e.hasAnchoredLimit())
          throw new Error(
            "Query: Can't combine startAt(), startAfter(), endAt(), endBefore(), and limit(). Use limitToFirst() or limitToLast() instead."
          );
      }
      class Cs extends ms {
        constructor(e, t) {
          super(e, t, new hn(), !1);
        }
        get parent() {
          var e = it(this._path);
          return null === e ? null : new Cs(this._repo, e);
        }
        get root() {
          let e = this;
          for (; null !== e.parent; ) e = e.parent;
          return e;
        }
      }
      class bs {
        constructor(e, t, n) {
          (this._node = e), (this.ref = t), (this._index = n);
        }
        get priority() {
          return this._node.getPriority().val();
        }
        get key() {
          return this.ref.key;
        }
        get size() {
          return this._node.numChildren();
        }
        child(e) {
          var t = new Je(e),
            n = Es(this.ref, e);
          return new bs(this._node.getChild(t), n, At);
        }
        exists() {
          return !this._node.isEmpty();
        }
        exportVal() {
          return this._node.val(!0);
        }
        forEach(n) {
          if (this._node.isLeafNode()) return !1;
          const e = this._node;
          return !!e.forEachChild(this._index, (e, t) =>
            n(new bs(t, Es(this.ref, e), At))
          );
        }
        hasChild(e) {
          var t = new Je(e);
          return !this._node.getChild(t).isEmpty();
        }
        hasChildren() {
          return !this._node.isLeafNode() && !this._node.isEmpty();
        }
        toJSON() {
          return this.exportVal();
        }
        val() {
          return this._node.val();
        }
      }
      function Ts(e, t) {
        return (
          (e = P(e))._checkNotDeleted("ref"),
          void 0 !== t ? Es(e._root, t) : e._root
        );
      }
      function Is(e, t) {
        (e = P(e))._checkNotDeleted("refFromURL");
        const n = us(t, e._repo.repoInfo_.nodeAdmin);
        Oi("refFromURL", n);
        var r = n.repoInfo;
        return (
          e._repo.repoInfo_.isCustomHost() ||
            r.host === e._repo.repoInfo_.host ||
            pe(
              "refFromURL: Host name does not match the current database: (found " +
                r.host +
                " but expected " +
                e._repo.repoInfo_.host +
                ")"
            ),
          Ts(e, n.path.toString())
        );
      }
      function Es(e, t) {
        return (
          (null === Ze((e = P(e))._path) ? Ti : Ai)("child", "path", t, !1),
          new Cs(e._repo, st(e._path, t))
        );
      }
      function Ss(e, t) {
        (e = P(e)), Ii("set", e._path), yi("set", t, e._path, !1);
        const n = new d();
        return (
          Gi(
            e._repo,
            e._path,
            t,
            null,
            n.wrapCallback(() => {})
          ),
          n.promise
        );
      }
      function ks(e, t) {
        wi("update", t, e._path, !1);
        const n = new d();
        return (
          (function (i, s, e, o) {
            ts(i, "update", { path: s.toString(), value: e });
            let n = !0;
            const r = Hi(i),
              a = {};
            if (
              (Ce(e, (e, t) => {
                (n = !1), (a[e] = li(st(s, e), Ht(t), i.serverSyncTree_, r));
              }),
              n)
            )
              _e("update() called with empty data.  Don't do anything."),
                ns(0, o, "ok", void 0);
            else {
              const l = $i(i);
              var t = Ur(i.serverSyncTree_, s, a, l);
              Mi(i.eventQueue_, t),
                i.server_.merge(s.toString(), e, (e, t) => {
                  var n = "ok" === e;
                  n || fe("update at " + s + " failed: " + e);
                  var r = Br(i.serverSyncTree_, l, !n),
                    n = 0 < r.length ? ss(i, s) : s;
                  qi(i.eventQueue_, n, r), ns(0, o, e, t);
                }),
                Ce(e, (e) => {
                  var t = hs(i, st(s, e));
                  ss(i, t);
                }),
                qi(i.eventQueue_, s, []);
            }
          })(
            e._repo,
            e._path,
            t,
            n.wrapCallback(() => {})
          ),
          n.promise
        );
      }
      function Ns(t) {
        return (
          (t = P(t)),
          (r = t._repo),
          (i = t),
          (null != (e = Qr(r.serverSyncTree_, i))
            ? Promise.resolve(e)
            : r.server_.get(i).then(
                (e) => {
                  var t = Ht(e).withIndex(i._queryParams.getIndex()),
                    n = jr(r.serverSyncTree_, i._path, t);
                  return Fi(r.eventQueue_, i._path, n), Promise.resolve(t);
                },
                (e) => (
                  ts(r, "get for query " + m(i) + " failed: " + e),
                  Promise.reject(new Error(e))
                )
              )
          ).then(
            (e) =>
              new bs(e, new Cs(t._repo, t._path), t._queryParams.getIndex())
          )
        );
        var r, i, e;
      }
      class Ps {
        constructor(e) {
          this.callbackContext = e;
        }
        respondsTo(e) {
          return "value" === e;
        }
        createEvent(e, t) {
          var n = t._queryParams.getIndex();
          return new _s(
            "value",
            this,
            new bs(e.snapshotNode, new Cs(t._repo, t._path), n)
          );
        }
        getEventRunner(e) {
          return "cancel" === e.getEventType()
            ? () => this.callbackContext.onCancel(e.error)
            : () => this.callbackContext.onValue(e.snapshot, null);
        }
        createCancelEvent(e, t) {
          return this.callbackContext.hasCancelCallback
            ? new ps(this, e, t)
            : null;
        }
        matches(e) {
          return (
            e instanceof Ps &&
            (!e.callbackContext ||
              !this.callbackContext ||
              e.callbackContext.matches(this.callbackContext))
          );
        }
        hasAnyCallback() {
          return null !== this.callbackContext;
        }
      }
      class Rs {
        constructor(e, t) {
          (this.eventType = e), (this.callbackContext = t);
        }
        respondsTo(e) {
          let t = "children_added" === e ? "child_added" : e;
          return (
            (t = "children_removed" === t ? "child_removed" : t),
            this.eventType === t
          );
        }
        createCancelEvent(e, t) {
          return this.callbackContext.hasCancelCallback
            ? new ps(this, e, t)
            : null;
        }
        createEvent(e, t) {
          p(null != e.childName, "Child events should have a childName.");
          var n = Es(new Cs(t._repo, t._path), e.childName),
            r = t._queryParams.getIndex();
          return new _s(e.type, this, new bs(e.snapshotNode, n, r), e.prevName);
        }
        getEventRunner(e) {
          return "cancel" === e.getEventType()
            ? () => this.callbackContext.onCancel(e.error)
            : () => this.callbackContext.onValue(e.snapshot, e.prevName);
        }
        matches(e) {
          return (
            e instanceof Rs &&
            this.eventType === e.eventType &&
            (!this.callbackContext ||
              !e.callbackContext ||
              this.callbackContext.matches(e.callbackContext))
          );
        }
        hasAnyCallback() {
          return !!this.callbackContext;
        }
      }
      function xs(n, e, t, r, i) {
        let s;
        if (
          ("object" == typeof r && ((s = void 0), (i = r)),
          "function" == typeof r && (s = r),
          i && i.onlyOnce)
        ) {
          const l = t;
          var o = (e, t) => {
            Zi(n._repo, n, a), l(e, t);
          };
          (o.userCallback = t.userCallback), (o.context = t.context), (t = o);
        }
        o = new fs(t, s || void 0);
        const a = "value" === e ? new Ps(o) : new Rs(e, o);
        return (
          (function (e, t, n) {
            let r;
            (r =
              ".info" === Ze(t._path)
                ? zr(e.infoSyncTree_, t, n)
                : zr(e.serverSyncTree_, t, n)),
              Fi(e.eventQueue_, t._path, r);
          })(n._repo, n, a),
          () => Zi(n._repo, n, a)
        );
      }
      function Ds(e, t, n, r) {
        return xs(e, "value", t, n, r);
      }
      function As(e, t, n, r) {
        return xs(e, "child_added", t, n, r);
      }
      function Os(e, t, n, r) {
        return xs(e, "child_changed", t, n, r);
      }
      function Ls(e, t, n, r) {
        return xs(e, "child_moved", t, n, r);
      }
      function Ms(e, t, n, r) {
        return xs(e, "child_removed", t, n, r);
      }
      function Fs(e, t, n) {
        let r = null;
        var i = n ? new fs(n) : null;
        "value" === t ? (r = new Ps(i)) : t && (r = new Rs(t, i)),
          Zi(e._repo, e, r);
      }
      class qs {}
      class Ws extends qs {
        constructor(e, t) {
          super(), (this._value = e), (this._key = t);
        }
        _apply(e) {
          yi("endAt", this._value, e._path, !0);
          var t = un(e._queryParams, this._value, this._key);
          if ((ws(t), ys(t), e._queryParams.hasEnd()))
            throw new Error(
              "endAt: Starting point was already set (by another call to endAt, endBefore or equalTo)."
            );
          return new ms(e._repo, e._path, t, e._orderByCalled);
        }
      }
      class Us extends qs {
        constructor(e, t) {
          super(), (this._value = e), (this._key = t);
        }
        _apply(e) {
          yi("endBefore", this._value, e._path, !1);
          var t = (function (e, t, n) {
            let r, i;
            return (
              (i =
                e.index_ === wt
                  ? un(e, (t = "string" == typeof t ? Kt(t) : t), n)
                  : ((r = null == n ? ve : Kt(n)), un(e, t, r))),
              (i.endBeforeSet_ = !0),
              i
            );
          })(e._queryParams, this._value, this._key);
          if ((ws(t), ys(t), e._queryParams.hasEnd()))
            throw new Error(
              "endBefore: Starting point was already set (by another call to endAt, endBefore or equalTo)."
            );
          return new ms(e._repo, e._path, t, e._orderByCalled);
        }
      }
      class Bs extends qs {
        constructor(e, t) {
          super(), (this._value = e), (this._key = t);
        }
        _apply(e) {
          yi("startAt", this._value, e._path, !0);
          var t = cn(e._queryParams, this._value, this._key);
          if ((ws(t), ys(t), e._queryParams.hasStart()))
            throw new Error(
              "startAt: Starting point was already set (by another call to startAt, startBefore or equalTo)."
            );
          return new ms(e._repo, e._path, t, e._orderByCalled);
        }
      }
      class js extends qs {
        constructor(e, t) {
          super(), (this._value = e), (this._key = t);
        }
        _apply(e) {
          yi("startAfter", this._value, e._path, !1);
          var t = (function (t, n, r) {
            let i;
            if (t.index_ === wt)
              "string" == typeof n && (n = Yt(n)), (i = cn(t, n, r));
            else {
              let e;
              (e = null == r ? ye : Yt(r)), (i = cn(t, n, e));
            }
            return (i.startAfterSet_ = !0), i;
          })(e._queryParams, this._value, this._key);
          if ((ws(t), ys(t), e._queryParams.hasStart()))
            throw new Error(
              "startAfter: Starting point was already set (by another call to startAt, startAfter, or equalTo)."
            );
          return new ms(e._repo, e._path, t, e._orderByCalled);
        }
      }
      class Vs extends qs {
        constructor(e) {
          super(), (this._limit = e);
        }
        _apply(e) {
          if (e._queryParams.hasLimit())
            throw new Error(
              "limitToFirst: Limit was already set (by another call to limitToFirst or limitToLast)."
            );
          return new ms(
            e._repo,
            e._path,
            (function (e, t) {
              const n = e.copy();
              return (n.limitSet_ = !0), (n.limit_ = t), (n.viewFrom_ = "l"), n;
            })(e._queryParams, this._limit),
            e._orderByCalled
          );
        }
      }
      class zs extends qs {
        constructor(e) {
          super(), (this._limit = e);
        }
        _apply(e) {
          if (e._queryParams.hasLimit())
            throw new Error(
              "limitToLast: Limit was already set (by another call to limitToFirst or limitToLast)."
            );
          return new ms(
            e._repo,
            e._path,
            (function (e, t) {
              const n = e.copy();
              return (n.limitSet_ = !0), (n.limit_ = t), (n.viewFrom_ = "r"), n;
            })(e._queryParams, this._limit),
            e._orderByCalled
          );
        }
      }
      class Hs extends qs {
        constructor(e) {
          super(), (this._path = e);
        }
        _apply(e) {
          vs(e, "orderByChild");
          var t = new Je(this._path);
          if (ot(t))
            throw new Error(
              "orderByChild: cannot pass in empty path. Use orderByValue() instead."
            );
          (t = new Qt(t)), (t = dn(e._queryParams, t));
          return ys(t), new ms(e._repo, e._path, t, !0);
        }
      }
      class Qs extends qs {
        _apply(e) {
          vs(e, "orderByKey");
          var t = dn(e._queryParams, wt);
          return ys(t), new ms(e._repo, e._path, t, !0);
        }
      }
      class Ys extends qs {
        _apply(e) {
          vs(e, "orderByPriority");
          var t = dn(e._queryParams, At);
          return ys(t), new ms(e._repo, e._path, t, !0);
        }
      }
      class Ks extends qs {
        _apply(e) {
          vs(e, "orderByValue");
          var t = dn(e._queryParams, $t);
          return ys(t), new ms(e._repo, e._path, t, !0);
        }
      }
      class $s extends qs {
        constructor(e, t) {
          super(), (this._value = e), (this._key = t);
        }
        _apply(e) {
          if (
            (yi("equalTo", this._value, e._path, !1), e._queryParams.hasStart())
          )
            throw new Error(
              "equalTo: Starting point was already set (by another call to startAt/startAfter or equalTo)."
            );
          if (e._queryParams.hasEnd())
            throw new Error(
              "equalTo: Ending point was already set (by another call to endAt/endBefore or equalTo)."
            );
          return new Ws(this._value, this._key)._apply(
            new Bs(this._value, this._key)._apply(e)
          );
        }
      }
      function Gs(e, ...t) {
        let n = P(e);
        for (const r of t) n = r._apply(n);
        return n;
      }
      ($ = Cs),
        p(!Ir, "__referenceConstructor has already been defined"),
        (Ir = $),
        (G = Cs),
        p(!Mr, "__referenceConstructor has already been defined"),
        (Mr = G);
      const Js = "FIREBASE_DATABASE_EMULATOR_HOST",
        Xs = {};
      let Zs = !1;
      function eo(e, t, n, r, i) {
        let s = r || e.options.databaseURL;
        void 0 === s &&
          (e.options.projectId ||
            pe(
              "Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."
            ),
          _e("Using default host for project ", e.options.projectId),
          (s = `${e.options.projectId}-default-rtdb.firebaseio.com`));
        let o = us(s, i),
          a = o.repoInfo,
          l,
          h = void 0;
        "undefined" != typeof process && process.env && (h = process.env[Js]),
          h
            ? ((l = !0),
              (s = `http://${h}?ns=${a.namespace}`),
              (o = us(s, i)),
              (a = o.repoInfo))
            : (l = !o.repoInfo.secure);
        var c = i && l ? new xe(xe.OWNER) : new Re(e.name, e.options, t);
        Oi("Invalid Firebase Database URL", o),
          ot(o.path) ||
            pe(
              "Database URL must point to the root of a Firebase Database (not including a child path)."
            );
        c = (function (e, t, n, r) {
          let i = Xs[t.name];
          i || ((i = {}), (Xs[t.name] = i));
          var s = i[e.toURLString()];
          s &&
            pe(
              "Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."
            );
          return (s = new ji(e, Zs, n, r)), (i[e.toURLString()] = s);
        })(a, e, c, new Pe(e.name, n));
        return new to(c, e);
      }
      class to {
        constructor(e, t) {
          (this._repoInternal = e),
            (this.app = t),
            (this.type = "database"),
            (this._instanceStarted = !1);
        }
        get _repo() {
          return (
            this._instanceStarted ||
              (Vi(
                this._repoInternal,
                this.app.options.appId,
                this.app.options.databaseAuthVariableOverride
              ),
              (this._instanceStarted = !0)),
            this._repoInternal
          );
        }
        get _root() {
          return (
            this._rootInternal ||
              (this._rootInternal = new Cs(this._repo, Xe())),
            this._rootInternal
          );
        }
        _delete() {
          return (
            null !== this._rootInternal &&
              ((function (e, t) {
                const n = Xs[t];
                (n && n[e.key] === e) ||
                  pe(`Database ${t}(${e.repoInfo_}) has already been deleted.`),
                  es(e),
                  delete n[e.key];
              })(this._repo, this.app.name),
              (this._repoInternal = null),
              (this._rootInternal = null)),
            Promise.resolve()
          );
        }
        _checkNotDeleted(e) {
          null === this._rootInternal &&
            pe("Cannot call " + e + " on a deleted database.");
        }
      }
      function no() {
        Qe.IS_TRANSPORT_INITIALIZED &&
          fe(
            "Transport has already been initialized. Please call this function before calling ref or setting up a listener"
          );
      }
      function ro() {
        no(), je.forceDisallow();
      }
      function io() {
        no(), He.forceDisallow(), je.forceAllow();
      }
      function so(e, t, n, r = {}) {
        (e = P(e))._checkNotDeleted("useEmulator"),
          e._instanceStarted &&
            pe(
              "Cannot call useEmulator() after instance has already been initialized."
            );
        var i,
          s = e._repoInternal;
        let o = void 0;
        s.repoInfo_.nodeAdmin
          ? (r.mockUserToken &&
              pe(
                'mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'
              ),
            (o = new xe(xe.OWNER)))
          : r.mockUserToken &&
            ((i =
              "string" == typeof r.mockUserToken
                ? r.mockUserToken
                : (function (e, t) {
                    if (e.uid)
                      throw new Error(
                        'The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.'
                      );
                    var n = t || "demo-project",
                      r = e.iat || 0,
                      i = e.sub || e.user_id;
                    if (!i)
                      throw new Error(
                        "mockUserToken must contain 'sub' or 'user_id' field!"
                      );
                    return (
                      (i = Object.assign(
                        {
                          iss: `https://securetoken.google.com/${n}`,
                          aud: n,
                          iat: r,
                          exp: r + 3600,
                          auth_time: r,
                          sub: i,
                          user_id: i,
                          firebase: {
                            sign_in_provider: "custom",
                            identities: {},
                          },
                        },
                        e
                      )),
                      [
                        a(JSON.stringify({ alg: "none", type: "JWT" })),
                        a(JSON.stringify(i)),
                        "",
                      ].join(".")
                    );
                  })(r.mockUserToken, e.app.options.projectId)),
            (o = new xe(i))),
          (r = s),
          (e = t),
          (t = n),
          (n = o),
          (r.repoInfo_ = new Le(
            `${e}:${t}`,
            !1,
            r.repoInfo_.namespace,
            r.repoInfo_.webSocketOnly,
            r.repoInfo_.nodeAdmin,
            r.repoInfo_.persistenceKey,
            r.repoInfo_.includeNamespaceInQueryParams
          )),
          n && (r.authTokenProvider_ = n);
      }
      function oo(e) {
        (e = P(e))._checkNotDeleted("goOnline"),
          (e = e._repo).persistentConnection_ &&
            e.persistentConnection_.resume(Ui);
      }
      function ao(e, t) {
        de(e, t);
      }
      const lo = { ".sv": "timestamp" };
      class ho {
        constructor(e, t) {
          (this.committed = e), (this.snapshot = t);
        }
        toJSON() {
          return {
            committed: this.committed,
            snapshot: this.snapshot.toJSON(),
          };
        }
      }
      function co(i, e, t) {
        if (
          ((i = P(i)),
          Ii("Reference.transaction", i._path),
          ".length" === i.key || ".keys" === i.key)
        )
          throw (
            "Reference.transaction failed: " + i.key + " is a read-only object."
          );
        var n =
          null === (r = null == t ? void 0 : t.applyLocally) ||
          void 0 === r ||
          r;
        const s = new d();
        var r = Ds(i, () => {});
        return (
          (function (t, n, e, r, i, s) {
            ts(t, "transaction on " + n);
            const o = {
                path: n,
                update: e,
                onComplete: r,
                status: null,
                order: ne(),
                applyLocally: s,
                retryCount: 0,
                unwatcher: i,
                abortReason: null,
                currentWriteId: null,
                currentInputSnapshot: null,
                currentOutputSnapshotRaw: null,
                currentOutputSnapshotResolved: null,
              },
              a = rs(t, n, void 0);
            o.currentInputSnapshot = a;
            var l = o.update(a.val());
            if (void 0 === l)
              o.unwatcher(),
                (o.currentOutputSnapshotRaw = null),
                (o.currentOutputSnapshotResolved = null),
                o.onComplete && o.onComplete(null, !1, o.currentInputSnapshot);
            else {
              Di("transaction failed: Data returned ", l, o.path),
                (o.status = 0);
              var h = di(t.transactionQueueTree_, n);
              const c = _i(h) || [];
              c.push(o), pi(h, c);
              let e;
              if ("object" == typeof l && null !== l && y(l, ".priority"))
                (e = w(l, ".priority")),
                  p(
                    xi(e),
                    "Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null."
                  );
              else {
                const u = Hr(t.serverSyncTree_, n) || Bt.EMPTY_NODE;
                e = u.getPriority().val();
              }
              (h = Hi(t)), (l = Ht(l, e)), (h = hi(l, a, h));
              (o.currentOutputSnapshotRaw = l),
                (o.currentOutputSnapshotResolved = h),
                (o.currentWriteId = $i(t));
              h = Wr(t.serverSyncTree_, n, h, o.currentWriteId, o.applyLocally);
              qi(t.eventQueue_, n, h), is(t, t.transactionQueueTree_);
            }
          })(
            i._repo,
            i._path,
            e,
            (e, t, n) => {
              var r;
              e
                ? s.reject(e)
                : ((r = new bs(n, new Cs(i._repo, i._path), At)),
                  s.resolve(new ho(t, r)));
            },
            r,
            n
          ),
          s.promise
        );
      }
      (ft.prototype.simpleListen = function (e, t) {
        this.sendRequest("q", { p: e }, t);
      }),
        (ft.prototype.echo = function (e, t) {
          this.sendRequest("echo", { d: e }, t);
        }),
        B(Io.SDK_VERSION),
        Io._registerComponent(
          new R(
            "database",
            (e, { instanceIdentifier: t }) => {
              return eo(
                e.getProvider("app").getImmediate(),
                e.getProvider("auth-internal"),
                e.getProvider("app-check-internal"),
                t
              );
            },
            "PUBLIC"
          ).setMultipleInstances(!0)
        ),
        Io.registerVersion(W, "0.13.0", J),
        Io.registerVersion(W, "0.13.0", "esm2017");
      function uo(e) {
        var t = "FIREBASE WARNING: " + e;
        _o.warn(t);
      }
      const _o = new q("@firebase/database-compat");
      class po {
        constructor(e) {
          this._delegate = e;
        }
        cancel(t) {
          I("OnDisconnect.cancel", 0, 1, arguments.length),
            S("OnDisconnect.cancel", "onComplete", t, !0);
          const e = this._delegate.cancel();
          return (
            t &&
              e.then(
                () => t(null),
                (e) => t(e)
              ),
            e
          );
        }
        remove(t) {
          I("OnDisconnect.remove", 0, 1, arguments.length),
            S("OnDisconnect.remove", "onComplete", t, !0);
          const e = this._delegate.remove();
          return (
            t &&
              e.then(
                () => t(null),
                (e) => t(e)
              ),
            e
          );
        }
        set(e, t) {
          I("OnDisconnect.set", 1, 2, arguments.length),
            S("OnDisconnect.set", "onComplete", t, !0);
          const n = this._delegate.set(e);
          return (
            t &&
              n.then(
                () => t(null),
                (e) => t(e)
              ),
            n
          );
        }
        setWithPriority(e, t, n) {
          I("OnDisconnect.setWithPriority", 2, 3, arguments.length),
            S("OnDisconnect.setWithPriority", "onComplete", n, !0);
          const r = this._delegate.setWithPriority(e, t);
          return (
            n &&
              r.then(
                () => n(null),
                (e) => n(e)
              ),
            r
          );
        }
        update(t, n) {
          if (
            (I("OnDisconnect.update", 1, 2, arguments.length), Array.isArray(t))
          ) {
            const r = {};
            for (let e = 0; e < t.length; ++e) r["" + e] = t[e];
            (t = r),
              uo(
                "Passing an Array to firebase.database.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children."
              );
          }
          S("OnDisconnect.update", "onComplete", n, !0);
          const e = this._delegate.update(t);
          return (
            n &&
              e.then(
                () => n(null),
                (e) => n(e)
              ),
            e
          );
        }
      }
      class fo {
        constructor(e, t) {
          (this.committed = e), (this.snapshot = t);
        }
        toJSON() {
          return (
            I("TransactionResult.toJSON", 0, 1, arguments.length),
            { committed: this.committed, snapshot: this.snapshot.toJSON() }
          );
        }
      }
      class go {
        constructor(e, t) {
          (this._database = e), (this._delegate = t);
        }
        val() {
          return (
            I("DataSnapshot.val", 0, 0, arguments.length), this._delegate.val()
          );
        }
        exportVal() {
          return (
            I("DataSnapshot.exportVal", 0, 0, arguments.length),
            this._delegate.exportVal()
          );
        }
        toJSON() {
          return (
            I("DataSnapshot.toJSON", 0, 1, arguments.length),
            this._delegate.toJSON()
          );
        }
        exists() {
          return (
            I("DataSnapshot.exists", 0, 0, arguments.length),
            this._delegate.exists()
          );
        }
        child(e) {
          return (
            I("DataSnapshot.child", 0, 1, arguments.length),
            (e = String(e)),
            Ai("DataSnapshot.child", "path", e, !1),
            new go(this._database, this._delegate.child(e))
          );
        }
        hasChild(e) {
          return (
            I("DataSnapshot.hasChild", 1, 1, arguments.length),
            Ai("DataSnapshot.hasChild", "path", e, !1),
            this._delegate.hasChild(e)
          );
        }
        getPriority() {
          return (
            I("DataSnapshot.getPriority", 0, 0, arguments.length),
            this._delegate.priority
          );
        }
        forEach(t) {
          return (
            I("DataSnapshot.forEach", 1, 1, arguments.length),
            S("DataSnapshot.forEach", "action", t, !1),
            this._delegate.forEach((e) => t(new go(this._database, e)))
          );
        }
        hasChildren() {
          return (
            I("DataSnapshot.hasChildren", 0, 0, arguments.length),
            this._delegate.hasChildren()
          );
        }
        get key() {
          return this._delegate.key;
        }
        numChildren() {
          return (
            I("DataSnapshot.numChildren", 0, 0, arguments.length),
            this._delegate.size
          );
        }
        getRef() {
          return (
            I("DataSnapshot.ref", 0, 0, arguments.length),
            new vo(this._database, this._delegate.ref)
          );
        }
        get ref() {
          return this.getRef();
        }
      }
      class mo {
        constructor(e, t) {
          (this.database = e), (this._delegate = t);
        }
        on(e, n, t, r) {
          var i;
          I("Query.on", 2, 4, arguments.length),
            S("Query.on", "callback", n, !1);
          const s = mo.getCancelAndContextArgs_("Query.on", t, r);
          var o = (e, t) => {
            n.call(s.context, new go(this.database, e), t);
          };
          (o.userCallback = n), (o.context = s.context);
          var a =
            null === (i = s.cancel) || void 0 === i
              ? void 0
              : i.bind(s.context);
          switch (e) {
            case "value":
              return Ds(this._delegate, o, a), n;
            case "child_added":
              return As(this._delegate, o, a), n;
            case "child_removed":
              return Ms(this._delegate, o, a), n;
            case "child_changed":
              return Os(this._delegate, o, a), n;
            case "child_moved":
              return Ls(this._delegate, o, a), n;
            default:
              throw new Error(
                E("Query.on", "eventType") +
                  'must be a valid event type = "value", "child_added", "child_removed", "child_changed", or "child_moved".'
              );
          }
        }
        off(e, t, n) {
          var r;
          I("Query.off", 0, 3, arguments.length),
            (function (e, t, n) {
              if (!n || void 0 !== t)
                switch (t) {
                  case "value":
                  case "child_added":
                  case "child_removed":
                  case "child_changed":
                  case "child_moved":
                    break;
                  default:
                    throw new Error(
                      E(e, "eventType") +
                        'must be a valid event type = "value", "child_added", "child_removed", "child_changed", or "child_moved".'
                    );
                }
            })("Query.off", e, !0),
            S("Query.off", "callback", t, !0),
            k("Query.off", "context", n, !0),
            t
              ? (((r = () => {}).userCallback = t),
                (r.context = n),
                Fs(this._delegate, e, r))
              : Fs(this._delegate, e);
        }
        get() {
          return Ns(this._delegate).then((e) => new go(this.database, e));
        }
        once(e, r, t, n) {
          I("Query.once", 1, 4, arguments.length),
            S("Query.once", "callback", r, !0);
          const i = mo.getCancelAndContextArgs_("Query.once", t, n),
            s = new d();
          var o = (e, t) => {
            var n = new go(this.database, e);
            r && r.call(i.context, n, t), s.resolve(n);
          };
          (o.userCallback = r), (o.context = i.context);
          var a = (e) => {
            i.cancel && i.cancel.call(i.context, e), s.reject(e);
          };
          switch (e) {
            case "value":
              Ds(this._delegate, o, a, { onlyOnce: !0 });
              break;
            case "child_added":
              As(this._delegate, o, a, { onlyOnce: !0 });
              break;
            case "child_removed":
              Ms(this._delegate, o, a, { onlyOnce: !0 });
              break;
            case "child_changed":
              Os(this._delegate, o, a, { onlyOnce: !0 });
              break;
            case "child_moved":
              Ls(this._delegate, o, a, { onlyOnce: !0 });
              break;
            default:
              throw new Error(
                E("Query.once", "eventType") +
                  'must be a valid event type = "value", "child_added", "child_removed", "child_changed", or "child_moved".'
              );
          }
          return s.promise;
        }
        limitToFirst(e) {
          return (
            I("Query.limitToFirst", 1, 1, arguments.length),
            new mo(
              this.database,
              Gs(
                this._delegate,
                (function (e) {
                  if ("number" != typeof e || Math.floor(e) !== e || e <= 0)
                    throw new Error(
                      "limitToFirst: First argument must be a positive integer."
                    );
                  return new Vs(e);
                })(e)
              )
            )
          );
        }
        limitToLast(e) {
          return (
            I("Query.limitToLast", 1, 1, arguments.length),
            new mo(
              this.database,
              Gs(
                this._delegate,
                (function (e) {
                  if ("number" != typeof e || Math.floor(e) !== e || e <= 0)
                    throw new Error(
                      "limitToLast: First argument must be a positive integer."
                    );
                  return new zs(e);
                })(e)
              )
            )
          );
        }
        orderByChild(e) {
          return (
            I("Query.orderByChild", 1, 1, arguments.length),
            new mo(
              this.database,
              Gs(
                this._delegate,
                (function (e) {
                  if ("$key" === e)
                    throw new Error(
                      'orderByChild: "$key" is invalid.  Use orderByKey() instead.'
                    );
                  if ("$priority" === e)
                    throw new Error(
                      'orderByChild: "$priority" is invalid.  Use orderByPriority() instead.'
                    );
                  if ("$value" === e)
                    throw new Error(
                      'orderByChild: "$value" is invalid.  Use orderByValue() instead.'
                    );
                  return Ai("orderByChild", "path", e, !1), new Hs(e);
                })(e)
              )
            )
          );
        }
        orderByKey() {
          return (
            I("Query.orderByKey", 0, 0, arguments.length),
            new mo(this.database, Gs(this._delegate, new Qs()))
          );
        }
        orderByPriority() {
          return (
            I("Query.orderByPriority", 0, 0, arguments.length),
            new mo(this.database, Gs(this._delegate, new Ys()))
          );
        }
        orderByValue() {
          return (
            I("Query.orderByValue", 0, 0, arguments.length),
            new mo(this.database, Gs(this._delegate, new Ks()))
          );
        }
        startAt(e = null, t) {
          return (
            I("Query.startAt", 0, 2, arguments.length),
            new mo(
              this.database,
              Gs(
                this._delegate,
                (([e = null, t] = [e, t]),
                bi("startAt", "key", t, !0),
                new Bs(e, t))
              )
            )
          );
        }
        startAfter(e = null, t) {
          return (
            I("Query.startAfter", 0, 2, arguments.length),
            new mo(
              this.database,
              Gs(
                this._delegate,
                ((e = e), (t = t), bi("startAfter", "key", t, !0), new js(e, t))
              )
            )
          );
        }
        endAt(e = null, t) {
          return (
            I("Query.endAt", 0, 2, arguments.length),
            new mo(
              this.database,
              Gs(
                this._delegate,
                ((e = e), (t = t), bi("endAt", "key", t, !0), new Ws(e, t))
              )
            )
          );
        }
        endBefore(e = null, t) {
          return (
            I("Query.endBefore", 0, 2, arguments.length),
            new mo(
              this.database,
              Gs(
                this._delegate,
                ((e = e), (t = t), bi("endBefore", "key", t, !0), new Us(e, t))
              )
            )
          );
        }
        equalTo(e, t) {
          return (
            I("Query.equalTo", 1, 2, arguments.length),
            new mo(
              this.database,
              Gs(
                this._delegate,
                ((e = e), (t = t), bi("equalTo", "key", t, !0), new $s(e, t))
              )
            )
          );
        }
        toString() {
          return (
            I("Query.toString", 0, 0, arguments.length),
            this._delegate.toString()
          );
        }
        toJSON() {
          return (
            I("Query.toJSON", 0, 1, arguments.length), this._delegate.toJSON()
          );
        }
        isEqual(e) {
          if ((I("Query.isEqual", 1, 1, arguments.length), e instanceof mo))
            return this._delegate.isEqual(e._delegate);
          throw new Error(
            "Query.isEqual failed: First argument must be an instance of firebase.database.Query."
          );
        }
        static getCancelAndContextArgs_(e, t, n) {
          const r = { cancel: void 0, context: void 0 };
          if (t && n)
            (r.cancel = t),
              S(e, "cancel", r.cancel, !0),
              (r.context = n),
              k(e, "context", r.context, !0);
          else if (t)
            if ("object" == typeof t && null !== t) r.context = t;
            else {
              if ("function" != typeof t)
                throw new Error(
                  E(e, "cancelOrContext") +
                    " must either be a cancel callback or a context object."
                );
              r.cancel = t;
            }
          return r;
        }
        get ref() {
          return new vo(
            this.database,
            new Cs(this._delegate._repo, this._delegate._path)
          );
        }
      }
      class vo extends mo {
        constructor(e, t) {
          super(e, new ms(t._repo, t._path, new hn(), !1)),
            (this.database = e),
            (this._delegate = t);
        }
        getKey() {
          return I("Reference.key", 0, 0, arguments.length), this._delegate.key;
        }
        child(e) {
          return (
            I("Reference.child", 1, 1, arguments.length),
            "number" == typeof e && (e = String(e)),
            new vo(this.database, Es(this._delegate, e))
          );
        }
        getParent() {
          I("Reference.parent", 0, 0, arguments.length);
          var e = this._delegate.parent;
          return e ? new vo(this.database, e) : null;
        }
        getRoot() {
          return (
            I("Reference.root", 0, 0, arguments.length),
            new vo(this.database, this._delegate.root)
          );
        }
        set(e, t) {
          I("Reference.set", 1, 2, arguments.length),
            S("Reference.set", "onComplete", t, !0);
          const n = Ss(this._delegate, e);
          return (
            t &&
              n.then(
                () => t(null),
                (e) => t(e)
              ),
            n
          );
        }
        update(t, n) {
          if (
            (I("Reference.update", 1, 2, arguments.length), Array.isArray(t))
          ) {
            const r = {};
            for (let e = 0; e < t.length; ++e) r["" + e] = t[e];
            (t = r),
              uo(
                "Passing an Array to Firebase.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children."
              );
          }
          Ii("Reference.update", this._delegate._path),
            S("Reference.update", "onComplete", n, !0);
          const e = ks(this._delegate, t);
          return (
            n &&
              e.then(
                () => n(null),
                (e) => n(e)
              ),
            e
          );
        }
        setWithPriority(e, t, n) {
          I("Reference.setWithPriority", 2, 3, arguments.length),
            S("Reference.setWithPriority", "onComplete", n, !0);
          const r = (function (e, t, n) {
            if (
              (Ii("setWithPriority", e._path),
              yi("setWithPriority", t, e._path, !1),
              Ci("setWithPriority", n, !1),
              ".length" === e.key || ".keys" === e.key)
            )
              throw (
                "setWithPriority failed: " + e.key + " is a read-only object."
              );
            const r = new d();
            return (
              Gi(
                e._repo,
                e._path,
                t,
                n,
                r.wrapCallback(() => {})
              ),
              r.promise
            );
          })(this._delegate, e, t);
          return (
            n &&
              r.then(
                () => n(null),
                (e) => n(e)
              ),
            r
          );
        }
        remove(t) {
          I("Reference.remove", 0, 1, arguments.length),
            S("Reference.remove", "onComplete", t, !0);
          const e = ((n = this._delegate), Ii("remove", n._path), Ss(n, null));
          var n;
          return (
            t &&
              e.then(
                () => t(null),
                (e) => t(e)
              ),
            e
          );
        }
        transaction(e, t, n) {
          I("Reference.transaction", 1, 3, arguments.length),
            S("Reference.transaction", "transactionUpdate", e, !1),
            S("Reference.transaction", "onComplete", t, !0),
            (function (e, t, n, r) {
              if ((!r || void 0 !== n) && "boolean" != typeof n)
                throw new Error(E(e, t) + "must be a boolean.");
            })("Reference.transaction", "applyLocally", n, !0);
          const r = co(this._delegate, e, { applyLocally: n }).then(
            (e) => new fo(e.committed, new go(this.database, e.snapshot))
          );
          return (
            t &&
              r.then(
                (e) => t(null, e.committed, e.snapshot),
                (e) => t(e, !1, null)
              ),
            r
          );
        }
        setPriority(e, t) {
          I("Reference.setPriority", 1, 2, arguments.length),
            S("Reference.setPriority", "onComplete", t, !0);
          const n = (function (e, t) {
            (e = P(e)), Ii("setPriority", e._path), Ci("setPriority", t, !1);
            const n = new d();
            return (
              Gi(
                e._repo,
                st(e._path, ".priority"),
                t,
                null,
                n.wrapCallback(() => {})
              ),
              n.promise
            );
          })(this._delegate, e);
          return (
            t &&
              n.then(
                () => t(null),
                (e) => t(e)
              ),
            n
          );
        }
        push(e, t) {
          I("Reference.push", 0, 2, arguments.length),
            S("Reference.push", "onComplete", t, !0);
          const n = (function (e, t) {
              (e = P(e)), Ii("push", e._path), yi("push", t, e._path, !0);
              var n = zi(e._repo),
                n = en(n);
              const r = Es(e, n),
                i = Es(e, n);
              let s;
              return (
                (s = null != t ? Ss(i, t).then(() => i) : Promise.resolve(i)),
                (r.then = s.then.bind(s)),
                (r.catch = s.then.bind(s, void 0)),
                r
              );
            })(this._delegate, e),
            r = n.then((e) => new vo(this.database, e));
          t &&
            r.then(
              () => t(null),
              (e) => t(e)
            );
          const i = new vo(this.database, n);
          return (
            (i.then = r.then.bind(r)), (i.catch = r.catch.bind(r, void 0)), i
          );
        }
        onDisconnect() {
          return (
            Ii("Reference.onDisconnect", this._delegate._path),
            new po(new gs(this._delegate._repo, this._delegate._path))
          );
        }
        get key() {
          return this.getKey();
        }
        get parent() {
          return this.getParent();
        }
        get root() {
          return this.getRoot();
        }
      }
      class yo {
        constructor(e, t) {
          (this._delegate = e),
            (this.app = t),
            (this.INTERNAL = {
              delete: () => this._delegate._delete(),
              forceWebSockets: ro,
              forceLongPolling: io,
            });
        }
        useEmulator(e, t, n = {}) {
          so(this._delegate, e, t, n);
        }
        ref(e) {
          if ((I("database.ref", 0, 1, arguments.length), e instanceof vo)) {
            var t = Is(this._delegate, e.toString());
            return new vo(this, t);
          }
          t = Ts(this._delegate, e);
          return new vo(this, t);
        }
        refFromURL(e) {
          I("database.refFromURL", 1, 1, arguments.length);
          var t = Is(this._delegate, e);
          return new vo(this, t);
        }
        goOffline() {
          var e;
          I("database.goOffline", 0, 0, arguments.length),
            (e = P((e = this._delegate)))._checkNotDeleted("goOffline"),
            es(e._repo);
        }
        goOnline() {
          return (
            I("database.goOnline", 0, 0, arguments.length), oo(this._delegate)
          );
        }
      }
      yo.ServerValue = {
        TIMESTAMP: lo,
        increment: (e) => ({ ".sv": { increment: e } }),
      };
      var wo,
        Co = Object.freeze({
          __proto__: null,
          initStandalone: function ({
            app: e,
            url: t,
            version: n,
            customAuthImpl: r,
            namespace: i,
            nodeAdmin: s = !1,
          }) {
            B(n);
            const o = new D("auth-internal", new A("database-standalone"));
            return (
              o.setComponent(new R("auth-internal", () => r, "PRIVATE")),
              { instance: new yo(eo(e, o, void 0, t, s), e), namespace: i }
            );
          },
        });
      const bo = yo.ServerValue;
      (wo = t.default).INTERNAL.registerComponent(
        new R(
          "database-compat",
          (e, { instanceIdentifier: t }) => {
            var n = e.getProvider("app-compat").getImmediate(),
              r = e.getProvider("database").getImmediate({ identifier: t });
            return new yo(r, n);
          },
          "PUBLIC"
        )
          .setServiceProps({
            Reference: vo,
            Query: mo,
            Database: yo,
            DataSnapshot: go,
            enableLogging: ao,
            INTERNAL: Co,
            ServerValue: bo,
          })
          .setMultipleInstances(!0)
      ),
        wo.registerVersion("@firebase/database-compat", "0.2.0");
    }.apply(this, arguments);
  } catch (e) {
    throw (
      (console.error(e),
      new Error(
        "Cannot instantiate firebase-database-compat.js - be sure to load firebase-app.js first."
      ))
    );
  }
});
//# sourceMappingURL=firebase-database-compat.js.map
