import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;
        if (!cursor || !follower) return;

        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;
        let raf;

        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        };

        const animate = () => {
            followerX += (mouseX - followerX) * 0.12;
            followerY += (mouseY - followerY) * 0.12;
            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';
            raf = requestAnimationFrame(animate);
        };

        const onMouseDown = () => cursor.classList.add('cursor-click');
        const onMouseUp = () => cursor.classList.remove('cursor-click');

        const onHoverIn = () => {
            cursor.classList.add('cursor-hover');
            follower.classList.add('cursor-hover');
        };
        const onHoverOut = () => {
            cursor.classList.remove('cursor-hover');
            follower.classList.remove('cursor-hover');
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);

        const interactives = document.querySelectorAll('a, button, [role="button"], .cursor-pointer, input, select, label');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', onHoverIn);
            el.addEventListener('mouseleave', onHoverOut);
        });

        raf = requestAnimationFrame(animate);

        // Observer to handle dynamic elements
        const observer = new MutationObserver(() => {
            const newInteractives = document.querySelectorAll('a, button, [role="button"], .cursor-pointer');
            newInteractives.forEach(el => {
                el.removeEventListener('mouseenter', onHoverIn);
                el.removeEventListener('mouseleave', onHoverOut);
                el.addEventListener('mouseenter', onHoverIn);
                el.addEventListener('mouseleave', onHoverOut);
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            interactives.forEach(el => {
                el.removeEventListener('mouseenter', onHoverIn);
                el.removeEventListener('mouseleave', onHoverOut);
            });
            observer.disconnect();
        };
    }, []);

    return (
        <>
            <div id="cursor" ref={cursorRef} />
            <div id="cursor-follower" ref={followerRef} />
        </>
    );
}
