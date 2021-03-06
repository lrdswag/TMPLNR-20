<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\Lazy\LazyUuidFromString;
use Ramsey\Uuid\UuidInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Ramsey\Uuid\Doctrine\UuidGenerator;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\BooleanFilter;
/**
 * ShiftComments
 * @ApiResource(
 *     normalizationContext={"groups"={"comments:read"}, "swagger_definition_name"="Read"},
 *     denormalizationContext={"groups"={"comments:write"}, "swagger_definition_name"="Write"},
 *     shortName="comments"
 * )
 * @ApiFilter(BooleanFilter::class, properties={"isPrivate", "markedAsRead"})
 * @ApiFilter(OrderFilter::class, properties={"dateOfComment"}, arguments={"orderParameterName"="order"})
 * @ORM\Table(name="shift_comments")
 * @ORM\Entity(repositoryClass="App\Repository\ShiftCommentsRepository")
 */

// Waiting for PROJ 2 to be marked.
// Disabled security on all endpoints so the Test Script works correctly.

// *   attributes={"security"="is_granted('ROLE_USER')"},
// *   collectionOperations={
// *   "get",
// *   "post"},
// *   itemOperations={"get",
// *   "put"={"security"="is_granted('ROLE_ADMIN') or object.getAuthoredBy() == user"},
// *   "delete"={"security"="is_granted('ROLE_ADMIN') or object.getAuthoredBy() == user"}
// *   },


class ShiftComments
{
    /**
     * @var UuidInterface
     *
     * @ORM\Column(name="id", type="uuid_binary", unique=true, nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="CUSTOM")
     * @ORM\CustomIdGenerator(class=UuidGenerator::class)
     * @Groups({"comments:read", "shift:read"})
     */
    private $id;

    /**
     * @Groups({"comments:read", "comments:write", "shift:read"})
     * @ORM\Column(name="comment", type="string", length=255, nullable=false)
     */
    private $comment;

    /**
     * @ORM\Column(name="date_of_comment", type="datetime", nullable=false)
     * @Groups({"comments:read", "comments:write"})
     * @ORM\Column(name="date_of_comment", type="datetime", nullable=false)
     */
    private $dateOfComment;

    /**
     *
     * @Groups({"comments:read", "comments:write"})
     * @ORM\ManyToOne(targetEntity="User", inversedBy="comments")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="authored_by_id", referencedColumnName="id")
     * })
     */
    private $authoredBy;

    /**
     * @Groups({"comments:read", "comments:write"})
     * @ORM\ManyToOne(targetEntity="ScheduledShift", inversedBy="comments")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="shift_id", referencedColumnName="id")
     * })
     */
    private $shift;

    /**
     * @Groups({"comments:read", "comments:write"})
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="receivedComments")
     */
    private $recipient;

    /**
     * @Groups({"comments:read", "comments:write"})
     * @ORM\Column(type="boolean", nullable=true, name="marked_as_read")
     */
    private $markedAsRead;

    /**
     * @Groups({"comments:read", "comments:write"})
     * @ORM\Column(type="boolean", nullable=true, name="is_private")
     */
    private $isPrivate;

    /**
     * @Groups({"comments:read", "comments:write"})
     * @ORM\Column(type="string", length=50, nullable=true, name="subject")
     */
    private $subject;

    /**
     *
     * @ApiProperty(identifier=true)
     * @return LazyUuidFromString|UuidInterface
     */
    public function getId(): ?LazyUuidFromString
    {
        return $this->id;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(string $comment): self
    {
        $this->comment = $comment;

        return $this;
    }

    public function getDateOfComment(): ?\DateTimeInterface
    {
        return $this->dateOfComment;
    }

    public function setDateOfComment(\DateTimeInterface $dateOfComment): self
    {
        $this->dateOfComment = $dateOfComment;

        return $this;
    }

    public function getAuthoredBy()
    {
        return $this->authoredBy;
    }

    public function setAuthoredBy($authoredBy)
    {
        $this->authoredBy = $authoredBy;

        return $this;
    }

    public function getShift()
    {
        return $this->shift;
    }

    public function setShift($shift)
    {
        $this->shift = $shift;

        return $this;
    }

    public function getRecipient(): ?User
    {
        return $this->recipient;
    }

    public function setRecipient(?User $recipient): self
    {
        $this->recipient = $recipient;

        return $this;
    }

    public function getMarkedAsRead(): ?bool
    {
        return $this->markedAsRead;
    }

    public function setMarkedAsRead(?bool $markedAsRead): self
    {
        $this->markedAsRead = $markedAsRead;

        return $this;
    }

    public function getIsPrivate(): ?bool
    {
        return $this->isPrivate;
    }

    public function setIsPrivate(?bool $isPrivate): self
    {
        $this->isPrivate = $isPrivate;

        return $this;
    }

    public function getSubject(): ?string
    {
        return $this->subject;
    }

    public function setSubject(?string $subject): self
    {
        $this->subject = $subject;

        return $this;
    }

}
