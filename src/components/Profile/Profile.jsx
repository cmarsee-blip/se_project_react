import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

export default function Profile({
  clothingItems,
  onCardClick,
  onAddClick,
  handleEditProfileClick,
  onCardLike,
}) {
  return (
    <section className="profile">
      <SideBar handleEditProfileClick={handleEditProfileClick} />
      <ClothesSection
        onCardClick={onCardClick}
        clothingItems={clothingItems}
        onAddClick={onAddClick}
        onCardLike={onCardLike}
      />
    </section>
  );
}
