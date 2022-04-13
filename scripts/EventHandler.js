let EventHandler = {
    events: new Array(),
    /**
     *
     * @param {String} selector the specified selector
     * @param {String} eventName the event name to bind to
     * @param {function} event the function to bind
     * @param {Number} nthElemet the nth element of given selector,begin with 0 ,set -1 to aplly all, default -1
     * @param {Boolean} applied where this event has been binded, default false
     * @returns the handler object
     */
    BindEvent(selector, eventName, event, nthElemet = -1, applied = false)
    {
        let handler = {
            selector,
            eventName,
            event,
            nthElemet,
            applied,
            /**
             * set true to remove this event
             */
            forbiddened: false,
        };
        for (let i = 0; i != EventHandler.events.length; ++i)
        {
            if (EventHandler.events[i].forbiddened && !EventHandler.events[i].applied)
            {
                EventHandler.events[i] = handler;
                // this.UpdateEvents();
                return handler;
            }
        }
        EventHandler.events.push(handler);
        // this.UpdateEvents();
        return handler;
    },
    /**
     * Manually update listeners
     */
    UpdateEvents()
    {
        for (let i = 0; i != EventHandler.events.length; ++i)
        {
            let currEvent = EventHandler.events[i];
            //bind newer events or remove forbiddened events;
            if (currEvent.forbiddened && currEvent.applied)
            {
                //remove applied && forbiddened handlers
                let result = document.querySelectorAll(currEvent.selector);
                let begin = currEvent.nthElemet == -1 ? 0 : currEvent.nthElemet;
                let end = currEvent.nthElemet == -1 ? result.length : currEvent.nthElemet + 1;
                for (; begin != end; ++begin)
                {
                    result[begin].removeEventListener(currEvent.eventName, currEvent.event);
                }
                currEvent.applied = false;
            } else if (!currEvent.applied && !currEvent.forbiddened)
            {
                let result = document.querySelectorAll(currEvent.selector);
                let begin = currEvent.nthElemet == -1 ? 0 : currEvent.nthElemet;
                let end = currEvent.nthElemet == -1 ? result.length : currEvent.nthElemet + 1;
                for (; begin != end; ++begin)
                {
                    result[begin].addEventListener(currEvent.eventName, currEvent.event);
                }
                currEvent.applied = true;
            }

        }
        console.log(EventHandler);
    }
};







window.addEventListener("load", function ()
{
    EventHandler.UpdateEvents();
});