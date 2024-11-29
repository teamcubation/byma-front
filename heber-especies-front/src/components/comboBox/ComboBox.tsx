import React, { useRef } from "react";
import "./ComboBox.css";

interface ComboBoxProps {
  items: string[];
  placeholder?: string;
}

const ComboBox: React.FC<ComboBoxProps> = ({
  items = ["ítem 1", "ítem 2", "ítem 3", "ítem 4", "ítem 5", "ítem 6", "ítem 7", "ítem 8"],
  placeholder = "Seleccione una opción"
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartY = useRef(0);
  const thumbStartY = useRef(0);

  const handleToggle = (event: React.MouseEvent) => {
    if (
      scrollRef.current?.contains(event.target as Node) ||
      thumbRef.current?.contains(event.target as Node) ||
      trackRef.current?.contains(event.target as Node)
    ) {
      return;
    }
    setIsOpen(!isOpen);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        scrollRef.current?.contains(event.target as Node) ||
        thumbRef.current?.contains(event.target as Node) ||
        trackRef.current?.contains(event.target as Node)
      ) {
        return;
      }
      setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (item: string) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    isDragging.current = true;
    dragStartY.current = event.clientY;
    thumbStartY.current = thumbRef.current?.offsetTop || 0;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isDragging.current || !scrollRef.current || !thumbRef.current) return;

    const deltaY = event.clientY - dragStartY.current;
    const thumbHeight = thumbRef.current.offsetHeight;
    const scrollHeight = scrollRef.current.scrollHeight - scrollRef.current.clientHeight;

    const newTop = Math.min(
      Math.max(thumbStartY.current + deltaY, 0),
      scrollRef.current.clientHeight - thumbHeight
    );

    thumbRef.current.style.top = `${newTop}px`;
    const scrollRatio = newTop / (scrollRef.current.clientHeight - thumbHeight);
    scrollRef.current.scrollTop = scrollRatio * scrollHeight;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleScroll = () => {
    if (!scrollRef.current || !thumbRef.current) return;

    const thumbHeight =
      scrollRef.current.clientHeight * (scrollRef.current.clientHeight / scrollRef.current.scrollHeight);
    thumbRef.current.style.height = `${95.31}px`;

    const scrollRatio =
      scrollRef.current.scrollTop / (scrollRef.current.scrollHeight - scrollRef.current.clientHeight);
    thumbRef.current.style.top = `${scrollRatio * (scrollRef.current.clientHeight - 95.31)}px`;
  };

  return (
    <div className="combo-box-container">
      <div className="container-combo-box-label">
        <label className="combo-box-label">Lorem ipsum</label>
      </div>
      <div className="combo-box" onClick={handleToggle}>
        <div className="combo-box-input">
          <span className={`combo-box-placeholder ${selectedItem ? "selected" : ""}`}>
            {selectedItem || placeholder}
          </span>
          <div className="combo-box-icon"></div>
        </div>
        {isOpen && (
          <div className="combo-box-dropdown">
            <div className="custom-scroll-container" onScroll={handleScroll} ref={scrollRef}>
              {items.map((item, index) => (
                <div
                  key={index}
                  className={`combo-box-item ${selectedItem === item ? "selected-item" : ""}`}
                  onClick={() => handleSelect(item)}
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="custom-scroll-track" ref={trackRef}>
              <div
                className="custom-scroll-thumb"
                onMouseDown={handleMouseDown}
                ref={thumbRef}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComboBox;