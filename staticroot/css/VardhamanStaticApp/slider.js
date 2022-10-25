/* @preserve
    _____ __ _     __                _
   / ___// /(_)___/ /___  ____      (_)___
  / (_ // // // _  // -_)/ __/_    / /(_-<
  \___//_//_/ \_,_/ \__//_/  (_)__/ //___/
                              |___/

  Version: 1.7.4
  Author: Nick Piscitelli (pickykneee)
  Website: https://nickpiscitelli.com
  Documentation: http://nickpiscitelli.github.io/Glider.js
  License: MIT License
  Release Date: October 25th, 2018

*/
!function (e) { "function" == typeof define && define.amd ? define(e) : "object" == typeof exports ? module.exports = e() : e() }(function () { var a = "undefined" != typeof window ? window : this, e = a.Glider = function (e, t) { var o = this; if (e._glider) return e._glider; if (o.ele = e, o.ele.classList.add("glider"), (o.ele._glider = o).opt = Object.assign({}, { slidesToScroll: 1, slidesToShow: 1, resizeLock: !0, duration: .5, easing: function (e, t, o, i, r) { return i * (t /= r) * t + o } }, t), o.animate_id = o.page = o.slide = 0, o.arrows = {}, o._opt = o.opt, o.opt.skipTrack) o.track = o.ele.children[0]; else for (o.track = document.createElement("div"), o.ele.appendChild(o.track); 1 !== o.ele.children.length;)o.track.appendChild(o.ele.children[0]); o.track.classList.add("glider-track"), o.init(), o.resize = o.init.bind(o, !0), o.event(o.ele, "add", { scroll: o.updateControls.bind(o) }), o.event(a, "add", { resize: o.resize }) }, t = e.prototype; return t.init = function (e, t) { var o, i = this, r = 0, s = 0, l = (i.slides = i.track.children, [].forEach.call(i.slides, function (e, t) { e.classList.add("glider-slide"), e.setAttribute("data-gslide", t) }), i.containerWidth = i.ele.clientWidth, i.settingsBreakpoint()); t = t || l, "auto" !== i.opt.slidesToShow && void 0 === i.opt._autoSlide || (o = i.containerWidth / i.opt.itemWidth, i.opt._autoSlide = i.opt.slidesToShow = i.opt.exactWidth ? o : Math.max(1, Math.floor(o))), "auto" === i.opt.slidesToScroll && (i.opt.slidesToScroll = Math.floor(i.opt.slidesToShow)), i.itemWidth = i.opt.exactWidth ? i.opt.itemWidth : i.containerWidth / i.opt.slidesToShow, [].forEach.call(i.slides, function (e) { e.style.height = "auto", e.style.width = i.itemWidth + "px", r += i.itemWidth, s = Math.max(e.offsetHeight, s) }), i.track.style.width = r + "px", i.trackWidth = r, i.isDrag = !1, i.preventClick = !1, i.move = !1, i.opt.resizeLock && i.scrollTo(i.slide * i.itemWidth, 0), (l || t) && (i.bindArrows(), i.buildDots(), i.bindDrag()), i.updateControls(), i.emit(e ? "refresh" : "loaded") }, t.bindDrag = function () { function e() { t.mouseDown = void 0, t.ele.classList.remove("drag"), t.isDrag && (t.preventClick = !0), t.isDrag = !1 } var t = this; t.mouse = t.mouse || t.handleMouse.bind(t); function o() { t.move = !0 } var i = { mouseup: e, mouseleave: e, mousedown: function (e) { e.preventDefault(), e.stopPropagation(), t.mouseDown = e.clientX, t.ele.classList.add("drag"), t.move = !1, setTimeout(o, 300) }, touchstart: function (e) { t.ele.classList.add("drag"), t.move = !1, setTimeout(o, 300) }, mousemove: t.mouse, click: function (e) { t.preventClick && t.move && (e.preventDefault(), e.stopPropagation()), t.preventClick = !1, t.move = !1 } }; t.ele.classList.toggle("draggable", !0 === t.opt.draggable), t.event(t.ele, "remove", i), t.opt.draggable && t.event(t.ele, "add", i) }, t.buildDots = function () { var e = this; if (e.opt.dots) { if ("string" == typeof e.opt.dots ? e.dots = document.querySelector(e.opt.dots) : e.dots = e.opt.dots, e.dots) { e.dots.innerHTML = "", e.dots.setAttribute("role", "tablist"), e.dots.classList.add("glider-dots"); for (var t = 0; t < Math.ceil(e.slides.length / e.opt.slidesToShow); ++t) { var o = document.createElement("button"); o.dataset.index = t, o.setAttribute("aria-label", "Page " + (t + 1)), o.setAttribute("role", "tab"), o.className = "glider-dot " + (t ? "" : "active"), e.event(o, "add", { click: e.scrollItem.bind(e, t, !0) }), e.dots.appendChild(o) } } } else e.dots && (e.dots.innerHTML = "") }, t.bindArrows = function () { var o = this; o.opt.arrows ? ["prev", "next"].forEach(function (e) { var t = o.opt.arrows[e]; (t = t && ("string" == typeof t ? document.querySelector(t) : t)) && (t._func = t._func || o.scrollItem.bind(o, e), o.event(t, "remove", { click: t._func }), o.event(t, "add", { click: t._func }), o.arrows[e] = t) }) : Object.keys(o.arrows).forEach(function (e) { e = o.arrows[e]; o.event(e, "remove", { click: e._func }) }) }, t.updateControls = function (e) { var n = this, t = (e && !n.opt.scrollPropagate && e.stopPropagation(), n.containerWidth >= n.trackWidth), a = (n.opt.rewind || (n.arrows.prev && (n.arrows.prev.classList.toggle("disabled", n.ele.scrollLeft <= 0 || t), n.arrows.prev.setAttribute("aria-disabled", n.arrows.prev.classList.contains("disabled"))), n.arrows.next && (n.arrows.next.classList.toggle("disabled", Math.ceil(n.ele.scrollLeft + n.containerWidth) >= Math.floor(n.trackWidth) || t), n.arrows.next.setAttribute("aria-disabled", n.arrows.next.classList.contains("disabled")))), n.slide = Math.round(n.ele.scrollLeft / n.itemWidth), n.page = Math.round(n.ele.scrollLeft / n.containerWidth), n.slide + Math.floor(Math.floor(n.opt.slidesToShow) / 2)), d = Math.floor(n.opt.slidesToShow) % 2 ? 0 : a + 1; 1 === Math.floor(n.opt.slidesToShow) && (d = 0), n.ele.scrollLeft + n.containerWidth >= Math.floor(n.trackWidth) && (n.page = n.dots ? n.dots.children.length - 1 : 0), [].forEach.call(n.slides, function (e, t) { var o = e.classList, e = o.contains("visible"), i = n.ele.scrollLeft, r = n.ele.scrollLeft + n.containerWidth, s = n.itemWidth * t, l = s + n.itemWidth, s = ([].forEach.call(o, function (e) { /^left|right/.test(e) && o.remove(e) }), o.toggle("active", n.slide === t), a === t || d && d === t ? o.add("center") : (o.remove("center"), o.add([t < a ? "left" : "right", Math.abs(t - (!(t < a) && d || a))].join("-"))), Math.ceil(s) >= Math.floor(i) && Math.floor(l) <= Math.ceil(r)); o.toggle("visible", s), s !== e && n.emit("slide-" + (s ? "visible" : "hidden"), { slide: t }) }), n.dots && [].forEach.call(n.dots.children, function (e, t) { e.classList.toggle("active", n.page === t) }), e && n.opt.scrollLock && (clearTimeout(n.scrollLock), n.scrollLock = setTimeout(function () { clearTimeout(n.scrollLock), .02 < Math.abs(n.ele.scrollLeft / n.itemWidth - n.slide) && (n.mouseDown || n.trackWidth > n.containerWidth + n.ele.scrollLeft && n.scrollItem(n.getCurrentSlide())) }, n.opt.scrollLockDelay || 250)) }, t.getCurrentSlide = function () { return this.round(this.ele.scrollLeft / this.itemWidth) }, t.scrollItem = function (e, t, o) { o && o.preventDefault(); var i, r = this, s = e, o = (++r.animate_id, r.slide), l = !0 === t ? (e = Math.round(e * r.containerWidth / r.itemWidth)) * r.itemWidth : ("string" == typeof e && (l = "prev" === e, e = r.opt.slidesToScroll % 1 || r.opt.slidesToShow % 1 ? r.getCurrentSlide() : r.slide, l ? e -= r.opt.slidesToScroll : e += r.opt.slidesToScroll, r.opt.rewind && (i = r.ele.scrollLeft, e = l && !i ? r.slides.length : !l && i + r.containerWidth >= Math.floor(r.trackWidth) ? 0 : e)), e = Math.max(Math.min(e, r.slides.length), 0), r.slide = e, r.itemWidth * e); return r.emit("scroll-item", { prevSlide: o, slide: e }), r.scrollTo(l, r.opt.duration * Math.abs(r.ele.scrollLeft - l), function () { r.updateControls(), r.emit("animated", { value: s, type: "string" == typeof s ? "arrow" : t ? "dot" : "slide" }) }), !1 }, t.settingsBreakpoint = function () { var e = this, t = e._opt.responsive; if (t) { t.sort(function (e, t) { return t.breakpoint - e.breakpoint }); for (var o = 0; o < t.length; ++o) { var i = t[o]; if (a.innerWidth >= i.breakpoint) return e.breakpoint !== i.breakpoint && (e.opt = Object.assign({}, e._opt, i.settings), e.breakpoint = i.breakpoint, !0) } } var r = 0 !== e.breakpoint; return e.opt = Object.assign({}, e._opt), e.breakpoint = 0, r }, t.scrollTo = function (t, o, i) { var r = this, s = (new Date).getTime(), l = r.animate_id, n = function () { var e = (new Date).getTime() - s; r.ele.scrollLeft = r.ele.scrollLeft + (t - r.ele.scrollLeft) * r.opt.easing(0, e, 0, 1, o), e < o && l === r.animate_id ? a.requestAnimationFrame(n) : (r.ele.scrollLeft = t, i && i.call(r)) }; a.requestAnimationFrame(n) }, t.removeItem = function (e) { var t = this; t.slides.length && (t.track.removeChild(t.slides[e]), t.refresh(!0), t.emit("remove")) }, t.addItem = function (e) { this.track.appendChild(e), this.refresh(!0), this.emit("add") }, t.handleMouse = function (e) { var t = this; t.mouseDown && (t.isDrag = !0, t.ele.scrollLeft += (t.mouseDown - e.clientX) * (t.opt.dragVelocity || 3.3), t.mouseDown = e.clientX) }, t.round = function (e) { var t = 1 / (this.opt.slidesToScroll % 1 || 1); return Math.round(e * t) / t }, t.refresh = function (e) { this.init(!0, e) }, t.setOption = function (t, e) { var o = this; o.breakpoint && !e ? o._opt.responsive.forEach(function (e) { e.breakpoint === o.breakpoint && (e.settings = Object.assign({}, e.settings, t)) }) : o._opt = Object.assign({}, o._opt, t), o.breakpoint = 0, o.settingsBreakpoint() }, t.destroy = function () { function e(t) { t.removeAttribute("style"), [].forEach.call(t.classList, function (e) { /^glider/.test(e) && t.classList.remove(e) }) } var t = this, o = t.ele.cloneNode(!0); o.children[0].outerHTML = o.children[0].innerHTML, e(o), [].forEach.call(o.getElementsByTagName("*"), e), t.ele.parentNode.replaceChild(o, t.ele), t.event(a, "remove", { resize: t.resize }), t.emit("destroy") }, t.emit = function (e, t) { e = new a.CustomEvent("glider-" + e, { bubbles: !this.opt.eventPropagate, detail: t }); this.ele.dispatchEvent(e) }, t.event = function (e, t, o) { var i = e[t + "EventListener"].bind(e); Object.keys(o).forEach(function (e) { i(e, o[e]) }) }, e });

