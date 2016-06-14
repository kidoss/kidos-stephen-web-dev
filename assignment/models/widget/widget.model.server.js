module.exports = function() {

    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server.js")();
    var Widget = mongoose.model("Widget", WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget
    };
    return api;

    function createWidget(pageId, widget) {
        widget._page = pageId;
        var ret = Widget.create(widget);

        orderWidgets(pageId);

        return ret;
    }

    function findAllWidgetsForPage(pageId) {
        return Widget.find({"_page": pageId});
    }

    function findWidgetById(widgetId) {
        return Widget.findById(widgetId);
    }

    function updateWidget(widgetId, widget) {
        delete widget._id;
        console.log(widget.order);
        if(widget.order == null) {
            widget.order = 999;
        }

        if(widget.type === 'HEADER') {
            if(widget.size == null) {
                widget.size = 1;
            }

            return Widget
                .update({_id: widgetId},{
                    $set: {
                        name: widget.name,
                        text: widget.text,
                        size: widget.size,
                        order: widget.order
                    }
                });
        } else if(widget.type === 'IMAGE' || widget.type === 'YOUTUBE') {
            return Widget
                .update({_id: widgetId},{
                    $set: {
                        name: widget.name,
                        text: widget.text,
                        url: widget.url,
                        width: widget.width,
                        order: widget.order
                    }
                });
        } else if(widget.type === 'HTML') {
            return Widget
                .update({_id: widgetId},{
                    $set: {
                        text: widget.text,
                        order: widget.order
                    }
                });
        } else if(widget.type === 'TEXT') {
            return Widget
                .update({_id: widgetId},{
                    $set: {
                        text: widget.text,
                        rows: widget.rows,
                        placeholder: widget.placeholder,
                        formatted: widget.formatted,
                        order: widget.order
                    }
                });
        } else {
            return Widget
                .update({_id: widgetId},{
                    $set: {
                        url: widget.url,
                        order: widget.order
                    }
                });
        }
    }

    function deleteWidget(widgetId) {
        return Widget.remove({_id: widgetId});
    }

    function orderWidgets(pageId) {
        var widgets = [];

        Widget.find({"_page": pageId}).lean().exec(function (err, docs) {
            var order = 0;

            for(i in docs) {
                if(docs[i].order > order && docs[i].order < 999) {
                    order = docs[i].order + 1;
                }
            }

            for(i in docs) {
                var id = docs[i]._id;

                if(docs[i].order == null || docs[i].order == 999) {
                    docs[i].order = order;
                    order++;
                    updateWidget(id, docs[i]);
                }
            }
        })
    }

    function reorderWidget(pageId, start, end) {
        var widgets = [];

        Widget.find({"_page": pageId}).lean().exec(function (err, docs) {
            for(i in docs) {
                widgets.push(docs[i]);
            }
        }).then(function(response) {
            start = Number(start);
            end = Number(end);
            console.log(start + " " + end + " swap");

            if(start < end) {
                for (i in widgets) {
                    if (widgets[i].order == start) {
                        widgets[i].order = end;
                    } else if (widgets[i].order > start && widgets[i].order <= end) {
                        widgets[i].order--;
                    }

                    updateWidget(widgets[i]._id, widgets[i]);
                }
            } else {
                start--;

                for (i in widgets) {
                    if (widgets[i].order == start) {
                        widgets[i].order = end;
                    } else if (widgets[i].order > start && widgets[i].order <= end) {
                        widgets[i].order++;
                    }

                    updateWidget(widgets[i]._id, widgets[i]);
                }
            }
        });
    }
}