/* @preserve
    _____ __ _     __                _
   / ___// /(_)___/ /___  ____      (_)___
  / (_ // // // _  // -_)/ __/_    / /(_-<
  \___//_//_/ \_,_/ \__//_/  (_)__/ //___/
                              |___/

  Version: 1.7.4
  Author: Nick Piscitelli (pickykneee)
  Website: https://nickpiscitelli.com
  Documentation: http://nickpiscitelli.github.io/Glider.js
  License: MIT License
  Release Date: October 25th, 2018

*/

/* global define */

(function (factory) {
    typeof define === 'function' && define.amd
        ? define(factory)
        : typeof exports === 'object'
            ? (module.exports = factory())
            : factory()
})(function () {
    ('use strict') // eslint-disable-line no-unused-expressions

    /* globals window:true */
    var _window = typeof window !== 'undefined' ? window : this

    var Glider = (_window.Glider = function (element, settings) {
        var _ = this

        if (element._glider) return element._glider

        _.ele = element
        _.ele.classList.add('glider')

        // expose glider object to its DOM element
        _.ele._glider = _

        // merge user setting with defaults
        _.opt = Object.assign(
            {},
            {
                slidesToScroll: 1,
                slidesToShow: 1,
                resizeLock: true,
                duration: 0.5,
                // easeInQuad
                easing: function (x, t, b, c, d) {
                    return c * (t /= d) * t + b
                }
            },
            settings
        )

        // set defaults
        _.animate_id = _.page = _.slide = 0
        _.arrows = {}

        // preserve original options to
        // extend breakpoint settings
        _._opt = _.opt

        if (_.opt.skipTrack) {
            // first and only child is the track
            _.track = _.ele.children[0]
        } else {
            // create track and wrap slides
            _.track = document.createElement('div')
            _.ele.appendChild(_.track)
            while (_.ele.children.length !== 1) {
                _.track.appendChild(_.ele.children[0])
            }
        }

        _.track.classList.add('glider-track')

        // start glider
        _.init()

        // set events
        _.resize = _.init.bind(_, true)
        _.event(_.ele, 'add', {
            scroll: _.updateControls.bind(_)
        })
        _.event(_window, 'add', {
            resize: _.resize
        })
    })

    var gliderPrototype = Glider.prototype
    gliderPrototype.init = function (refresh, paging) {
        var _ = this

        var width = 0

        var height = 0

        _.slides = _.track.children;

        [].forEach.call(_.slides, function (_, i) {
            _.classList.add('glider-slide')
            _.setAttribute('data-gslide', i)
        })

        _.containerWidth = _.ele.clientWidth

        var breakpointChanged = _.settingsBreakpoint()
        if (!paging) paging = breakpointChanged

        if (
            _.opt.slidesToShow === 'auto' ||
            typeof _.opt._autoSlide !== 'undefined'
        ) {
            var slideCount = _.containerWidth / _.opt.itemWidth

            _.opt._autoSlide = _.opt.slidesToShow = _.opt.exactWidth
                ? slideCount
                : Math.max(1, Math.floor(slideCount))
        }
        if (_.opt.slidesToScroll === 'auto') {
            _.opt.slidesToScroll = Math.floor(_.opt.slidesToShow)
        }

        _.itemWidth = _.opt.exactWidth
            ? _.opt.itemWidth
            : _.containerWidth / _.opt.slidesToShow;

        // set slide dimensions
        [].forEach.call(_.slides, function (__) {
            __.style.height = 'auto'
            __.style.width = _.itemWidth + 'px'
            width += _.itemWidth
            height = Math.max(__.offsetHeight, height)
        })

        _.track.style.width = width + 'px'
        _.trackWidth = width
        _.isDrag = false
        _.preventClick = false
        _.move = false

        _.opt.resizeLock && _.scrollTo(_.slide * _.itemWidth, 0)

        if (breakpointChanged || paging) {
            _.bindArrows()
            _.buildDots()
            _.bindDrag()
        }

        _.updateControls()

        _.emit(refresh ? 'refresh' : 'loaded')
    }

    gliderPrototype.bindDrag = function () {
        var _ = this
        _.mouse = _.mouse || _.handleMouse.bind(_)

        var mouseup = function () {
            _.mouseDown = undefined
            _.ele.classList.remove('drag')
            if (_.isDrag) {
                _.preventClick = true
            }
            _.isDrag = false
        }

        const move = function () {
            _.move = true
        }

        var events = {
            mouseup: mouseup,
            mouseleave: mouseup,
            mousedown: function (e) {
                e.preventDefault()
                e.stopPropagation()
                _.mouseDown = e.clientX
                _.ele.classList.add('drag')
                _.move = false
                setTimeout(move, 300)
            },
            touchstart: function (e) {
                _.ele.classList.add('drag')
                _.move = false
                setTimeout(move, 300)
            },
            mousemove: _.mouse,
            click: function (e) {
                if (_.preventClick && _.move) {
                    e.preventDefault()
                    e.stopPropagation()
                }
                _.preventClick = false
                _.move = false
            }
        }

        _.ele.classList.toggle('draggable', _.opt.draggable === true)
        _.event(_.ele, 'remove', events)
        if (_.opt.draggable) _.event(_.ele, 'add', events)
    }

    gliderPrototype.buildDots = function () {
        var _ = this

        if (!_.opt.dots) {
            if (_.dots) _.dots.innerHTML = ''
            return
        }

        if (typeof _.opt.dots === 'string') {
            _.dots = document.querySelector(_.opt.dots)
        } else _.dots = _.opt.dots
        if (!_.dots) return

        _.dots.innerHTML = ''
        _.dots.setAttribute('role', 'tablist')
        _.dots.classList.add('glider-dots')

        for (var i = 0; i < Math.ceil(_.slides.length / _.opt.slidesToShow); ++i) {
            var dot = document.createElement('button')
            dot.dataset.index = i
            dot.setAttribute('aria-label', 'Page ' + (i + 1))
            dot.setAttribute('role', 'tab')
            dot.className = 'glider-dot ' + (i ? '' : 'active')
            _.event(dot, 'add', {
                click: _.scrollItem.bind(_, i, true)
            })
            _.dots.appendChild(dot)
        }
    }

    gliderPrototype.bindArrows = function () {
        var _ = this
        if (!_.opt.arrows) {
            Object.keys(_.arrows).forEach(function (direction) {
                var element = _.arrows[direction]
                _.event(element, 'remove', { click: element._func })
            })
            return
        }
        ['prev', 'next'].forEach(function (direction) {
            var arrow = _.opt.arrows[direction]
            if (arrow) {
                if (typeof arrow === 'string') arrow = document.querySelector(arrow)
                if (arrow) {
                    arrow._func = arrow._func || _.scrollItem.bind(_, direction)
                    _.event(arrow, 'remove', {
                        click: arrow._func
                    })
                    _.event(arrow, 'add', {
                        click: arrow._func
                    })
                    _.arrows[direction] = arrow
                }
            }
        })
    }

    gliderPrototype.updateControls = function (event) {
        var _ = this

        if (event && !_.opt.scrollPropagate) {
            event.stopPropagation()
        }

        var disableArrows = _.containerWidth >= _.trackWidth

        if (!_.opt.rewind) {
            if (_.arrows.prev) {
                _.arrows.prev.classList.toggle(
                    'disabled',
                    _.ele.scrollLeft <= 0 || disableArrows
                )

                _.arrows.prev.setAttribute(
                    'aria-disabled',
                    _.arrows.prev.classList.contains('disabled')
                )
            }
            if (_.arrows.next) {
                _.arrows.next.classList.toggle(
                    'disabled',
                    Math.ceil(_.ele.scrollLeft + _.containerWidth) >=
                    Math.floor(_.trackWidth) || disableArrows
                )

                _.arrows.next.setAttribute(
                    'aria-disabled',
                    _.arrows.next.classList.contains('disabled')
                )
            }
        }

        _.slide = Math.round(_.ele.scrollLeft / _.itemWidth)
        _.page = Math.round(_.ele.scrollLeft / _.containerWidth)

        var middle = _.slide + Math.floor(Math.floor(_.opt.slidesToShow) / 2)

        var extraMiddle = Math.floor(_.opt.slidesToShow) % 2 ? 0 : middle + 1
        if (Math.floor(_.opt.slidesToShow) === 1) {
            extraMiddle = 0
        }

        // the last page may be less than one half of a normal page width so
        // the page is rounded down. when at the end, force the page to turn
        if (_.ele.scrollLeft + _.containerWidth >= Math.floor(_.trackWidth)) {
            _.page = _.dots ? _.dots.children.length - 1 : 0
        }

        [].forEach.call(_.slides, function (slide, index) {
            var slideClasses = slide.classList

            var wasVisible = slideClasses.contains('visible')

            var start = _.ele.scrollLeft

            var end = _.ele.scrollLeft + _.containerWidth

            var itemStart = _.itemWidth * index

            var itemEnd = itemStart + _.itemWidth;

            [].forEach.call(slideClasses, function (className) {
                /^left|right/.test(className) && slideClasses.remove(className)
            })
            slideClasses.toggle('active', _.slide === index)
            if (middle === index || (extraMiddle && extraMiddle === index)) {
                slideClasses.add('center')
            } else {
                slideClasses.remove('center')
                slideClasses.add(
                    [
                        index < middle ? 'left' : 'right',
                        Math.abs(index - (index < middle ? middle : extraMiddle || middle))
                    ].join('-')
                )
            }

            var isVisible =
                Math.ceil(itemStart) >= Math.floor(start) &&
                Math.floor(itemEnd) <= Math.ceil(end)
            slideClasses.toggle('visible', isVisible)
            if (isVisible !== wasVisible) {
                _.emit('slide-' + (isVisible ? 'visible' : 'hidden'), {
                    slide: index
                })
            }
        })
        if (_.dots) {
            [].forEach.call(_.dots.children, function (dot, index) {
                dot.classList.toggle('active', _.page === index)
            })
        }

        if (event && _.opt.scrollLock) {
            clearTimeout(_.scrollLock)
            _.scrollLock = setTimeout(function () {
                clearTimeout(_.scrollLock)
                // dont attempt to scroll less than a pixel fraction - causes looping
                if (Math.abs(_.ele.scrollLeft / _.itemWidth - _.slide) > 0.02) {
                    if (!_.mouseDown) {
                        // Only scroll if not at the end (#94)
                        if (_.trackWidth > _.containerWidth + _.ele.scrollLeft) {
                            _.scrollItem(_.getCurrentSlide())
                        }
                    }
                }
            }, _.opt.scrollLockDelay || 250)
        }
    }

    gliderPrototype.getCurrentSlide = function () {
        var _ = this
        return _.round(_.ele.scrollLeft / _.itemWidth)
    }

    gliderPrototype.scrollItem = function (slide, dot, e) {
        if (e) e.preventDefault()

        var _ = this

        var originalSlide = slide
        ++_.animate_id

        var prevSlide = _.slide
        var position

        if (dot === true) {
            slide = Math.round((slide * _.containerWidth) / _.itemWidth)
            position = slide * _.itemWidth
        } else {
            if (typeof slide === 'string') {
                var backwards = slide === 'prev'

                // use precise location if fractional slides are on
                if (_.opt.slidesToScroll % 1 || _.opt.slidesToShow % 1) {
                    slide = _.getCurrentSlide()
                } else {
                    slide = _.slide
                }

                if (backwards) slide -= _.opt.slidesToScroll
                else slide += _.opt.slidesToScroll

                if (_.opt.rewind) {
                    var scrollLeft = _.ele.scrollLeft
                    slide =
                        backwards && !scrollLeft
                            ? _.slides.length
                            : !backwards &&
                                scrollLeft + _.containerWidth >= Math.floor(_.trackWidth)
                                ? 0
                                : slide
                }
            }

            slide = Math.max(Math.min(slide, _.slides.length), 0)

            _.slide = slide
            position = _.itemWidth * slide
        }

        _.emit('scroll-item', { prevSlide, slide })

        _.scrollTo(
            position,
            _.opt.duration * Math.abs(_.ele.scrollLeft - position),
            function () {
                _.updateControls()
                _.emit('animated', {
                    value: originalSlide,
                    type:
                        typeof originalSlide === 'string' ? 'arrow' : dot ? 'dot' : 'slide'
                })
            }
        )

        return false
    }

    gliderPrototype.settingsBreakpoint = function () {
        var _ = this

        var resp = _._opt.responsive

        if (resp) {
            // Sort the breakpoints in mobile first order
            resp.sort(function (a, b) {
                return b.breakpoint - a.breakpoint
            })

            for (var i = 0; i < resp.length; ++i) {
                var size = resp[i]
                if (_window.innerWidth >= size.breakpoint) {
                    if (_.breakpoint !== size.breakpoint) {
                        _.opt = Object.assign({}, _._opt, size.settings)
                        _.breakpoint = size.breakpoint
                        return true
                    }
                    return false
                }
            }
        }
        // set back to defaults in case they were overriden
        var breakpointChanged = _.breakpoint !== 0
        _.opt = Object.assign({}, _._opt)
        _.breakpoint = 0
        return breakpointChanged
    }

    gliderPrototype.scrollTo = function (scrollTarget, scrollDuration, callback) {
        var _ = this

        var start = new Date().getTime()

        var animateIndex = _.animate_id

        var animate = function () {
            var now = new Date().getTime() - start
            _.ele.scrollLeft =
                _.ele.scrollLeft +
                (scrollTarget - _.ele.scrollLeft) *
                _.opt.easing(0, now, 0, 1, scrollDuration)
            if (now < scrollDuration && animateIndex === _.animate_id) {
                _window.requestAnimationFrame(animate)
            } else {
                _.ele.scrollLeft = scrollTarget
                callback && callback.call(_)
            }
        }

        _window.requestAnimationFrame(animate)
    }

    gliderPrototype.removeItem = function (index) {
        var _ = this

        if (_.slides.length) {
            _.track.removeChild(_.slides[index])
            _.refresh(true)
            _.emit('remove')
        }
    }

    gliderPrototype.addItem = function (ele) {
        var _ = this

        _.track.appendChild(ele)
        _.refresh(true)
        _.emit('add')
    }

    gliderPrototype.handleMouse = function (e) {
        var _ = this
        if (_.mouseDown) {
            _.isDrag = true
            _.ele.scrollLeft +=
                (_.mouseDown - e.clientX) * (_.opt.dragVelocity || 3.3)
            _.mouseDown = e.clientX
        }
    }

    // used to round to the nearest 0.XX fraction
    gliderPrototype.round = function (double) {
        var _ = this
        var step = _.opt.slidesToScroll % 1 || 1
        var inv = 1.0 / step
        return Math.round(double * inv) / inv
    }

    gliderPrototype.refresh = function (paging) {
        var _ = this
        _.init(true, paging)
    }

    gliderPrototype.setOption = function (opt, global) {
        var _ = this

        if (_.breakpoint && !global) {
            _._opt.responsive.forEach(function (v) {
                if (v.breakpoint === _.breakpoint) {
                    v.settings = Object.assign({}, v.settings, opt)
                }
            })
        } else {
            _._opt = Object.assign({}, _._opt, opt)
        }

        _.breakpoint = 0
        _.settingsBreakpoint()
    }

    gliderPrototype.destroy = function () {
        var _ = this

        var replace = _.ele.cloneNode(true)

        var clear = function (ele) {
            ele.removeAttribute('style');
            [].forEach.call(ele.classList, function (className) {
                /^glider/.test(className) && ele.classList.remove(className)
            })
        }
        // remove track
        replace.children[0].outerHTML = replace.children[0].innerHTML
        clear(replace);
        [].forEach.call(replace.getElementsByTagName('*'), clear)
        _.ele.parentNode.replaceChild(replace, _.ele)
        _.event(_window, 'remove', {
            resize: _.resize
        })
        _.emit('destroy')
    }

    gliderPrototype.emit = function (name, arg) {
        var _ = this

        var e = new _window.CustomEvent('glider-' + name, {
            bubbles: !_.opt.eventPropagate,
            detail: arg
        })
        _.ele.dispatchEvent(e)
    }

    gliderPrototype.event = function (ele, type, args) {
        var eventHandler = ele[type + 'EventListener'].bind(ele)
        Object.keys(args).forEach(function (k) {
            eventHandler(k, args[k])
        })
    }

    return Glider
})
"document"in self&&("classList"in document.createElement("_")&&(!document.createElementNS||"classList"in document.createElementNS("http://www.w3.org/2000/svg","g"))||!function(b){if("Element"in b){b=b.Element.prototype;var d=Object,g=String.prototype.trim||function(){return this.replace(/^\s+|\s+$/g,"")},a=Array.prototype.indexOf||function(l){for(var f=0,a=this.length;a>f;f++)if(f in this&&this[f]===l)return f;return-1},c=function(a,f){this.name=a;this.code=DOMException[a];this.message=f},h=function(l,
f){if(""===f)throw new c("SYNTAX_ERR","The token must not be empty.");if(/\s/.test(f))throw new c("INVALID_CHARACTER_ERR","The token must not contain space characters.");return a.call(l,f)},k=function(a){var f=g.call(a.getAttribute("class")||"");f=f?f.split(/\s+/):[];for(var b=0,h=f.length;h>b;b++)this.push(f[b]);this._updateClassName=function(){a.setAttribute("class",this.toString())}},e=k.prototype=[],m=function(){return new k(this)};if(c.prototype=Error.prototype,e.item=function(a){return this[a]||
null},e.contains=function(a){return~h(this,a+"")},e.add=function(){var a=arguments,f=0,b=a.length,c=!1;do{var e=a[f]+"";~h(this,e)||(this.push(e),c=!0)}while(++f<b);c&&this._updateClassName()},e.remove=function(){var a,b=arguments,c=0,e=b.length,k=!1;do{var d=b[c]+"";for(a=h(this,d);~a;)this.splice(a,1),k=!0,a=h(this,d)}while(++c<e);k&&this._updateClassName()},e.toggle=function(a,b){var h=this.contains(a),c=h?!0!==b&&"remove":!1!==b&&"add";return c&&this[c](a),!0===b||!1===b?b:!h},e.replace=function(a,
b){var c=h(a+"");~c&&(this.splice(c,1,b),this._updateClassName())},e.toString=function(){return this.join(" ")},d.defineProperty){e={get:m,enumerable:!0,configurable:!0};try{d.defineProperty(b,"classList",e)}catch(l){void 0!==l.number&&-2146823252!==l.number||(e.enumerable=!1,d.defineProperty(b,"classList",e))}}else d.prototype.__defineGetter__&&b.__defineGetter__("classList",m)}}(self),function(){var b=document.createElement("_");if(b.classList.add("c1","c2"),!b.classList.contains("c2")){var d=function(a){var b=
DOMTokenList.prototype[a];DOMTokenList.prototype[a]=function(a){var c,h=arguments.length;for(c=0;h>c;c++)a=arguments[c],b.call(this,a)}};d("add");d("remove")}if(b.classList.toggle("c3",!1),b.classList.contains("c3")){var g=DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle=function(a,b){return 1 in arguments&&!this.contains(a)==!b?b:g.call(this,a)}}"replace"in document.createElement("_").classList||(DOMTokenList.prototype.replace=function(a,b){var c=this.toString().split(" "),d=c.indexOf(a+
"");~d&&(c=c.slice(d),this.remove.apply(this,c),this.add(b),this.add.apply(this,c.slice(1)))});b=null}());
(function(){if("undefined"!==typeof window)try{var b=new window.CustomEvent("test",{cancelable:!0});b.preventDefault();if(!0!==b.defaultPrevented)throw Error("Could not prevent default");}catch(d){b=function(b,a){a=a||{bubbles:!1,cancelable:!1,detail:void 0};var c=document.createEvent("CustomEvent");c.initCustomEvent(b,a.bubbles,a.cancelable,a.detail);var d=c.preventDefault;c.preventDefault=function(){d.call(this);try{Object.defineProperty(this,"defaultPrevented",{get:function(){return!0}})}catch(k){this.defaultPrevented=
!0}};return c},b.prototype=window.Event.prototype,window.CustomEvent=b}})();
Object.assign||Object.defineProperty(Object,"assign",{enumerable:!1,configurable:!0,writable:!0,value:function(b){if(void 0===b||null===b)throw new TypeError("Cannot convert first argument to object");for(var d=Object(b),g=1;g<arguments.length;g++){var a=arguments[g];if(void 0!==a&&null!==a){a=Object(a);for(var c=Object.keys(Object(a)),h=0,k=c.length;h<k;h++){var e=c[h],m=Object.getOwnPropertyDescriptor(a,e);void 0!==m&&m.enumerable&&(d[e]=a[e])}}}return d}});
(function(){for(var b=0,d=["ms","moz","webkit","o"],g=0;g<d.length&&!window.requestAnimationFrame;++g)window.requestAnimationFrame=window[d[g]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[d[g]+"CancelAnimationFrame"]||window[d[g]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(a,c){var d=(new Date).getTime(),g=Math.max(0,16-(d-b)),e=window.setTimeout(function(){a(d+g)},g);b=d+g;return e});window.cancelAnimationFrame||(window.cancelAnimationFrame=
function(a){clearTimeout(a)})})();"document"in self&&("classList"in document.createElement("_")&&(!document.createElementNS||"classList"in document.createElementNS("http://www.w3.org/2000/svg","g"))||!function(b){if("Element"in b){b=b.Element.prototype;var d=Object,g=String.prototype.trim||function(){return this.replace(/^\s+|\s+$/g,"")},a=Array.prototype.indexOf||function(l){for(var f=0,a=this.length;a>f;f++)if(f in this&&this[f]===l)return f;return-1},c=function(a,f){this.name=a;this.code=DOMException[a];this.message=f},h=function(l,
f){if(""===f)throw new c("SYNTAX_ERR","The token must not be empty.");if(/\s/.test(f))throw new c("INVALID_CHARACTER_ERR","The token must not contain space characters.");return a.call(l,f)},k=function(a){var f=g.call(a.getAttribute("class")||"");f=f?f.split(/\s+/):[];for(var b=0,h=f.length;h>b;b++)this.push(f[b]);this._updateClassName=function(){a.setAttribute("class",this.toString())}},e=k.prototype=[],m=function(){return new k(this)};if(c.prototype=Error.prototype,e.item=function(a){return this[a]||
null},e.contains=function(a){return~h(this,a+"")},e.add=function(){var a=arguments,f=0,b=a.length,c=!1;do{var e=a[f]+"";~h(this,e)||(this.push(e),c=!0)}while(++f<b);c&&this._updateClassName()},e.remove=function(){var a,b=arguments,c=0,e=b.length,k=!1;do{var d=b[c]+"";for(a=h(this,d);~a;)this.splice(a,1),k=!0,a=h(this,d)}while(++c<e);k&&this._updateClassName()},e.toggle=function(a,b){var h=this.contains(a),c=h?!0!==b&&"remove":!1!==b&&"add";return c&&this[c](a),!0===b||!1===b?b:!h},e.replace=function(a,
b){var c=h(a+"");~c&&(this.splice(c,1,b),this._updateClassName())},e.toString=function(){return this.join(" ")},d.defineProperty){e={get:m,enumerable:!0,configurable:!0};try{d.defineProperty(b,"classList",e)}catch(l){void 0!==l.number&&-2146823252!==l.number||(e.enumerable=!1,d.defineProperty(b,"classList",e))}}else d.prototype.__defineGetter__&&b.__defineGetter__("classList",m)}}(self),function(){var b=document.createElement("_");if(b.classList.add("c1","c2"),!b.classList.contains("c2")){var d=function(a){var b=
DOMTokenList.prototype[a];DOMTokenList.prototype[a]=function(a){var c,h=arguments.length;for(c=0;h>c;c++)a=arguments[c],b.call(this,a)}};d("add");d("remove")}if(b.classList.toggle("c3",!1),b.classList.contains("c3")){var g=DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle=function(a,b){return 1 in arguments&&!this.contains(a)==!b?b:g.call(this,a)}}"replace"in document.createElement("_").classList||(DOMTokenList.prototype.replace=function(a,b){var c=this.toString().split(" "),d=c.indexOf(a+
"");~d&&(c=c.slice(d),this.remove.apply(this,c),this.add(b),this.add.apply(this,c.slice(1)))});b=null}());
(function(){if("undefined"!==typeof window)try{var b=new window.CustomEvent("test",{cancelable:!0});b.preventDefault();if(!0!==b.defaultPrevented)throw Error("Could not prevent default");}catch(d){b=function(b,a){a=a||{bubbles:!1,cancelable:!1,detail:void 0};var c=document.createEvent("CustomEvent");c.initCustomEvent(b,a.bubbles,a.cancelable,a.detail);var d=c.preventDefault;c.preventDefault=function(){d.call(this);try{Object.defineProperty(this,"defaultPrevented",{get:function(){return!0}})}catch(k){this.defaultPrevented=
!0}};return c},b.prototype=window.Event.prototype,window.CustomEvent=b}})();
Object.assign||Object.defineProperty(Object,"assign",{enumerable:!1,configurable:!0,writable:!0,value:function(b){if(void 0===b||null===b)throw new TypeError("Cannot convert first argument to object");for(var d=Object(b),g=1;g<arguments.length;g++){var a=arguments[g];if(void 0!==a&&null!==a){a=Object(a);for(var c=Object.keys(Object(a)),h=0,k=c.length;h<k;h++){var e=c[h],m=Object.getOwnPropertyDescriptor(a,e);void 0!==m&&m.enumerable&&(d[e]=a[e])}}}return d}});
(function(){for(var b=0,d=["ms","moz","webkit","o"],g=0;g<d.length&&!window.requestAnimationFrame;++g)window.requestAnimationFrame=window[d[g]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[d[g]+"CancelAnimationFrame"]||window[d[g]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(a,c){var d=(new Date).getTime(),g=Math.max(0,16-(d-b)),e=window.setTimeout(function(){a(d+g)},g);b=d+g;return e});window.cancelAnimationFrame||(window.cancelAnimationFrame=
function(a){clearTimeout(a)})})();
"document" in self && ("classList" in document.createElement("_") && (!document.createElementNS || "classList" in document.createElementNS("http://www.w3.org/2000/svg", "g")) || !function (b) {
    if ("Element" in b) {
        b = b.Element.prototype; var d = Object, g = String.prototype.trim || function () { return this.replace(/^\s+|\s+$/g, "") }, a = Array.prototype.indexOf || function (l) { for (var f = 0, a = this.length; a > f; f++)if (f in this && this[f] === l) return f; return -1 }, c = function (a, f) { this.name = a; this.code = DOMException[a]; this.message = f }, h = function (l,
            f) { if ("" === f) throw new c("SYNTAX_ERR", "The token must not be empty."); if (/\s/.test(f)) throw new c("INVALID_CHARACTER_ERR", "The token must not contain space characters."); return a.call(l, f) }, k = function (a) { var f = g.call(a.getAttribute("class") || ""); f = f ? f.split(/\s+/) : []; for (var b = 0, h = f.length; h > b; b++)this.push(f[b]); this._updateClassName = function () { a.setAttribute("class", this.toString()) } }, e = k.prototype = [], m = function () { return new k(this) }; if (c.prototype = Error.prototype, e.item = function (a) {
                return this[a] ||
                    null
            }, e.contains = function (a) { return ~h(this, a + "") }, e.add = function () { var a = arguments, f = 0, b = a.length, c = !1; do { var e = a[f] + ""; ~h(this, e) || (this.push(e), c = !0) } while (++f < b); c && this._updateClassName() }, e.remove = function () { var a, b = arguments, c = 0, e = b.length, k = !1; do { var d = b[c] + ""; for (a = h(this, d); ~a;)this.splice(a, 1), k = !0, a = h(this, d) } while (++c < e); k && this._updateClassName() }, e.toggle = function (a, b) { var h = this.contains(a), c = h ? !0 !== b && "remove" : !1 !== b && "add"; return c && this[c](a), !0 === b || !1 === b ? b : !h }, e.replace = function (a,
                b) { var c = h(a + ""); ~c && (this.splice(c, 1, b), this._updateClassName()) }, e.toString = function () { return this.join(" ") }, d.defineProperty) { e = { get: m, enumerable: !0, configurable: !0 }; try { d.defineProperty(b, "classList", e) } catch (l) { void 0 !== l.number && -2146823252 !== l.number || (e.enumerable = !1, d.defineProperty(b, "classList", e)) } } else d.prototype.__defineGetter__ && b.__defineGetter__("classList", m)
    }
}(self), function () {
    var b = document.createElement("_"); if (b.classList.add("c1", "c2"), !b.classList.contains("c2")) {
        var d = function (a) {
            var b =
                DOMTokenList.prototype[a]; DOMTokenList.prototype[a] = function (a) { var c, h = arguments.length; for (c = 0; h > c; c++)a = arguments[c], b.call(this, a) }
        }; d("add"); d("remove")
    } if (b.classList.toggle("c3", !1), b.classList.contains("c3")) { var g = DOMTokenList.prototype.toggle; DOMTokenList.prototype.toggle = function (a, b) { return 1 in arguments && !this.contains(a) == !b ? b : g.call(this, a) } } "replace" in document.createElement("_").classList || (DOMTokenList.prototype.replace = function (a, b) {
        var c = this.toString().split(" "), d = c.indexOf(a +
            ""); ~d && (c = c.slice(d), this.remove.apply(this, c), this.add(b), this.add.apply(this, c.slice(1)))
    }); b = null
}());
(function () {
    if ("undefined" !== typeof window) try { var b = new window.CustomEvent("test", { cancelable: !0 }); b.preventDefault(); if (!0 !== b.defaultPrevented) throw Error("Could not prevent default"); } catch (d) {
        b = function (b, a) {
            a = a || { bubbles: !1, cancelable: !1, detail: void 0 }; var c = document.createEvent("CustomEvent"); c.initCustomEvent(b, a.bubbles, a.cancelable, a.detail); var d = c.preventDefault; c.preventDefault = function () {
                d.call(this); try { Object.defineProperty(this, "defaultPrevented", { get: function () { return !0 } }) } catch (k) {
                    this.defaultPrevented =
                    !0
                }
            }; return c
        }, b.prototype = window.Event.prototype, window.CustomEvent = b
    }
})();
Object.assign || Object.defineProperty(Object, "assign", { enumerable: !1, configurable: !0, writable: !0, value: function (b) { if (void 0 === b || null === b) throw new TypeError("Cannot convert first argument to object"); for (var d = Object(b), g = 1; g < arguments.length; g++) { var a = arguments[g]; if (void 0 !== a && null !== a) { a = Object(a); for (var c = Object.keys(Object(a)), h = 0, k = c.length; h < k; h++) { var e = c[h], m = Object.getOwnPropertyDescriptor(a, e); void 0 !== m && m.enumerable && (d[e] = a[e]) } } } return d } });
(function () {
    for (var b = 0, d = ["ms", "moz", "webkit", "o"], g = 0; g < d.length && !window.requestAnimationFrame; ++g)window.requestAnimationFrame = window[d[g] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[d[g] + "CancelAnimationFrame"] || window[d[g] + "CancelRequestAnimationFrame"]; window.requestAnimationFrame || (window.requestAnimationFrame = function (a, c) { var d = (new Date).getTime(), g = Math.max(0, 16 - (d - b)), e = window.setTimeout(function () { a(d + g) }, g); b = d + g; return e }); window.cancelAnimationFrame || (window.cancelAnimationFrame =
        function (a) { clearTimeout(a) })
})();